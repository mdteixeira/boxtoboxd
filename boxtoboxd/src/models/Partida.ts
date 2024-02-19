import Gol from './Gol';
import Time from './Time';

export default interface Partida {
  id: number;
  mandante: Time;
  visitante: Time;
  placar: number[];
  local: string;
  data: string;
  hora: string;
  gols: Gol[];
}
