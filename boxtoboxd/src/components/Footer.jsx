import { GithubLogo, SoccerBall } from '@phosphor-icons/react';
import React from 'react';

function Footer() {
  return (
    <div className=" p-6 border-t-2 border-emerald-300 bg-emerald-300 dark:bg-emerald-800 bg-opacity-25 dark:bg-opacity-25 font-medium gap-3 items-center grid place-content-center mb-20 sm:mb-0">
      <div className="flex gap-3 items-center text-emerald-400 text-3xl">
        <SoccerBall className="" weight="duotone" /> <h1>BoxtoBoxD</h1>
        <h3 className="text-xs bg-amber-300 px-2 py-0.5 rounded-md text-black text-center text-nowrap">
          Beta v0.4.2
        </h3>
      </div>
      <h2 className="font-normal">
        Feito por{' '}
        <a
          href="https://linkedin.com/in/mdteixeira15"
          className="text-emerald-700 dark:text-emerald-200 underline"
        >
          Matheus Teixeira
        </a>
      </h2>
      <h3 className="font-normal inline-flex items-center gap-2">
        Github:{' '}
        <a
          href="https://linkedin.com/in/mdteixeira15"
          className="text-emerald-700 dark:text-emerald-200 underline inline-flex items-center"
        >
          <GithubLogo /> /mdteixeira
        </a>
      </h3>
    </div>
  );
}

export default Footer;
