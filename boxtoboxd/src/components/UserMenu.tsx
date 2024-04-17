import {
  CircleHalfTilt,
  Moon,
  SignOut,
  Sun,
  User,
  UserCircle,
} from '@phosphor-icons/react';
import { SignIn } from '@phosphor-icons/react/dist/ssr';
import {
  browserLocalPersistence,
  setPersistence,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import Popup from 'reactjs-popup';
import { auth, provider } from '../firebase';
import { checkAuth } from '../service/FirebaseServices';

function UserMenu() {
  const user = auth.currentUser;

  const [Logado, setLogado] = useState(user != null);

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

  function darkTheme() {
    localStorage.setItem('darkTheme', 'dark');
    document.body.classList.add('dark');
  }

  function lightTheme() {
    localStorage.setItem('darkTheme', '');
    document.body.classList.remove('dark');
  }

  function toggleTheme() {
    localStorage.getItem('darkTheme') != 'dark' ? darkTheme() : lightTheme();
  }

  useEffect(() => {
    localStorage.getItem('darkTheme') == 'dark' && darkTheme();
  }),
    checkAuth(setLogado);
  [localStorage.getItem('darkTheme')];

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
              src={
                user?.photoURL != null
                  ? user?.photoURL
                  : 'https://i.pinimg.com/564x/51/65/bb/5165bbc3564b4296c70371b75c9774b0.jpg'
              }
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
          <button
            className="inline-flex gap-4 items-center cursor-pointer hover:text-emerald-500"
            onClick={() => {
              toggleTheme();
            }}
          >
            <>
              <CircleHalfTilt />
              <span>Mudar tema</span>
            </>
          </button>

          {!Logado ? (
            <>
              <button
                className="inline-flex gap-4 items-center cursor-pointer hover:text-emerald-500"
                onClick={() => {
                  handleLogin();
                }}
              >
                <SignIn /> <span>Fazer Login</span>
              </button>
            </>
          ) : (
            <>
              <button
                className="inline-flex gap-4 items-center cursor-pointer hover:text-emerald-500"
                //   onClick={() => setLogado(!Logado)}
              >
                <User />
                <span>Perfil</span>
              </button>
              <button
                className="inline-flex gap-4 items-center cursor-pointer hover:text-emerald-500"
                onClick={() => {
                  handleSignout();
                }}
              >
                <SignOut />
                <span>Sair</span>
              </button>
            </>
          )}
        </ul>
      </Popup>
    </div>
  );
}

export default UserMenu;
