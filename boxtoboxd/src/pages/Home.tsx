import { SoccerBall } from '@phosphor-icons/react/dist/ssr';
import React from 'react';

function Home() {
  return (
    <div className=" text-center bg-white rounded-2xl container mx-auto grid grid-cols-2 place-items-center mt-3">
      <div>
        <h1 className="text-5xl text-emerald-600 font-semibold">BoxToBoxD</h1>
        <h2 className="font-medium text-lg">Os melhores jogos!</h2>
        <hr className="border-emerald-400 w-1/2 mx-auto my-3" />
        <p>Avalie, curta e comente sobre os jogos que te marcaram!</p>
      </div>
      <div>
        <SoccerBall
          className="w-1/2 h-full my-12 mx-40 text-emerald-700"
          weight="duotone"
        />
      </div>
    </div>
  );
}

export default Home;
