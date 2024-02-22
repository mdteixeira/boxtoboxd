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

function MatchInfo(partida: boolean) {
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
      <form className="mt-3">
        <div className="grid grid-cols-3 p-3">
          <div className="left flex flex-col items-center gap-2">
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
          <div className="right flex flex-col items-center gap-2">
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
        <div className="grid sm:grid-cols-3 gap-1 w-full place-items-center p-1 bg-neutral-50 rounded-2xl">
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
        <div className="flex flex-wrap py-3">
          <div className="grid grid-cols-2 gap-2 w-full sm:w-2/3">
            <input
              type="number"
              name="rating"
              id="rating"
              value={rating}
              className="hidden"
              readOnly
            />
            <input
              type="checkbox"
              name="curtir"
              id="curtir"
              className="peer/curtir hidden"
            />
            <input
              type="checkbox"
              name="presente"
              id="presente"
              className="peer/presente hidden"
            />
            <label
              htmlFor="curtir"
              className="flex items-center gap-2 rounded-2xl px-4 py-2 cursor-pointer justify-center border-2 transition-colors
              
              bg-neutral-50
              active:bg-neutral-300
              hover:bg-neutral-200 
              
              peer-checked/curtir:active:bg-emerald-300
              peer-checked/curtir:bg-emerald-100
              peer-checked/curtir:border-emerald-200
              
              peer-checked/curtir:hover:bg-emerald-200
              "
            >
              <Heart weight="fill" className="text-xl my-1 text-red-300" />
              Curtir
            </label>
            <label
              htmlFor="presente"
              className="flex items-center gap-2 rounded-2xl px-4 py-2 cursor-pointer justify-center border-2 transition-colors
              
              bg-neutral-50
              active:bg-neutral-300
              hover:bg-neutral-200 
              
              peer-checked/presente:active:bg-emerald-300
              peer-checked/presente:bg-emerald-100
              peer-checked/presente:border-emerald-200
              
              peer-checked/presente:hover:bg-emerald-200
              "
            >
              {/* <Heart weight="fill" className="text-xl my-1 text-red-300" /> */}
              <img
                src="https://www.svgrepo.com/show/220564/stadium.svg"
                className="size-6"
                alt=""
              />
              No estádio
            </label>
          </div>
          <div className="grid place-content-center w-full sm:w-1/3 pt-2">
            <Rating
              allowFraction
              onClick={handleRating}
              transition
              fillColorArray={[
                '#f14f45',
                '#f14f45',
                '#f16c45',
                '#f16c45',
                '#f18845',
                '#f18845',
                '#f1b345',
                '#f1b345',
                '#f1d045',
                '#f1d045',
              ]}
              initialValue={2.5}

              // showTooltip
              // tooltipArray={[
              //   'Tenebroso',
              //   'Terrível',
              //   'Ruim demais',
              //   'Ruim',
              //   'Assistível',
              //   'Legalzinho',
              //   'Bom',
              //   'Jogão',
              //   'Jogaço',
              //   'Absolute Cinema',
              // ]}
            />
          </div>
        </div>
        <textarea
          name="comentarios"
          id="comentarios"
          className="border w-full rounded-xl py-2 px-3 focus-within:outline-none focus-within:ring-1 focus-within:ring-emerald-300"
          placeholder="Comentários"
        ></textarea>
        <div className="grid place-content-center relative">
          <Popup
            trigger={
              <div className="absolute right-0 bottom-0 bg-emerald-400 hover:bg-emerald-500 hover:ring-4 ring-emerald-200 active:bg-emerald-600 focus:ring-4 focus:bg-emerald-500 p-2 rounded-xl flex items-center gap-3 text-white ">
                <Share size={20} />
              </div>
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
            type="submit"
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
      </form>
    </>
  );
}

export default MatchInfo;
