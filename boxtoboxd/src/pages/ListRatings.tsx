import { useEffect, useState } from 'react';
import CardAvaliacao from '../components/CardAvaliacao';

import React from 'react';
import {
  ArrowCounterClockwise,
  GridFour,
  MagnifyingGlass,
  Rows,
  SoccerBall,
} from '@phosphor-icons/react';
import Avaliacao from '../models/Avaliacao';
import { fetchPosts } from '../service/FirebaseServices';

function ListRatings() {
  const [ratings, setRatings] = useState<any>([]);

  const [userSearch, setUserSearch] = useState('');

  const [layout, setLayout] = useState('grid');

  const onOptionChange = (e) => {
    setLayout(e.target.value);
  };

  useEffect(() => {
    fetchPosts(setRatings);
  }, []);

  return (
    <>
      <div className="w-full container mx-auto sm:flex justify-between py-2 items-center dark:bg-slate-900 bg-white bg-opacity-75 rounded-3xl px-2 ps-6 mt-2 hidden">
        {ratings.length == 1 ? (
          <h3>1 avaliação</h3>
        ) : (
          <h3>{ratings.length} avaliações</h3>
        )}
        <div className="flex gap-4">
          <div className="inline-flex items-center gap-3 relative">
            <input
              type="text"
              id="user"
              name="user"
              placeholder="usuário"
              className="dark:bg-slate-800  rounded-2xl border dark:border-slate-700 py-2 px-4 focus-within:outline-none"
              onChange={(e) => setUserSearch(e.target.value)}
            />
            <button className="absolute end-3">
              <MagnifyingGlass />
            </button>
          </div>
          <div className="flex items-center">
            <input
              type="radio"
              name="layout"
              id="grid"
              className="peer/grid hidden"
              onChange={onOptionChange}
              value={'grid'}
            ></input>
            <label
              className=" px-3 ps-4 p-2 bg-opacity-5 dark:bg-opacity-30 bg-slate-200 dark:bg-slate-800 border-e dark:border-slate-900 rounded-s-2xl font-bold  items-center gap-2 hover:bg-opacity-100 text-slate-600 dark:text-slate-200 peer-checked/grid:bg-emerald-500 peer-checked/grid:bg-opacity-15"
              htmlFor="grid"
            >
              <GridFour weight="regular" className="text-xl" />
            </label>
            <input
              type="radio"
              name="layout"
              id="rows"
              className="peer/rows hidden"
              onChange={onOptionChange}
              value={'rows'}
            ></input>
            <label
              className=" px-3 pe-4 p-2 bg-opacity-5 dark:bg-opacity-30 bg-slate-200 dark:bg-slate-800 dark:border-slate-900 rounded-e-2xl font-bold  items-center gap-2 hover:bg-opacity-100 text-slate-600 dark:text-slate-200 peer-checked/rows:bg-emerald-500 peer-checked/rows:bg-opacity-15"
              htmlFor="rows"
            >
              <Rows weight="regular" className="text-xl" />
            </label>
          </div>
          <button
            onClick={() => fetchPosts(setRatings)}
            className="px-3 p-2 bg-opacity-5 bg-emerald-500 border border-emerald-500 rounded-2xl font-medium inline-flex items-center gap-2 hover:bg-opacity-100 text-emerald-500 hover:text-white"
          >
            <ArrowCounterClockwise weight="bold" className="text-xl" />
            <p className="text-sm">Reload</p>
          </button>
        </div>
      </div>
      {ratings.length > 0 ? (
        <div
          className={
            layout == 'grid'
              ? `container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-2 lg:px-0 mb-20`
              : `container mx-auto grid grid-cols-1 gap-4 p-2 lg:px-0 mb-20`
          }
        >
          {ratings?.map((rating: Avaliacao) => (
            <CardAvaliacao
              key={rating.id}
              id={rating.id}
              user={rating.user}
              partida={rating.partida}
              like={rating.like}
              presente={rating.presente}
              rating={rating.rating}
              comentario={rating.comentario}
            ></CardAvaliacao>
          ))}
        </div>
      ) : (
        <div className=" container mx-auto flex flex-col justify-center h-[75vh]">
          <SoccerBall className="text-emerald-700 h-1/3 w-full" weight="duotone" />
          <h2 className="text-2xl mx-3 text-center">
            Hmm, não tem nenhuma avaliação por aqui (ainda!)
          </h2>
        </div>
      )}
    </>
  );
}

export default ListRatings;
