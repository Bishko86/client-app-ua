import { Directive, EventEmitter, HostListener, Input, Output } from '@angular/core';

@Directive({
  selector: '[appScrollLoadData]'
})
export class ScrollLoadDataDirective {
  @Input() loading: boolean;
  @Output() scrollPage = new EventEmitter();

  @HostListener("window:scroll", [])
  onScroll(): void {
    if (this.bottomReached() && !this.loading) {
      this.scrollPage.emit();
    }
  }

  bottomReached(): boolean {
    const scrollHeight = Math.max(
      document.body.scrollHeight, document.documentElement.scrollHeight,
      document.body.offsetHeight, document.documentElement.offsetHeight,
      document.body.clientHeight, document.documentElement.clientHeight
    );

    const scrollTop = Math.max(document.body.scrollTop, document.documentElement.scrollTop);
    const offsetHeight = Math.max(document.body.offsetHeight, document.documentElement.offsetHeight);

    return Math.ceil(scrollTop + offsetHeight) >= scrollHeight;
  }
}
