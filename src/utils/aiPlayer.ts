import { Card, GameState, Player } from '../types/game';
import { evaluateHand } from './pokerHands';

type Action = {
  type: 'fold' | 'check' | 'call' | 'raise';
  amount?: number;
};

export const getAIAction = (
  player: Player,
  gameState: GameState,
  allCards: Card[]
): Action => {
  const handStrength = calculateHandStrength(player.cards, gameState.communityCards);
  const potOdds = calculatePotOdds(gameState.currentBet - player.currentBet, gameState.pot);
  const position = calculatePosition(player.id, gameState.players.length);
  
  // Calculate base score for decision making
  let score = handStrength;
  
  // Adjust score based on position
  if (position === 'late') score *= 1.2;
  if (position === 'early') score *= 0.8;
  
  // Adjust score based on pot odds
  if (potOdds > score) score *= 0.7;
  
  // Make decision based on score and game state
  if (score < 0.3) {
    return { type: 'fold' };
  }
  
  if (gameState.currentBet === player.currentBet) {
    if (score > 0.7 && Math.random() > 0.7) {
      return {
        type: 'raise',
        amount: calculateRaiseAmount(gameState, score)
      };
    }
    return { type: 'check' };
  }
  
  if (score > 0.5 || potOdds < 0.2) {
    if (score > 0.8 && Math.random() > 0.6) {
      return {
        type: 'raise',
        amount: calculateRaiseAmount(gameState, score)
      };
    }
    return { type: 'call' };
  }
  
  return { type: 'fold' };
};

const calculateHandStrength = (playerCards: Card[], communityCards: Card[]): number => {
  if (communityCards.length === 0) {
    // Pre-flop hand strength
    return calculatePreFlopStrength(playerCards);
  }
  
  const allCards = [...playerCards, ...communityCards];
  const handRank = evaluateHand(allCards);
  
  // Convert hand rank to a 0-1 scale
  return handRank.rank / 10;
};

const calculatePreFlopStrength = (cards: Card[]): number => {
  const [card1, card2] = cards;
  const value1 = getValue(card1.rank);
  const value2 = getValue(card2.rank);
  const suited = card1.suit === card2.suit;
  
  // Pairs
  if (value1 === value2) {
    return 0.5 + (value1 / 28); // Higher pairs get higher strength
  }
  
  // High cards
  const highCard = Math.max(value1, value2);
  const lowCard = Math.min(value1, value2);
  
  // Suited connectors and high suited cards
  if (suited) {
    if (Math.abs(value1 - value2) === 1) {
      return 0.4 + (highCard / 35);
    }
    return 0.3 + (highCard / 40);
  }
  
  // Unsuited high cards
  if (highCard >= 10) {
    return 0.2 + (highCard / 45);
  }
  
  return 0.1 + (highCard / 50);
};

const getValue = (rank: string): number => {
  const values: { [key: string]: number } = {
    '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9,
    '10': 10, 'J': 11, 'Q': 12, 'K': 13, 'A': 14
  };
  return values[rank];
};

const calculatePotOdds = (callAmount: number, pot: number): number => {
  if (callAmount === 0) return 0;
  return callAmount / (pot + callAmount);
};

const calculatePosition = (playerId: number, totalPlayers: number): 'early' | 'middle' | 'late' => {
  const position = playerId / totalPlayers;
  if (position < 0.33) return 'early';
  if (position < 0.66) return 'middle';
  return 'late';
};

const calculateRaiseAmount = (gameState: GameState, handStrength: number): number => {
  const baseRaise = gameState.currentBet * 2;
  const maxRaise = Math.min(
    gameState.players[gameState.currentPlayer].chips,
    baseRaise * 3
  );
  
  // Stronger hands raise more
  const raiseMultiplier = 1 + (handStrength * 2);
  return Math.min(maxRaise, Math.floor(baseRaise * raiseMultiplier));
}; 