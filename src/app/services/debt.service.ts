import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class DebtService {
  constructor(private afs: AngularFirestore) {}

  public createDebt(debtId: string, userId: string): void {
    this.afs
      .collection('debts')
      .doc(debtId)
      .set({ userIds: [userId] });
  }
}
