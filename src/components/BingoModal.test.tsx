import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BingoModal } from './BingoModal';

describe('BingoModal', () => {
  it('shows the generic line-completion copy for a row win', () => {
    render(
      <BingoModal
        onDismiss={() => {}}
        winningLine={{ type: 'row', index: 0, squares: [0, 1, 2, 3, 4] }}
      />
    );

    expect(screen.getByText(/you completed a line!/i)).toBeInTheDocument();
  });

  it('shows corners-specific copy distinct from the generic line copy when the win is a corners pattern', () => {
    // Currently fails: BingoModal has no `winningLine` prop and always renders
    // the generic "you completed a line!" copy regardless of win type.
    render(
      <BingoModal
        onDismiss={() => {}}
        winningLine={{ type: 'corners', index: 0, squares: [0, 4, 20, 24] }}
      />
    );

    expect(screen.queryByText(/you completed a line!/i)).not.toBeInTheDocument();
    expect(screen.getByText(/four corners/i)).toBeInTheDocument();
  });
});
