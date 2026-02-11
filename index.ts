import { isSamePlayer, Player, stringToPlayer } from './types/player';
import { deuce, Point, PointsData, Score } from './types/score';
import { advantage } from './types/score';
import { game } from './types/score';
import { pipe, Option } from 'effect'

// -------- Tooling functions --------- //

export const playerToString = (player: Player) => {
  switch (player) {
    case 'PLAYER_ONE':
      return 'Player 1';
    case 'PLAYER_TWO':
      return 'Player 2';
  }
};
export const otherPlayer = (player: Player) => {
  switch (player) {
    case 'PLAYER_ONE':
      return stringToPlayer('PLAYER_TWO');
    case 'PLAYER_TWO':
      return stringToPlayer('PLAYER_ONE');
  }
};
// Exercice 1 :
export const pointToString = (point: Point): string =>
   (() => {
     switch (point) {
       case 0:
         return 'Love'
        case 15:  
         return '15';
        case 30:  
         return '30';
        default:
         throw new Error(`Invalid point value: ${point}`);
     }
    }
  )();  

export const scoreToString = (score: Score): string =>
  (() => {
    switch (score.kind) {
      case 'POINTS': {
        const p = score.pointsData;
        return `${pointToString(p.PLAYER_ONE)} - ${pointToString(
          p.PLAYER_TWO
        )}`;
      }
      case 'FORTY': {
        const { player, otherPoint } = score;
        if (player === 'PLAYER_ONE') return `40 - ${pointToString(otherPoint)}`;
        return `${pointToString(otherPoint)} - 40`;
      }
      case 'DEUCE':
        return 'Deuce';
      case 'ADVANTAGE':
        return `Advantage ${playerToString(score.player)}`;
      case 'GAME':
        return `Game ${playerToString(score.player)}`;
      default:
        throw new Error('Unknown score kind');
    }
  })();

export const scoreWhenDeuce = (winner: Player): Score => advantage(winner);

export const scoreWhenAdvantage = (
  advantagedPlayed: Player,
  winner: Player
): Score => {
  if (isSamePlayer(advantagedPlayed, winner)) return game(winner);
  return deuce();
};

export const scoreWhenForty = (
  currentForty: unknown, // TO UPDATE WHEN WE KNOW HOW TO REPRESENT FORTY
  winner: Player
): Score => {
  throw new Error('not implemented');
};



// Exercice 2
// Tip: You can use pipe function from Effect to improve readability.
// See scoreWhenForty function above.
export const scoreWhenPoint = (current: PointsData, winner: Player): Score => {
  throw new Error('not implemented');
};

// Exercice 3
export const scoreWhenGame = (winner: Player): Score => {
  throw new Error('not implemented');
};

export const score = (currentScore: Score, winner: Player): Score => {
  throw new Error('not implemented');
};
