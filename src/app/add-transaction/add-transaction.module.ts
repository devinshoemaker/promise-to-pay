import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AddTransactionPage } from './add-transaction.page';
import { TransactionFormComponent } from './transaction-form/transaction-form.component';

const routes: Routes = [
  {
    path: '',
    component: AddTransactionPage
  }
];

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, IonicModule, RouterModule.forChild(routes)],
  declarations: [AddTransactionPage, TransactionFormComponent]
})
export class AddTransactionPageModule {}
