import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LugaresService } from '../services/lugares.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss']
})
export class DetalleComponent implements OnInit {
  placeDetail: any = {};
  negocios: any = [];
  id = null;
  constructor(private route: ActivatedRoute, private places: LugaresService) {
    this.id = this.route.snapshot.params['id'];
    this.negocios = this.places.getPlaces();
  }

  ngOnInit() {
    this.placeDetail = this.places.searchPlace(this.id);
  }
}
