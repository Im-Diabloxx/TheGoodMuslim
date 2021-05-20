import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-statistics',
  templateUrl: 'statistics.page.html',
  styleUrls: ['statistics.page.scss']
})
export class StatisticsPage {

  constructor(public modalController: ModalController) {}

  dismiss() {
    this.modalController.dismiss({
      dismissed: true
    });
  }
}
