import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import * as _ from 'lodash';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { AppSettings } from '../app.settings';
import { GeocoderInterface } from '../Interfaces/geocoder.interface';
import { INewPlace } from '../Interfaces/new-place.interface.';


@Injectable()
export class LugaresService {
  private placesRef: AngularFireList<any>;
  private places: any;
  negocios: Array<{}> = [
    {
      id: 1,
      nombre: 'Drogeria Farmacos',
      anos: 1,
      ubicación: '',
      cercania: 1,
      distancia: 1,
      active: true,
      plan: 'pagado',
      descripcion: 'Esto es una breve descripción!'
    },
    {
      id: 2,
      nombre: 'Gasolineria texaco',
      anos: 2,
      ubicación: '',
      active: true,
      cercania: 2,
      distancia: 4,
      plan: 'gratis',
      descripcion: 'Esto es una breve descripción!'
    },
    {
      id: 3,
      nombre: 'Pasteleria bambino',
      anos: 5,
      ubicación: '',
      active: true,
      cercania: 2,
      distancia: 2.1,
      plan: 'pagado',
      descripcion: 'Esto es una breve descripción!'
    },
    {
      id: 4,
      nombre: 'Floreria la grande',
      anos: 5,
      ubicación: '',
      active: false,
      cercania: 3,
      distancia: 10,
      plan: 'gratis',
      descripcion: 'Esto es una breve descripción!'
    }
  ];
  private apiEndpoint = environment.firebase.databaseURL;
  constructor(private afDB: AngularFireDatabase, private http: HttpClient) {
    this.placesRef = this.afDB.list('lugares/');
  }

  public getPlaces() {
    return this.negocios;
  }

  public getFBPLaces() {
    if (!_.isEmpty(this.placesRef)) {
      this.places = this.placesRef.snapshotChanges().pipe(
        map(changes => {
          return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
        }
        )
      );
    }
    return this.places;
  }

  public getFBPlacesHttp() {
    return this.http.get(`${this.apiEndpoint}/lugares.json`).pipe(
      map((res) => {
        return Object.values(res);
      })
    );
  }

/* public getPlaceById(id: string) {
    return this.getFBPLaces()
      .subscribe(placeObjs => {
        return of(this.filterIdPlace(placeObjs, id));
      });
  }
*/

  public filterIdPlace(arrPlaces, id) {
    const placeFind = arrPlaces.filter(objPlaces => objPlaces.id === Number(id));
    if (placeFind.length > 0) {
      return placeFind[0];
    } else {
      return null;
    }
  }

  public searchPlace(id) {
    return this.negocios.filter((business: INewPlace) => business.id === Number(id))[0];
  }

  public setNewPlaceHttp (newPLace) {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post(`${this.apiEndpoint}/lugares.json`, newPLace, {headers});
  }

  public setNewPlace(newPlace) {
    return this.placesRef.set(`${newPlace.id}`, newPlace);
  }

  public updatePlace(key, newPLace) {
    return this.placesRef.update(key, newPLace);
  }

  public getGeocode(address): Observable<HttpResponse<GeocoderInterface>> {
    return this.http.get<GeocoderInterface>(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${AppSettings.AGM_KEY}`,
      { observe: 'response' }
    );
  }
}
