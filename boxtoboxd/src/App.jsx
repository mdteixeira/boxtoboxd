import { useState } from 'react';

import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import AddButton from './components/AddButton';

import { X } from '@phosphor-icons/react';
import MatchSearch from './components/MatchSearch';
import MatchInfo from './components/MatchInfo';

import { Rating } from 'react-simple-star-rating';

function App() {
  const [ratingValue, setRatingValue] = useState(0);

  const handleRating = (rate) => {
    setRatingValue(rate);
  };
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="h-svh w-full grid place-content-center">
        <Popup trigger={AddButton} modal nested>
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
                <label htmlFor="partida" className="">
                  Qual partida?
                </label>
                <MatchSearch />
                <MatchInfo />
              </div>
            </div>
          )}
        </Popup>
      </div>
    </>
  );
}

export default App;
