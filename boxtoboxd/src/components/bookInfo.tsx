import {
    Book,
    Buildings,
    Calendar,
    Clock,
    Image,
    Info,
    MapPin,
    Pen,
    Share,
    SpinnerGap,
    Star,
    X,
} from '@phosphor-icons/react';
import { Heart } from '@phosphor-icons/react/dist/ssr';
import React, { useState } from 'react';

import { Rating } from 'react-simple-star-rating';

import { collection, addDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { Match } from '../models/Match';

function bookInfo(book) {
    const [like, setLike] = useState(false);
    const [presente, setPresente] = useState(false);
    const [loading, setLoading] = useState(false);
    const [comentario, setComentario] = useState('');
    const [vazio, setVazio] = useState(false);
    const [erro, setErro] = useState(false);
    const [logado, setLogado] = useState(true);
    const [enviado, setEnviado] = useState(false);

    const [showAll, setShowAll] = useState(false);

    const handleChange = (event) => {
        const value = event.target.value;
        setComentario(value);
        setVazio(false);
    };

    const [rating, setRating] = useState(2.5);

    const user = auth.currentUser;

    const addRating = async (e) => {
        e.preventDefault();
        setLoading(true);
        if (user != null) {
            if (comentario != '' && rating != 0) {
                try {
                    const docRef = await addDoc(collection(db, 'bookratings'), {
                        user: [user.displayName, user.photoURL, user.uid],
                        rating: rating,
                        like: like,
                        presente: presente,
                        comentario: comentario,
                        book: book.id,
                    });
                    console.log('Document written with ID: ', docRef.id);
                    setLoading(false);
                    setEnviado(true);
                    // reload();
                } catch (e) {
                    console.error('Error adding document: ', e);
                    setLoading(false);
                }
            } else {
                setVazio(true);
                setLoading(false);
            }
        } else {
            // console.log('Opa, parece que você não está logado!');
            setLogado(false);
            setLoading(false);
        }
    };

    // Catch Rating value
    const handleRating = (rate: number) => {
        setRating(rate);
        setVazio(false);
    };

    const bookData = book.volumeInfo;

    return (
        <>
            {erro && <p>Eita, rolou um erro. Tente novamente!</p>}
            <form className="mt-3" onSubmit={addRating} method="post">
                <div className="grid grid-cols-3 gap-12">
                    {bookData?.imageLinks ? (
                        <img
                            src={
                                bookData.imageLinks.thumbnail ??
                                bookData.imageLinks.smallThumbnail ??
                                ''
                            }
                            alt=""
                            className="rounded-md h-full w-fit mx-auto"
                        />
                    ) : (
                        <div className="rounded-md h-full size-full mx-auto grid grid-cols-1 items-center justify-center justify-items-center bg-slate-800 p-3">
                            <Image size={'64'} />
                        </div>
                    )}
                    <div className="col-span-2">
                        <h2 className="text-3xl font-semibold pb-2">{bookData.title}</h2>
                        <div className="mt-2 space-y-2 justify-center gap-4 w-full p-4 bg-slate-100 dark:bg-slate-800 py-2 rounded-2xl">
                            {bookData?.authors?.length && (
                                <h2 className="text flex gap-4 pr-2 items-center">
                                    <Pen className="text-base" weight="bold" />
                                    {bookData.authors.length ? bookData.authors.join() : ''}
                                </h2>
                            )}
                            {bookData?.publisher && (
                                <h2 className="text flex gap-4 pr-2 items-center">
                                    <Buildings className="text-base" weight="bold" />
                                    {bookData.publisher}
                                </h2>
                            )}
                            <h2 className="text flex gap-4 pr-2 items-center">
                                <Book className="text-base" weight="bold" />
                                {bookData.pageCount} páginas
                            </h2>
                            <h2 className="text flex gap-4 pr-2 items-center">
                                <Calendar className="text-base" weight="bold" />
                                {new Date(bookData.publishedDate).toLocaleDateString()}
                            </h2>
                        </div>
                        <button
                            className="text-center p-2 px-4 bg-emerald-600 rounded-xl my-2 cursor-pointer w-full"
                            onClick={() => setShowAll(!showAll)}>
                            {showAll ? 'Ocultar descrição' : 'Ver descrição'}
                        </button>
                    </div>
                    <p
                        onClick={() => setShowAll(!showAll)}
                        className="text-justify cursor-pointer col-span-3 px-2">
                        {showAll && bookData.description}
                    </p>
                </div>

                <div className="flex flex-wrap py-3">
                    <div className="grid place-content-center items-center sm:w-1/3 w-full pt-4 pb-2 sm:py-0"></div>
                </div>
                <div className="flex flex-wrap py-3">
                    <div className="grid grid-cols-2 gap-2 w-full sm:w-2/3">
                        <input
                            type="number"
                            name="rating"
                            id="rating"
                            value={rating}
                            className="hidden"
                            readOnly
                        />
                        <input
                            type="checkbox"
                            name="curtir"
                            id="curtir"
                            className="peer/curtir hidden"
                            onChange={() => setLike(!like)}
                        />
                        <input
                            type="checkbox"
                            name="presente"
                            id="presente"
                            className="peer/presente hidden"
                            onChange={() => setPresente(!presente)}
                        />
                        <label
                            htmlFor="curtir"
                            className="flex items-center gap-2 rounded-2xl px-4 py-2 cursor-pointer justify-center border-2 dark:border-slate-700 transition-colors
              
              bg-slate-50 dark:bg-slate-800
              active:bg-slate-300 dark:active:bg-slate-950
              hover:bg-slate-200  dark:hover:bg-slate-900
              
              peer-checked/curtir:active:bg-emerald-300 dark:peer-checked/curtir:active:bg-emerald-800
              peer-checked/curtir:bg-emerald-100 dark:peer-checked/curtir:bg-emerald-500
              peer-checked/curtir:border-emerald-200 dark:peer-checked/curtir:border-emerald-700
              
              peer-checked/curtir:hover:bg-emerald-200 dark:peer-checked/curtir:hover:bg-emerald-700
              ">
                            <Heart
                                weight="fill"
                                className="text-xl my-1 text-red-300 dark:text-red-500"
                            />
                            Favorito
                        </label>
                        <label
                            htmlFor="presente"
                            className="flex items-center gap-2 rounded-2xl px-4 py-2 cursor-pointer justify-center border-2 dark:border-slate-700 transition-colors
              
              bg-slate-50 dark:bg-slate-800
              active:bg-slate-300 dark:active:bg-slate-950
              hover:bg-slate-200  dark:hover:bg-slate-900
              
              peer-checked/presente:active:bg-emerald-300 dark:peer-checked/presente:active:bg-emerald-800
              peer-checked/presente:bg-emerald-100 dark:peer-checked/presente:bg-emerald-500
              peer-checked/presente:border-emerald-200 dark:peer-checked/presente:border-emerald-700
              
              peer-checked/presente:hover:bg-emerald-200 dark:peer-checked/presente:hover:bg-emerald-700
              ">
                            {/* <img
                src="https://www.svgrepo.com/show/220564/stadium.svg"
                className="size-6 dark:invert"
                alt=""
              /> */}
                            Livro físico
                        </label>
                    </div>
                    <div className="grid place-content-center items-center sm:w-1/3 w-full pt-4 pb-2 sm:py-0">
                        <Rating
                            className="h-full scale-150"
                            fillIcon={<Star className="text-2xl" weight="fill" />}
                            emptyIcon={<Star className="text-2xl dark:text-slate-600" />}
                            allowFraction
                            onClick={handleRating}
                            transition
                            fillColorArray={[
                                '#f14f45',
                                '#f14f45',
                                '#f16c45',
                                '#f16c45',
                                '#f18845',
                                '#f18845',
                                '#f1b345',
                                '#f1b345',
                                '#f1d045',
                                '#f1d045',
                            ]}
                            initialValue={rating}
                            // showTooltip
                            // tooltipArray={[
                            //   'Tenebroso',
                            //   'Terrível',
                            //   'Ruim demais',
                            //   'Ruim',
                            //   'Assistível',
                            //   'Legalzinho',
                            //   'Bom',
                            //   'Jogão',
                            //   'Jogaço',
                            //   'Absolute Cinema',
                            // ]}
                            // tooltipStyle={{position: 'absolute', fontSize: '12px' }}
                        />
                    </div>
                </div>
                {vazio && <p className="text-xs text-red-500">Adicione um comentário!</p>}
                <textarea
                    name="comentarios"
                    id="comentarios"
                    className="dark:bg-slate-800 bg-slate-100 w-full rounded-xl py-2 px-3 focus-within:outline-none focus-within:ring-1 focus-within:ring-emerald-300"
                    placeholder="Comentários"
                    onChange={handleChange}
                    value={comentario}></textarea>
                <div className="grid place-content-center relative">
                    {!logado && (
                        <p className="text-red-500 text-xs">Você não está logado!</p>
                    )}
                    <button
                        className="bg-emerald-400 hover:bg-emerald-500 hover:ring-4 ring-emerald-200 dark:ring-emerald-700 active:bg-emerald-600 focus:ring-4 focus:bg-emerald-500 py-2 px-5 rounded-2xl gap-3 text-white w-full disabled:opacity-30 disabled:cursor-not-allowed"
                        type="submit"
                        disabled={!logado || enviado}>
                        {loading ? (
                            <div className="animate-spin">
                                <SpinnerGap className="text-2xl" />
                            </div>
                        ) : (
                            'Salvar'
                        )}
                    </button>
                </div>
            </form>
        </>
    );
}

export default bookInfo;
