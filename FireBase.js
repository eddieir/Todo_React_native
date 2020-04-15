import firebase from 'firebase';
import 'firebase/firestore';
const firebaseConfig = {
  apiKey: "AIzaSyAHj50Bn9KD9f9vkY4NQ7bqNiKfJ1tVjjE",
  authDomain: "reactnativetodolistapp.firebaseapp.com",
  databaseURL: "https://reactnativetodolistapp.firebaseio.com",
  projectId: "reactnativetodolistapp",
  storageBucket: "reactnativetodolistapp.appspot.com",
  messagingSenderId: "81846088749",
  appId: "1:81846088749:web:a14714a516b2d977d634a4"
};
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
      console.log('here');
    });
  }

  getLists(callback) {
    let ref = firebase
      .firestore()
      .collection("users")
      .doc(this.userId)
      .collection("lists");

    this.unsubscribe = ref.onSnapshot(snapshot => {
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
    this.unsubscribe()
  }
}

export default Fire;