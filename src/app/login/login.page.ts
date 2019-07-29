import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

import * as firebase from 'firebase/app';
import 'firebase/auth';

import * as firebaseui from 'firebaseui';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnInit {
  constructor(private afAuth: AngularFireAuth) {}

  ngOnInit() {
    // FirebaseUI config.
    const uiConfig = {
      signInSuccessUrl: '/home',
      signInOptions: [firebase.auth.EmailAuthProvider.PROVIDER_ID]
    };

    // Initialize the FirebaseUI Widget using Firebase.
    const ui = new firebaseui.auth.AuthUI(this.afAuth.auth);
    // // The start method will wait until the DOM is loaded.
    ui.start('#firebaseui-auth-container', uiConfig);
  }
}
