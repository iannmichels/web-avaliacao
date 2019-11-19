import {Directive, ElementRef, EventEmitter, HostListener, OnInit, Output, Renderer2, Self} from '@angular/core';
import {NgControl, NgModel} from "@angular/forms";

@Directive({
  selector: '[clearable]'
})
export class InputCleanDirective {

  private readonly span: any;
  private readonly text: any;

  constructor(private elem: ElementRef, private renderer: Renderer2, private ngControl: NgControl) {

    this.span = renderer.createElement('span');
    this.text = renderer.createText('×');

    renderer.setAttribute(this.span, 'style', 'position: absolute; right: 5px; bottom: 7px; align-self: flex-end; cursor: pointer; display: inline-block; font-weight: 500; font-size: 1.2em;');
    renderer.appendChild(this.span, this.text);

    renderer.listen(this.span, 'click', () => {
       renderer.removeChild(this.elem.nativeElement.parentNode, this.span);
      this.ngControl.control.setValue(null,{emitEvent: true});
    });
  }

  @HostListener('keyup', ['$event']) onChange($event) {
    if ($event.target.value && $event.target.value.length > 0) {
      this.renderer.insertBefore(this.elem.nativeElement.parentNode, this.span, this.elem.nativeElement);
    } else {
      this.renderer.removeChild(this.elem.nativeElement.parentNode, this.span);
    }
  }
}
