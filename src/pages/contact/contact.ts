import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EmailComposer } from '@ionic-native/email-composer';
import { CallNumber } from '@ionic-native/call-number';

/**
 * Generated class for the ContactPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html',
})
export class ContactPage {

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private emailComposer: EmailComposer,
    private callNumber: CallNumber) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContactPage');
  }

  sendEmail() {
    let email = {
      to: 'confusion@food.net',
      subject: '[Confusion] Query',
      Body: 'Dear Sir/Madam:',
      isHtml: true
    };
    this.emailComposer.open(email);
  }

  callTheRestaurant() {
    this.callNumber.callNumber("+85212345678", true)
      .then(res => console.log('Launched dialer!', res))
      .catch(err => console.log('Error launching dialer', err));
  }
}
