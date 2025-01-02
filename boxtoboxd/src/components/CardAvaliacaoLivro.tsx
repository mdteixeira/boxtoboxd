import React, { useEffect, useState } from 'react';
import {
    X,
    Calendar,
    UserCircle,
    Star,
    Share,
    Trash,
    Clock,
    DotsThree,
    PencilSimple,
    Pen,
    Buildings,
    Book,
    Image,
} from '@phosphor-icons/react';
import { Rating } from 'react-simple-star-rating';
import { Heart } from '@phosphor-icons/react/dist/ssr';
import Popup from 'reactjs-popup';
import { TwitterIcon, TwitterShareButton } from 'react-share';
import { auth, db } from '../firebase';
import { deleteDoc, doc } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import IndividualRating from '../pages/individualRating';
import { useNavigate } from 'react-router-dom';

function CardAvaliacaoLivro(avaliacao) {
    console.log('avaliadao', avaliacao, avaliacao.book);
    const user = auth.currentUser;

    const [logado, setLogado] = useState(user != null);

    const [book, setBook] = useState<any>(null); // State to store single book data
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(''); // Error state

    const navigate = useNavigate();

    const seeRating = () => {
        navigate(`/rating/${avaliacao.id}`, {
            state: { rating: avaliacao, ratingData: book },
        });
    };

    const fetchBookById = async (id) => {
        const url = `https://www.googleapis.com/books/v1/volumes/${id}`;

        if (book) return;

        try {
            const response = await fetch(url);
            const data = await response.json();
            if (data.error) {
                setError('Book not found');
                setBook(null);
            } else {
                setBook(data); // Set the book data in state
                console.log('setting book as ', data);
            }
            setLoading(false);
        } catch (error) {
            setError('Failed to fetch book');
            setLoading(false);
        }
    };

    const [showAll, setShowAll] = useState(false);

    async function deletePost(rating) {
        await deleteDoc(doc(db, 'bookratings', rating));
        // reload();
    }

    useEffect(() => {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            setLogado(!!user);
        });
        fetchBookById(avaliacao.book);
    }, []);

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
                                deletePost(avaliacao.id);
                                close();
                            }}>
                            <Trash weight="bold" />
                            Deletar
                        </button>
                    </div>
                </div>
            </>
        ) as any;

    return (
        <>
            {book && book?.volumeInfo ? (
                <div
                    className="border dark:border-slate-700 rounded-3xl p-3 bg-white dark:bg-slate-900 cursor-pointer"
                    onClick={() => seeRating()}>
                    <div className="flex items-center justify-between mb-3">
                        <div className="flex gap-2 items-center">
                            {avaliacao.user[1] == '' ? (
                                <UserCircle
                                    className="size-10 text-emerald-500"
                                    weight="duotone"
                                />
                            ) : (
                                <img
                                    src={avaliacao.user[1]}
                                    alt=""
                                    className="size-10 rounded-full border-2 dark:border-slate-700"
                                />
                            )}
                            <h3>{avaliacao.user[0]}</h3>
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
                                    <Popup
                                        trigger={
                                            <DotsThree
                                                className="rounded-full text-2xl hover:bg-opacity-15 bg-opacity-0 size-10 p-2 bg-slate-500"
                                                weight="bold"
                                            />
                                        }
                                        nested
                                        position={'bottom center'}
                                        on={'click'}
                                        arrow={false}
                                        contentStyle={{
                                            border: 'none',
                                            boxShadow: 'none',
                                            width: 'auto',
                                            backgroundColor: 'transparent',
                                        }}>
                                        <div className="flex flex-col gap-2 items-center mt-3">
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
                                                        url={
                                                            'http://mdteixeira.github.io/boxtoboxd'
                                                        }
                                                        title={`Minha nota para ${book.volumeInfo.title} no BoxToBoxD é de ${avaliacao.rating}⭐`}
                                                        hashtags={['BoxToBoxD']}>
                                                        <TwitterIcon size={32} round />
                                                    </TwitterShareButton>
                                                </div>
                                            </Popup>
                                        </div>
                                    </Popup>
                                </>
                            ) : (
                                ''
                            )}
                        </div>
                    </div>
                    <div className="grid grid-cols-3 gap-3 p-3 dark:border-slate-600">
                        <div className="col-span-2">
                            <h2 className="font-semibold text-2xl">
                                {book.volumeInfo.title}
                            </h2>
                            <div className="pt-2">
                                <div className="w-full space-y-1 p-3 py-2 bg-slate-100 dark:bg-slate-800 dark:bg-opacity-50 rounded-b-2xl dark:rounded-2xl *:text-center">
                                    <h2 className=" text-slate-500 dark:text-slate-300 flex gap-1 items-center">
                                        <Pen weight="bold" />{' '}
                                        {book.volumeInfo.authors.join()}
                                    </h2>
                                    <h2 className=" text-slate-500 dark:text-slate-300 flex gap-1 items-center">
                                        <Buildings weight="bold" />{' '}
                                        {book.volumeInfo.publisher}
                                    </h2>
                                    <h2 className=" text-slate-500 dark:text-slate-300 flex gap-1 items-center">
                                        <Book className="text-base" weight="bold" />
                                        {book.volumeInfo.pageCount} páginas
                                    </h2>
                                    <h2 className=" text-slate-500 dark:text-slate-300 flex gap-1 items-center">
                                        <Calendar weight="bold" />{' '}
                                        {new Date(
                                            book.volumeInfo.publishedDate
                                        ).toLocaleDateString()}
                                    </h2>
                                </div>
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
                                className="rounded-md h-full cursor-pointer mx-auto"
                                onClick={() => {
                                    window.open(
                                        `https://www.google.com/search?q=${
                                            book.volumeInfo.title
                                        } - ${book.volumeInfo.authors.join()}`
                                    );
                                }}
                            />
                        ) : (
                            <div
                                onClick={() => {
                                    window.open(
                                        `https://www.google.com/search?q=${
                                            book.volumeInfo.title
                                        } - ${book.volumeInfo.authors.join()}`
                                    );
                                }}
                                className="rounded-md h-full cursor-pointer size-full mx-auto grid grid-cols-1 items-center justify-center justify-items-center bg-slate-800 p-3">
                                <Image size={'64'} />
                            </div>
                        )}
                    </div>

                    <div className="flex flex-col">
                        <div className="grid grid-cols-2 items-center w-full py-2">
                            <div className="">
                                <Rating
                                    fillIcon={<Star className="text-4xl" weight="fill" />}
                                    emptyIcon={
                                        <Star className=" text-4xl dark:text-slate-600" />
                                    }
                                    allowFraction
                                    transition
                                    readonly
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
                                    initialValue={avaliacao.rating}
                                    tooltipClassName="tooltip"
                                    tooltipArray={[
                                        'Tenebroso',
                                        'Terrível',
                                        'Ruim demais',
                                        'Ruim',
                                        'Assistível',
                                        'Legalzinho',
                                        'Bom',
                                        'Jogão',
                                        'Jogaço',
                                        'Absolute Cinema',
                                    ]}
                                />
                            </div>
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
                        <p
                            className={
                                showAll
                                    ? 'bg-slate-50 dark:bg-slate-800 rounded-2xl resize-none pl-3 py-2 hover:none active:none focus-within:outline-none  cursor-pointer min-h-[3.5lh]'
                                    : 'bg-slate-50 dark:bg-slate-800 rounded-2xl resize-none pl-3 py-2 hover:none active:none focus-within:outline-none  cursor-pointer line-clamp-3 h-[3.5lh]'
                            }
                            id="comentario"
                            onClick={() => {
                                setShowAll(!showAll);
                            }}>
                            {avaliacao.comentario}
                        </p>
                    </div>
                </div>
            ) : (
                <div className="border dark:border-slate-700 rounded-3xl p-3 bg-white dark:bg-slate-900">
                    <div className="flex items-center justify-between mb-3">
                        <div className="flex gap-2 items-center">
                            <div className="size-10 rounded-full border-2 dark:bg-slate-800 dark:border-slate-700 animate-pulse" />
                            <h3 className="animate-pulse dark:bg-slate-800 bg-slate-200 text-transparent rounded-md">
                                Nome do usuário
                            </h3>
                        </div>
                        <div className="flex gap-2 items-center">
                            <>
                                <Heart
                                    className="text-3xl text-slate-200"
                                    weight="regular"
                                />
                                <DotsThree
                                    className="rounded-full text-2xl text-slate-200 hover:bg-opacity-15 bg-opacity-0 size-10 p-2 bg-slate-200"
                                    weight="bold"
                                />
                            </>
                        </div>
                    </div>
                    <div className="grid grid-cols-3 gap-3 p-3 dark:border-slate-600">
                        <div className="col-span-2">
                            <h2 className="animate-pulse dark:bg-slate-800 bg-slate-200 text-transparent rounded-md w-fit text-2xl">
                                Título do livro
                            </h2>
                            <div className="pt-2">
                                <div className="w-full space-y-1 p-3 py-2 bg-slate-100 dark:bg-slate-800 dark:bg-opacity-50 rounded-b-2xl dark:rounded-2xl *:text-center">
                                    <h2 className="animate-pulse bg-slate-200 rounded-md w-fit text-transparent dark:bg-slate-800 flex gap-1 items-center">
                                        <Pen weight="bold" />
                                        Author
                                    </h2>
                                    <h2 className="animate-pulse bg-slate-200 rounded-md w-fit text-transparent dark:bg-slate-800 flex gap-1 items-center">
                                        <Buildings weight="bold" />
                                        Publisher
                                    </h2>
                                    <h2 className="animate-pulse bg-slate-200 rounded-md w-fit text-transparent dark:bg-slate-800 flex gap-1 items-center">
                                        <Book className="text-base" weight="bold" /> XX
                                        Páginas
                                    </h2>
                                    <h2 className="animate-pulse bg-slate-200 rounded-md w-fit text-transparent dark:bg-slate-800 flex gap-1 items-center">
                                        <Calendar weight="bold" />
                                        00/00/0000
                                    </h2>
                                </div>
                            </div>
                        </div>

                        <div className="animate-pulse dark:bg-slate-800 bg-slate-200 rounded-md h-full cursor-pointer size-full mx-auto grid grid-cols-1 items-center justify-center justify-items-center p-3">
                            <Image size={'64'} />
                        </div>
                    </div>

                    <div className="flex flex-col">
                        <div className="grid grid-cols-2 items-center w-full py-2">
                            <div className="">
                                <Rating
                                    fillIcon={
                                        <Star
                                            className="text-4xl animate-pulse dark:text-slate-800 text-slate-200"
                                            weight="fill"
                                        />
                                    }
                                    emptyIcon={
                                        <Star className=" text-4xl text-transparent" />
                                    }
                                    allowFraction
                                    transition
                                    readonly
                                    initialValue={5}
                                    tooltipClassName="tooltip"
                                />
                            </div>
                        </div>
                        <p
                            className="bg-slate-50 dark:bg-slate-800 animate-pulse rounded-2xl resize-none pl-3 py-2 hover:none active:none focus-within:outline-none  cursor-pointer line-clamp-3 h-[3.5lh]"
                            id="comentario"></p>
                    </div>
                </div>
            )}
        </>
    );
}

export default CardAvaliacaoLivro;
