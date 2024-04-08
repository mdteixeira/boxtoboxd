import React from 'react';
import AddRating from './AddRating';
import { Broadcast, Gear, SoccerBall, Users } from '@phosphor-icons/react';

function FloatButton() {
  return (
    <>
      <div className="hidden md:block fixed bottom-0 right-0 m-2">
        <AddRating />
      </div>
      <div className="md:hidden fixed bottom-0 w-full m-0 left-0 bg-slate-900 py-2 z-50 grid grid-cols-5 place-content-center *:grid *:place-content-center *:grid-cols-1 *:text-center *:justify-items-center *:text-xs *:gap-1">
        <div className="">
          <Broadcast className="text-3xl" />
          <p>Ao vivo</p>
        </div>
        <div className="">
          <SoccerBall className="text-3xl" />
          <p>Partidas</p>
        </div>
        <div className="">
          <AddRating />
        </div>
        <div className="">
          <Users className="text-3xl" />
          <p>Amigos</p>
        </div>
        <div className="">
          <Gear className="text-3xl" />
          <p>Ajustes</p>
        </div>
      </div>
    </>
  );
}

export default FloatButton;
