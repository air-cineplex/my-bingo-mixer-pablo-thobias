interface StartScreenProps {
  onStart: () => void;
}

export function StartScreen({ onStart }: StartScreenProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-full p-6">
      <div className="text-center max-w-sm">
        <h1 className="noir-animate-flicker font-display text-5xl font-bold tracking-widest text-noir-paper uppercase mb-1">
          Bingo Mixer
        </h1>
        <p className="noir-animate-fade-up [animation-delay:0.9s] font-typewriter text-noir-smoke text-sm mb-8">
          case file: find your people
        </p>

        <div className="noir-animate-fade-up [animation-delay:1.1s] bg-noir-charcoal rounded-md p-6 border-l-4 border-noir-gold shadow-lg shadow-black/50 mb-8 text-left">
          <h2 className="font-display font-semibold tracking-wide text-noir-gold-bright uppercase text-sm mb-3">
            The Briefing
          </h2>
          <ul className="text-noir-paper/90 text-sm space-y-2">
            <li>
              <span className="text-noir-gold font-semibold mr-2">01 —</span>
              Find people who match the questions
            </li>
            <li>
              <span className="text-noir-gold font-semibold mr-2">02 —</span>
              Tap a square when you find a match
            </li>
            <li>
              <span className="text-noir-gold font-semibold mr-2">03 —</span>
              Get 5 in a row to win!
            </li>
          </ul>
        </div>

        <button
          onClick={onStart}
          className="noir-animate-fade-up [animation-delay:1.3s] w-full bg-noir-gold text-noir-black font-display font-bold uppercase tracking-wide py-4 px-8 rounded-md text-lg shadow-[0_0_20px_rgba(201,162,39,0.35)] active:bg-noir-gold-bright transition-colors"
        >
          Start Game
        </button>
      </div>
    </div>
  );
}
