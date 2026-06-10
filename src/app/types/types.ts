export interface PlayerStats {
  id: number;
  number: string;
  name: string;
  
  serveAce: number;
  serveCont: number;
  serveError: number;

  attackKill: number;
  attackError: number;
  attackCont: number;
}
