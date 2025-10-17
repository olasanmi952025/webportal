/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                // Colores gubernamentales de Chile
                gov: {
                    primary: {
                        50: '#f0f9ff',
                        100: '#e0f2fe',
                        200: '#bae6fd',
                        300: '#7dd3fc',
                        400: '#38bdf8',
                        500: '#0ea5e9', // Azul gubernamental principal
                        600: '#0284c7',
                        700: '#0369a1',
                        800: '#075985',
                        900: '#0c4a6e',
                    },
                    secondary: {
                        50: '#f8fafc',
                        100: '#f1f5f9',
                        200: '#e2e8f0',
                        300: '#cbd5e1',
                        400: '#94a3b8',
                        500: '#64748b',
                        600: '#475569',
                        700: '#334155',
                        800: '#1e293b',
                        900: '#0f172a',
                    },
                },
                // Colores de contraste para accesibilidad
                contrast: {
                    bg: '#ffffff',
                    fg: '#000000',
                    primary: '#0066cc',
                    secondary: '#333333',
                    success: '#006600',
                    warning: '#cc6600',
                    error: '#cc0000',
                    border: '#666666',
                    muted: '#666666',
                },
            },
            fontSize: {
                // Tamaños de fuente accesibles gubernamentales
                'gov-xs': '0.75rem', // 12px
                'gov-sm': '0.875rem', // 14px
                'gov-base': '1rem', // 16px - .a11y-font-0
                'gov-lg': '1.125rem', // 18px
                'gov-xl': '1.25rem', // 20px - .a11y-font-1
                'gov-2xl': '1.5rem', // 24px - .a11y-font-2
                'gov-3xl': '1.875rem', // 30px
                'gov-4xl': '2.25rem', // 36px
                'gov-5xl': '3rem', // 48px
            },
            fontFamily: {
                // Familias de fuente gubernamentales
                'gov-sans': [
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
            },
            spacing: {
                // Espaciado basado en múltiplos de 4px para accesibilidad
                'gov-1': '0.25rem', // 4px
                'gov-2': '0.5rem', // 8px
                'gov-3': '0.75rem', // 12px
                'gov-4': '1rem', // 16px
                'gov-5': '1.25rem', // 20px
                'gov-6': '1.5rem', // 24px
                'gov-8': '2rem', // 32px
                'gov-10': '2.5rem', // 40px
                'gov-12': '3rem', // 48px
                'gov-16': '4rem', // 64px
                'gov-20': '5rem', // 80px
                'gov-24': '6rem', // 96px
            },
        },
    },
    plugins: [],
}