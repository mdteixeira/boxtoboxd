import Jogo from './Jogo';

export default interface Avaliacao {
  id: string;
  user: [nome: string, foto: string, uid: string];
  jogo: Jogo;
  like: boolean;
  presente: boolean;
  rating: number;
  comentario: string;
}
