import { SoccerBall } from '@phosphor-icons/react/dist/ssr';
import React from 'react';
import AddRating from './AddRating';
import { UserCircle } from '@phosphor-icons/react';
import UserMenu from './UserMenu';

function Navbar() {
  return (
    <>
      <header className="w-full flex justify-between container items-center sm:mx-auto gap-1">
        <div className="flex justify-between w-full items-center p-2 rounded-2xl bg-neutral-50 border">
          <div className="inline-flex gap-2 items-center">
            <SoccerBall className="md:text-3xl text-emerald-700" weight="duotone" />
            <h1 className="md:text-2xl font-semibold text-emerald-500">BoxToBoxD</h1>
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
          <div className="md:block hidden">
            <AddRating />
          </div>
        </div>
        <div className='w-12 h-12'><UserMenu /></div>
      </header>
    </>
  );
}

export default Navbar;
