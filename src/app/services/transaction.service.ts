import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { Transaction } from '../models/transaction.model';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  constructor(private afs: AngularFirestore) {}

  public createTransaction(transaction: Transaction) {
    this.afs
      .collection('transactions')
      .doc(this.afs.createId())
      .set(transaction);
  }
}
