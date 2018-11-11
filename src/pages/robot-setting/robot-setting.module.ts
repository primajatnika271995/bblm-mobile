import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RobotSettingPage } from './robot-setting';

@NgModule({
  declarations: [
    RobotSettingPage,
  ],
  imports: [
    IonicPageModule.forChild(RobotSettingPage),
  ],
})
export class RobotSettingPageModule {}
