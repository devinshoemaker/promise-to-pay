import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  constructor(private afs: AngularFirestore) {}

  public getContactsByUserId(userId: string): Observable<any> {
    //TODO set type
    let contactCollection: AngularFirestoreCollection<any> = this.afs.collection('contacts', ref => ref.where('userId', '==', userId));

    return contactCollection.snapshotChanges().pipe(
      map(actions =>
        actions.map(a => {
          let data: any = a.payload.doc.data();
          data.id = a.payload.doc.id;

          return data;
        })
      )
    );
  }

  //TODO set type for method parameter
  public createContact(id: string, contact: any) {
    this.afs
      .collection('contacts')
      .doc(id)
      .set(contact);
  }
}
