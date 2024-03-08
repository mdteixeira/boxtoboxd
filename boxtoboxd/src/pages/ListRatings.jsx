import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { useEffect, useState } from 'react';
import CardAvaliacao from '../components/CardAvaliacao';

import React from 'react';
import { SoccerBall } from '@phosphor-icons/react';

function ListRatings() {
  const [ratings, setRatings] = useState([]);

  const fetchPost = async () => {
    await getDocs(collection(db, 'ratings')).then((querySnapshot) => {
      const newData = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setRatings(newData);
    });
  };

  useEffect(() => {
    fetchPost();
  }, []);

  var jogo2 = {
    id: 0,
    mandante: [
      'Portuguesa',
      'https://ssl.gstatic.com/onebox/media/sports/logos/a9BSJk9BywwXNj4LJPq5jg_96x96.png',
    ],
    visitante: [
      'Guarani',
      'https://ssl.gstatic.com/onebox/media/sports/logos/fxJElzuqyxKVwsUcfsC49Q_96x96.png',
    ],
    local: 'Canindé',
    gols: [1, 0],
    eventos: [['Giovani Augusto', 'gol', 0]],
    data: ['11/02/2024', '18:00'],
    torneio: 'Paulistão',
  };

  return (
    <>
      {ratings.length > 0 ? (
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-2 lg:px-0">
          {ratings?.map((rating, i) => (
            <CardAvaliacao
              key={rating.id}
              id={rating.id}
              usuario={rating.user}
              jogo={jogo2}
              curtir={rating.like}
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