import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'outstandingFilter'
})
export class OutstandingFilterPipe implements PipeTransform {

  transform(negocio: any, args?: any): any {
    return negocio.filter( objPlaces => objPlaces.plan === 'pagado');
  }

}
