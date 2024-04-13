import React, { useEffect, useState } from 'react';
import {
  X,
  MapPin,
  Calendar,
  UserCircle,
  Star,
  Share,
  Trash,
  Clock,
} from '@phosphor-icons/react';
import { Rating } from 'react-simple-star-rating';
import Avaliacao from '../models/Avaliacao';
import { Heart } from '@phosphor-icons/react/dist/ssr';
import Popup from 'reactjs-popup';
import { TwitterIcon, TwitterShareButton } from 'react-share';
import { auth, db } from '../firebase';
import { deleteDoc, doc } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { jogos } from '../../jogos';

function CardAvaliacao(avaliacao: Avaliacao) {
  const user = auth.currentUser;

  const [logado, setLogado] = useState(user != null);

  const [showAll, setShowAll] = useState(false);

  async function deletePost(rating: string) {
    await deleteDoc(doc(db, 'ratings', rating));
    // reload();
  }
  let match = jogos.matches.find((partida) => partida.id == avaliacao.partida);

  console.log(match);

  console.log(avaliacao);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      setLogado(!!user);
    });
    match = jogos.matches.find((match) => match.id == avaliacao.partida);
  }, []);

  return (
    <div className="border dark:border-slate-700 rounded-3xl p-3 bg-white dark:bg-slate-900">
      <div className="flex items-center justify-between mb-3">
        <div className="flex gap-2 items-center">
          {avaliacao.user[1] == '' ? (
            <UserCircle className="size-10 text-emerald-500" weight="duotone" />
          ) : (
            <img
              src={avaliacao.user[1]}
              alt=""
              className="size-10 rounded-full border-2 dark:border-slate-700"
            />
          )}
          <h3>{avaliacao.user[0]}</h3>
        </div>
        {avaliacao.user[2] == user?.uid ? (
          <div className="inline-flex gap-2 items-center">
            {avaliacao.like ? (
              <Heart className="text-3xl text-red-400" weight="fill" />
            ) : (
              <Heart className="text-3xl text-slate-400" weight="regular" />
            )}
            <button
              type="button"
              className=" bg-slate-100 dark:bg-slate-700 dark:hover:bg-slate-500 hover:bg-slate-200 hover:ring-4 ring-slate-100 dark:ring-slate-700 active:bg-slate-300 dark:active:bg-slate-600 focus:ring-4 dark:focus:bg-slate-500 focus:bg-slate-400 p-2 rounded-xl flex items-center gap-3 dark:text-white"
              onClick={() => deletePost(avaliacao.id)}
            >
              <Trash size={20} />
            </button>
            <Popup
              trigger={
                <button
                  type="button"
                  className=" bg-slate-100 dark:bg-slate-700 dark:hover:bg-slate-500 hover:bg-slate-200 hover:ring-4 ring-slate-100 dark:ring-slate-700 active:bg-slate-300 dark:active:bg-slate-600 focus:ring-4 dark:focus:bg-slate-500 focus:bg-slate-400 p-2 rounded-xl flex items-center gap-3 dark:text-white"
                >
                  <Share size={20} />
                </button>
              }
              position={'bottom center'}
              on={'click'}
              arrow={false}
              contentStyle={{
                border: 'none',
                boxShadow: 'none',
                width: 'auto',
                backgroundColor: 'transparent',
              }}
            >
              <div className="flex flex-row-reverse gap-2">
                <TwitterShareButton
                  url={'http://mdteixeira.github.io/boxtoboxd'}
                  title={`Minha nota para ${match.homeTeam.shortName} ${match.score.fullTime.home} x ${match.score.fullTime.away} ${match.awayTeam.shortName} no BoxToBoxD é de ${avaliacao.rating}⭐`}
                  hashtags={['BoxToBoxD']}
                >
                  <TwitterIcon size={32} round />
                </TwitterShareButton>
              </div>
            </Popup>
          </div>
        ) : (
          ''
        )}
      </div>
      <div className="grid grid-cols-3 p-3 bg-slate-50 dark:bg-slate-900 rounded-t-2xl">
        <div className="left flex flex-col items-center gap-2">
          <img src={match.homeTeam.crest} className="md:size-12 size-10" alt="" />

          <h2 className="">{match.homeTeam.shortName}</h2>
        </div>
        <div className="placar tabular-nums flex items-center justify-around text-2xl font-bold">
          {match.score.fullTime.home} {<X size={16} />} {match.score.fullTime.away}
        </div>
        <div className="right flex flex-col items-center gap-2">
          <img src={match.awayTeam.crest} className="md:size-12 size-10" alt="" />

          <h2>{match.awayTeam.shortName}</h2>
        </div>
      </div>

      <div className="">
        <div className="grid grid-cols-2 w-full place-items-center p-3 text-xs bg-slate-100 dark:bg-slate-800 rounded-b-2xl dark:rounded-2xl *:text-center">
          {/* <h2 className=" text-slate-500 dark:text-slate-300 flex gap-1 items-center">
            <MapPin weight="bold" /> {match.area.name}
          </h2> */}
          <div className="flex gap-2">
            <h2 className=" text-slate-500 dark:text-slate-300 flex gap-1 pr-2 items-center">
              <Calendar className="text-base" weight="bold" />{' '}
              {new Date(match.utcDate).toLocaleDateString()}
            </h2>
            {/* <h2 className=" text-slate-500 dark:text-slate-300 items-center">
              {match.data[1]}
            </h2> */}
            <h2 className="flex gap-2 pr-2 items-center">
              <Clock className="text-base" weight="bold" />
              {new Date(match.utcDate).toLocaleTimeString().slice(0, 5)}
            </h2>
          </div>
          <h2 className=" text-slate-500 dark:text-slate-300 flex gap-2 items-center">
            {match.competition.name}
          </h2>
        </div>
      </div>

      <div className="mt-3 flex flex-col">
        <div className="grid grid-cols-2 items-center w-full">
          <div className="">
            <Rating
              fillIcon={<Star className="text-2xl" weight="fill" />}
              emptyIcon={<Star className="text-2xl dark:text-slate-600" />}
              className="float-start"
              style={{ display: 'flex' }}
              size={36}
              allowFraction
              transition
              readonly
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
              initialValue={avaliacao.rating}
              tooltipClassName="tooltip"
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
            />
          </div>
          <div className="flex gap-3 items-center justify-end">
            {avaliacao.presente == true ? (
              <div className="flex gap-2 items-center bg-slate-50 dark:bg-slate-800 py-1 px-3 rounded-xl">
                <img
                  src="https://www.svgrepo.com/show/220564/stadium.svg"
                  className="size-6 dark:invert"
                  alt=""
                />
                <p>Do estádio</p>
              </div>
            ) : (
              ''
            )}
          </div>
        </div>
        <p
          className={
            showAll
              ? 'bg-slate-50 dark:bg-slate-800 rounded-2xl mt-2 resize-none pl-3 py-2 hover:none active:none focus-within:outline-none  cursor-pointer min-h-[3.5lh]'
              : 'bg-slate-50 dark:bg-slate-800 rounded-2xl mt-2 resize-none pl-3 py-2 hover:none active:none focus-within:outline-none  cursor-pointer line-clamp-3 h-[3.5lh]'
          }
          id="comentario"
          onClick={() => {
            setShowAll(!showAll);
          }}
        >
          {avaliacao.comentario}
        </p>
      </div>
    </div>
  );
}

export default CardAvaliacao;
