export interface Root {
  filters: Filters;
  resultSet: ResultSet;
  matches: Match[];
}

export interface Filters {
  dateFrom: string;
  dateTo: string;
  permission: string;
}

export interface ResultSet {
  count: number;
  competitions: string;
  first: string;
  last: string;
  played: number;
}

export interface Match {
  area: Area;
  competition: Competition;
  season: Season;
  id: number;
  utcDate: string;
  status: string;
  matchday: number;
  stage: string;
  group?: string | null;
  lastUpdated: string;
  homeTeam: HomeTeam;
  awayTeam: AwayTeam;
  score: Score;
  odds: Odds;
  referees: Referee[];
}

export interface Area {
  id: number;
  name: string;
  code: string;
  flag: string;
}

export interface Competition {
  id: number;
  name: string;
  code: string;
  type: string;
  emblem: string;
}

export interface Season {
  id: number;
  startDate: string;
  endDate: string;
  currentMatchday: number;
  winner: any;
}

export interface HomeTeam {
  id: number;
  name: string;
  shortName: string;
  tla: string | null;
  crest: string;
}

export interface AwayTeam {
  id: number;
  name: string;
  shortName: string;
  tla: string | null;
  crest: string;
}

export interface Score {
  winner: string | null;
  duration: string;
  fullTime: FullTime;
  halfTime: HalfTime;
}

export interface FullTime {
  home: number | null;
  away: number | null;
}

export interface HalfTime {
  home: number | null;
  away: number | null;
}

export interface Odds {
  msg: string;
}

export interface Referee {
  id: number;
  name: string;
  type: string;
  nationality: string;
}
