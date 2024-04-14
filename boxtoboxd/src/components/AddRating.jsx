import { useEffect, useState } from 'react';

import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import AddButton from './AddButton';

import { ArrowLeft, CaretLeft, X } from '@phosphor-icons/react';

import React from 'react';
import ReactSearchBox from 'react-search-box';

import { jogos } from '../../jogos';
import MatchInfo from './MatchInfo';

function AddRating() {
  const [partida, setPartida] = useState(null);

  const data = jogos.matches.map((jogo) => {
    if (jogo.score.winner != null) {
      let key = jogo.id;
      let value = `${jogo.homeTeam.shortName}  x ${jogo.awayTeam.shortName}
      `;
      // - ${new Date(jogo.utcDate).toLocaleDateString()}
      let match = jogo;
      return { key, value, match };
    }
  });

  return (
    <Popup
      trigger={AddButton}
      modal
      nested
      className="addRating"
      onClose={() => setPartida(null)}
    >
      {(close) => {
        return (
          <>
            <div className="modal">
              <button
                className="absolute right-0 top-0 me-1.5 mt-1.5 text-red-500 bg-red-200 dark:bg-red-950 rounded-full p-2 hover:bg-opacity-85"
                onClick={close}
              >
                <X size={20} weight="bold" />
              </button>

              <>
                <div className="header text-2xl font-bold mt-2"> Adicionar Partida </div>
                <div className="content py-3">
                  {partida != null ? (
                    <>
                      <button
                        onClick={() => setPartida(null)}
                        className="text-emerald-500 border-emerald-500 rounded-2xl border ps-2 pe-3 py-1 inline-flex gap-2 items-center hover:bg-emerald-600 hover:text-white font-medium text-sm"
                      >
                        <CaretLeft weight="bold" /> Voltar
                      </button>
                      <MatchInfo
                        area={partida.area}
                        competition={partida.competition}
                        season={partida.season}
                        id={partida.id}
                        utcDate={partida.utcDate}
                        status={partida.status}
                        matchday={partida.matchday}
                        stage={partida.stage}
                        lastUpdated={partida.lastUpdated}
                        homeTeam={partida.homeTeam}
                        awayTeam={partida.awayTeam}
                        score={partida.score}
                        odds={partida.odds}
                        referees={partida.referees}
                      />
                    </>
                  ) : (
                    <>
                      <label htmlFor="partida" className="">
                        Qual partida?
                      </label>
                      {matchSearch()}
                    </>
                  )}
                </div>
              </>
            </div>
          </>
        );
      }}
    </Popup>
  );

  function matchSearch() {
    return (
      <ReactSearchBox
        placeholder="Mandante x Visitante"
        data={data}
        onSelect={(s) => {
          setPartida(s.item.match);
          console.log(s);
        }}
        onFocus={() => {
          // console.log('This function is called when is focussed');
        }}
        onChange={() => {
          // console.log(value)
        }}
        autoFocus
        iconBoxSize="48px"
      />
    );
  }
}

export default AddRating;
