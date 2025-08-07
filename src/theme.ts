import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  typography: {
    fontFamily: [
      "Inter",
      "system-ui",
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      "sans-serif",
    ].join(","),
    h1: {
      fontFamily:
        'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      fontWeight: 600,
      letterSpacing: "-0.025em",
    },
    h2: {
      fontFamily:
        'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      fontWeight: 600,
      letterSpacing: "-0.025em",
    },
    h3: {
      fontFamily:
        'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      fontWeight: 600,
      letterSpacing: "-0.025em",
    },
    h4: {
      fontFamily:
        'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      fontWeight: 600,
      letterSpacing: "-0.025em",
    },
    h5: {
      fontFamily:
        'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      fontWeight: 600,
      letterSpacing: "-0.025em",
    },
    h6: {
      fontFamily:
        'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      fontWeight: 600,
      letterSpacing: "-0.025em",
    },
    body1: {
      fontFamily:
        'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      fontWeight: 400,
    },
    body2: {
      fontFamily:
        'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      fontWeight: 400,
    },
    button: {
      fontFamily:
        'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      fontWeight: 500,
      letterSpacing: "0.025em",
      textTransform: "none",
    },
    caption: {
      fontFamily:
        "JetBrains Mono, Fira Code, SF Mono, Monaco, Inconsolata, Roboto Mono, Source Code Pro, monospace",
      fontWeight: 500,
      fontSize: "0.75rem",
    },
    overline: {
      fontFamily:
        "JetBrains Mono, Fira Code, SF Mono, Monaco, Inconsolata, Roboto Mono, Source Code Pro, monospace",
      fontWeight: 500,
      fontSize: "0.75rem",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontFamily:
            'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          fontWeight: 500,
          letterSpacing: "0.025em",
          textTransform: "none",
        },
      },
    },
    MuiCardHeader: {
      styleOverrides: {
        title: {
          fontFamily:
            'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          fontWeight: 600,
          letterSpacing: "-0.025em",
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          fontFamily:
            'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          fontWeight: 500,
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          fontFamily:
            "JetBrains Mono, Fira Code, SF Mono, Monaco, Inconsolata, Roboto Mono, Source Code Pro, monospace",
          fontSize: "0.75rem",
          fontWeight: 500,
        },
      },
    },
  },
});
