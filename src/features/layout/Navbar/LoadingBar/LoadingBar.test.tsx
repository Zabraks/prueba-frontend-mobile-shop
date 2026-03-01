import { render, screen } from '@testing-library/react';
import { useNavigationProgress } from '@/hooks/useNavigationProgress';
import { LoadingBar } from './LoadingBar';

vi.mock('@/hooks/useNavigationProgress', () => ({
  useNavigationProgress: vi.fn(),
}));

describe('Navbar', () => {
  it('shows loading state when navigating', () => {
    vi.mocked(useNavigationProgress).mockReturnValue(true);
    render(<LoadingBar />);
    const progress = screen.getByRole('progressbar');

    expect(progress).toHaveAttribute('data-loading', 'true');
    expect(progress).toHaveAttribute('aria-hidden', 'false');
  });

  it('has correct accessibility attributes', () => {
    vi.mocked(useNavigationProgress).mockReturnValue(false);
    render(<LoadingBar />);

    const progressBar = screen.getByRole('progressbar', { hidden: true });
    expect(progressBar).toHaveAttribute('aria-label', 'Page loading');
  });
});
