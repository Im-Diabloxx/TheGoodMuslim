import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StartScreenPage } from './start-screen.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { StartScreenPageRoutingModule } from './start-screen-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    StartScreenPageRoutingModule
  ],
  declarations: [StartScreenPage]
})
export class StartScreenPageModule {}
