import {
  Broadcast,
  Calendar,
  Circle,
  Clock,
  Dot,
  MapPin,
  X,
} from '@phosphor-icons/react';
import React from 'react';
import { Match } from '../models/Match';

function MatchInfo(partida: Match) {
  return (
    <div className="bg-white dark:bg-slate-900 bg-opacity-50 dark:bg-opacity-50 rounded-2xl p-2 pt-8 relative">
      {partida.status == 'TIMED' ? (
        <div className="absolute top-2 p-1 gap-2 border-2 font-medium border-amber-500 text-amber-500 pe-2 flex bg-amber-200 bg-opacity-30 dark:bg-amber-700 dark:bg-opacity-20 text-xs rounded-full items-center">
          <Circle size={16} color="#ee8909" weight="duotone" />
          Em breve
        </div>
      ) : partida.status === 'FINISHED' ? (
        <div className="absolute top-2 p-1 gap-2 border-2 font-medium border-green-600 text-green-600 pe-2 flex bg-green-200 bg-opacity-30 dark:bg-green-700 dark:bg-opacity-35 text-xs rounded-full items-center">
          <Circle size={16} weight="duotone" />
          Fim
        </div>
      ) : partida.status === 'IN_PLAY' ? (
        <div className="absolute top-2 p-1 gap-2 border-2 font-medium border-red-500 text-red-500 pe-2 flex bg-red-200 bg-opacity-30 dark:bg-red-700 dark:bg-opacity-35 text-xs rounded-full items-center animate-pulse">
          <Broadcast size={16} weight="duotone" />
          Ao vivo
        </div>
      ) : partida.status === 'POSTPONED' ? (
        <div className="absolute top-2 p-1 gap-2 border-2 font-medium border-amber-400 text-amber-400 pe-2 flex bg-amber-200 bg-opacity-30 dark:bg-amber-700 dark:bg-opacity-35 text-xs rounded-full items-center">
          <Clock size={16} weight="duotone" />
          Adiada
        </div>
      ) : (
        <div className="absolute top-2 p-1 gap-2 border-2 font-medium border-sky-400 text-sky-400 pe-2 flex bg-sky-200 bg-opacity-30 dark:bg-sky-700 dark:bg-opacity-35 text-xs rounded-full items-center">
          <Clock size={16} weight="duotone" />
          Marcado
        </div>
      )}

      <div className="grid grid-cols-3 p-3 dark:border-slate-600">
        <div className="left home flex flex-col items-center gap-2">
          <img
            src={
              partida.homeTeam.crest != null ? partida.homeTeam.crest! : 'no-crest.svg'
            }
            className="size-12"
            alt={partida.homeTeam.name}
          />

          <h2 className="">{partida.homeTeam.shortName}</h2>
        </div>
        <div className="placar tabular-nums flex items-center justify-around text-2xl font-bold">
          {partida.score.penalties != null ? (
            <div className="flex gap-2 items-center">
              {partida.score.regularTime!.home}
              <span
                className={
                  partida.score.winner == 'HOME_TEAM'
                    ? 'text-green-500 text-base font-medium'
                    : 'text-red-500 text-base font-medium'
                }
              >
                ({partida.score.penalties?.home})
              </span>
            </div>
          ) : (
            <h3
              className={
                partida.score.winner == 'HOME_TEAM'
                  ? 'text-green-500'
                  : partida.score.winner == 'DRAW'
                  ? ''
                  : 'text-red-500'
              }
            >
              {partida.score.fullTime.home}
            </h3>
          )}
          {<X size={16} />}
          {partida.score.penalties != null ? (
            <div className="flex gap-2 items-center">
              <span
                className={
                  partida.score.winner == 'AWAY_TEAM'
                    ? 'text-green-500 text-base font-medium'
                    : 'text-red-500 text-base font-medium'
                }
              >
                ({partida.score.penalties?.away})
              </span>
              {partida.score.regularTime!.away}
            </div>
          ) : (
            <h3
              className={
                partida.score.winner == 'AWAY_TEAM'
                  ? 'text-green-500'
                  : partida.score.winner == 'DRAW'
                  ? ''
                  : 'text-red-500'
              }
            >
              {partida.score.fullTime.away}
            </h3>
          )}
        </div>
        <div className="right away flex flex-col items-center gap-2">
          <img
            src={
              partida.awayTeam.crest != null ? partida.awayTeam.crest! : 'no-crest.svg'
            }
            className="size-12"
            alt=""
          />

          <h2>{partida.awayTeam.shortName}</h2>
        </div>
      </div>

      <div className="grid sm:grid-cols-3 gap-1 w-full place-items-center p-1 bg-slate-200 dark:bg-slate-800 py-2 rounded-2xl">
        <h2 className="text-sm  flex gap-2 items-center">
          <MapPin className="text-base" weight="bold" /> {partida.area.name}
        </h2>
        <div className="flex gap-2">
          <h2 className="text-sm  flex gap-2 pr-2 items-center">
            <Calendar className="text-base" weight="bold" />
            {new Date(partida.utcDate).toLocaleDateString()}
          </h2>
          <h2 className="text-sm  flex gap-2 pr-2 items-center">
            <Clock className="text-base" weight="bold" />
            {new Date(partida.utcDate).toLocaleTimeString().slice(0, 5)}
          </h2>
        </div>
        <div className="flex gap-2">
          <img
            className="text-sm  flex gap-2 items-center size-7"
            src={partida.competition.emblem}
          ></img>
          <h2 className="text-sm  flex gap-2 items-center">
            {partida.competition.name}
            {partida.stage != 'REGULAR_SEASON'
              ? ' - ' +
                partida.stage.charAt(0).toUpperCase() +
                partida.stage.toLowerCase().slice(1).replace('_', ' ')
              : ''}
          </h2>
        </div>
      </div>
    </div>
  );
}

export default MatchInfo;
