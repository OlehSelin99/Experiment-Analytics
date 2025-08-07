import React from "react";
import {
  Box,
  Stack,
  Typography,
  Button,
  Paper,
  CircularProgress,
  Tooltip,
} from "@mui/material";
import {
  TrendingUp as TrendingUpIcon,
  Download as DownloadIcon,
  Refresh as RefreshIcon,
} from "@mui/icons-material";
import { ANIMATIONS } from "../../constants/animations";
import { STYLES } from "../../constants/styles";

interface HeaderProps {
  processedData: any;
  isProcessing: boolean;
  selectedExperimentsCount: number;
  onExport: () => void;
  onReset: () => void;
}

const Header: React.FC<HeaderProps> = ({
  processedData,
  isProcessing,
  selectedExperimentsCount,
  onExport,
  onReset,
}) => {
  return (
    <Paper
      elevation={0}
      sx={{
        position: "sticky",
        top: 0,
        zIndex: 10,
        background: STYLES.gradients.header,
        backdropFilter: "blur(20px)",
        borderBottom: STYLES.borders.primary,
        animation: "slideDown 0.6s ease-out",
        "@keyframes slideDown": ANIMATIONS.slideDown,
      }}
    >
      <Box sx={{ maxWidth: "1400px", mx: "auto", px: 4 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            py: 3,
          }}
        >
          <Stack direction="row" spacing={2} alignItems="center">
            <Box
              sx={{
                background: STYLES.gradients.primary,
                p: 2,
                borderRadius: 3,
                boxShadow: STYLES.shadows.primary,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <TrendingUpIcon sx={{ color: "white", fontSize: 28 }} />
            </Box>
            <Box>
              <Typography
                variant="h4"
                color="text.primary"
                sx={{
                  background: "linear-gradient(135deg, #1e293b, #3b82f6)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  fontWeight: 700,
                }}
              >
                Experiment Analytics
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {processedData?.experiments.length} experiments,{" "}
                {processedData?.metrics.length} metrics
                {isProcessing && (
                  <span style={{ marginLeft: 8 }}>
                    <CircularProgress 
                      size={12} 
                      sx={{ 
                        color: "primary.main",
                        animation: "pulse 2s ease-in-out infinite",
                        "@keyframes pulse": {
                          "0%": { opacity: 0.6 },
                          "50%": { opacity: 1 },
                          "100%": { opacity: 0.6 },
                        },
                      }} 
                    />
                  </span>
                )}
              </Typography>
            </Box>
          </Stack>
          <Stack direction="row" spacing={2}>
            <Tooltip 
              title={selectedExperimentsCount === 0 ? "Select data from the left menu to export" : "Export selected data to CSV"}
              disableInteractive={false}
            >
              <span>
                <Button
                  onClick={onExport}
                  disabled={selectedExperimentsCount === 0}
                  variant="contained"
                  size="medium"
                  startIcon={<DownloadIcon />}
                  sx={{
                    background: selectedExperimentsCount === 0
                      ? "linear-gradient(135deg, #f3f4f6, #e5e7eb)"
                      : "linear-gradient(135deg, #10b981, #059669)",
                    color: selectedExperimentsCount === 0 ? "#9ca3af" : "white",
                    border: selectedExperimentsCount === 0 
                      ? "1px solid #d1d5db" 
                      : "1px solid rgba(16, 185, 129, 0.2)",
                    borderRadius: 3,
                    px: 3,
                    py: 1.5,
                    fontSize: "0.875rem",
                    fontWeight: 600,
                    textTransform: "none",
                    letterSpacing: "0.025em",
                    boxShadow: selectedExperimentsCount === 0
                      ? "0 2px 8px rgba(156, 163, 175, 0.15)"
                      : "0 4px 20px rgba(16, 185, 129, 0.25)",
                    "&:hover": {
                      background: selectedExperimentsCount === 0
                        ? "linear-gradient(135deg, #f3f4f6, #e5e7eb)"
                        : "linear-gradient(135deg, #059669, #047857)",
                      borderColor: selectedExperimentsCount === 0 
                        ? "#d1d5db" 
                        : "rgba(16, 185, 129, 0.4)",
                      boxShadow: selectedExperimentsCount === 0
                        ? "0 2px 8px rgba(156, 163, 175, 0.15)"
                        : "0 8px 30px rgba(16, 185, 129, 0.35)",
                      transform: selectedExperimentsCount === 0 ? "none" : "translateY(-2px)",
                    },
                    "&:active": {
                      transform: selectedExperimentsCount === 0 ? "none" : "translateY(0px)",
                      borderColor: selectedExperimentsCount === 0 
                        ? "#d1d5db" 
                        : "rgba(16, 185, 129, 0.6)",
                      boxShadow: selectedExperimentsCount === 0
                        ? "0 2px 8px rgba(156, 163, 175, 0.15)"
                        : "0 4px 20px rgba(16, 185, 129, 0.25)",
                    },
                    "&:disabled": {
                      background: "linear-gradient(135deg, #f3f4f6, #e5e7eb)",
                      color: "#9ca3af",
                      borderColor: "#d1d5db",
                      cursor: "not-allowed",
                      transform: "none",
                    },
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    position: "relative",
                    overflow: "hidden",
                    "&::before": {
                      content: '""',
                      position: "absolute",
                      top: 0,
                      left: "-100%",
                      width: "100%",
                      height: "100%",
                      background: selectedExperimentsCount === 0
                        ? "transparent"
                        : "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)",
                      transition: "left 0.5s ease",
                    },
                    "&:hover::before": {
                      left: selectedExperimentsCount === 0 ? "-100%" : "100%",
                    },
                  }}
                >
                  {selectedExperimentsCount === 0 ? "No Data to Export" : `Export Data (${selectedExperimentsCount})`}
                </Button>
              </span>
            </Tooltip>
            <Tooltip title="Reset filters and view all data">
              <Button
                onClick={onReset}
                variant="outlined"
                size="medium"
                startIcon={<RefreshIcon />}
                sx={{
                  borderColor: "rgba(59, 130, 246, 0.3)",
                  color: "primary.main",
                  borderRadius: 3,
                  px: 3,
                  py: 1.5,
                  fontSize: "0.875rem",
                  fontWeight: 600,
                  textTransform: "none",
                  letterSpacing: "0.025em",
                  background: "rgba(59, 130, 246, 0.02)",
                  boxShadow: "0 2px 8px rgba(59, 130, 246, 0.1)",
                  "&:hover": {
                    borderColor: "primary.main",
                    backgroundColor: "rgba(59, 130, 246, 0.08)",
                    transform: "translateY(-2px)",
                    boxShadow: "0 4px 20px rgba(59, 130, 246, 0.2)",
                  },
                  "&:active": {
                    transform: "translateY(0px)",
                    boxShadow: "0 2px 8px rgba(59, 130, 246, 0.1)",
                  },
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  position: "relative",
                  overflow: "hidden",
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: "-100%",
                    width: "100%",
                    height: "100%",
                    background: "linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.1), transparent)",
                    transition: "left 0.5s ease",
                  },
                  "&:hover::before": {
                    left: "100%",
                  },
                }}
              >
                Reset
              </Button>
            </Tooltip>
          </Stack>
        </Box>
      </Box>
    </Paper>
  );
};

export default Header;
