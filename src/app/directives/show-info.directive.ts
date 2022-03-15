import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appShowInfo]',
})
export class ShowInfoDirective {
  @Input() value: string;

  constructor(private element: ElementRef) {
    this.setValue();
  }
  @HostListener('mouseover', ['$event.target'])
  showAllInfo() {
    setTimeout(() => {
      this.element.nativeElement.innerHTML = this.value}, 500);
  }

  @HostListener('mouseout', ['$event.target'])
  showLessInfo() {
    this.element.nativeElement.innerHTML = this.setBaseValue(this.value)
  }

  private setValue() {
    setTimeout(
      () =>this.element.nativeElement.innerHTML = this.setBaseValue(this.value))
  }

  setBaseValue(val: string): string {
    return val.length > 20
      ? `<span class="base"> Studied: </span> ${val.slice(0, 20)}` + '...'
      : val;
  }

  
}
