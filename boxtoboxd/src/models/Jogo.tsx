export default interface Jogo {
  id: number;
  mandante: [nome: string, foto: string];
  visitante: [nome: string, foto: string];
  local: string;
  gols: [gols_mandante: number, gols_visitante: number];
  eventos: [jogador: string, evento: string, momento: number][];
  data: [string, string];
  torneio: string;
}
