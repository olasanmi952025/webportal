// Sistema de colores gubernamentales de Chile
// Basado en framework.digital.gob.cl

export const govColors = {
  // Colores primarios gubernamentales oficiales
  primary: '#006FB3', // RGB(0, 111, 179)
  secondary: '#FE6565', // RGB(254, 101, 101)
  tertiary: '#0A132D', // RGB(52, 58, 64)
  accent: '#A8B7C7', // RGB(33, 37, 41)
  neutral: '#EEEEEE', // RGB(238, 238, 238)
  'gray-a': '#4A4A4A', // RGB(74, 74, 74)
  'gray-b': '#8A8A8A', // RGB(138, 138, 138)
  black: '#111111', // RGB(17, 17, 17)
  white: '#FFFFFF', // RGB(255, 255, 255)
  
  // Colores adicionales
  purple: '#6633CC', // RGB(102, 51, 204)
  orange: '#E0701E', // RGB(224, 112, 30)
  'orange-light': '#FFA11B', // RGB(255, 161, 27)
  green: '#2D717C', // RGB(45, 113, 124)
};

// Configuración de accesibilidad
export const accessibilityConfig = {
  fontSizes: {
    base: '16px',    // .a11y-font-0
    large: '20px',   // .a11y-font-1  
    xlarge: '24px',  // .a11y-font-2
  },
  
  contrastRatio: 4.5, // WCAG 2.0 AA mínimo
  
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
  },
};

export default govColors;
