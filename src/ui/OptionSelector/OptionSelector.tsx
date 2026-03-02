import styles from './OptionSelector.module.scss';

export interface SelectorOption {
  label: string;
  value: string;
}

interface OptionSelectorProps {
  options: SelectorOption[];
  selected?: string | null;
  onChange: (option: SelectorOption) => void;
  ariaLabel: string;
}

export const OptionSelector = ({ options, selected, onChange, ariaLabel }: OptionSelectorProps) => {
  return (
    <div role="group" aria-label={ariaLabel} className={styles.wrapper}>
      {options.map((option) => (
        <button
          key={option.value}
          className={[styles.option, selected === option.value ? styles.selected : ''].join(' ')}
          onClick={() => onChange(option)}
          aria-pressed={selected === option.value}
          type="button"
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};
