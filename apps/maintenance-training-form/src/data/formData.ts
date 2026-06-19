export interface TableColumn {
  id: string;
  label: string;
}

export interface TableRow {
  id: string;
  cells: Record<string, string>;
}

export const filesColumns: TableColumn[] = [
  { id: 'standard', label: 'Standard' },
  { id: 'ref', label: 'Ref' },
  { id: 'name', label: 'Name' },
];

export const filesRows: TableRow[] = [
  {
    id: 'f1',
    cells: {
      standard: 'Standard_Base_32',
      ref: 'CAT.OP.MPA.105(b)(3)',
      name: 'SECTION 1 – MOTOR-POWERED AIRCRAFT',
    },
  },
  {
    id: 'f2',
    cells: {
      standard: 'Air Asia_Updated',
      ref: 'CAT.OP.MPA.105',
      name: 'Use of air traffic services',
    },
  },
];

export const documentColumns: TableColumn[] = [
  { id: 'name', label: 'Name of Document' },
  { id: 'version', label: 'Version/Revision' },
  { id: 'chapter', label: 'Chapter' },
];

export const documentRows: TableRow[] = [
  {
    id: 'd1',
    cells: {
      name: 'Standard_Base_32',
      version: 'CAT.OP.M',
      chapter: 'SECTION 1 – MOTOR-POWERED AIRCRAFT',
    },
  },
  {
    id: 'd2',
    cells: {
      name: 'Air Asia_Updated',
      version: 'CAT.OP.MPA.100',
      chapter: 'Use of air traffic services',
    },
  },
];

export const descriptionText = `Maintenance Training Organisation Approval – EASA Form 11

EASA Form 11 is issued as part of the approval process for a Maintenance Training Organisation (MTO) and defines the scope of approval granted for training activities.
(*) In accordance with Article 5 of Regulation (EC) No 2042/2003; Annex III (Part-147) – Reference: GM1 147.A.905(a)
(**) In accordance with Article 5 of Regulation (EC) No 2042/2003; Annex III (Part-147)- Reference: GM1 147.A.905(a)`;

export const panelTitle = '147_Appendix II Maintanence Training';
