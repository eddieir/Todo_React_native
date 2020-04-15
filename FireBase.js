import firebase from 'firebase';
import '@firebase/firestore';
const firebaseConfig = {
  apiKey: "AIzaSyAuRBTLxSGqxVWGDoWSIcAPIYYnPho1zQE",
  authDomain: "reactnativetodoapp-15960.firebaseapp.com",
  databaseURL: "https://reactnativetodoapp-15960.firebaseio.com",
  projectId: "reactnativetodoapp-15960",
  storageBucket: "reactnativetodoapp-15960.appspot.com",
  messagingSenderId: "646138547458",
  appId: "1:646138547458:web:80683871d90fbdfec6461b"

}
class Fire {
  constructor(callback) {
    this.init(callback)
  }
  init(callback) {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        callback(null, user);
      } else {
        firebase
          .auth()
          .signInAnonymously()
          .catch(error => {
            callback(error);
          });
      }
    });
  }
  getLists(callback) {
    let ref = firebase
      .firestore()
      .collection('users')
      .doc(this.userId)
      .collection('lists');

    this.unsubscibe = ref.onSnapshot(snapshot => {
      lists = [];

      snapshot.forEach(doc => {
        lists.push({ id: doc.id, ...doc.data() });
      })

      callback(lists);
    });
  }

  get userId() {
    return firebase.auth().currentUser.uid;
  }
  detach() {
    this.unsubscibe()
  }
}

export default Fire;