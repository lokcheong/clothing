import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

const firebaseConfig = {
    apiKey: "AIzaSyD-zXMtPiHvPTNWrAbovTCuWc37A_fhEQs",
    authDomain: "crwn-db-v2-a91f9.firebaseapp.com",
    projectId: "crwn-db-v2-a91f9",
    storageBucket: "crwn-db-v2-a91f9.appspot.com",
    messagingSenderId: "113488230449",
    appId: "1:113488230449:web:1782500fd931e4cca57d10",
    measurementId: "G-T1JHR5FQ9Z"
 };

//check if there is a logged in user
//then we 
export const createUserProfileDocument = async (userAuth, additionalData) => {
	//only save 
	if (!userAuth) return;

	const userRef = firestore.doc(`users/${userAuth.uid}`);

	const snapShot = await userRef.get();

	//if it doesn't exists in firebase, we want to add the new user
	//to the firestore database
	if(!snapShot.exists) {

		//preparing data to store to firestore
		const { displayName, email } = userAuth;
		const createdAt = new Date();

		try {
			await userRef.set({
				displayName,
				email,
				createdAt,
				...additionalData
			})
		} catch (error) {
			console.log('error creating user', error.message);
		}
	}
	
	return userRef;
};


firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

//using the google auth provider instead of say twitter
const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt:'select_account'});

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;