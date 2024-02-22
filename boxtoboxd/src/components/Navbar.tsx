import { SoccerBall } from '@phosphor-icons/react/dist/ssr';
import React from 'react';
import AddRating from './AddRating';
import { UserCircle } from '@phosphor-icons/react';
import UserMenu from './UserMenu';

function Navbar() {
  return (
    <>
      <header className="w-full flex justify-between items-center gap-1 sticky top-0 pt-2 container mx-auto bg-gradient-to-b from-slate-200 to-transparent">
        <div className="flex justify-between w-full items-center md:p-2 p-1 md:rounded-2xl rounded-e-2xl bg-neutral-50 border z-10">
          <div className="inline-flex gap-1 items-center">
            <SoccerBall className="text-3xl text-emerald-700" weight="duotone" />
            <h1 className="md:block text-2xl hidden font-semibold text-emerald-500">
              BoxToBoxD
            </h1>
          </div>
          <nav className="md:flex w-full justify-evenly hidden">
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
          <div className="">
            <AddRating />
          </div>
        </div>
        <div className="w-12 h-12">
          <UserMenu />
        </div>
      </header>
    </>
  );
}

export default Navbar;
