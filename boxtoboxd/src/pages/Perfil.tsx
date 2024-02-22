import React, { useEffect, useState } from 'react';
import CardAvaliacao from '../components/CardAvaliacao';
import Avaliacao from '../models/Avaliacao';
import Jogo from '../models/Jogo';

function Perfil() {
  const [avaliacoes, setAvaliacoes] = useState<Avaliacao[]>([]);

  var jogo1: Jogo = {
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

  var avaliacao1: Avaliacao = {
    id: jogo1.id,
    usuario: [`mdteixeira`, ``],
    jogo: jogo1,
    curtir: true,
    presente: true,
    rating: 4,
    comentario: 'Jogo muito bom, emoção do início ao fim!',
  };

  var jogo2: Jogo = {
    id: 0,
    mandante: [
      'Palmeiras',
      'https://ssl.gstatic.com/onebox/media/sports/logos/7spurne-xDt2p6C0imYYNA_96x96.png',
    ],
    visitante: [
      'Corinthians',
      'https://ssl.gstatic.com/onebox/media/sports/logos/tCMSqgXVHROpdCpQhzTo1g_96x96.png',
    ],
    local: 'Arena Barueri',
    gols: [1, 0],
    eventos: [
      ['Endrick', 'gol', 44],
      ['José Manuel Alberto López', 'gol', 68],
      ['Yuri Alberto', 'gol', 87],
      ['Yuri Alberto', 'gol', 100],
    ],
    data: ['18/02/2024', '18:00'],
    torneio: 'Paulistão',
  };

  var avaliacao2: Avaliacao = {
    id: jogo2.id,
    usuario: [`mdteixeira`, ``],
    jogo: jogo2,
    curtir: false,
    presente: true,
    rating: 5,
    comentario: 'Futebol 2 oficialmente lançado.',
  };

  useEffect(() => {
    setAvaliacoes([avaliacao1, avaliacao2]);
  }, []);

  return (
    <>
      {avaliacoes.length === 0 && <div></div>}
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
