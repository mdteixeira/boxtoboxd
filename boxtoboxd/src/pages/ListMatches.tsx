import { useEffect, useState } from 'react';

import React from 'react';
import {
  CaretDown,
  CircleNotch,
  MagnifyingGlass,
  SoccerBall,
  SpinnerGap,
} from '@phosphor-icons/react';
import { Match } from '../models/Match';
import MatchInfo from '../components/MatchInfoCard';
import { jogos } from '../../jogos';
import { competitions } from '../../competitions';

function ListMatches() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [filtered, setFiltered] = useState<Match[]>([]);

  const [show, setShow] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setMatches(jogos.matches);
    setFiltered(matches);
  }, []);

  async function filterStatus(e) {
    setLoading(true);
    setFiltered(
      matches.filter((m) => {
        return m.status == e.target.value;
      })
    );
    setLoading(false);
  }

  async function compFilter(e) {
    setLoading(true);
    setFiltered(
      matches.filter((m) => {
        return m.competition.id == e.target.value;
      })
    );
    setLoading(false);
  }
  return (
    <>
      <div className="sm:container sm:mx-auto mt-10 mb-32 mx-2">
        <div className="mb-5 bg-white dark:bg-opacity-5 rounded-2xl p-2 ps-5 flex justify-between flex-wrap gap-3 items-center ">
          <h3 className="text-2xl text-emerald-500 font-medium">Pesquisar partidas</h3>
          <div className="flex flex-wrap justify-center items-stretch gap-4">
            <input
              type="radio"
              name="status_filter"
              id="fim"
              className="peer/fim hidden"
              onChange={filterStatus}
              value={'FINISHED'}
            ></input>
            <label
              className="cursor-pointer px-4 py-1 bg-opacity-10 dark:bg-opacity-5 border-2 border-green-500 bg-green-500 dark:bg-green-800dark:border-green-900 rounded-xl items-center gap-2 hover:bg-opacity-40 text-green-600 dark:text-green-200 peer-checked/fim:bg-emerald-500 peer-checked/fim:bg-opacity-80 peer-checked/fim:text-white"
              htmlFor="fim"
            >
              Fim
            </label>
            <input
              type="radio"
              name="status_filter"
              id="embreve"
              className="peer/embreve hidden"
              onChange={filterStatus}
              value={'TIMED'}
            ></input>
            <label
              className="cursor-pointer px-4 py-1 bg-opacity-10 dark:bg-opacity-5 border-2 border-amber-500 bg-amber-500 dark:bg-amber-800dark:border-amber-900 rounded-xl items-center gap-2 hover:bg-opacity-40 text-amber-600 dark:text-amber-300 peer-checked/embreve:bg-amber-500 peer-checked/embreve:bg-opacity-80 peer-checked/embreve:text-white"
              htmlFor="embreve"
            >
              Em breve
            </label>
            <input
              type="radio"
              name="status_filter"
              id="aovivo"
              className="peer/aovivo hidden"
              onChange={filterStatus}
              value={'IN_PLAY'}
            ></input>
            <label
              className="cursor-pointer px-4 py-1 bg-opacity-10 dark:bg-opacity-5 border-2 border-red-500 bg-red-500 dark:bg-red-800dark:border-red-900 rounded-xl items-center gap-2 hover:bg-opacity-40 text-red-600 dark:text-red-300 peer-checked/aovivo:bg-red-500 peer-checked/aovivo:bg-opacity-80 peer-checked/aovivo:text-white"
              htmlFor="aovivo"
            >
              Ao vivo
            </label>
          </div>
          {/* <div className="flex gap-2"> */}
          {/* <div className="sm:inline-flex items-center gap-3 relative hidden w-1/2">
              <input
                type="date"
                id="data"
                name="data"
                placeholder="Data"
                className="dark:bg-slate-800  rounded-2xl border dark:border-slate-700 py-2 px-4 focus-within:outline-none"
              />
            </div> */}
          <div className="sm:inline-flex items-center gap-3 relative hidden">
            <input
              type="text"
              id="Partida"
              name="Partida"
              placeholder="Time"
              className="dark:bg-slate-800  rounded-2xl border dark:border-slate-700 py-2 px-4 focus-within:outline-none"
              onChange={(e) => {
                setFiltered(
                  matches.filter((m) => {
                    return (
                      m.homeTeam.name.toLowerCase().search(e.target.value) > -1 ||
                      m.awayTeam.name.toLowerCase().search(e.target.value) > -1
                    );
                  })
                );
              }}
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
          {/* </div> */}
        </div>
        <div className="mb-5 bg-white dark:bg-opacity-5 rounded-2xl p-2 ps-5 flex gap-3 items-center flex-wrap gap-y-5 justify-around">
          <h3 className="text-2xl text-emerald-500 font-medium">Competições</h3>
          <div className="flex gap-4 justify-around flex-wrap">
            {competitions.map((competicao) => {
              return (
                <div key={competicao.id}>
                  <input
                    type="radio"
                    name="competicao"
                    id={competicao.id.toString()}
                    className={`hidden peer/${competicao.id}`}
                    onChange={compFilter}
                    value={competicao.id}
                  ></input>
                  <label
                    className={`grid gap-1 cursor-pointer px-4 py-2 bg-opacity-10 dark:bg-opacity-5 border-2 bg-slate-400 dark:border-slate-700 rounded-xl items-center hover:bg-opacity-20 dark:text-slate-200 w-32
                    peer-checked/${competicao.id}:bg-emerald-500 h-full
                    `}
                    htmlFor={`${competicao.id}`}
                  >
                    <img className="size-12 mx-auto" src={competicao.emblem}></img>
                    <p className="text-xs text-center">{competicao.name}</p>
                  </label>
                </div>
              );
            })}
          </div>
        </div>
        {!loading ? (
          <>
            {show ? (
              <div className="gap-3 grid">
                {filtered.map((match: Match) => {
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
                      referees={match.referees}
                    ></MatchInfo>
                  );
                })}
              </div>
            ) : (
              ''
            )}
          </>
        ) : (
          // <SpinnerGap className="animate-spin mx-auto text-5xl text-emerald-500" />
          <div className="grid place-content-center">
            <SoccerBall
              className="animate-bounce mx-auto text-5xl text-emerald-500"
              weight="duotone"
            />
            <p className="animate-pulse">Carregando</p>
          </div>
          // <CircleNotch className="animate-spin mx-auto text-5xl text-emerald-500" />
        )}
      </div>
    </>
  );
}

export default ListMatches;
