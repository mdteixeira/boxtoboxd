import {
    UserCircle,
    Heart,
    DotsThree,
    PencilSimple,
    Trash,
    Share,
    Pen,
    Buildings,
    Book,
    Calendar,
    Star,
    Image,
    Info,
} from '@phosphor-icons/react';
import React, { useState } from 'react';
import { useLoaderData, useLocation } from 'react-router-dom';
import { TwitterShareButton, TwitterIcon } from 'react-share';
import { Rating } from 'react-simple-star-rating';
import Popup from 'reactjs-popup';
import { auth } from '../firebase';

const IndividualRating = () => {
    const { state } = useLocation();
    const user = auth.currentUser;

    const [showAll, setShowAll] = useState(false);

    console.log('state', state);

    const { rating, ratingData } = state;

    const avaliacao = rating;
    const book = ratingData;

    const deletePopup: any = (close: any) =>
        (
            <>
                <div className="p-2">
                    <h3 className="text-xl font-medium text-emerald-600 mb-6">
                        Deletar postagem
                    </h3>
                    <p>Tem certeza que deseja deletar essa postagem?</p>
                    <div className="flex w-full justify-around mt-6 font-medium">
                        <button
                            className="rounded-2xl py-2 px-5 hover:underline"
                            onClick={close}>
                            Cancelar
                        </button>
                        <button
                            className="inline-flex items-center gap-2 border rounded-2xl py-2 px-5 text-red-500 border-red-500 hover:bg-red-600 hover:text-white"
                            onClick={() => {
                                // deletePost(avaliacao.id);
                                close();
                            }}>
                            <Trash weight="bold" />
                            Deletar
                        </button>
                    </div>
                </div>
            </>
        ) as any;

    console.log('Inside individual rating >>', rating, ratingData);
    return (
        <div className="h-screen container mx-auto">
            <div className="p-3">
                <div className="flex items-center justify-between mb-3">
                    <div className="flex gap-2 items-center">
                        {avaliacao.user[1] == '' ? (
                            <UserCircle
                                className="size-16 text-emerald-500"
                                weight="duotone"
                            />
                        ) : (
                            <img
                                src={avaliacao.user[1]}
                                alt=""
                                className="size-16 rounded-full border-2 dark:border-slate-700"
                            />
                        )}
                        <h3 className="text-2xl">
                            <span className="font-semibold">{avaliacao.user[0]}</span>{' '}
                            avaliou
                        </h3>
                    </div>
                    <div className="flex gap-2 items-center">
                        {avaliacao.user[2] == user?.uid ? (
                            <>
                                {avaliacao.like ? (
                                    <Heart
                                        className="text-3xl text-red-400"
                                        weight="fill"
                                    />
                                ) : (
                                    <Heart
                                        className="text-3xl text-slate-400"
                                        weight="regular"
                                    />
                                )}
                                <button
                                    type="button"
                                    className=" bg-slate-100 dark:bg-slate-700 dark:hover:bg-slate-500 hover:bg-slate-200 hover:ring-4 ring-slate-100 dark:ring-slate-700 active:bg-slate-300 dark:active:bg-slate-600 focus:ring-4 dark:focus:bg-slate-500 focus:bg-slate-400 p-2 rounded-xl flex items-center gap-3 dark:text-white"
                                    onClick={() => {
                                        alert('Não implementado.');
                                    }}>
                                    <PencilSimple size={20} />
                                </button>
                                <Popup
                                    trigger={
                                        <button
                                            type="button"
                                            className=" bg-slate-100 dark:bg-slate-700 dark:hover:bg-slate-500 hover:bg-slate-200 hover:ring-4 ring-slate-100 dark:ring-slate-700 active:bg-slate-300 dark:active:bg-slate-600 focus:ring-4 dark:focus:bg-slate-500 focus:bg-slate-400 p-2 rounded-xl flex items-center gap-3 dark:text-white">
                                            <Trash size={20} />
                                        </button>
                                    }
                                    modal>
                                    {deletePopup}
                                </Popup>
                                <Popup
                                    trigger={
                                        <button
                                            type="button"
                                            className=" bg-slate-100 dark:bg-slate-700 dark:hover:bg-slate-500 hover:bg-slate-200 hover:ring-4 ring-slate-100 dark:ring-slate-700 active:bg-slate-300 dark:active:bg-slate-600 focus:ring-4 dark:focus:bg-slate-500 focus:bg-slate-400 p-2 rounded-xl flex items-center gap-3 dark:text-white">
                                            <Share size={20} />
                                        </button>
                                    }
                                    position={'bottom center'}
                                    on={'click'}
                                    arrow={false}
                                    contentStyle={{
                                        border: 'none',
                                        boxShadow: 'none',
                                        width: 'auto',
                                        backgroundColor: 'transparent',
                                    }}>
                                    <div className="flex flex-row-reverse gap-2 mt-2">
                                        <TwitterShareButton
                                            url={'http://mdteixeira.github.io/boxtoboxd'}
                                            title={`Minha nota para ${book.volumeInfo.title} no BoxToBoxD é de ${avaliacao.rating}⭐`}
                                            hashtags={['BoxToBoxD']}>
                                            <TwitterIcon size={32} round />
                                        </TwitterShareButton>
                                    </div>
                                </Popup>
                            </>
                        ) : (
                            ''
                        )}
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-3 p-3 dark:border-slate-600">
                    <div className="">
                        <h2 className="font-semibold text-4xl">
                            {book.volumeInfo.title}
                        </h2>
                        <div className="pt-2">
                            <div
                                className="w-full text-xl space-y-1 p-3 py-2 bg-slate-100 dark:bg-slate-800 dark:bg-opacity-50 rounded-b-2xl dark:rounded-2xl *:text-center 
                                *:text-slate-500 *:dark:text-slate-300 *:flex *:gap-2 *:items-center">
                                <h2 className=" ">
                                    <Pen weight="bold" /> {book.volumeInfo.authors.join()}
                                </h2>
                                <h2 className=" ">
                                    <Buildings weight="bold" />{' '}
                                    {book.volumeInfo.publisher}
                                </h2>
                                <h2 className=" ">
                                    <Book className="text-base" weight="bold" />
                                    {book.volumeInfo.pageCount} páginas
                                </h2>
                                <h2 className=" ">
                                    <Calendar weight="bold" />{' '}
                                    {new Date(
                                        book.volumeInfo.publishedDate
                                    ).toLocaleDateString()}
                                </h2>
                                <h2 className=" ">
                                    <Info weight="bold" /> {book.volumeInfo.categories[0]}
                                </h2>
                            </div>
                            <button
                                className="text-center p-2 px-5 bg-emerald-600 rounded-xl my-2 cursor-pointer"
                                onClick={() => setShowAll(!showAll)}>
                                {showAll ? 'Ocultar descrição' : 'Ver descrição'}
                            </button>
                            <p
                                onClick={() => setShowAll(!showAll)}
                                className="text-justify cursor-pointer col-span-3 px-2">
                                {showAll && book.volumeInfo.description}
                            </p>
                        </div>
                    </div>
                    {book.volumeInfo?.imageLinks ? (
                        <img
                            src={
                                book.volumeInfo.imageLinks.thumbnail ??
                                book.volumeInfo.imageLinks.smallThumbnail ??
                                ''
                            }
                            alt=""
                            className="rounded-md h-[50vh] cursor-pointer mx-auto"
                            onClick={searchBook()}
                        />
                    ) : (
                        <div
                            onClick={searchBook()}
                            className="rounded-md h-full cursor-pointer size-full mx-auto grid grid-cols-1 items-center justify-center justify-items-center bg-slate-800 p-3">
                            <Image size={'64'} />
                        </div>
                    )}
                </div>
                <div className="flex flex-col">
                    <div className="grid grid-cols-2 items-center w-full py-2">
                        <div className="flex gap-3 items-center justify-end">
                            {avaliacao.presente == true ? (
                                <div className="flex gap-2 items-center bg-slate-50 dark:bg-slate-800 py-1 px-3 rounded-xl">
                                    {/* <img
                                src="https://www.svgrepo.com/show/220564/stadium.svg"
                                className="size-6 dark:invert"
                                alt=""
                            /> */}
                                    <p>Livro físico</p>
                                </div>
                            ) : (
                                ''
                            )}
                        </div>
                    </div>
                    <h2 className="mt-5 mb-4 text-emerald-500 font-semibold text-4xl">
                        Comentário
                    </h2>
                    <p
                        className={
                            'bg-slate-50 dark:bg-slate-900 rounded-2xl resize-none pl-3 py-2 hover:none active:none focus-within:outline-none min-h-[3.5lh] text-2xl'
                        }
                        id="comentario"
                        onClick={() => {}}>
                        {avaliacao.comentario}
                    </p>
                </div>
            </div>
        </div>
    );

    function searchBook(): React.MouseEventHandler<HTMLDivElement> | undefined {
        return () => {
            window.open(
                `https://www.google.com/search?q=${
                    book.volumeInfo.title
                } - ${book.volumeInfo.authors.join()}`
            );
        };
    }
};

export default IndividualRating;
