import tailwindcssAnimate from 'tailwindcss-animate'
import typography from '@tailwindcss/typography'

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  darkMode: ['selector', '[data-theme="dark"]'],
  plugins: [tailwindcssAnimate, typography],
  prefix: '',
  safelist: [
    'lg:col-span-4',
    'lg:col-span-6',
    'lg:col-span-8',
    'lg:col-span-12',
    'border-border',
    'bg-card',
    'border-error',
    'bg-error/30',
    'border-success',
    'bg-success/30',
    'border-warning',
    'bg-warning/30',
  ],
  theme: {
    container: {
      center: true,
      padding: {
        '2xl': '2rem',
        DEFAULT: '1rem',
        lg: '2rem',
        md: '2rem',
        sm: '1rem',
        xl: '2rem',
      },
      screens: {
        '2xl': '86rem',
        lg: '64rem',
        md: '48rem',
        sm: '40rem',
        xl: '80rem',
      },
    },
    extend: {
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      colors: {
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        background: 'hsl(var(--background))',
        border: 'hsla(var(--border))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        foreground: 'hsl(var(--foreground))',
        input: 'hsl(var(--input))',
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        ring: 'hsl(var(--ring))',
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        success: 'hsl(var(--success))',
        error: 'hsl(var(--error))',
        warning: 'hsl(var(--warning))',
      },
      fontFamily: {
        mono: ['var(--font-geist-mono)'],
        sans: ['var(--font-geist-sans)'],
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      borderRadius: {
        xs: '4px',
        sm: '6px',
      },
      boxShadow: {
        soft: '0 2px 8px rgba(0,0,0,.06)',
        '3d': '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1), -2px 0 4px -1px rgb(0 0 0 / 0.08), 2px 0 4px -1px rgb(0 0 0 / 0.08)',
      },
      colors: {
        bg: 'var(--bg)',
        surface: 'var(--surface)',
        text: 'var(--text)',
        muted: 'var(--muted)',
        border: 'var(--border)',
        brand: 'var(--brand)',
        header: 'var(--header)',
        headerText: 'var(--header-text)',
        navBg: 'var(--nav-bg)',
        navText: 'var(--nav-text)',
        sideBg: 'var(--side-bg)',
        link: 'var(--link)',
        linkHover: 'var(--link-hover)',
        footer: 'var(--footer)',
        footerText: 'var(--footer-text)',
        buttonBg: 'var(--button-bg)',
        buttonHover: 'var(--button-hover)',
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: theme('colors.gray.900'),
            lineHeight: '1.75',
            fontSize: '1.125rem',
            a: {
              color: theme('colors.blue.600'),
              textDecoration: 'none',
              fontWeight: '500',
              '&:hover': {
                color: theme('colors.blue.700'),
                textDecoration: 'underline',
              },
            },
            'h1, h2, h3, h4, h5, h6': {
              fontWeight: '600',
              lineHeight: '1.25',
            },
            h1: {
              fontSize: '2.5rem',
              marginTop: '0',
              marginBottom: '2rem',
            },
            h2: {
              fontSize: '2rem',
              marginTop: '3rem',
              marginBottom: '1.5rem',
            },
            h3: {
              fontSize: '1.75rem',
              marginTop: '2.5rem',
              marginBottom: '1rem',
            },
            p: {
              marginTop: '1.5rem',
              marginBottom: '1.5rem',
            },
            strong: {
              fontWeight: '700',
              color: theme('colors.gray.900'),
            },
          },
        },
      }),
    },
  },
}

export default config
