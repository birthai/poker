import { Card } from '../types/game';

type HandRank = {
  rank: number;
  name: string;
  value: number[];
};

export const evaluateHand = (cards: Card[]): HandRank => {
  const sortedCards = [...cards].sort((a, b) => getValue(b.rank) - getValue(a.rank));
  
  if (isRoyalFlush(sortedCards)) return { rank: 10, name: 'Royal Flush', value: [] };
  if (isStraightFlush(sortedCards)) return { rank: 9, name: 'Straight Flush', value: [getValue(sortedCards[0].rank)] };
  if (isFourOfAKind(sortedCards)) return { rank: 8, name: 'Four of a Kind', value: getFourOfAKindValues(sortedCards) };
  if (isFullHouse(sortedCards)) return { rank: 7, name: 'Full House', value: getFullHouseValues(sortedCards) };
  if (isFlush(sortedCards)) return { rank: 6, name: 'Flush', value: getFlushValues(sortedCards) };
  if (isStraight(sortedCards)) return { rank: 5, name: 'Straight', value: [getValue(sortedCards[0].rank)] };
  if (isThreeOfAKind(sortedCards)) return { rank: 4, name: 'Three of a Kind', value: getThreeOfAKindValues(sortedCards) };
  if (isTwoPair(sortedCards)) return { rank: 3, name: 'Two Pair', value: getTwoPairValues(sortedCards) };
  if (isOnePair(sortedCards)) return { rank: 2, name: 'One Pair', value: getOnePairValues(sortedCards) };
  
  return { rank: 1, name: 'High Card', value: getHighCardValues(sortedCards) };
};

const getValue = (rank: string): number => {
  const values: { [key: string]: number } = {
    '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9,
    '10': 10, 'J': 11, 'Q': 12, 'K': 13, 'A': 14
  };
  return values[rank];
};

const isRoyalFlush = (cards: Card[]): boolean => {
  return isStraightFlush(cards) && getValue(cards[0].rank) === 14;
};

const isStraightFlush = (cards: Card[]): boolean => {
  return isFlush(cards) && isStraight(cards);
};

const isFourOfAKind = (cards: Card[]): boolean => {
  const groups = groupByRank(cards);
  return Object.values(groups).some(group => group.length === 4);
};

const isFullHouse = (cards: Card[]): boolean => {
  const groups = groupByRank(cards);
  const groupSizes = Object.values(groups).map(g => g.length);
  return groupSizes.includes(3) && groupSizes.includes(2);
};

const isFlush = (cards: Card[]): boolean => {
  return cards.every(card => card.suit === cards[0].suit);
};

const isStraight = (cards: Card[]): boolean => {
  const values = cards.map(card => getValue(card.rank));
  for (let i = 1; i < values.length; i++) {
    if (values[i] !== values[i - 1] - 1) {
      // Check for Ace-low straight
      if (i === values.length - 1 && values[0] === 14 && values[1] === 5) {
        return true;
      }
      return false;
    }
  }
  return true;
};

const isThreeOfAKind = (cards: Card[]): boolean => {
  const groups = groupByRank(cards);
  return Object.values(groups).some(group => group.length === 3);
};

const isTwoPair = (cards: Card[]): boolean => {
  const groups = groupByRank(cards);
  const pairs = Object.values(groups).filter(group => group.length === 2);
  return pairs.length === 2;
};

const isOnePair = (cards: Card[]): boolean => {
  const groups = groupByRank(cards);
  return Object.values(groups).some(group => group.length === 2);
};

const groupByRank = (cards: Card[]): { [key: string]: Card[] } => {
  return cards.reduce((groups: { [key: string]: Card[] }, card) => {
    groups[card.rank] = groups[card.rank] || [];
    groups[card.rank].push(card);
    return groups;
  }, {});
};

const getFourOfAKindValues = (cards: Card[]): number[] => {
  const groups = groupByRank(cards);
  const fourOfAKind = Object.entries(groups).find(([_, group]) => group.length === 4);
  const kicker = Object.entries(groups).find(([_, group]) => group.length === 1);
  return [getValue(fourOfAKind![0]), getValue(kicker![0])];
};

const getFullHouseValues = (cards: Card[]): number[] => {
  const groups = groupByRank(cards);
  const threeOfAKind = Object.entries(groups).find(([_, group]) => group.length === 3);
  const pair = Object.entries(groups).find(([_, group]) => group.length === 2);
  return [getValue(threeOfAKind![0]), getValue(pair![0])];
};

const getFlushValues = (cards: Card[]): number[] => {
  return cards.map(card => getValue(card.rank));
};

const getThreeOfAKindValues = (cards: Card[]): number[] => {
  const groups = groupByRank(cards);
  const threeOfAKind = Object.entries(groups).find(([_, group]) => group.length === 3);
  const kickers = Object.entries(groups)
    .filter(([_, group]) => group.length === 1)
    .map(([rank, _]) => getValue(rank))
    .sort((a, b) => b - a);
  return [getValue(threeOfAKind![0]), ...kickers];
};

const getTwoPairValues = (cards: Card[]): number[] => {
  const groups = groupByRank(cards);
  const pairs = Object.entries(groups)
    .filter(([_, group]) => group.length === 2)
    .map(([rank, _]) => getValue(rank))
    .sort((a, b) => b - a);
  const kicker = Object.entries(groups)
    .find(([_, group]) => group.length === 1);
  return [...pairs, getValue(kicker![0])];
};

const getOnePairValues = (cards: Card[]): number[] => {
  const groups = groupByRank(cards);
  const pair = Object.entries(groups).find(([_, group]) => group.length === 2);
  const kickers = Object.entries(groups)
    .filter(([_, group]) => group.length === 1)
    .map(([rank, _]) => getValue(rank))
    .sort((a, b) => b - a);
  return [getValue(pair![0]), ...kickers];
};

const getHighCardValues = (cards: Card[]): number[] => {
  return cards.map(card => getValue(card.rank));
}; 