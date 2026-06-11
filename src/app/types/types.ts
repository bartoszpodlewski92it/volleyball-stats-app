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

  blockPoint: number; // Blok punktowy
}

export type OnInputChangeFn = (id: number, field: 'number' | 'name', value: string) => void;

export type OnStatChangeFn = (
  id: number, 
  field: 'attackKill' | 'attackError' | 'attackCont' | 'serveAce' | 'serveCont' | 'serveError' | 'blockPoint', 
  amount: 1 | -1
) => void;
