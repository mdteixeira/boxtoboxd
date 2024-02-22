import React from 'react';
import Jogo from '../models/Jogo';
import { X, MapPin, Calendar, DotsThree, UserCircle } from '@phosphor-icons/react';
import { Rating } from 'react-simple-star-rating';
import Avaliacao from '../models/Avaliacao';
import { Heart } from '@phosphor-icons/react/dist/ssr';

function CardAvaliacao(avaliacao: Avaliacao) {
  return (
    <div className="border-2 rounded-3xl p-3">
      <div className="flex items-center justify-between mb-3">
        <div className="flex gap-2 items-center">
          {avaliacao.usuario[1] == '' ? (
            <UserCircle className="size-10 text-emerald-500" weight="duotone" />
          ) : (
            <img
              src={avaliacao.usuario[1]}
              alt=""
              className="size-10 rounded-full border"
            />
          )}
          <h3>{avaliacao.usuario[0]}</h3>
        </div>
        <div className="inline-flex gap-1 items-center">
          <button className="px-3 py-1 border rounded-2xl">Seguindo</button>
          <button className="p-2 border rounded-full">
            <DotsThree className="text-md" />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-3 p-3 bg-neutral-100 rounded-xl">
        <div className="left flex items-center gap-4">
          <img src={avaliacao.jogo.mandante[1]} className="size-12" alt="" />

          <h2 className="">{avaliacao.jogo.mandante[0]}</h2>
        </div>
        <div className="placar tabular-nums flex items-center justify-around text-2xl font-bold">
          {avaliacao.jogo.gols[0]} {<X size={16} />} {avaliacao.jogo.gols[1]}
        </div>
        <div className="right flex flex-row-reverse items-center gap-4">
          <img src={avaliacao.jogo.visitante[1]} className="size-12" alt="" />

          <h2>{avaliacao.jogo.visitante[0]}</h2>
        </div>
      </div>
      {/* {avaliacao.jogo.eventos.map(() => {})}
      <ul className="text-slate-500 text-xs border-e px-5">
        <li className="flex justify-between">
          <p>Giovani Augusto</p>
          <p>45+7</p>
        </li>
      </ul> */}

      <div className="hidden">
        <hr />
        <div className="grid grid-cols-3 w-full place-items-center p-3  bg-neutral-50">
          <h2 className="text-sm text-slate-500 flex gap-2 items-center">
            <MapPin className="text-base" weight="bold" /> {avaliacao.jogo.local}
          </h2>
          <div className="flex gap-2">
            <h2 className="text-sm text-slate-500 flex gap-2 pr-2 items-center border-e">
              <Calendar className="text-base" weight="bold" /> {avaliacao.jogo.data[0]}
            </h2>
            <h2 className="text-sm text-slate-500 items-center">
              {avaliacao.jogo.data[1]}
            </h2>
          </div>
          <h2 className="text-sm text-slate-500 flex gap-2 items-center">
            {avaliacao.jogo.torneio}
          </h2>
        </div>
        <hr />
      </div>

      <div className="mt-3 flex flex-col">
        <div className="flex justify-between w-full">
          <Rating
            readonly
            initialValue={5}
            showTooltip
            allowFraction
            tooltipClassName=""
            tooltipStyle={{ marginLeft: '0.5rem', borderRadius: '12px' }}
            tooltipArray={[
              'Tenebroso',
              'Terrível',
              'Ruim demais',
              'Ruim',
              'Assistível',
              'Legalzinho',
              'Bom',
              'Jogão',
              'Jogaço',
              'Absolute Cinema',
            ]}
            size={24}
            className="bg-neutral-50 rounded-xl"
          />
          <div className="flex gap-3 items-center">
            {avaliacao.curtir == true ? (
              <Heart className="text-2xl text-red-400" weight="fill" />
            ) : (
              <Heart className="text-2xl text-slate-700" weight="bold" />
            )}
            {avaliacao.presente == true ? (
              <div className="flex gap-2 items-center bg-neutral-50 py-1 px-3 rounded-xl">
                <img
                  src="https://www.svgrepo.com/show/220564/stadium.svg"
                  className="size-6"
                  alt=""
                />
                No estádio
              </div>
            ) : (
              ''
            )}
          </div>
        </div>
        <textarea
          name="comentario"
          className="bg-neutral-50 rounded-2xl mt-2 resize-none px-3 py-2"
          id="comentario"
          readOnly
          disabled
        >
          {avaliacao.comentario}
        </textarea>
      </div>
    </div>
  );
}

export default CardAvaliacao;
