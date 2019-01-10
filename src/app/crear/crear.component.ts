import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { INewPlace } from '../Interfaces/new-place.interface.';
import { LugaresService } from '../services/lugares.service';

@Component({
  selector: 'app-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.scss']
})
export class CrearComponent implements OnInit {
  planOpts = [{ label: 'Gratis', value: 'gratis' }, { label: 'Pago', value: 'pagado' }];
  newPlace: INewPlace = {
    id: null,
    key: null,
    nombre: '',
    distancia: null,
    cercania: null,
    descripcion: '',
    plan: '',
    street: '',
    city: '',
    country: '',
    geoPosition: {}
  };
  formNewPlaces = null;
  private pageMode: string;

  constructor(private placesServices: LugaresService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.pageMode = this.route.routeConfig.path.split('/').pop();
    if (this.pageMode === 'edit') {
      this.placesServices
        .getFBPLaces()
        .subscribe(places => {
          this.newPlace = this.placesServices.filterIdPlace(places, this.route.snapshot.queryParams.id);
          console.log(this.newPlace);
        });
    }
  }

  public savePLace() {
    console.log(this.newPlace);
    if (this.pageMode === 'edit') {
      console.log('here');
      this.placesServices
        .updatePlace(this.newPlace.key, this.newPlace)
        .then((res) => {
          this.newPlace = {} as INewPlace;
          alert(`editado exitosamente`);
        });
    } else {
      this.newPlace.id = Date.now();
      this.placesServices.getGeocode(`${this.newPlace.street},${this.newPlace.country},${this.newPlace.city}`).subscribe(
        resp => {
          this.newPlace.geoPosition = resp.body.results[0].geometry.location;
          /*this.placesServices.setNewPlace(this.newPlace)
            .then(() => {
              this.newPlace = {} as INewPlace;
              alert(`Guardado exitosamente`);
          });*/
          this.placesServices.setNewPlaceHttp(this.newPlace)
            .subscribe((resSubs) => {
              console.log(resSubs);
            });
        }
      );
    }
  }
}
