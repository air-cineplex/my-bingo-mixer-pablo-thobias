import type { BingoLine } from '../types';

interface BingoModalProps {
  onDismiss: () => void;
  winningLine: BingoLine | null;
}

export function BingoModal({ onDismiss, winningLine }: BingoModalProps) {
  const isCorners = winningLine?.type === 'corners';

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="noir-animate-stamp bg-noir-charcoal rounded-md p-6 max-w-xs w-full text-center border-2 border-noir-gold shadow-[0_0_30px_rgba(201,162,39,0.4)] outline outline-1 outline-offset-4 outline-noir-gold-dim">
        <div
          aria-hidden="true"
          className="mx-auto mb-4 w-16 h-16 rounded-full border-2 border-noir-gold-bright flex items-center justify-center text-noir-gold-bright text-3xl -rotate-6"
        >
          ★
        </div>
        <h2 className="font-display text-3xl font-bold uppercase tracking-widest text-noir-gold-bright mb-2">
          Bingo!
        </h2>
        <p className="font-typewriter text-noir-smoke text-sm mb-6">
          {isCorners ? 'case closed — you nailed all four corners!' : 'case closed — you completed a line!'}
        </p>

        <button
          onClick={onDismiss}
          className="w-full bg-noir-gold text-noir-black font-display font-bold uppercase tracking-wide py-3 px-6 rounded-md active:bg-noir-gold-bright transition-colors"
        >
          Keep Playing
        </button>
      </div>
    </div>
  );
}
