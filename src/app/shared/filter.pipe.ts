import { Recipe } from './../recipes/recipe.model';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filter'
})

export class FilterPipe implements PipeTransform {
    transform(value: Recipe[], filteredData : string) : (Recipe[]){
        if(value.length === 0 || filteredData === '') {
            return value;
        } else {
            let resultArray : Recipe[] = [];
            value.forEach((v : Recipe) => {
                if(v.tag === filteredData) {
                    resultArray.push(v);
                }
            })
            return resultArray;
        }
        
    }
}