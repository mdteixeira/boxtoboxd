import { Match } from "./Match";

export default interface Avaliacao {
  id: string;
  user: [nome: string, foto: string, uid: string];
  partida: Match["id"];
  like: boolean;
  presente: boolean;
  rating: number;
  comentario: string;
}
