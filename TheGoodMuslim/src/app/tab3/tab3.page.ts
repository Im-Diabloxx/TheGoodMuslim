/* eslint-disable @typescript-eslint/naming-convention */
import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ProfilePage } from './profile/profile.page';
import { StatisticsPage } from './statistics/statistics.page';
import { AboutPage } from './about/about.page';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})

export class Tab3Page {

  constructor(public modalController: ModalController) {}

  async presentModal(event) {
    const components = {
      Profile: ProfilePage,
      Statistiques: StatisticsPage,
      'A propos': AboutPage
    };

    const modal = await this.modalController.create({
      component: components[event.target.innerText],
    });
    return await modal.present();
  }
  // TODO: notification + Qasr
}
