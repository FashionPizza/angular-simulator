import { definePreset } from '@primeuix/themes';
import Aura from '@primeuix/themes/aura';
import Lara from '@primeuix/themes/lara';
import Nora from '@primeuix/themes/nora';
import { ThemePreset } from '../enums/ThemePreset';

const Custom = definePreset(Aura, {
  semantic: {
    primary: {
      50: '{violet.50}',
      100: '{violet.100}',
      200: '{violet.200}',
      300: '{violet.300}',
      400: '{violet.400}',
      500: '{violet.500}',
      600: '{violet.600}',
      700: '{violet.700}',
      800: '{violet.800}',
      900: '{violet.900}',
      950: '{violet.950}',
    },
  },
});

export const THEME_PRESETS = {
  [ThemePreset.AURA]: Aura,
  [ThemePreset.LARA]: Lara,
  [ThemePreset.NORA]: Nora,
  [ThemePreset.CUSTOM]: Custom,
};
