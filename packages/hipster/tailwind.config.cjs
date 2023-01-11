/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,vue}"],
  theme: {
    fontFamily: {
      medium: "URWGeometric Medium",
      table: "Ubuntu",
    },
    screens: {
      sm: "640px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1440px",
    },
    extend: {
      colors: {
        grey: {
          100: "#F8FAFC",
          200: "#F4F6F8",
          300: "#E3E8EE",
          400: "#CCCFDB",
          600: "#919EAB",
          700: "#637381",
          800: "#454F5B",
          900: "#1F2B37"
        },
        white: {
          DEFAULT: "#FFFFFF"
        },
        disabled: {
          DEFAULT: "#F8F9FB"
        },
        blue: {
          DEFAULT: "#196DFD",
          100: "#E8F0FF",
          200: "#D1E2FF",
          300: "#9BD1FF",
          400: "#8CB6FE",
          800: "#061249"
        },
        red: {
          DEFAULT: "#FF0059",
          100: "#FFE5EE",
          300: "#FFC4D5",
          500: "#BF1D08"
        },
        yellow: {
          DEFAULT: "#F6BB2D",
          100: "#FFFCD7",
          200: "#FCF6AB",
          400: "#8A6116"
        },
        green: {
          DEFAULT: "#00B388",
          100: "#E9FBE3",
          200: "#CBF4CA",
          400: "#108043",
          500: "#173630",
          600: "#414F3E",
        },
        pink: {
          300: "#FFA5E6"
        },
        orange: {
          DEFAULT: "#F49342",
          200: "#FFD6A5",
          300: "#FCEBDB",
          400: "#C05717",
          500: "#4A1504",
          600: "#594430"
        },
        indigo: {
          DEFAULT: "#5B63AF",
          100: "#F5F5FA",
          300: "#B3BCF5"
        },
        teal: {
          DEFAULT: "#47C1BF",
          100: "#E0F5F5",
          300: "#B7ECEC"
        },
        purple: {
          DEFAULT: "#9C6ADE",
          100: "#F6F0FD",
          300: "#E3D0FF"
        },
        button: {
          primary: {
            DEFAULT: "#196BF6",
            hover: "#1762E5",
            focus: "#196BF6",
            active: "#1559D4",
            disabled: "#8DB8FF",
          },
          secondary: {
            active: "#E8EBEF",
            disabled: "#F8F9FB"
          },
          tertiary: {
            active: "#E8EBEF",
            disabled: "#F8F9FB"
          },
          plainbutton: {
            active: "#E8EBEF",
            disabled: "#F8F9FB"
          },
          destructive: {
            hover: "#E60254",
            focus: "#FF0055",
            active: "#CD0453",
            disabled: "#FF80AA"
          }
        },
        toggle: {
          DEFAULT: "#D1E2FF",
          primary: {
            active: "#196DFD",
            hover: "#7799CD"
          },
          destructive: {
            active: "#FF0059",
            hover: "#820951"
          }
        }
      },
      fontSize: {
        default: "14px",
        medium: "16px",
        large: "18px",
      },
      lineHeight: {
        default: "20px",
        medium: "24px",
        large: "24px",
      },
      minWidth: {
        default: "26px",
        medium: "36px",
        large: "46px",
        input: "300px"
      },
      width: {
        "svg-default": "14px",
        "svg-medium": "20px",
        "svg-large": "26px",
        toggle: "18px"
      },
      height: {
        default: "26px",
        medium: "36px",
        large: "46px",
        toggle: "18px",
        badge: "18px",
        input: "30px"
      },
      borderColor: {
        default: "rgba(6, 18, 73, 0.1)",
        focus: "rgba(6, 18, 73, 0.3)",
        tertiary: "#CCCFCB"
      },
      borderRadius: {
        regular: "4px",
      },
      boxShadow: {
        btn: "0px 0.5px 1px 0.5px rgba(6, 18, 73, 0.2)",
      },
      padding: {
        btn: "2px 12px 4px 12px"
      }
      
    },
  },
  plugins: [],
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  important: true
};
