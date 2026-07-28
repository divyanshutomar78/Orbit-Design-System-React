import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  Renderer2,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';

import { IconFrameComponent } from '../Icon/icon-frame.component';
import { ModalCloseIconComponent } from './modal-icons.component';

let modalIdCounter = 0;

@Component({
  selector: 'orbit-modal',
  standalone: true,
  imports: [CommonModule, IconFrameComponent, ModalCloseIconComponent],
  templateUrl: './modal.component.html',
  styleUrls: ['./Modal.css', '../ButtonCompact/ButtonCompact.css'],
  encapsulation: ViewEncapsulation.None,
})
export class ModalComponent implements OnChanges, OnDestroy {
  @Input() open = false;
  @Input() title?: string;
  /** When true, projects `[orbitHeader]` extra header content after `title` (e.g. tab navigation). */
  @Input() useHeaderSlot = false;
  /** Whether to render the `[orbitFooter]`-projected `<footer>`. */
  @Input() showFooter = false;
  /** Close when clicking the backdrop. Default true. */
  @Input() closeOnBackdrop = true;
  /** Accessible label when title is omitted. */
  @Input() ariaLabel = 'Dialog';
  @Input() className?: string;

  @Output() close = new EventEmitter<void>();

  @ViewChild('dialog') private dialogRef?: ElementRef<HTMLElement>;

  readonly titleId = `orbit-modal-title-${++modalIdCounter}`;

  private previousOverflow: string | null = null;
  private removeKeydownListener?: () => void;

  constructor(private readonly renderer: Renderer2) {}

  get classes(): string {
    return ['orbit-modal', this.className].filter(Boolean).join(' ');
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('open' in changes) {
      if (this.open) {
        this.lockScrollAndBindEscape();
      } else {
        this.unlockScrollAndUnbindEscape();
      }
    }
  }

  ngOnDestroy(): void {
    this.unlockScrollAndUnbindEscape();
  }

  onBackdropClick(event: MouseEvent): void {
    if (this.closeOnBackdrop && event.target === event.currentTarget) {
      this.requestClose();
    }
  }

  requestClose(): void {
    this.close.emit();
  }

  private lockScrollAndBindEscape(): void {
    this.previousOverflow = document.body.style.overflow;
    this.renderer.setStyle(document.body, 'overflow', 'hidden');

    this.removeKeydownListener = this.renderer.listen(
      'document',
      'keydown',
      (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          this.requestClose();
        }
      },
    );

    queueMicrotask(() => this.dialogRef?.nativeElement.focus());
  }

  private unlockScrollAndUnbindEscape(): void {
    if (this.previousOverflow !== null) {
      this.renderer.setStyle(document.body, 'overflow', this.previousOverflow);
      this.previousOverflow = null;
    }
    this.removeKeydownListener?.();
    this.removeKeydownListener = undefined;
  }
}
