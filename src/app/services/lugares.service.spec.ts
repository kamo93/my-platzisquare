import { TestBed, inject } from '@angular/core/testing';

import { LugaresService } from './lugares.service';

fdescribe('LugaresService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LugaresService]
    });
  });

  fit('should be created', inject([LugaresService], (service: LugaresService) => {
    expect(service).toBeTruthy();
  }));
  fit('should bring the array of places',
    inject([LugaresService], (service: LugaresService) => {
      expect(typeof service.getFBPlacesHttp).toEqual('array');
    }))
});
