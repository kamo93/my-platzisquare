import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appResaltar]'
})
export class ResaltarDirective implements OnInit {
  constructor(private elRef: ElementRef, private rendenrer: Renderer2) {}
  @Input('appResaltar') plan = '';
  ngOnInit() {
    if (this.plan === 'pagado') {
      this.rendenrer.setStyle(this.elRef.nativeElement, 'background-color', 'yellow');
      this.rendenrer.setStyle(this.elRef.nativeElement, 'font-weight', 'bold');
    }
  }
}
