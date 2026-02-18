import { extendTheme } from "@chakra-ui/react";

const config = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

// Fun, childish-but-modern palette: soft pastels + punchy accents
const theme = extendTheme({
  config,
  fonts: {
    heading: '"Fredoka One", "Nunito", system-ui, sans-serif',
    body: '"Nunito", system-ui, sans-serif',
  },
  breakpoints: {
    sm: "30em",
    md: "48em",
    lg: "62em",
    xl: "80em",
    "2xl": "96em",
  },
  colors: {
    brand: {
      50: "#fdf4ff",
      100: "#fae8ff",
      200: "#f5d0fe",
      300: "#f0abfc",
      400: "#e879f9",
      500: "#d946ef",
      600: "#c026d3",
      700: "#a21caf",
      800: "#86198f",
      900: "#701a75",
    },
    playful: {
      cream: "#ffecd2",
      peach: "#fcb69f",
      mint: "#a8edea",
      blush: "#fed6e3",
      lavender: "#d299c2",
      butter: "#fef9d7",
      sky: "#a5d8ff",
      coral: "#ff9a9e",
    },
    rainbow: {
      red: "#FF6B6B",
      orange: "#FFA94D",
      yellow: "#FFE066",
      green: "#69DB7C",
      blue: "#74C0FC",
      purple: "#B197FC",
      pink: "#F783AC",
    },
  },
  radii: {
    xl: "1rem",
    "2xl": "1.5rem",
    "3xl": "2rem",
    full: "9999px",
  },
  shadows: {
    soft: "0 4px 14px 0 rgba(0, 0, 0, 0.08)",
    "soft-lg": "0 8px 30px -6px rgba(0, 0, 0, 0.1), 0 6px 20px -8px rgba(0, 0, 0, 0.08)",
    playful: "0 10px 40px -10px rgba(124, 58, 237, 0.25)",
    "playful-lg": "0 20px 50px -15px rgba(124, 58, 237, 0.3)",
  },
  transition: {
    smooth: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    bouncy: "all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)",
  },
  styles: {
    global: {
      "html, body": {
        scrollBehavior: "smooth",
      },
    },
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: "bold",
        borderRadius: "xl",
        transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
      },
      defaultProps: {
        colorScheme: "purple",
      },
      variants: {
        rainbow: {
          bgGradient:
            "linear(to-r, rainbow.red, rainbow.orange, rainbow.yellow, rainbow.green, rainbow.blue, rainbow.purple)",
          color: "white",
          _hover: {
            transform: "scale(1.05) translateY(-2px)",
            boxShadow: "playful-lg",
          },
        },
      },
    },
    Input: {
      variants: {
        outline: {
          field: {
            borderRadius: "xl",
            _focus: {
              borderColor: "purple.400",
              boxShadow: "0 0 0 3px rgba(159, 122, 234, 0.2)",
            },
          },
        },
      },
    },
    Textarea: {
      variants: {
        outline: {
          borderRadius: "xl",
          _focus: {
            borderColor: "purple.400",
            boxShadow: "0 0 0 3px rgba(159, 122, 234, 0.2)",
          },
        },
      },
    },
  },
});

export default theme;
