import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { Contact } from 'src/app/models/contact.model';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-transaction-form',
  templateUrl: './transaction-form.component.html',
  styleUrls: ['./transaction-form.component.scss']
})
export class TransactionFormComponent implements OnInit {
  @Input() userId: string;
  @Input() contacts: Contact[];

  public transactionForm: FormGroup = new FormGroup({
    title: new FormControl('', Validators.required),
    debtId: new FormControl('', Validators.required)
  });

  public newContactId: string;
  public newContact: Contact;

  constructor(private alertController: AlertController, private afs: AngularFirestore) {}

  ngOnInit() {}

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
}
