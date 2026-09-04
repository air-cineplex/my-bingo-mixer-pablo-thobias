import type { BingoSquareData } from '../types';
import { BingoBoard } from './BingoBoard';

interface GameScreenProps {
  board: BingoSquareData[];
  winningSquareIds: Set<number>;
  hasBingo: boolean;
  onSquareClick: (squareId: number) => void;
  onReset: () => void;
}

export function GameScreen({
  board,
  winningSquareIds,
  hasBingo,
  onSquareClick,
  onReset,
}: GameScreenProps) {
  return (
    <div className="flex flex-col min-h-full">
      {/* Header */}
      <header className="flex items-center justify-between p-3 bg-noir-charcoal border-b border-noir-gold-dim">
        <button
          onClick={onReset}
          className="font-typewriter text-noir-smoke text-xs px-3 py-1.5 rounded active:text-noir-gold-bright underline underline-offset-2"
        >
          ← back
        </button>
        <h1 className="font-display font-semibold tracking-widest text-noir-paper uppercase text-sm">
          Bingo Mixer
        </h1>
        <div className="w-16"></div>
      </header>

      {/* Instructions */}
      <p className="text-center font-typewriter text-noir-smoke text-xs py-2 px-4">
        Tap a square when you find someone who matches it.
      </p>

      {/* Bingo indicator */}
      {hasBingo && (
        <div className="noir-animate-glow text-center py-2 font-display font-bold text-sm uppercase tracking-[0.3em] text-noir-gold-bright bg-noir-black border-y border-noir-gold-dim">
          ★ Line Complete ★
        </div>
      )}

      {/* Board */}
      <div className="flex-1 flex items-center justify-center p-3">
        <BingoBoard
          board={board}
          winningSquareIds={winningSquareIds}
          onSquareClick={onSquareClick}
        />
      </div>
    </div>
  );
}
