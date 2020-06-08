import { Component, OnInit, Inject } from '@angular/core';
import { IonicPage, NavController, NavParams, ItemSliding } from 'ionic-angular';
import { FavoriteProvider } from '../../providers/favorite/favorite';
import { Dish } from '../../shared/dish';

/**
 * Generated class for the FavoritesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-favorites',
  templateUrl: 'favorites.html',
})
export class FavoritesPage implements OnInit {

  favorites: Dish[];
  errMess: string;
  constructor(public navCtrl: NavController, public navParams: NavParams, private favoriteService: FavoriteProvider,
    @Inject('BaseURL') private BaseURL
  ) {
  }

  ngOnInit() {
    this.favoriteService.getFavorites().subscribe(
      favorites => this.favorites = favorites,
      errMess => this.errMess = errMess);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FavoritesPage');
  }

  deleteFavorite(item: ItemSliding, id: number) {
    console.log('delete', id);
    this.favoriteService.deleteFavorite(id).subscribe(
      favorites => this.favorites = favorites,
      errMess => this.errMess = errMess);
      item.close();
  }

}
