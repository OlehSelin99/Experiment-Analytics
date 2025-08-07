import { Box, ThemeProvider } from "@mui/material";
import Dashboard from "./components/Dashboard";
import AnimatedBackground from "./components/AnimatedBackground";
import { theme } from "./theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          minHeight: "100vh",
          width: "100vw",
          position: "relative",
          overflow: "hidden",
          margin: 0,
          padding: 0,
        }}
      >
        <AnimatedBackground />
        <Box
          sx={{
            position: "relative",
            zIndex: 1,
            width: "100%",
            height: "100%",
          }}
        >
          <Dashboard />
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
