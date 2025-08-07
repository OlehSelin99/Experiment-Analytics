import React from "react";
import { Box, Stack, Typography, Card, CardContent } from "@mui/material";
import { BarChart as BarChartIcon } from "@mui/icons-material";
import { ANIMATIONS } from "../../constants/animations";
import { STYLES } from "../../constants/styles";

interface EmptyStateProps {
  title: string;
  description: string;
  gradient?: string;
  iconColor?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  gradient = STYLES.gradients.primary,
  iconColor = "primary.main",
}) => {
  return (
    <Box sx={{ py: 16, textAlign: "center" }}>
      <Card
        sx={{
          background: STYLES.gradients.card,
          backdropFilter: "blur(20px)",
          border: STYLES.borders.primary,
          boxShadow: STYLES.shadows.card,
          animation: "slideInRight 0.6s ease-out",
          "@keyframes slideInRight": ANIMATIONS.slideInRight,
        }}
      >
        <CardContent sx={{ p: 12 }}>
          <Stack spacing={6} alignItems="center">
            <Box
              sx={{
                position: "relative",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: 80,
                height: 80,
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  inset: 0,
                  background: gradient,
                  borderRadius: "50%",
                  opacity: 0.2,
                  animation: "gradientShift 3s ease-in-out infinite",
                  "@keyframes gradientShift": {
                    "0%, 100%": {
                      background: "linear-gradient(135deg, #3B82F6, #8B5CF6)",
                    },
                    "50%": {
                      background: "linear-gradient(135deg, #8B5CF6, #10B981)",
                    },
                  },
                }}
              />
              <Box
                sx={{
                  background: "linear-gradient(135deg, #ffffff, #f8fafc)",
                  borderRadius: "50%",
                  boxShadow: STYLES.shadows.primary,
                  border: "2px solid rgba(59, 130, 246, 0.1)",
                  backdropFilter: "blur(10px)",
                  height: 100,
                  width: 100,
                  minWidth: 100,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <BarChartIcon sx={{ fontSize: 50, color: iconColor }} />
              </Box>
            </Box>
            <Typography
              variant="h5"
              sx={{
                background: "linear-gradient(135deg, #1e293b, #3b82f6)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontWeight: 700,
              }}
            >
              {title}
            </Typography>
            <Typography color="text.secondary" sx={{ maxWidth: "md" }}>
              {description}
            </Typography>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
};

export default EmptyState;
