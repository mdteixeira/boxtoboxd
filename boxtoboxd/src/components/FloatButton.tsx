import React from 'react';
import AddRating from './AddRating';
import { Broadcast, Gear, ProhibitInset, SoccerBall, Users } from '@phosphor-icons/react';

function FloatButton() {
  return (
    <>
      <div className="hidden md:block fixed bottom-0 right-0 m-2">
        <AddRating />
      </div>
      <div className="md:hidden fixed bottom-0 w-full m-0 left-0 dark:bg-slate-900 bg-slate-100 py-2 z-50 grid grid-cols-5 place-content-center *:grid *:place-content-center *:grid-cols-1 *:text-center *:justify-items-center *:text-xs *:gap-1">
        <div className="">
          <div className="relative">
            <Broadcast className="text-3xl" />
            <ProhibitInset
              className="absolute z-20 top-[-5px] right-[-5px] text-red-500 text-lg"
              weight="duotone"
            />
          </div>
          <p>Ao vivo</p>
        </div>
        <div className="">
          <div className="relative">
            <SoccerBall className="text-3xl" />
            <ProhibitInset
              className="absolute z-20 top-[-5px] right-[-5px] text-red-500 text-lg"
              weight="duotone"
            />
          </div>
          <p>Partidas</p>
        </div>
        <div className="">
          <AddRating />
        </div>
        <div className="">
          <div className="relative">
            <Users className="text-3xl" />
            <ProhibitInset
              className="absolute z-20 top-[-5px] right-[-5px] text-red-500 text-lg"
              weight="duotone"
            />
          </div>
          <p>Amigos</p>
        </div>
        <div className="">
          <div className="relative">
            <Gear className="text-3xl" />
            <ProhibitInset
              className="absolute z-20 top-[-5px] right-[-5px] text-red-500 text-lg"
              weight="duotone"
            />
          </div>
          <p>Ajustes</p>
        </div>
      </div>
    </>
  );
}

export default FloatButton;
