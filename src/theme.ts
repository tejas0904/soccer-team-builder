export const tokens = {
  grey: {
    100: "#f0f0f3",
    200: "#e1e2e7",
    300: "#d1d3da",
    400: "#c2c5ce",
    500: "#b3b6c2",
    600: "#8f929b",
    700: "#6b6d74",
    800: "#48494e",
    900: "#242427",
  },
  primary: {
    // blackgreen
    100: "#d4d8db",
    200: "#aab1b7",
    300: "#7f8a93",
    400: "#55636f",
    500: "#2a3c4b",
    600: "#22303c",
    700: "#19242d",
    800: "#11181e",
    900: "#080c0f",
  },
  secondary: {
    // indigo
    100: "#d4dedb",
    200: "#aabeb8",
    300: "#7f9d94",
    400: "#557d71",
    500: "#2a5c4d",
    600: "#224a3e",
    700: "#19372e",
    800: "#11251f",
    900: "#08120f",
  },
  tertiary: {
    //blue
    100: "#d4e5dc",
    200: "#aacbb9",
    300: "#7fb095",
    400: "#559672",
    500: "#2a7c4f",
    600: "#22633f",
    700: "#194a2f",
    800: "#113220",
    900: "#081910",
  },
  background: {
    light: "#2d2d34",
    main: "#1f2026",
  },
};

// mui theme settings
export const themeSettings = {
  palette: {
    primary: {
      ...tokens.primary,
      main: tokens.primary[500],
      light: tokens.primary[400],
    },
    secondary: {
      ...tokens.secondary,
      main: tokens.secondary[500],
    },
    tertiary: {
      ...tokens.tertiary,
    },
    grey: {
      ...tokens.grey,
      main: tokens.grey[500],
    },
    background: {
      default: tokens.background.main,
      light: tokens.background.light,
    },
  },
  typography: {
    fontFamily: ["Inter", "sans-serif"].join(","),
    fontSize: 12,
    h1: {
      fontFamily: ["Inter", "sans-serif"].join(","),
      fontSize: 32,
    },
    h2: {
      fontFamily: ["Inter", "sans-serif"].join(","),
      fontSize: 24,
    },
    h3: {
      fontFamily: ["Inter", "sans-serif"].join(","),
      fontSize: 20,
      fontWeight: 800,
      color: tokens.grey[200],
    },
    h4: {
      fontFamily: ["Inter", "sans-serif"].join(","),
      fontSize: 14,
      fontWeight: 600,
      color: tokens.grey[300],
    },
    h5: {
      fontFamily: ["Inter", "sans-serif"].join(","),
      fontSize: 12,
      fontWeight: 400,
      color: tokens.grey[500],
    },
    h6: {
      fontFamily: ["Inter", "sans-serif"].join(","),
      fontSize: 10,
      color: tokens.grey[700],
    },
  },
};
