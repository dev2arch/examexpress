import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'popular'
})
export class PopularPipe implements PipeTransform {

  transform(value: any, args?: any): any {

    var popularTests =  value.filter(function(hero) {
      return hero.category ==  "Medical";
    });
    console.log(popularTests)
    return popularTests;
  }

}
