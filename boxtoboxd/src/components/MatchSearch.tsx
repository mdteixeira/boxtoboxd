import React from 'react';
import ReactSearchBox from 'react-search-box';
import MatchInfo from './MatchInfo';

export default function MatchSearch() {
  return (
    <ReactSearchBox
      placeholder="Time 1 x Time 2"
      data={[
        {
          key: 'portuguesavscorinthians',
          value: 'portuguesa x corinthians',
        },
        {
          key: 'jane',
          value: 'Jane Doe',
        },
        {
          key: 'mary',
          value: 'Mary Phillips',
        },
        {
          key: 'robert',
          value: 'Robert',
        },
        {
          key: 'karius',
          value: 'Karius',
        },
      ]}
      onSelect={(partida: any) => MatchInfo(partida)}
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
