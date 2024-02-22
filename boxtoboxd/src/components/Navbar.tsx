import { SoccerBall } from '@phosphor-icons/react/dist/ssr';
import React from 'react';
import AddRating from './AddRating';
import { UserCircle } from '@phosphor-icons/react';
import UserMenu from './UserMenu';

function Navbar() {
  return (
    <>
      <header className="w-full flex justify-between container items-center sm:mx-auto ">
        <div className="flex justify-between w-full items-center p-2 m-2 rounded-2xl bg-neutral-50 mx-2 border">
          <div className="inline-flex gap-2 items-center">
            <SoccerBall className="text-3xl text-emerald-700" weight="duotone" />
            <h1 className="text-2xl font-semibold text-emerald-500">BoxToBoxD</h1>
          </div>
          <nav className="flex w-full justify-evenly">
            <a href="#" className="hover:text-emerald-500 font-medium">
              Jogos ao vivo
            </a>
            <a href="#" className="hover:text-emerald-500 font-medium">
              Top partidas
            </a>
            <a href="#" className="hover:text-emerald-500 font-medium">
              Amigos
            </a>
          </nav>
          <AddRating />
        </div>
        <UserMenu />
      </header>
    </>
  );
}

export default Navbar;
