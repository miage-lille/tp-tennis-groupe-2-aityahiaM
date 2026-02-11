import { Player } from './player';

// Surely not the best choice
type Love = { kind: 'LOVE' }
type Fifteen = { kind: 'FIFTEEN' }
type Thirty = { kind: 'THIRTY' }
export type Point = Love | Fifteen | Thirty;

export const love = (): Love => ({ kind: 'LOVE' });
export const fifteen = (): Fifteen => ({ kind: 'FIFTEEN' });
export const thirty = (): Thirty => ({ kind: 'THIRTY' });

export const stringToPoint = (value: string): Point => {
  switch (value) {
    case 'LOVE':
      return love();
    case 'FIFTEEN':
      return fifteen();
    case 'THIRTY':
      return thirty();
    default:
      throw new Error(`Invalid point string: ${value}`);
  }
};

export type PointsData = {
  PLAYER_ONE: Point;
  PLAYER_TWO: Point;
};

export type Points = {
  kind: 'POINTS';
  pointsData: PointsData;
};

export const points = (
  playerOnePoints: Point,
  playerTwoPoints: Point
): Points => ({
  kind: 'POINTS',
  pointsData: {
    PLAYER_ONE: playerOnePoints,
    PLAYER_TWO: playerTwoPoints,
  },
});

export type FortyData = {
  player: Player;
  otherPoint: Point;
};

// Exerice 0: Write all type constructors of Points, Deuce, Forty and Advantage types.
export type Deuce = {
  kind: 'DEUCE';
};

export const deuce = (): Deuce => ({
  kind: 'DEUCE',
});

export type Forty = {
  kind: 'FORTY';
  player: Player;      
  otherPoint: Point;  
};

export const forty = (player: Player, otherPoint: Point): Forty => ({
  kind: 'FORTY',
  player,
  otherPoint,
});

export type Advantage = {
  kind: 'ADVANTAGE';
  player: Player;
};

export const advantage = (player: Player): Advantage => ({
  kind: 'ADVANTAGE',
  player,
});

export type Game = {
  kind: 'GAME';
  player: Player; // Player has won
};

export const game = (winner: Player): Game => ({
  kind: 'GAME',
  player: winner,
});

export type Score = Points | Forty | Deuce | Advantage | Game;
