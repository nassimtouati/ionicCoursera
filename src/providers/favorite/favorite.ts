import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Dish } from '../../shared/dish';
import { Observable } from 'rxjs/Observable';
import { DishProvider } from '../dish/dish';
import { Storage } from '@ionic/storage';


/*
  Generated class for the FavoriteProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FavoriteProvider {

  favorites: Array<any>;


  constructor(public http: HttpClient, private DishService: DishProvider, private storage: Storage) {
    console.log('Hello FavoriteProvider Provider');
    storage.get('favorites').then(favorites => {
      if (favorites) {
        this.favorites = favorites;
      }
      else {
        this.favorites = [];
        console.log('There are no favorites in the storage');
      }
    });


  }

  public addFavorite(id: number): boolean {
    if (!this.isFavorite(id)) {
      this.favorites.push(id);
      this.storage.set('favorites', this.favorites)
      return true;
    }
  }

  public isFavorite(id: number): boolean {
    return this.favorites.some(el => el === id);
  }

  getFavorites(): Observable<Dish[]> {
    return this.DishService.getDishes()
      .map(dishes => dishes.filter(dish => this.favorites.some(el => el === dish.id)));
  }

  deleteFavorite(id: number): Observable<Dish[]> {
    let index = this.favorites.indexOf(id);
    if (index >= 0) {
      this.favorites.splice(index, 1);
      this.storage.set('favorites', this.favorites)
      return this.getFavorites();
    } else {
      console.log('deleting non excisting', id);
      return Observable.throw('deleting non-existant favorite ' + id);
    }
  }
}
