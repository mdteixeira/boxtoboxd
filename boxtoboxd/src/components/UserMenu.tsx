import { SignOut, User, UserCircle } from '@phosphor-icons/react';
import { SignIn } from '@phosphor-icons/react/dist/ssr';
import React, { useState } from 'react';
import Popup from 'reactjs-popup';

function UserMenu() {
  const [Logado, setLogado] = useState(false);

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
              className="rounded-full border-2 border-emerald-300 object-cover size-10"
              src="data:image/png;base64,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"
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
    </div>
  );
}

export default UserMenu;
