import { extendTheme } from "@chakra-ui/react";

const config = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,
  fonts: {
    heading: '"Fredoka One", "Comic Sans MS", "Chalkboard SE", cursive',
    body: '"Nunito", "Comic Sans MS", system-ui, sans-serif',
  },
  colors: {
    brand: {
      50: "#fff5f5",
      100: "#ffd6d9",
      200: "#ffadbf",
      300: "#ff85a5",
      400: "#ff5c8b",
      500: "#ff3369",
      600: "#e60050",
      700: "#b3003d",
      800: "#80002b",
      900: "#4d001a",
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
  styles: {
    global: {
      "html, body": {
        scrollBehavior: "smooth",
      },
    },
  },
  components: {
    Button: {
      defaultProps: {
        colorScheme: "purple",
      },
      variants: {
        rainbow: {
          bgGradient: "linear(to-r, rainbow.red, rainbow.orange, rainbow.yellow, rainbow.green, rainbow.blue, rainbow.purple)",
          color: "white",
          _hover: {
            transform: "scale(1.05)",
            boxShadow: "xl",
          },
        },
      },
    },
  },
});

export default theme;
