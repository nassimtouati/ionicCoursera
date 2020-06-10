import { Component, OnInit, Inject } from '@angular/core';
import { IonicPage, NavController, NavParams, ItemSliding, ToastController, LoadingController, AlertController } from 'ionic-angular';
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
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private favoriteService: FavoriteProvider, public toastCtrl: ToastController,
    @Inject('BaseURL') private BaseURL, private loadingCtrl: LoadingController,
    private alertCtrl: AlertController
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

    let alert = this.alertCtrl.create({
      title: 'Confirm Delete',
      message: 'Do you want to delete Dish ' + id,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Delete cancelled');
          }
        },
        {
          text: 'Delete',
          handler: () => {
            let loading = this.loadingCtrl.create({
              content: 'Deleting . . .'
            });
            let toast = this.toastCtrl.create({
              message: 'Dish ' + id + ' deleted successfully',
              duration: 3000
            });
            loading.present();
            this.favoriteService.deleteFavorite(id)
              .subscribe(favorites => { this.favorites = favorites; loading.dismiss(); toast.present(); },
                errmess => { this.errMess = errmess; loading.dismiss(); });
          }
        }
      ]
    });

    alert.present();

    item.close();
  }

}
