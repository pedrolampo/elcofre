import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import {
  getDocs,
  collection,
  query,
  where,
  getDoc,
  doc,
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBTGq8iJsjkKkGk92SxkIqTSvGv2XySl20',
  authDomain: 'el-cofre.firebaseapp.com',
  projectId: 'el-cofre',
  storageBucket: 'el-cofre.appspot.com',
  messagingSenderId: '396337172117',
  appId: '1:396337172117:web:ef34006e863a7a4f6dd59c',
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const getList = (key, op, value) => {
  return new Promise((res, rej) => {
    const collectionQuery =
      key && op && value
        ? query(collection(db, 'items'), where('category', '==', value))
        : collection(db, 'items');

    getDocs(collectionQuery)
      .then((querySnapshot) => {
        const items = querySnapshot.docs.map((doc) => {
          return { id: doc.id, ...doc.data() };
        });
        res(items);
      })
      .catch((err) => {
        rej(`Error al obtener los datos: ${err}`);
      });
  });
};

export const getPass = () => {
  return new Promise((res, rej) => {
    getDoc(doc(db, 'data', 'g75Hr9hXMIXbJDPNRDSJ'))
      .then((querySnapshot) => {
        res(querySnapshot.data().pass);
      })
      .catch((err) => {
        rej(`Error al obtener los datos: ${err}`);
      });
  });
};
