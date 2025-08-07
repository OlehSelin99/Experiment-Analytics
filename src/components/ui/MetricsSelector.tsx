import React from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  FormControlLabel,
  List,
  ListItem,
} from "@mui/material";
import { Bolt as ZapIcon } from "@mui/icons-material";
import { ANIMATIONS } from "../../constants/animations";
import { STYLES } from "../../constants/styles";

interface MetricsSelectorProps {
  metrics: string[];
  selectedMetrics: string[];
  selectedExperiments: string[];
  processedData: any;
  onMetricToggle: (metric: string) => void;
}

const MetricsSelector: React.FC<MetricsSelectorProps> = ({
  metrics,
  selectedMetrics,
  selectedExperiments,
  processedData,
  onMetricToggle,
}) => {
  return (
    <Card
      sx={{
        background: STYLES.gradients.card,
        backdropFilter: "blur(20px)",
        border: STYLES.borders.warning,
        boxShadow: STYLES.shadows.card,
        animation: "slideInLeft 0.6s ease-out 0.2s both",
        "@keyframes slideInLeft": ANIMATIONS.slideInLeft,
      }}
    >
      <CardHeader
        avatar={
          <Box
            sx={{
              background: STYLES.gradients.warning,
              borderRadius: 2,
              width: 48,
              height: 48,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: STYLES.shadows.warning,
            }}
          >
            <ZapIcon sx={{ color: "white", fontSize: 24 }} />
          </Box>
        }
        title={
          <Typography
            variant="h6"
            sx={{
              background: "linear-gradient(135deg, #1e293b, #F59E0B)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontWeight: 700,
            }}
          >
            Metrics
          </Typography>
        }
      />
      <CardContent>
        <List dense sx={{ maxHeight: 300, overflow: "auto" }}>
          {metrics.map((metric, index) => {
            const isSelected = selectedMetrics.includes(metric);
            const availableInAll = selectedExperiments.every(
              (expId) =>
                processedData.data[expId] && processedData.data[expId][metric]
            );

            return (
              <ListItem
                key={metric}
                dense
                sx={{
                  py: 0.5,
                  animation: `fadeInUp 0.3s ease-out ${index * 0.05}s both`,
                  "@keyframes fadeInUp": ANIMATIONS.fadeInUp,
                }}
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={isSelected}
                      onChange={() => onMetricToggle(metric)}
                      disabled={!availableInAll}
                      color="primary"
                      size="small"
                      sx={{
                        "&.Mui-checked": {
                          color: "#F59E0B",
                        },
                      }}
                    />
                  }
                  label={metric}
                  sx={{
                    opacity: availableInAll ? 1 : 0.5,
                    "& .MuiFormControlLabel-label": {
                      fontSize: "0.875rem",
                      fontWeight: 500,
                      transition: "all 0.2s ease",
                    },
                    "&:hover .MuiFormControlLabel-label": {
                      color: "#F59E0B",
                    },
                  }}
                />
              </ListItem>
            );
          })}
        </List>
      </CardContent>
    </Card>
  );
};

export default MetricsSelector;
