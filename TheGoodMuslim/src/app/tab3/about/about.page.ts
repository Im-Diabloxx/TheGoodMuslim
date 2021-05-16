import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-about',
  templateUrl: 'about.page.html',
  styleUrls: ['about.page.scss']
})
export class AboutPage {

  constructor(public modalController: ModalController) {}

  dismiss() {
    this.modalController.dismiss({
      dismissed: true
    });
  }
}
