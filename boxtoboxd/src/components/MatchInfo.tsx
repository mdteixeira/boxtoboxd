import {
  Calendar,
  MapPin,
  Share,
  SpinnerGap,
  Star,
  X,
} from '@phosphor-icons/react';
import { Heart } from '@phosphor-icons/react/dist/ssr';
import React, { useState } from 'react';
import { TwitterIcon, TwitterShareButton } from 'react-share';

import { Rating } from 'react-simple-star-rating';
import Popup from 'reactjs-popup';

import { collection, addDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';

function MatchInfo(partida: boolean) {
  const [like, setLike] = useState(false);
  const [presente, setPresente] = useState(false);
  const [loading, setLoading] = useState(false);
  const [comentario, setComentario] = useState('');
  const [vazio, setVazio] = useState(false);
  const [erro, setErro] = useState(false);
  const [logado, setLogado] = useState(true);
  const [enviado, setEnviado] = useState(false);

  const handleChange = (event) => {
    const value = event.target.value;
    setComentario(value);
    setVazio(false);
  };

  const [rating, setRating] = useState(2.5);

  const user = auth.currentUser;

  const addRating = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (user != null) {
      if (comentario != '' && rating != 0) {
        try {
          const docRef = await addDoc(collection(db, 'ratings'), {
            user: [user.displayName, user.photoURL, user.uid],
            rating: rating,
            like: like,
            presente: presente,
            comentario: comentario,
          });
          console.log('Document written with ID: ', docRef.id);
          setLoading(false);
          setEnviado(true);
          window.location.reload();
        } catch (e) {
          console.error('Error adding document: ', e);
          setLoading(false);
        }
      } else {
        setVazio(true);
        setLoading(false);
      }
    } else {
      console.log('Uepa, você não está logado!');
      setLogado(false);
      setLoading(false);
    }
  };

  // Catch Rating value
  const handleRating = (rate: number) => {
    setRating(rate);
    setVazio(false);
  };

  return (
    <>
      {erro && <p>Eita, rolou um erro. Tente novamente!</p>}
      <form className="mt-3" onSubmit={addRating} method="post">
        <div className="grid grid-cols-3 p-3 dark:border-slate-600">
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
        <div className="grid grid-cols-2 pb-2 text-slate-500 dark:text-slate-200">
          <ul className=" text-xs border-e px-5">
            <li className="flex justify-between">
              <p>Giovani Augusto</p>
              <p>45+7</p>
            </li>
          </ul>
          <ul className=" text-xs border-s px-5">
            <li className="flex flex-row-reverse justify-between">
              {/* <p>Giovani Augusto</p>
              <p>45+7</p> */}
            </li>
          </ul>
        </div>
        <div className="grid sm:grid-cols-3 gap-1 w-full place-items-center p-1 bg-neutral-100 dark:bg-slate-800 py-2 rounded-2xl">
          <h2 className="text-sm  flex gap-2 items-center">
            <MapPin className="text-base" weight="bold" /> Estádio do Canindé
          </h2>
          <div className="flex gap-2">
            <h2 className="text-sm  flex gap-2 pr-2 items-center border-e">
              <Calendar className="text-base" weight="bold" /> 18/02/2024
            </h2>
            <h2 className="text-sm  items-center">18:00</h2>
          </div>
          <h2 className="text-sm  flex gap-2 items-center">Paulistão</h2>
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
              onChange={() => setLike(!like)}
            />
            <input
              type="checkbox"
              name="presente"
              id="presente"
              className="peer/presente hidden"
              onChange={() => setPresente(!presente)}
            />
            <label
              htmlFor="curtir"
              className="flex items-center gap-2 rounded-2xl px-4 py-2 cursor-pointer justify-center border-2 dark:border-slate-700 transition-colors
              
              bg-neutral-50 dark:bg-slate-800
              active:bg-neutral-300 dark:active:bg-slate-950
              hover:bg-neutral-200  dark:hover:bg-slate-900
              
              peer-checked/curtir:active:bg-emerald-300 dark:peer-checked/curtir:active:bg-emerald-800
              peer-checked/curtir:bg-emerald-100 dark:peer-checked/curtir:bg-emerald-500
              peer-checked/curtir:border-emerald-200 dark:peer-checked/curtir:border-emerald-700
              
              peer-checked/curtir:hover:bg-emerald-200 dark:peer-checked/curtir:hover:bg-emerald-700
              "
            >
              <Heart
                weight="fill"
                className="text-xl my-1 text-red-300 dark:text-red-500"
              />
              Curtir
            </label>
            <label
              htmlFor="presente"
              className="flex items-center gap-2 rounded-2xl px-4 py-2 cursor-pointer justify-center border-2 dark:border-slate-700 transition-colors
              
              bg-neutral-50 dark:bg-slate-800
              active:bg-neutral-300 dark:active:bg-slate-950
              hover:bg-neutral-200  dark:hover:bg-slate-900
              
              peer-checked/presente:active:bg-emerald-300 dark:peer-checked/presente:active:bg-emerald-800
              peer-checked/presente:bg-emerald-100 dark:peer-checked/presente:bg-emerald-500
              peer-checked/presente:border-emerald-200 dark:peer-checked/presente:border-emerald-700
              
              peer-checked/presente:hover:bg-emerald-200 dark:peer-checked/presente:hover:bg-emerald-700
              "
            >
              {/* <Heart weight="fill" className="text-xl my-1 text-red-300" /> */}
              <img
                src="https://www.svgrepo.com/show/220564/stadium.svg"
                className="size-6 dark:invert"
                alt=""
              />
              No estádio
            </label>
          </div>
          <div className="grid place-content-center w-full sm:w-1/3 pt-2">
            <Rating
              fillIcon={<Star className="text-2xl" weight="fill" />}
              emptyIcon={<Star className="text-2xl dark:text-slate-600" />}
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
              initialValue={rating}

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
        {vazio && <p className="text-xs text-red-500">Adicione um comentário!</p>}
        <textarea
          name="comentarios"
          id="comentarios"
          className="dark:bg-slate-800 bg-neutral-100 w-full rounded-xl py-2 px-3 focus-within:outline-none focus-within:ring-1 focus-within:ring-emerald-300"
          placeholder="Comentários"
          onChange={handleChange}
          value={comentario}
        ></textarea>
        <div className="grid place-content-center relative">
          <Popup
            trigger={
              <button
                type="button"
                className="absolute right-0 bottom-0 bg-emerald-400 hover:bg-emerald-500 hover:ring-4 ring-emerald-200 dark:ring-emerald-700 active:bg-emerald-600 focus:ring-4 focus:bg-emerald-500 p-2 rounded-xl flex items-center gap-3 text-white"
              >
                <Share size={20} />
              </button>
            }
            position={'left center'}
            on={'click'}
            arrow={false}
            contentStyle={{
              border: 'none',
              boxShadow: 'none',
              width: 'auto',
              backgroundColor: 'transparent',
              paddingRight: '10px',
            }}
          >
            <div className="flex flex-row-reverse gap-2">
              <TwitterShareButton
                url={'https://www.example.com'}
                title={'Minha avaliação no BoxToBoxD'}
                hashtags={['BoxToBoxD']}
              >
                <TwitterIcon size={32} round />
              </TwitterShareButton>
            </div>
          </Popup>
          {!logado && <p className="text-red-500 text-xs">Você não está logado!</p>}
          <button
            className="bg-emerald-400 hover:bg-emerald-500 hover:ring-4 ring-emerald-200 dark:ring-emerald-700 active:bg-emerald-600 focus:ring-4 focus:bg-emerald-500 py-2 px-5 rounded-2xl gap-3 text-white w-full disabled:opacity-30 disabled:cursor-not-allowed"
            type="submit"
            disabled={!logado || enviado}
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
