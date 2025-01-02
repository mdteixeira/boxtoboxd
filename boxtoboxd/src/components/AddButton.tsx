import React from 'react';
import { Plus } from '@phosphor-icons/react';

function AddButton() {
  return (
    <button className="bg-emerald-500 hover:bg-emerald-500 hover:ring-4 ring-emerald-200 dark:ring-emerald-700 active:bg-emerald-600 focus:ring-4 focus:bg-emerald-500 md:py-2 md:px-5 md:rounded-xl items-center gap-3 text-white p-3 rounded-full md:flex md:text-base text-3xl">
      <Plus weight="bold" />
      <p className="font-medium text-nowrap md:block hidden">Adicionar avaliação</p>
    </button>
  );
}

export default AddButton;
