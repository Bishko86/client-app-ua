import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appShowPassword]',
})
export class ShowPasswordDirective {
  hidePasswordIcon = '../../../../assets/icons/hidePassword.png';
  showPasswordIcon = '../../../../assets/icons/showPassword.png';

  constructor(private element: ElementRef) {}

  @HostListener('click')
  showPassword() {
    const input = this.element.nativeElement.previousSibling;
    const type = input.type;
    const icon = type === 'text' 
      ? this.showPasswordIcon 
      : this.hidePasswordIcon;
    const inputType = type === 'text' ? 'password' : 'text';
    input.type = inputType;
    this.element.nativeElement.src = icon;
  }
}
