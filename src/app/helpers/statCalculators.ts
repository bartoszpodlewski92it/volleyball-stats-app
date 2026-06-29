import { PlayerStats } from '../types/types';

export const calculatePoints = (p: PlayerStats): number => {
  return p.serveAce + p.attackKill + p.blockPoint;
};

export const getTeamTotalPoints = (players: PlayerStats[]): number => {
  return players.reduce((sum, p) => sum + calculatePoints(p), 0);
};

export const getTeamSum = (players: PlayerStats[], field: keyof PlayerStats): number => {
  return players.reduce((sum, p) => {
    const val = p[field];
    return sum + (typeof val === 'number' ? val : 0);
  }, 0);
};

export const calculateReceptionPercentages = (perfect: number, good: number, inaccurate: number, error: number) => {
  const total = perfect + good + inaccurate + error;
  
  if (total === 0) {
    return { total, perfPct: '0.00', goodPct: '0.00', posPct: '0.00' };
  }

  return {
    total,
    perfPct: ((perfect / total) * 100).toFixed(2),
    goodPct: ((good / total) * 100).toFixed(2),
    posPct: (((perfect + good) / total) * 100).toFixed(2),
  };
};

export const getTeamReceptionStats = (players: PlayerStats[]) => {
  const perf = getTeamSum(players, 'receptionPerfect');
  const good = getTeamSum(players, 'receptionGood');
  const inac = getTeamSum(players, 'receptionInaccurate');
  const err = getTeamSum(players, 'receptionError');

  return calculateReceptionPercentages(perf, good, inac, err);
};

export const getTeamAttackStats = (players: PlayerStats[]) => {
  const kill = getTeamSum(players, 'attackKill');
  const err = getTeamSum(players, 'attackError');
  const cont = getTeamSum(players, 'attackCont');
  const total = kill + err + cont;

  if (total === 0) {
    return { total, killPct: '0.00', effPct: '0.00' };
  }

  const effPct = (((kill - err) / total) * 100).toFixed(2);
  const killPct = ((kill / total) * 100).toFixed(2);

  return {
    total,
    killPct,
    effPct,
  };
};
