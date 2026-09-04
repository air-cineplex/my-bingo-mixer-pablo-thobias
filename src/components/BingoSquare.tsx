import type { BingoSquareData } from '../types';

interface BingoSquareProps {
  square: BingoSquareData;
  isWinning: boolean;
  onClick: () => void;
}

export function BingoSquare({ square, isWinning, onClick }: BingoSquareProps) {
  const baseClasses =
    'relative flex items-center justify-center p-1 text-center border rounded transition-all duration-150 select-none min-h-[60px] text-xs leading-tight font-display';

  const stateClasses = square.isFreeSpace
    ? 'bg-noir-charcoal border-noir-gold text-noir-gold-bright'
    : square.isMarked
      ? isWinning
        ? 'noir-animate-glow bg-noir-gold-dim/40 border-noir-gold-bright text-noir-gold-bright'
        : 'bg-noir-gold-dim/25 border-noir-gold text-noir-paper'
      : 'bg-noir-charcoal border-noir-charcoal-light text-noir-paper/80 active:bg-noir-charcoal-light';

  const freeSpaceClasses = square.isFreeSpace
    ? 'font-bold text-sm uppercase tracking-wide'
    : '';

  return (
    <button
      onClick={onClick}
      disabled={square.isFreeSpace}
      className={`${baseClasses} ${stateClasses} ${freeSpaceClasses}`}
      aria-pressed={square.isMarked}
      aria-label={square.isFreeSpace ? 'Free space' : square.text}
    >
      <span className="wrap-break-word hyphens-auto">
        {square.isFreeSpace ? `★ ${square.text} ★` : square.text}
      </span>
      {square.isMarked && !square.isFreeSpace && (
        <span className="noir-animate-stamp absolute top-0.5 right-0.5 font-typewriter text-[0.6rem] text-noir-gold-bright -rotate-12 border border-noir-gold-bright/70 rounded-full w-4 h-4 flex items-center justify-center leading-none">
          ✓
        </span>
      )}
    </button>
  );
}
