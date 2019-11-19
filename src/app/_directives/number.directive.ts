import { Directive, ElementRef, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[numberDir]'
})
export class NumberDirective {

  constructor(private el: ElementRef,
    private ngControl: NgControl) { }

  @HostListener('input') onInput() {
    const inputEvent: any = event;
    const { inputType } = inputEvent;
    const { nativeElement } = this.el;
    const { selectionStart, selectionEnd } = nativeElement;
    let { value } = nativeElement;

    value = value.replace(/\D/g, '');
    
    if (value !== '')
      this.ngControl.control.setValue(value, { emitEvent: true });
    else
      this.ngControl.control.setValue(null, { emitEvent: false });

    if (inputType === 'deleteContentBackward' || inputType === 'deleteContentForward') {
      nativeElement.selectionStart = selectionStart;
      nativeElement.selectionEnd = selectionEnd;
    }
  }

}
