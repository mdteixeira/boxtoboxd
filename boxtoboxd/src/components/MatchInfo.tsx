import {
  Calendar,
  Clock,
  MapPin,
  Share,
  SoccerBall,
  SpinnerGap,
  X,
} from '@phosphor-icons/react';
import { Heart } from '@phosphor-icons/react/dist/ssr';
import React, { useState } from 'react';

import { Rating } from 'react-simple-star-rating';
import Popup from 'reactjs-popup';

function MatchInfo(partida) {
  const [like, setLike] = useState(false);
  const [presente, setPresente] = useState(false);
  const [loading, setLoading] = useState(false);

  const [rating, setRating] = useState(0);

  // Catch Rating value
  const handleRating = (rate: number) => {
    setRating(rate);
  };

  return (
    <>
      <div className=" mt-3">
        <div className="grid grid-cols-3 p-3">
          <div className="left flex items-center gap-4">
            <img
              src="https://ssl.gstatic.com/onebox/media/sports/logos/a9BSJk9BywwXNj4LJPq5jg_96x96.png"
              className="size-12"
              alt=""
            />

            <h2 className="">Portuguesa</h2>
          </div>
          <div className="placar tabular-nums flex items-center justify-around text-2xl font-bold">
            1 {<X size={16} />} 0
          </div>
          <div className="right flex flex-row-reverse items-center gap-4">
            <img
              src="https://ssl.gstatic.com/onebox/media/sports/logos/fxJElzuqyxKVwsUcfsC49Q_96x96.png"
              className="size-12"
              alt=""
            />

            <h2>Guarani</h2>
          </div>
        </div>
        <div className="grid grid-cols-2 pb-2">
          <ul className="text-slate-500 text-xs border-e px-5">
            <li className="flex justify-between">
              <p>Giovani Augusto</p>
              <p>45+7</p>
            </li>
          </ul>
          <ul className="text-slate-500 text-xs border-s px-5">
            <li className="flex flex-row-reverse justify-between">
              {/* <p>Giovani Augusto</p>
              <p>45+7</p> */}
            </li>
          </ul>
        </div>
        <hr className="" />
        <div className="grid grid-cols-3 w-full place-items-center p-3  bg-neutral-50 rounded-b-2xl">
          <h2 className="text-sm text-slate-500 flex gap-2 items-center">
            <MapPin className="text-base" weight="bold" /> Estádio do Canindé
          </h2>
          <div className="flex gap-2">
            <h2 className="text-sm text-slate-500 flex gap-2 pr-2 items-center border-e">
              <Calendar className="text-base" weight="bold" /> 18/02/2024
            </h2>
            <h2 className="text-sm text-slate-500 items-center">18:00</h2>
          </div>
          <h2 className="text-sm text-slate-500 flex gap-2 items-center">Paulistão</h2>
        </div>
        <hr />
        <div className="grid grid-cols-3 gap-3 w-full p-3 justify-between text-slate-700">
          <p
            className="flex items-center gap-2 hover:bg-emerald-200 rounded-2xl px-4 cursor-pointer justify-center bg-neutral-50"
            onClick={() => setLike(!like)}
          >
            <Heart
              weight={like ? 'fill' : 'regular'}
              className="text-xl my-1 text-red-300"
            />
            Curtir
          </p>
          <p
            className="flex items-center gap-2 hover:bg-emerald-200 rounded-2xl px-4 cursor-pointer justify-center bg-neutral-50"
            onClick={() => setPresente(!presente)}
          >
            {/* <SoccerBall
              weight={presente ? 'fill' : 'regular'}
              className="text-xl my-1 text-red-300"
            /> */}
            <img
              src={
                presente
                  ? 'https://img.icons8.com/?size=256&id=6FiQaPDOGwJN&format=png'
                  : 'https://img.icons8.com/?size=256&id=JlLTMd4NfTIp&format=png'
              }
              alt=""
              className="size-5"
            />
            No estádio
          </p>
          <Rating
            className="float-end ml-4"
            size={32}
            allowFraction
            onClick={handleRating}
            showTooltip
            initialValue={2.5}
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
            transition
          />
          <textarea
            name="comentarios"
            id="comentarios"
            className="border col-span-3 rounded-xl py-2 px-3 focus-within:outline-none focus-within:ring-1 focus-within:ring-emerald-300"
            placeholder="Comentários"
          ></textarea>
          <div className="col-span-3 grid place-content-center relative">
            <Popup
              trigger={
                <button className="absolute right-0 bottom-0 bg-emerald-400 hover:bg-emerald-500 hover:ring-4 ring-emerald-200 active:bg-emerald-600 focus:ring-4 focus:bg-emerald-500 p-2 rounded-xl flex items-center gap-3 text-white ">
                  <Share size={20} />
                </button>
              }
              position={'left center'}
              on={'click'}
              arrow={false}
              contentStyle={{ border: 'none', boxShadow: 'none' }}
            >
              <div className="flex flex-row-reverse gap-2">
                <img
                  src="https://cdn.worldvectorlogo.com/logos/x-2.svg"
                  alt=""
                  className="size-8 bg-neutral-50 p-1 rounded-md"
                />
              </div>
            </Popup>
            <button
              className="bg-emerald-400 hover:bg-emerald-500 hover:ring-4 ring-emerald-200 active:bg-emerald-600 focus:ring-4 focus:bg-emerald-500 py-2 px-5 rounded-2xl flex items-center gap-3 text-white w-full"
              onClick={() => {
                setLoading(!loading);
              }}
            >
              {loading ? (
                <div className="animate-spin">
                  <SpinnerGap className="text-2xl" />
                </div>
              ) : (
                'Salvar'
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default MatchInfo;
