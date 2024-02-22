import React, { useEffect, useState } from 'react';
import CardAvaliacao from '../components/CardAvaliacao';
import Avaliacao from '../models/Avaliacao';
import Jogo from '../models/Jogo';

function Perfil() {
  const [avaliacoes, setAvaliacoes] = useState<Avaliacao[]>([]);

  var jogo2: Jogo = {
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
    data: ['18/02/2024', '18:00'],
    torneio: 'Paulistão',
  };

  var avaliacao1: Avaliacao = {
    id: jogo2.id,
    usuario: [`mdteixeira`, ``],
    jogo: jogo2,
    curtir: true,
    presente: true,
    rating: 10,
    comentario: 'Jogo muito bom, emoção do início ao fim!',
  };

  useEffect(() => {
    setAvaliacoes([...avaliacoes, avaliacao1]);
  }, []);

  return (
    <>
      {avaliacoes.length === 0 && (
        <div className="container mx-auto my-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"></div>
      )}
      <div className="container mx-auto my-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {avaliacoes.map((avaliacao) => (
          <CardAvaliacao
            key={avaliacao.id}
            id={avaliacao.id}
            usuario={avaliacao.usuario}
            jogo={avaliacao.jogo}
            curtir={avaliacao.curtir}
            presente={avaliacao.presente}
            rating={avaliacao.rating}
            comentario={avaliacao.comentario}
          />
        ))}
      </div>
    </>
  );
}

export default Perfil;
