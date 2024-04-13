import { useEffect, useState } from 'react';

import React from 'react';
import { CaretDown, MagnifyingGlass } from '@phosphor-icons/react';
import { Match } from '../models/Match';
import MatchInfo from '../components/MatchInfoCard';
import { jogos } from '../../jogos';

function ListMatches() {
  const [matches, setMatches] = useState<Match[]>([]);

  const [show, setShow] = useState(true);

  const data = jogos.matches.map((jogo) => {
    let key = jogo.id;
    let value = `${jogo.homeTeam.shortName}  x  ${jogo.awayTeam.shortName}`;
    let match = jogo;
    return { key, value, match };
  });

  useEffect(() => {
    setMatches(jogos.matches);
  }, []);

  return (
    <>
      <div className="container mx-auto mt-10 mb-32">
        <div className="mb-5 bg-white  dark:bg-opacity-5 rounded-2xl p-2 ps-5 flex justify-between items-center">
          <h3 className="text-2xl text-emerald-500 font-medium">Todas as partidas</h3>
          <div className="flex gap-2">
            <div className="sm:inline-flex items-center gap-3 relative hidden w-1/2">
              <input
                type="date"
                id="data"
                name="data"
                placeholder="Data"
                className="dark:bg-slate-800  rounded-2xl border dark:border-slate-700 py-2 px-4 focus-within:outline-none"
              />
            </div>
            <div className="sm:inline-flex items-center gap-3 relative hidden">
              <input
                type="text"
                id="Partida"
                name="Partida"
                placeholder="Partida"
                className="dark:bg-slate-800  rounded-2xl border dark:border-slate-700 py-2 px-4 focus-within:outline-none"
              />
              <button className="absolute end-3">
                <MagnifyingGlass />
              </button>
            </div>
            <button
              className="border-2 flex gap-2 items-center border-opacity-30 border-emerald-500 py-1 px-3 rounded-xl text-emerald-500"
              onClick={() => setShow(!show)}
            >
              {show ? 'Ocultar' : 'Mostrar'}
              <CaretDown
                className={
                  show
                    ? 'rotate-180 transition-all delay-75 duration-300'
                    : 'transition-all delay-75 duration-300'
                }
              />
            </button>
          </div>
        </div>
        {show ? (
          <div className="gap-3 grid">
            {matches.map((match: Match) => {
              return (
                <MatchInfo
                  key={match.id}
                  area={match.area}
                  competition={match.competition}
                  season={match.season}
                  id={match.id}
                  utcDate={match.utcDate}
                  status={match.status}
                  matchday={match.matchday}
                  stage={match.stage}
                  lastUpdated={match.lastUpdated}
                  homeTeam={match.homeTeam}
                  awayTeam={match.awayTeam}
                  score={match.score}
                  odds={match.odds}
                  referees={match.referees}
                ></MatchInfo>
              );
            })}
          </div>
        ) : (
          ''
        )}
      </div>
    </>
  );
}

export default ListMatches;
