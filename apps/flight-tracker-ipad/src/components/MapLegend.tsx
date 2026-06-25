import './MapLegend.css';

const LEGEND_ITEMS = [
  { label: 'Important', className: 'map-legend__line--important' },
  { label: 'Informative', className: 'map-legend__line--informative' },
  { label: 'No data', className: 'map-legend__line--nodata' },
  { label: 'Affected area', className: 'map-legend__line--affected' },
];

export function MapLegend() {
  return (
    <aside className="map-legend" aria-label="Map legend">
      {LEGEND_ITEMS.map((item) => (
        <div key={item.label} className="map-legend__item">
          <span className={`map-legend__line ${item.className}`} aria-hidden />
          <span className="map-legend__label">{item.label}</span>
        </div>
      ))}
    </aside>
  );
}
