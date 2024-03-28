import React from 'react';
import ReactSearchBox from 'react-search-box';
import MatchInfo from './MatchInfo';

export default function MatchSearch() {
  return (
    <ReactSearchBox
      placeholder="Time 1 x Time 2"
      data={[
        {
          key: 'portuguesavsguarani',
          value: 'Portuguesa x Guarani',
        },
      ]}
      onSelect={() => {
        return true;
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
