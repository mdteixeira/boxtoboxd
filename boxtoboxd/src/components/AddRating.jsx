import { useState } from 'react';

import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import AddButton from './AddButton';

import { X } from '@phosphor-icons/react';
import MatchSearch from './MatchSearch';
import MatchInfo from './MatchInfo';

import React from 'react';
import ReactSearchBox from 'react-search-box';

import { Rating } from 'react-simple-star-rating';

function AddRating() {
  const [ratingValue, setRatingValue] = useState(0);

  const handleRating = (rate) => {
    setRatingValue(rate);
  };

  const [partida, setPartida] = useState(false);

  return (
    <>
      <Popup trigger={AddButton} modal nested className="addRating">
        {(close) => (
          <div className="modal">
            <button
              className="absolute right-0 top-0 me-1.5 mt-1.5 text-red-500 bg-red-200 dark:bg-red-950 rounded-full p-2 hover:bg-opacity-85"
              onClick={close}
            >
              <X size={20} weight="bold" />
            </button>
            <div className="header text-2xl font-bold mt-2"> Adicionar Partida </div>
            <div className="content py-3">
              {partida == true ? (
                <MatchInfo />
              ) : (
                <>
                  <label htmlFor="partida" className="">
                    Qual partida?
                  </label>
                  <ReactSearchBox
                    placeholder="Time 1 x Time 2"
                    data={[
                      {
                        key: 'portuguesa, guarani',
                        value: 'Portuguesa x Guarani',
                      },
                      {
                        key: 'corinthians, portuguesa',
                        value: 'Corinthians x Portuguesa',
                      },
                      {
                        key: 'corinthians, palmeiras',
                        value: 'Corinthians x Palmeiras',
                      },
                    ]}
                    onSelect={() => {
                      setPartida(true);
                    }}
                    onFocus={() => {
                      // console.log('This function is called when is focussed');
                    }}
                    onChange={(value) => {
                      // console.log(value)
                    }}
                    autoFocus
                    iconBoxSize="48px"
                  />
                </>
              )}
            </div>
          </div>
        )}
      </Popup>
    </>
  );
}

export default AddRating;
