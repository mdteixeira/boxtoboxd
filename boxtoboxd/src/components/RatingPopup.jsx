import { useState } from 'react';

import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import AddButton from './AddButton';

import { CaretLeft, MagnifyingGlass, X } from '@phosphor-icons/react';

import React from 'react';
import ReactSearchBox from 'react-search-box';

import { jogos } from '../../jogos';
import MatchInfo from './MatchInfo';
import BookInfo from './bookInfo';

function AddRating() {
    const [partida, setPartida] = useState(null);
    const [book, setBook] = useState(null);
    const [booksList, setBooksList] = useState([]);

    const [loading, setLoading] = useState(true);

    const data = jogos.matches.map((jogo) => {
        if (jogo.score.winner != null) {
            let key = jogo.id;
            let value = `${jogo.homeTeam.shortName}  x ${jogo.awayTeam.shortName}
      `;
            // - ${new Date(jogo.utcDate).toLocaleDateString()}
            let match = jogo;
            return { key, value, match };
        }
    });

    const booksData = booksList.map((book) => {
        let key = book.id;
        let value = `${book?.volumeInfo?.title} ${
            book?.volumeInfo?.authors?.length ? ' - ' + book?.volumeInfo?.authors[0] : ''
        }`;
        return { key, value, book };
    });

    const fetchBooks = async (searchQuery) => {
        const url = `https://www.googleapis.com/books/v1/volumes?q=${searchQuery}`;

        try {
            if (searchQuery.length < 4) return;
            const response = await fetch(url);
            const data = await response.json();
            setBooksList(data.items || []); // Handle case where no books are returned
            setLoading(false);
        } catch (error) {
            setError('Failed to fetch books');
            setLoading(false);
        }
    };

    return (
        <Popup
            trigger={AddButton}
            modal
            nested
            className="addRating"
            onClose={() => setPartida(null)}>
            {(close) => {
                return (
                    <>
                        <div className="modal">
                            <button
                                className="absolute right-0 top-0 me-1.5 mt-1.5 text-red-500 bg-red-200 dark:bg-red-950 rounded-full p-2 hover:bg-opacity-85"
                                onClick={close}>
                                <X size={20} weight="bold" />
                            </button>

                            <>
                                <h2 className="header text-2xl font-bold mt-2">
                                    Adicionar Avaliação
                                </h2>
                                <div className="content py-3">
                                    {partida != null ? (
                                        <>
                                            <button
                                                onClick={() => setPartida(null)}
                                                className="text-emerald-500 border-emerald-500 rounded-2xl border ps-2 pe-3 py-1 inline-flex gap-2 items-center hover:bg-emerald-600 hover:text-white font-medium text-sm">
                                                <CaretLeft weight="bold" /> Voltar
                                            </button>
                                            <MatchInfo
                                                area={partida.area}
                                                competition={partida.competition}
                                                season={partida.season}
                                                id={partida.id}
                                                utcDate={partida.utcDate}
                                                status={partida.status}
                                                matchday={partida.matchday}
                                                stage={partida.stage}
                                                lastUpdated={partida.lastUpdated}
                                                homeTeam={partida.homeTeam}
                                                awayTeam={partida.awayTeam}
                                                score={partida.score}
                                                odds={partida.odds}
                                                referees={partida.referees}
                                            />
                                        </>
                                    ) : book !== null ? (
                                        <>
                                            <button
                                                onClick={() => setBook(null)}
                                                className="text-emerald-500 border-emerald-500 rounded-2xl border ps-2 pe-3 py-1 inline-flex gap-2 items-center hover:bg-emerald-600 hover:text-white font-medium text-sm">
                                                <CaretLeft weight="bold" /> Voltar
                                            </button>
                                            <BookInfo
                                                id={book.id}
                                                volumeInfo={book.volumeInfo}
                                            />
                                        </>
                                    ) : (
                                        <>
                                            <label htmlFor="partida" className="">
                                                Qual partida?
                                            </label>
                                            {matchSearch()}
                                            <label htmlFor="livro" className="">
                                                Qual livro?
                                            </label>
                                            {bookSearch()}
                                        </>
                                    )}
                                </div>
                            </>
                        </div>
                    </>
                );
            }}
        </Popup>
    );

    function matchSearch() {
        return (
            <ReactSearchBox
                placeholder="Mandante x Visitante"
                data={data}
                onSelect={(s) => {
                    setPartida(s.item.match);
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
        );
    }

    function bookSearch() {
        return (
            <div className="relative">
                <ReactSearchBox
                    placeholder="Título do volume"
                    data={booksData}
                    onSelect={(s) => {
                        // console.log(s);
                        setBook(s.item.book);
                    }}
                    onFocus={() => {
                        // console.log('This function is called when is focussed');
                    }}
                    onChange={(value) => {
                        // fetchBooks(value);
                    }}
                    autoFocus
                    iconBoxSize="48px"
                />
            </div>
        );
    }
}

export default AddRating;
