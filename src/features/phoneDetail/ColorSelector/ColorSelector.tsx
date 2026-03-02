import type { ColorOption } from '@/domain/phone/phone.types';
import styles from './ColorSelector.module.scss';
import { COLOR_SELECTOR_STRINGS } from './constants';

interface ColorSelectorProps {
  colors: ColorOption[];
  selected: string | null;
  onChange: (option: ColorOption) => void;
}

export const ColorSelector = ({ colors, selected, onChange }: ColorSelectorProps) => {
  const selectedColor = colors.find((c) => c.name === selected);

  return (
    <div className={styles.wrapper}>
      <div role="group" aria-label={COLOR_SELECTOR_STRINGS.ariaLabel} className={styles.options}>
        {colors.map((color) => (
          <button
            key={color.name}
            className={[styles.option, selected === color.name ? styles.selected : ''].join(' ')}
            style={{ backgroundColor: color.hexCode }}
            onClick={() => onChange(color)}
            aria-pressed={selected === color.name}
            aria-label={color.name}
            type="button"
          />
        ))}
      </div>
      {selectedColor && <span className={styles.label}>{selectedColor.name}</span>}
    </div>
  );
};
