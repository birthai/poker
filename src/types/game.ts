export interface GameState {
  players: Player[];
  currentPlayer: number;
  pot: number;
  currentBet: number;
  communityCards: Card[];
  gamePhase: GamePhase;
  deck: Card[];
  dealer: number;
}

export interface Player {
  id: number;
  name: string;
  chips: number;
  cards: Card[];
  currentBet: number;
  isActive: boolean;
  isFolded: boolean;
  isHuman: boolean; 
}

export interface Card {
  rank: string;
  suit: string;
}

export type GamePhase = 'pre-flop' | 'flop' | 'turn' | 'river' | 'showdown';
