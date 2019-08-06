import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {
  constructor(
    private afAuth: AngularFireAuth,
    private alertController: AlertController,
    private router: Router
  ) {}

  public async presentLogOutAlert(): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Alert',
      message: 'Are you sure you want to log out?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Log Out',
          cssClass: 'log-out-confirm-button',
          handler: () => {
            this.afAuth.auth.signOut();
            this.router.navigate(['/login']);
          }
        }
      ]
    });

    await alert.present();
  }
}
