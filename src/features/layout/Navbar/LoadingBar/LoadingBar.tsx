'use client';
import { useNavigationProgress } from '@/hooks/useNavigationProgress/useNavigationProgress';
import styles from './LoadingBar.module.scss';
import { LOADING_BAR_STRINGS } from './constants';

export const LoadingBar = () => {
  const isLoading = useNavigationProgress();

  return (
    <div
      className={styles.progressBar}
      data-loading={isLoading}
      role="progressbar"
      aria-hidden={!isLoading}
      aria-label={LOADING_BAR_STRINGS.ariaLabel}
    />
  );
};
