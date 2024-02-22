import React from 'react';
import { Plus } from '@phosphor-icons/react';

function AddButton() {
  return (
    <button className="bg-emerald-500 hover:bg-emerald-500 hover:ring-4 ring-emerald-200 active:bg-emerald-600 focus:ring-4 focus:bg-emerald-500 py-2 px-5 rounded-xl flex items-center gap-3 text-white">
      <Plus size={24} weight="bold" />
      <p className="font-medium text-nowrap">Adicionar jogo</p>
    </button>
  );
}

export default AddButton;
