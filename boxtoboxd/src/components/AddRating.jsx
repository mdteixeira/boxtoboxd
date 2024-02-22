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
              className="absolute right-0 top-0 me-1.5 mt-1.5 text-red-500 bg-red-300 bg-opacity-20 rounded-full p-2"
              onClick={close}
            >
              <X size={20} weight="bold" />
            </button>
            <div className="header text-2xl font-bold my-2"> Adicionar Partida </div>
            <hr />

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
                        key: 'portuguesavsguarani',
                        value: 'Portuguesa x Guarani',
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
