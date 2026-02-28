import { renderHook, act } from '@testing-library/react';
import { useDebounce } from './useDebounce';

describe('useDebounce', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('returns empty string for values shorter than 3 characters', () => {
    const { result } = renderHook(() => useDebounce('ab', 300));
    expect(result.current).toBe('');
  });

  it('returns empty string immediately when value is cleared', () => {
    const { result, rerender } = renderHook(({ value }) => useDebounce(value, 300), {
      initialProps: { value: 'samsung' },
    });

    act(() => vi.advanceTimersByTime(300));
    rerender({ value: '' });
    expect(result.current).toBe('');
  });

  it('does not debounce values shorter than 3 characters', () => {
    const { result, rerender } = renderHook(({ value }) => useDebounce(value, 300), {
      initialProps: { value: 'samsung' },
    });

    act(() => vi.advanceTimersByTime(300));
    rerender({ value: 'sa' });
    expect(result.current).toBe('');
  });

  it('debounces values with 3 or more characters', () => {
    const { result, rerender } = renderHook(({ value }) => useDebounce(value, 300), {
      initialProps: { value: '' },
    });

    rerender({ value: 'sam' });
    expect(result.current).toBe('');
    act(() => vi.advanceTimersByTime(300));
    expect(result.current).toBe('sam');
  });

  it('resets timer if value changes before delay', () => {
    const { result, rerender } = renderHook(({ value }) => useDebounce(value, 300), {
      initialProps: { value: '' },
    });

    rerender({ value: 'sam' });
    act(() => vi.advanceTimersByTime(200));
    rerender({ value: 'sams' });
    act(() => vi.advanceTimersByTime(300));
    expect(result.current).toBe('sams');
  });
});
