import path from 'node:path';
import { fileURLToPath } from 'node:url';

import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';

import { DEFAULT_RULES } from '../shared/defaultRules';
import { SSIM_HEADER } from '../shared/schedule';
import type { WeatherRule } from '../shared/types';
import { isDtnConfigured, testDtnConnection, useMockWeather } from './dtnClient';
import { evaluateFlights, getExpandedSchedule } from './evaluator';

const dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(dirname, '../.env') });

const app = express();
const PORT = Number(process.env.PORT ?? 8787);

let rules: WeatherRule[] = structuredClone(DEFAULT_RULES);
let lastEvaluation: Awaited<ReturnType<typeof evaluateFlights>> | null = null;

app.use(cors());
app.use(express.json());

app.get('/api/status', async (_req, res) => {
  const dtnConfigured = isDtnConfigured();
  const dtnConnected = dtnConfigured ? await testDtnConnection() : false;

  res.json({
    dtnConfigured,
    dtnConnected,
    mockWeather: useMockWeather(),
    scheduleFlights: getExpandedSchedule().length,
    rulesCount: rules.length,
  });
});

app.get('/api/schedule', (_req, res) => {
  res.json({
    season: 'IATA Summer 2026',
    horizonDays: 15,
    flights: getExpandedSchedule(),
  });
});

app.get('/api/schedule/ssim', (_req, res) => {
  res.type('text/plain').send(SSIM_HEADER);
});

app.get('/api/rules', (_req, res) => {
  res.json({ rules });
});

app.put('/api/rules', (req, res) => {
  const body = req.body as { rules?: WeatherRule[] };
  if (!body.rules?.length) {
    res.status(400).json({ error: 'rules array required' });
    return;
  }
  rules = body.rules;
  res.json({ rules });
});

app.post('/api/evaluate', async (_req, res) => {
  try {
    lastEvaluation = await evaluateFlights(rules);
    res.json(lastEvaluation);
  } catch (error) {
    res.status(500).json({
      error: error instanceof Error ? error.message : 'Evaluation failed',
    });
  }
});

app.get('/api/evaluate/latest', (_req, res) => {
  if (!lastEvaluation) {
    res.status(404).json({ error: 'No evaluation yet. POST /api/evaluate first.' });
    return;
  }
  res.json(lastEvaluation);
});

app.listen(PORT, () => {
  console.log(`Mission Watch API listening on http://localhost:${PORT}`);
});
