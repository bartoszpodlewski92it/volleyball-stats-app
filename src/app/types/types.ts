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

  blockPoint: number;
  digSuccess: number;

  receptionPerfect: number;
  receptionGood: number;
  receptionInaccurate: number;
  receptionError: number;   
}

export type OnInputChangeFn = (id: number, field: 'number' | 'name', value: string) => void;

export type OnStatChangeFn = (
  id: number, 
  field: 'attackKill' | 'attackError' | 'attackCont' | 'serveAce' | 'serveCont' | 'serveError' | 'blockPoint' | 'digSuccess' | 'receptionPerfect' | 'receptionGood' | 'receptionInaccurate' | 'receptionError', 
  amount: 1 | -1
) => void;