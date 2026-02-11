import { isSamePlayer, Player, stringToPlayer } from './types/player';
import { deuce, fifteen, forty, FortyData, love, Point, points, PointsData, Score, thirty } from './types/score';
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
export const pointToString = (point: Point): string => {
  switch (point.kind) {
       case 'LOVE':
         return 'Love'
        case 'FIFTEEN':  
         return '15';
        case 'THIRTY':  
         return '30';
        default:
         throw new Error(`Invalid point value: ${point}`);
  }
};

export const scoreToString = (score: Score): string =>{
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
  };

export const scoreWhenDeuce = (winner: Player): Score => advantage(winner);

export const scoreWhenAdvantage = (
  advantagedPlayed: Player,
  winner: Player
): Score => {
  if (isSamePlayer(advantagedPlayed, winner)) return game(winner);
  return deuce();
};

export const scoreWhenForty = (
  currentForty: FortyData,
  winner: Player
): Score => {
  if (isSamePlayer(currentForty.player, winner)) return game(winner);
  return pipe(
    incrementPoint(currentForty.otherPoint),
    Option.match({
      onNone: () => deuce(),
      onSome: p => forty(currentForty.player, p) as Score
    })
  );
};

export const incrementPoint = (point: Point) : Option.Option<Point> => {
  switch (point.kind) {
    case 'LOVE':
      return Option.some(fifteen());
    case 'FIFTEEN':
      return Option.some(thirty());
    case 'THIRTY':
      return Option.none();
  }
};



// Exercice 2
// Tip: You can use pipe function from Effect to improve readability.
// See scoreWhenForty function above.
export const scoreWhenPoint = (current: PointsData, winner: Player): Score => {

  const winnerPoint = current[winner];
  const loser = otherPlayer(winner);
  const loserPoint = current[loser];

  return pipe(
    incrementPoint(winnerPoint),
    Option.match({
      onNone: () => forty(winner, loserPoint),
      onSome: (newPoint) =>
        points(
          winner === 'PLAYER_ONE' ? newPoint : loserPoint,
          winner === 'PLAYER_TWO' ? newPoint : loserPoint
        ),
    })
  );
};

// Exercice 3
export const scoreWhenGame = (winner: Player): Score => {
  return game(winner);
};

export const score = (currentScore: Score, winner: Player): Score => {
  switch (currentScore.kind) {
    case 'POINTS':
      return scoreWhenPoint(currentScore.pointsData, winner);

    case 'FORTY':
      return scoreWhenForty(
        { player: currentScore.player, otherPoint: currentScore.otherPoint },
        winner
      );

    case 'DEUCE':
      return scoreWhenDeuce(winner);

    case 'ADVANTAGE':
      return scoreWhenAdvantage(currentScore.player, winner);

    case 'GAME':
      return scoreWhenGame(currentScore.player);
  }
};
const newGame: Score = points(love(), love());
