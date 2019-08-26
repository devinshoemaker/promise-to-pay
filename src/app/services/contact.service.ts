import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Contact } from '../models/contact.model';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  constructor(private afs: AngularFirestore) {}

  public getContactsByUserId(userId: string): Observable<Contact[]> {
    let contactCollection: AngularFirestoreCollection<Contact> = this.afs.collection('contacts', ref => ref.where('userId', '==', userId));

    return contactCollection.snapshotChanges().pipe(
      map(actions =>
        actions.map(a => {
          let data: Contact = a.payload.doc.data();
          data.id = a.payload.doc.id;

          return data;
        })
      )
    );
  }

  public createContact(id: string, contact: Contact) {
    this.afs
      .collection('contacts')
      .doc(id)
      .set(contact);
  }
}
