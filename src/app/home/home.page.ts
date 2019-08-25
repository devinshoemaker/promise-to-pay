import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Observable, Subscription } from 'rxjs';
import { User } from 'firebase';

import { ContactService } from '../services/contact.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {
  public contacts$: Observable<any>;
  private userSubscription: Subscription;

  constructor(
    private afAuth: AngularFireAuth,
    private alertController: AlertController,
    private router: Router,
    private contactService: ContactService
  ) {}

  ngOnInit() {
    this.userSubscription = this.afAuth.user.subscribe((user: User) => {
      this.contacts$ = this.contactService.getContactsByUserId(user.uid);
    });
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  public addTransaction(): void {
    this.router.navigate(['/add-transaction']);
  }

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
