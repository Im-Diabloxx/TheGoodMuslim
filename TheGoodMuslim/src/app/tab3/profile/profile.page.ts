import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-profile',
  templateUrl: 'profile.page.html',
  styleUrls: ['profile.page.scss']
})

export class ProfilePage {

  public pseudo: string;
  public address = {
    street: '',
    city: '',
    country: '',
    postalCode: '',
  };


  constructor(public modalController: ModalController) {}

  dismiss() {
    this.modalController.dismiss({
      dismissed: true
    });
  }

  save() {
    console.log(this.address);
    this.dismiss();
  }

  handlePseudo(event) {
    this.pseudo = event.target.value;
  }

  handleAddress(event) {
    this.address[event.target.id] = event.target.value;
  }
}
