import { ApiClient } from 'types'
import * as firebaseApp from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

export default class Firebase implements ApiClient {
  config: {
    [key: string]: string
  }

  auth: firebaseApp.auth.Auth

  constructor() {
    this.config = {
      apiKey: 'AIzaSyCdfQnEU6VuxMR79El8MrCTlormNPRvQi4',
      authDomain: 'react-three-fiber-101.firebaseapp.com',
      databaseURL: 'https://react-three-fiber-101.firebaseio.com',
      projectId: 'react-three-fiber-101',
      storageBucket: 'react-three-fiber-101.appspot.com',
      messagingSenderId: '521652328039',
      appId: '1:521652328039:web:2e189d4d8c9fd8c05d26c2'
    }

    firebaseApp.initializeApp(this.config)
    this.auth = firebaseApp.auth()
  }

  async logIn(email: string, password: string) {
    await this.auth.signInWithEmailAndPassword(email, password)
  }

  async logOut() {
    await this.auth.signOut()
  }

  onAuth(callback: (u: firebaseApp.User | null) => void) {
    this.auth.onAuthStateChanged(callback)
  }
}
