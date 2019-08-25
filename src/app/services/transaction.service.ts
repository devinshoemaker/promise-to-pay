import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  constructor(private afs: AngularFirestore) {}

  //TODO add typing
  public createTransaction(transaction: any) {
    this.afs
      .collection('transactions')
      .doc(this.afs.createId())
      .set(transaction);
  }
}
