import { PlayerStats } from '../types/types';

export const calculatePoints = (p: PlayerStats): number => {
  return p.serveAce + p.attackKill + p.blockPoint;
};

export const getTeamTotalPoints = (players: PlayerStats[]): number => {
  return players.reduce((sum, p) => sum + calculatePoints(p), 0);
};

export const getTeamSum = (players: PlayerStats[], field: keyof PlayerStats): number => {
  return players.reduce((sum, p) => sum + (p[field] as number), 0);
};

export const getTeamReceptionStats = (players: PlayerStats[]) => {
  const perf = getTeamSum(players, 'receptionPerfect');
  const good = getTeamSum(players, 'receptionGood');
  const inac = getTeamSum(players, 'receptionInaccurate');
  const err = getTeamSum(players, 'receptionError');
  const total = perf + good + inac + err;

  return {
    total,
    perfPct: total > 0 ? ((perf / total) * 100).toFixed(2) + '%' : '0.00%',
    goodPct: total > 0 ? ((good / total) * 100).toFixed(2) + '%' : '0.00%',
    posPct: total > 0 ? (((perf + good) / total) * 100).toFixed(2) + '%' : '0.00%',
  };
};

export const getTeamAttackStats = (players: PlayerStats[]) => {
  const kill = getTeamSum(players, 'attackKill');
  const err = getTeamSum(players, 'attackError');
  const cont = getTeamSum(players, 'attackCont');
  const total = kill + err + cont;

  return {
    total,
    killPct: total > 0 ? ((kill / total) * 100).toFixed(2) + '%' : '0.00%',
  };
};
