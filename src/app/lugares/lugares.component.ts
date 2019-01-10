import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { LugaresService } from '../services/lugares.service';

@Component({
  selector: 'app-lugares',
  templateUrl: './lugares.component.html',
  styleUrls: ['./lugares.component.scss'],
  animations: [
    trigger('firstAnimationContainer', [
      state('initial', style({
        opacity: 0,
        backgroundColor: 'green',
        transform: 'rotate3d(0, 0, 0, 0deg)',
      })),
      state('final', style({
        opacity: 1,
        backgroundColor: 'yellow',
        transform: 'rotate3d(5, 10, 20, 30deg)',
      })),
        transition('initial => final', animate(1000)),
        transition('final => initial', animate(500)),
      ]),
    trigger('outstandingPlaces', [
      state('initial', style({
        opacity: 0,
        bottom: '-250px',
      })),
      state('final', style({
        opacity: 1,
        bottom: '0px',
      })),
      transition('initial => final', animate(2000)),
    ]),
  ]
})
export class LugaresComponent implements OnInit {
  encender = true;
  lat = 51.678418;
  lng = 7.809007;
  negocios = [];
  public state = 'final';
  public errorService: any = false;
  public animateOutstandingPlaces = 'initial';
  public starPlacesAnimation = 'initial';
  constructor(private placesServices: LugaresService, private spinner: NgxSpinnerService) {
    setTimeout(() => {
      this.encender = false;
    }, 5000);
    // this.negocios = this.placesServices.getPlaces();
  }

  ngOnInit() {
    this.spinner.show();
    console.log(this.placesServices.getFBPLaces());
    this.placesServices.getFBPLaces().subscribe(places => {
      setTimeout(() => {
        //this.spinner.hide();
        //this.negocios = places;
        console.log('socket', this.negocios);
      }, 5000);
    });
    this.placesServices.getFBPlacesHttp()
      .subscribe(
        (res) => {
          console.log('res Rest', res);
          this.spinner.hide();
          this.negocios = res;
          this.animateOutstandingPlaces = 'final';
      },
      (err) => {
        console.log(err);
        this.spinner.hide();
        this.errorService = err;
        //alert(`Error al cargar los lugares Msg:${err.statusText}, Code:${err.status}`);
      });
  }

  public startAnimation() {
    this.state = this.state === 'initial' ? 'final' : 'initial';
  }

  public animationStarted(e) {
    console.log('Started', e);
  }

  public animationDone(e) {
    console.log('Done', e);
  }
}
