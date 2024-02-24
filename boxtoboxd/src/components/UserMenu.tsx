import { Moon, SignOut, User, UserCircle } from '@phosphor-icons/react';
import { SignIn } from '@phosphor-icons/react/dist/ssr';
import {
  browserLocalPersistence,
  onAuthStateChanged,
  setPersistence,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import Popup from 'reactjs-popup';
import { auth, provider } from '../firebase';

function UserMenu() {
  const user = auth.currentUser;

  const [Logado, setLogado] = useState(user != null);

  console.log(Logado);

  function handleSignout() {
    signOut(auth)
      .then(() => {
        setLogado(false);
      })
      .catch((error) => {
        alert('Vish, deu algum erro! :(');
      });
  }

  function handleLogin() {
    setPersistence(auth, browserLocalPersistence)
      .then(() => {
        // In memory persistence will be applied to the signed in Google user
        // even though the persistence was set to 'none' and a page redirect
        // occurred.
        return signInWithPopup(auth, provider);
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  }

  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user
      const uid = user.uid;
      setLogado(true);
      // ...
    } else {
    }
  });

  return (
    <div className="flex items-center justify-center max-w-12 max-h-12 w-12 h-12">
      <Popup
        trigger={
          !Logado ? (
            <UserCircle
              className="text-emerald-500 cursor-pointer size-12"
              weight="duotone"
            />
          ) : (
            <img
              className="rounded-full border-2 border-emerald-300 object-cover  size-10"
              // src={auth.currentUser?.photoURL != null ? auth.currentUser?.photoURL : ''}
              src={user?.photoURL != null ? user?.photoURL : ''}
              alt="Foto de Usuário"
            />
          )
        }
        arrow={false}
        position={'bottom right'}
        contentStyle={{
          border: '',
          boxShadow: 'none',
          marginTop: '10px',
          borderRadius: '12px',
        }}
      >
        <ul className="flex flex-col gap-3 p-2">
          <li
            className="inline-flex gap-4 items-center cursor-pointer hover:text-emerald-500"
            onClick={() => {}}
          >
            <Moon /> <span>Tema escuro</span>
          </li>
          {!Logado ? (
            <>
              <li
                className="inline-flex gap-4 items-center cursor-pointer hover:text-emerald-500"
                onClick={() => {
                  handleLogin();
                }}
              >
                <SignIn /> <span>Fazer Login</span>
              </li>
            </>
          ) : (
            <>
              <li
                className="inline-flex gap-4 items-center cursor-pointer hover:text-emerald-500"
                //   onClick={() => setLogado(!Logado)}
              >
                <User />
                <span>Perfil</span>
              </li>
              <li
                className="inline-flex gap-4 items-center cursor-pointer hover:text-emerald-500"
                onClick={() => {
                  handleSignout();
                }}
              >
                <SignOut />
                <span>Sair</span>
              </li>
            </>
          )}
        </ul>
      </Popup>
    </div>
  );
}

export default UserMenu;
