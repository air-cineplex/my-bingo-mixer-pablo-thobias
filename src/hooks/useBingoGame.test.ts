import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useBingoGame } from './useBingoGame';
import type { BingoSquareData } from '../types';

const STORAGE_KEY = 'bingo-game-state';

function makeBoard(): BingoSquareData[] {
  return Array.from({ length: 25 }, (_, i) => ({
    id: i,
    text: i === 12 ? 'FREE' : `Q${i}`,
    isMarked: i === 12 || [0, 4, 20, 24].includes(i),
    isFreeSpace: i === 12,
  }));
}

describe('useBingoGame persistence', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should restore a stored game state whose winningLine.type is "corners" instead of wiping it', () => {
    const board = makeBoard();
    const storedData = {
      version: 1,
      gameState: 'bingo',
      board,
      winningLine: { type: 'corners', index: 0, squares: [0, 4, 20, 24] },
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(storedData));

    const { result } = renderHook(() => useBingoGame());

    // Currently fails: 'corners' is not in useBingoGame's allowed winningLine.type
    // list, so validateStoredData() rejects the stored data, localStorage is
    // cleared, and the hook falls back to default 'start' state with no board.
    expect(result.current.gameState).toBe('bingo');
    expect(result.current.board).toEqual(board);
    expect(result.current.winningLine).toEqual({
      type: 'corners',
      index: 0,
      squares: [0, 4, 20, 24],
    });
  });

  it('should not clear the stored corners game state from localStorage', () => {
    const board = makeBoard();
    const storedData = {
      version: 1,
      gameState: 'bingo',
      board,
      winningLine: { type: 'corners', index: 0, squares: [0, 4, 20, 24] },
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(storedData));

    renderHook(() => useBingoGame());

    expect(localStorage.getItem(STORAGE_KEY)).not.toBeNull();
    const persisted = JSON.parse(localStorage.getItem(STORAGE_KEY) as string);
    expect(persisted.winningLine.type).toBe('corners');
  });
});
