import { Directive, ElementRef, HostBinding, HostListener, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: 'a[appContarClicks]'
})
export class ContarClicksDirective implements OnInit {
  constructor(private elRef: ElementRef, private rendenrer: Renderer2) {}
  contarCN = 0;
  childElOpacity = 0.1;
  // @HostBinding('style.opacity') levelOpacity = .1;
  @HostBinding('href') hrefValue = '#';
  @HostListener('click', ['$event.target']) onClick(btnEl) {
    this.childElOpacity += 0.1;
    this.rendenrer.setStyle(this.elRef.nativeElement.children[0], 'opacity', this.childElOpacity);
    if (this.childElOpacity === 0.5) {
      this.hrefValue = 'https://www.google.com';
    }
    // this.rendenrer.setStyle(btnEl, 'opacity', this.levelOpacity);
    console.log(`number of clicks ${this.contarCN++}`, btnEl, this.elRef.nativeElement.children[0]);
  }
  ngOnInit() {
    this.rendenrer.setStyle(this.elRef.nativeElement.children[0], 'opacity', this.childElOpacity);
  }
}
