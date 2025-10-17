// Sistema de tipografía accesible gubernamental
// Basado en framework.digital.gob.cl

export const govTypography = {
  // Tamaños de fuente accesibles
  fontSizes: {
    xs: '0.75rem',    // 12px
    sm: '0.875rem',    // 14px
    base: '1rem',      // 16px - .a11y-font-0
    lg: '1.125rem',    // 18px
    xl: '1.25rem',     // 20px - .a11y-font-1
    '2xl': '1.5rem',   // 24px - .a11y-font-2
    '3xl': '1.875rem', // 30px
    '4xl': '2.25rem',  // 36px
    '5xl': '3rem',     // 48px
  },
  
  // Pesos de fuente
  fontWeights: {
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
  },
  
  // Alturas de línea para legibilidad
  lineHeights: {
    tight: '1.25',
    snug: '1.375',
    normal: '1.5',
    relaxed: '1.625',
    loose: '2',
  },
  
  // Familias de fuente gubernamentales
  fontFamilies: {
    sans: [
      'Inter',
      'system-ui',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      '"Noto Sans"',
      'sans-serif',
    ],
    serif: [
      'Georgia',
      'Cambria',
      '"Times New Roman"',
      'Times',
      'serif',
    ],
    mono: [
      'SFMono-Regular',
      'Menlo',
      'Monaco',
      'Consolas',
      '"Liberation Mono"',
      '"Courier New"',
      'monospace',
    ],
  },
};

// Clases de utilidad para accesibilidad
export const accessibilityClasses = {
  // Aumento de tamaño de fuente
  fontSize: {
    base: 'a11y-font-0',
    large: 'a11y-font-1', 
    xlarge: 'a11y-font-2',
  },
  
  // Modo contraste
  contrast: 'a11y-contrast',
  
  // Utilidades específicas para diferentes niveles de fuente
  utilities: {
    // Para .a11y-font-1
    font1: {
      col12: 'a11y-font-1-col-12',
      dNone: 'a11y-font-1-d-none',
      m0: 'a11y-font-1-m-0',
      textCenter: 'a11y-font-1-text-center',
    },
    
    // Para .a11y-font-2
    font2: {
      col12: 'a11y-font-2-col-12',
      dNone: 'a11y-font-2-d-none',
      m0: 'a11y-font-2-m-0',
      textCenter: 'a11y-font-2-text-center',
    },
    
    // Para cualquier nivel de fuente
    fonts: {
      dNone: 'a11y-fonts-d-none',
      m0: 'a11y-fonts-m-0',
      textCenter: 'a11y-fonts-text-center',
    },
  },
};

// Configuración de espaciado accesible
export const govSpacing = {
  // Espaciado basado en múltiplos de 4px para mejor accesibilidad
  spacing: {
    0: '0',
    1: '0.25rem',  // 4px
    2: '0.5rem',   // 8px
    3: '0.75rem',  // 12px
    4: '1rem',     // 16px
    5: '1.25rem',  // 20px
    6: '1.5rem',   // 24px
    8: '2rem',     // 32px
    10: '2.5rem',  // 40px
    12: '3rem',    // 48px
    16: '4rem',    // 64px
    20: '5rem',    // 80px
    24: '6rem',    // 96px
  },
};

export default govTypography;
