import './SectionHeader.css';

export interface SectionHeaderProps {
  number: number;
  title: string;
}

export function SectionHeader({ number, title }: SectionHeaderProps) {
  return (
    <header className="section-header">
      <h2 className="section-header__title">
        <span className="section-header__number">{number}.</span>
        {title}
      </h2>
    </header>
  );
}

export function PanelHeader({ title }: { title: string }) {
  return (
    <header className="section-header section-header--panel">
      <h1 className="section-header__panel-title">{title}</h1>
    </header>
  );
}
