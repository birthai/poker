import { useState, useCallback, useEffect } from 'react';
import { GameState, Player, Card } from '../types/game';
import { createDeck, dealCards } from '../utils/deck';
import { evaluateHand } from '../utils/pokerHands';
import { getAIAction } from '../utils/aiPlayer';

const SMALL_BLIND = 10;
const BIG_BLIND = 20;
const INITIAL_CHIPS = 1000;

const useGame = () => {
  const [gameState, setGameState] = useState<GameState>({
    players: [
      {
        id: 0,
        name: "You",
        cards: [],
        chips: INITIAL_CHIPS,
        currentBet: 0,
        isActive: true,
        isFolded: false,
        isHuman: true
      },
      {
        id: 1,
        name: "Player 2",
        cards: [],
        chips: INITIAL_CHIPS,
        currentBet: 0,
        isActive: true,
        isFolded: false,
        isHuman: false
      },
      {
        id: 2,
        name: "Player 3",
        cards: [],
        chips: INITIAL_CHIPS,
        currentBet: 0,
        isActive: true,
        isFolded: false,
        isHuman: false
      },
      {
        id: 3,
        name: "Player 4",
        cards: [],
        chips: INITIAL_CHIPS,
        currentBet: 0,
        isActive: true,
        isFolded: false,
        isHuman: false
      }
    ],
    currentPlayer: 0,
    pot: 0,
    currentBet: 0,
    communityCards: [],
    gamePhase: 'pre-flop',
    deck: [],
    dealer: 0
  });

  const startNewHand = useCallback(() => {
    const deck = createDeck();
    const players = gameState.players.map(player => ({
      ...player,
      cards: [],
      currentBet: 0,
      isActive: player.chips > 0,
      isFolded: false
    }));

    // Rotate dealer position
    const newDealer = (gameState.dealer + 1) % players.length;
    const smallBlindPos = (newDealer + 1) % players.length;
    const bigBlindPos = (newDealer + 2) % players.length;

    // Post blinds
    players[smallBlindPos].chips -= SMALL_BLIND;
    players[smallBlindPos].currentBet = SMALL_BLIND;
    players[bigBlindPos].chips -= BIG_BLIND;
    players[bigBlindPos].currentBet = BIG_BLIND;

    // Deal cards to players
    let remainingDeck = deck;
    players.forEach(player => {
      const [cards, newDeck] = dealCards(remainingDeck, 2);
      player.cards = cards;
      remainingDeck = newDeck;
    });

    setGameState({
      ...gameState,
      players,
      currentPlayer: (bigBlindPos + 1) % players.length,
      pot: SMALL_BLIND + BIG_BLIND,
      currentBet: BIG_BLIND,
      communityCards: [],
      gamePhase: 'pre-flop',
      deck: remainingDeck,
      dealer: newDealer
    });
  }, [gameState.dealer, gameState.players]);

  const handlePlayerAction = useCallback((action: 'fold' | 'check' | 'call' | 'raise', amount?: number) => {
    setGameState(prevState => {
      const players = [...prevState.players];
      const currentPlayer = players[prevState.currentPlayer];
      let { pot, currentBet } = prevState;

      switch (action) {
        case 'fold':
          currentPlayer.isFolded = true;
          break;

        case 'check':
          if (currentBet !== currentPlayer.currentBet) {
            return prevState; // Invalid action
          }
          break;

        case 'call':
          const callAmount = currentBet - currentPlayer.currentBet;
          if (callAmount > 0) {
            currentPlayer.chips -= callAmount;
            currentPlayer.currentBet += callAmount;
            pot += callAmount;
          }
          break;

        case 'raise':
          if (!amount || amount <= currentBet) {
            return prevState; // Invalid action
          }
          const raiseAmount = amount - currentPlayer.currentBet;
          currentPlayer.chips -= raiseAmount;
          currentPlayer.currentBet = amount;
          currentBet = amount;
          pot += raiseAmount;
          break;
      }

      // Find next active player
      let nextPlayer = (prevState.currentPlayer + 1) % players.length;
      while (
        nextPlayer !== prevState.currentPlayer &&
        (players[nextPlayer].isFolded || !players[nextPlayer].isActive)
      ) {
        nextPlayer = (nextPlayer + 1) % players.length;
      }

      // Check if round is complete
      const roundComplete = players.every(player =>
        player.isFolded ||
        !player.isActive ||
        player.currentBet === currentBet
      );

      if (roundComplete) {
        return advanceGamePhase(prevState);
      }

      return {
        ...prevState,
        players,
        currentPlayer: nextPlayer,
        pot,
        currentBet
      };
    });
  }, []);

  const advanceGamePhase = (state: GameState): GameState => {
    const { deck, communityCards, gamePhase } = state;
    let newCards: Card[] = [];
    let newDeck = [...deck];
    let newPhase: GamePhase = gamePhase;

    switch (gamePhase) {
      case 'pre-flop':
        [newCards, newDeck] = dealCards(deck, 3); // Flop
        newPhase = 'flop';
        break;

      case 'flop':
        [newCards, newDeck] = dealCards(deck, 1); // Turn
        newPhase = 'turn';
        break;

      case 'turn':
        [newCards, newDeck] = dealCards(deck, 1); // River
        newPhase = 'river';
        break;

      case 'river':
        return handleShowdown(state);
    }

    const players = state.players.map(player => ({
      ...player,
      currentBet: 0
    }));

    return {
      ...state,
      players,
      currentPlayer: (state.dealer + 1) % players.length,
      communityCards: [...communityCards, ...newCards],
      currentBet: 0,
      deck: newDeck,
      gamePhase: newPhase
    };
  };

  const handleShowdown = (state: GameState): GameState => {
    const activePlayers = state.players.filter(player => !player.isFolded && player.isActive);
    
    if (activePlayers.length === 1) {
      // Only one player left, they win the pot
      const winner = activePlayers[0];
      const players = state.players.map(player =>
        player.id === winner.id
          ? { ...player, chips: player.chips + state.pot }
          : player
      );

      return {
        ...state,
        players,
        pot: 0,
        gamePhase: 'pre-flop',
        currentBet: 0
      };
    }

    // Evaluate hands and find winner(s)
    const playerHands = activePlayers.map(player => ({
      player,
      hand: evaluateHand([...player.cards, ...state.communityCards])
    }));

    // Sort by hand rank and then by value array
    playerHands.sort((a, b) => {
      if (b.hand.rank !== a.hand.rank) {
        return b.hand.rank - a.hand.rank;
      }
      for (let i = 0; i < b.hand.value.length; i++) {
        if (b.hand.value[i] !== a.hand.value[i]) {
          return b.hand.value[i] - a.hand.value[i];
        }
      }
      return 0;
    });

    // Find all winners (players with equal best hands)
    const winners = playerHands.filter(ph => 
      ph.hand.rank === playerHands[0].hand.rank &&
      ph.hand.value.every((v, i) => v === playerHands[0].hand.value[i])
    );

    // Split pot among winners
    const winAmount = Math.floor(state.pot / winners.length);
    const players = state.players.map(player => {
      const winner = winners.find(w => w.player.id === player.id);
      return winner
        ? { ...player, chips: player.chips + winAmount }
        : player;
    });

    return {
      ...state,
      players,
      pot: 0,
      gamePhase: 'pre-flop',
      currentBet: 0
    };
  };

  // AI players' turns
  useEffect(() => {
    const currentPlayer = gameState.players[gameState.currentPlayer];
    
    if (!currentPlayer.isHuman && !currentPlayer.isFolded && currentPlayer.isActive) {
      const aiAction = getAIAction(
        currentPlayer,
        gameState,
        [...currentPlayer.cards, ...gameState.communityCards]
      );
      
      setTimeout(() => {
        handlePlayerAction(aiAction.type, aiAction.amount);
      }, 1000); // Add delay for better UX
    }
  }, [gameState.currentPlayer, handlePlayerAction]);

  // Start first hand
  useEffect(() => {
    startNewHand();
  }, []);

  return {
    gameState,
    handlePlayerAction
  };
};

export default useGame;
