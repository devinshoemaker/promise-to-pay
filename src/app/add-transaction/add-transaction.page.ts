import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { AlertController } from '@ionic/angular';
import { Observable, Subscription } from 'rxjs';
import { User } from 'firebase';

import { ContactService } from '../services/contact.service';
import { DebtService } from '../services/debt.service';
import { TransactionService } from '../services/transaction.service';
import { Contact } from '../models/contact.model';

@Component({
  selector: 'app-add-transaction',
  templateUrl: './add-transaction.page.html',
  styleUrls: ['./add-transaction.page.scss']
})
export class AddTransactionPage implements OnInit {
  public contacts$: Observable<Contact[]>;
  private userSubscription: Subscription;

  //TODO add typing
  private newContactId: string;
  private newContact: Contact;
  private userId: string;

  public transactionForm: FormGroup = new FormGroup({
    title: new FormControl('', Validators.required),
    debtId: new FormControl('', Validators.required)
  });

  constructor(
    private alertController: AlertController,
    private router: Router,
    private afs: AngularFirestore,
    private afAuth: AngularFireAuth,
    private contactService: ContactService,
    private debtService: DebtService,
    private transactionService: TransactionService
  ) {}

  ngOnInit(): void {
    this.getContacts();
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

  private getContacts(): void {
    this.userSubscription = this.afAuth.user.subscribe((user: User) => {
      this.userId = user.uid;
      this.contacts$ = this.contactService.getContactsByUserId(this.userId);
    });
  }

  public checkContactSelect(): void {
    if (this.transactionForm.get('debtId').value === 'new-contact') {
      this.presentCreateContactAlert();
    }
  }

  private async presentCreateContactAlert(): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Create Contact',
      inputs: [
        {
          name: 'name',
          type: 'text',
          placeholder: 'Contact name'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Create',
          handler: data => {
            //TODO consider breaking this out into a method
            this.newContactId = this.afs.createId();
            this.newContact = {
              name: data.name,
              userId: this.userId,
              debtId: this.afs.createId()
            };

            this.transactionForm.get('debtId').setValue(this.newContact.debtId);
          }
        }
      ]
    });

    await alert.present();
  }

  public createTransaction(): void {
    if (this.transactionForm.valid) {
      if (this.selectedContactIsNew()) {
        this.contactService.createContact(this.newContactId, this.newContact);
        this.debtService.createDebt(this.newContact.debtId, this.userId);
      }

      this.transactionService.createTransaction(this.transactionForm.value);

      this.router.navigate(['/home']);
    }
  }

  private selectedContactIsNew(): boolean {
    return this.newContact && this.transactionForm.get('debtId').value === this.newContact.debtId;
  }
}
