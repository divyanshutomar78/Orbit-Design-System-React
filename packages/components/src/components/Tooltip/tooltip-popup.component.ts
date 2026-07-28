import { CommonModule } from '@angular/common';
import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'orbit-tooltip-popup',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tooltip-popup.component.html',
  styleUrls: ['./TooltipPopup.css'],
  encapsulation: ViewEncapsulation.None,
})
export class TooltipPopupComponent {
  /** Figma default text (Toolem ipsum). */
  @Input() text: string | null = 'Toolem ipsum';
  /** Figma Show Default Text */
  @Input() showText = true;
  /** Figma Add more components — custom body below or instead of text. */
  @Input() showSlot = false;
  @Input() className?: string;
  @Input() id?: string;

  get classes(): string {
    return ['orbit-tooltip-popup', this.className].filter(Boolean).join(' ');
  }

  get shouldShowText(): boolean {
    return this.showText && this.text != null && this.text !== '';
  }
}
