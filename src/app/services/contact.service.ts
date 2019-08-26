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
    return this.afs.collection('contacts', ref => ref.where('userId', '==', userId)).valueChanges() as Observable<Contact[]>;
    
    // return <Observable<Contact[]>> this.afs.collection('contacts', ref => ref.where('userId', '==', userId)).valueChanges();

    // let contactCollection = this.afs.collection('contacts', ref => ref.where('userId', '==', userId));
    // return contactCollection.valueChanges();
  }

  public createContact(id: string, contact: Contact) {
    this.afs
      .collection('contacts')
      .doc(id)
      .set(contact);
  }
}
