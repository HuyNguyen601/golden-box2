import config from './config'
import firebase from 'firebase/app'
import 'firebase/firestore'

firebase.initializeApp(config)
const firestore = firebase.firestore()
const settings = {/* your settings... */
  timestampsInSnapshots: true
};
firestore.settings(settings);

export {firestore} ;
