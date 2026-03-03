import { renderHook, act } from '@testing-library/react';
import { useNavigationProgress } from './useNavigationProgress';

const mockPathname = vi.fn();
const mockIsFetching = vi.fn();

vi.mock('next/navigation', () => ({
  usePathname: () => mockPathname(),
}));

vi.mock('@tanstack/react-query', () => ({
  useIsFetching: () => mockIsFetching(),
}));

describe('useNavigationProgress', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    mockPathname.mockReturnValue('/initial');
    mockIsFetching.mockReturnValue(0);
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.clearAllMocks();
  });

  it('returns false when no navigation or fetching', () => {
    const { result } = renderHook(() => useNavigationProgress());

    expect(result.current).toBe(false);
  });

  it('returns true when isFetching > 0', () => {
    mockIsFetching.mockReturnValue(1);
    const { result } = renderHook(() => useNavigationProgress());

    expect(result.current).toBe(true);
  });

  it('returns true briefly when pathname changes', async () => {
    const { result, rerender } = renderHook(() => useNavigationProgress());
    expect(result.current).toBe(false);

    mockPathname.mockReturnValue('/cart');
    rerender();

    await act(async () => {
      await vi.advanceTimersByTimeAsync(0);
    });

    expect(result.current).toBe(true);

    await act(async () => {
      await vi.advanceTimersByTimeAsync(500);
    });

    expect(result.current).toBe(false);
  });
});
