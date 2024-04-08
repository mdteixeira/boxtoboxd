import { getDocs, collection } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';

export const fetchPosts = async (setRatings: Function) => {
  console.log('fetch (service)');
  await getDocs(collection(db, 'ratings')).then((querySnapshot) => {
    setRatings(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  });
};

export const checkAuth = (setLogado: Function) => {
  onAuthStateChanged(auth, (user) => {
    console.log('authState changed (service) : ', user != null);
    if (user) {
      setLogado(true);
    } else setLogado(false);
  });
};
