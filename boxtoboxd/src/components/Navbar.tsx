import { SoccerBall } from '@phosphor-icons/react/dist/ssr';
import React, { useEffect } from 'react';
import { ProhibitInset } from '@phosphor-icons/react';
import UserMenu from './UserMenu';
import { onAuthStateChanged } from 'firebase/auth';
import AddRating from './RatingPopup';

function Navbar() {
  return (
    <>
      <header className="w-full flex justify-between items-center gap-1 sticky top-0 md:pt-2 container mx-auto bg-gradient-to-b from-slate-200 dark:from-slate-800 to-transparent z-50">
        <div className="flex justify-between w-full items-center md:p-2 p-2 md:rounded-2xl md:rounded-e-2xl rounded-ee-2xl bg-slate-50 dark:bg-slate-900 border dark:border-slate-800 z-10">
          <div className="inline-flex gap-1 items-center">
            <SoccerBall
              className="text-3xl text-emerald-700 dark:text-emerald-500"
              weight="duotone"
            />
            <h1 className="md:block text-2xl hidden font-semibold text-emerald-500">
              BoxToBoxD
            </h1>
            <h1 className="md:hidden text-lg block font-semibold text-emerald-500">
              BoxToBoxD
            </h1>
            <h3 className="text-xs bg-amber-300 px-2 py-0.5 rounded-md text-black text-center text-nowrap">
              Beta v0.4.2
            </h3>
          </div>
          <nav className="md:flex w-full justify-evenly hidden">
            <div className="relative">
              <a href="#" className="hover:text-emerald-500 font-medium">
                Jogos ao vivo
              </a>
              <ProhibitInset
                className="absolute z-20 top-[-5px] right-[-13px] text-red-500 text-lg"
                weight="duotone"
              />
            </div>
            <div className="relative">
              <a href="#" className="hover:text-emerald-500 font-medium">
                Top Partidas
              </a>
              <ProhibitInset
                className="absolute z-20 top-[-5px] right-[-13px] text-red-500 text-lg"
                weight="duotone"
              />
            </div>
            <div className="relative">
              <a href="#" className="hover:text-emerald-500 font-medium">
                Amigos
              </a>
              <ProhibitInset
                className="absolute z-20 top-[-5px] right-[-13px] text-red-500 text-lg"
                weight="duotone"
              />
            </div>
          </nav>
          <div className="hidden md:block">
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
