import { SignOut, User, UserCircle } from '@phosphor-icons/react';
import { SignIn } from '@phosphor-icons/react/dist/ssr';
import React, { useState } from 'react';
import Popup from 'reactjs-popup';

function UserMenu() {
  const [Logado, setLogado] = useState(false);

  return (
    <>
      <Popup
        trigger={
          !Logado ? (
            <UserCircle
              className="size-12 text-emerald-500 cursor-pointer"
              weight="duotone"
            />
          ) : (
            <img
              src=""
              alt=""
              className="size-12 rounded-full border-emerald-500 border-2 cursor-pointer"
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
        {!Logado ? (
          <ul className="flex flex-col gap-3 p-2">
            <li
              className="inline-flex gap-4 items-center cursor-pointer"
              onClick={() => setLogado(!Logado)}
            >
              <SignIn /> <span>Fazer Login</span>
            </li>
          </ul>
        ) : (
          <ul className="flex flex-col gap-3 p-2">
            <li
              className="inline-flex gap-4 items-center cursor-pointer"
              //   onClick={() => setLogado(!Logado)}
            >
              <User />
              <span>Perfil</span>
            </li>
            <li
              className="inline-flex gap-4 items-center cursor-pointer"
              onClick={() => setLogado(!Logado)}
            >
              <SignOut />
              <span>Sair</span>
            </li>
          </ul>
        )}
      </Popup>
    </>
  );
}

export default UserMenu;
