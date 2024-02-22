import Jogo from './Jogo';

export default interface Avaliacao {
  id: number;
  usuario: [nome: string, foto: string];
  jogo: Jogo;
  curtir: boolean;
  presente: boolean;
  rating: number;
  comentario: string;
}
