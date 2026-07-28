import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'orbit-title-tab',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './title-tab.component.html',
  styleUrls: ['./TitlesAndTabs.css'],
  encapsulation: ViewEncapsulation.None,
})
export class TitleTabComponent {
  /** Figma Tab State=Selected */
  @Input() selected = false;
  @Input() disabled = false;
  @Input() label = 'Tab';
  /** When true, projects default content instead of `label`. */
  @Input() useContentSlot = false;
  @Input() className?: string;

  @Output() tabClick = new EventEmitter<void>();

  get classes(): string {
    return [
      'orbit-title-tab',
      this.selected ? 'orbit-title-tab--selected' : undefined,
      this.className,
    ]
      .filter(Boolean)
      .join(' ');
  }

  onClick(): void {
    if (!this.disabled) {
      this.tabClick.emit();
    }
  }
}
