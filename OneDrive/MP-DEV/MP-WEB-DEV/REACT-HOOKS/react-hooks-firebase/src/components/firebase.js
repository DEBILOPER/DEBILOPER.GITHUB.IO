import app from 'firebase/app'
import 'firebase/auth'
import 'firebase/firebase-firestore'
/*
const config = {
	apiKey: "AIzaSyAk0794OsQuDuoEdUfF9nUM_zD17lfRXEE",
	authDomain: "codedamn-socialapp.firebaseapp.com",
	databaseURL: "https://codedamn-socialapp.firebaseio.com",
	projectId: "codedamn-socialapp",
	storageBucket: "codedamn-socialapp.appspot.com",
	messagingSenderId: "263473733320"
}
*/
var config = {
    apiKey: "AIzaSyBiCuX1EVXMboHWrCpOYLF28G8o9cUvDoQ",
    authDomain: "debiloper-fab73.firebaseapp.com",
    databaseURL: "https://debiloper-fab73.firebaseio.com",
    projectId: "debiloper-fab73",
    storageBucket: "debiloper-fab73.appspot.com",
    messagingSenderId: "315498957164",
    appId: "1:315498957164:web:cc14668f3e2042f015cb49",
    measurementId: "G-BMD1G2KRH2"
  }


class Firebase {
	constructor() {
		app.initializeApp(config)
		this.auth = app.auth()
		this.db = app.firestore()
	}

	login(email, password) {
		return this.auth.signInWithEmailAndPassword(email, password)
	}

	logout() {
		return this.auth.signOut()
	}

	async register(name, email, password) {
		await this.auth.createUserWithEmailAndPassword(email, password)
		return this.auth.currentUser.updateProfile({
			displayName: name
		})
	}

	addQuote(quote) {
		if(!this.auth.currentUser) {
			return alert('Not authorized')
		}

		return this.db.doc(`users_codedamn_video/${this.auth.currentUser.uid}`).set({
			quote
		})
	}

	isInitialized() {
		return new Promise(resolve => {
			this.auth.onAuthStateChanged(resolve)
		})
	}

	getCurrentUsername() {
		return this.auth.currentUser && this.auth.currentUser.displayName
	}

	async getCurrentUserQuote() {
		const quote = await this.db.doc(`users_codedamn_video/${this.auth.currentUser.uid}`).get()
		return quote.get('quote')
	}
}

export default new Firebase()