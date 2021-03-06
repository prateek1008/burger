import { Directive, HostListener, ElementRef, OnInit, Renderer2, HostBinding } from '@angular/core';

@Directive({
  selector: '[appColorPrimary]'
})
export class ColorPrimaryDirective implements OnInit {
  @HostBinding('class') names = 'text-info';

  constructor(private elRef: ElementRef, private renderer: Renderer2) { }

  ngOnInit() {
    // this.elRef.nativeElement.className = 'text-primary'; //should be avoided 
    // this.renderer.addClass(this.elRef.nativeElement, 'bg-secondary')
  }
  
  @HostListener('mouseenter') mouseover(eventData: Event) {
    this.names = 'text-dark';
  }

  @HostListener('mouseleave') mouseleave(eventData: Event) {
    this.names = 'text-info'
  }

}
