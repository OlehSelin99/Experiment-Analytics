import React, { useCallback } from "react";
import {
  Box,
  Stack,
  Typography,
  Button,
  Card,
  CardContent,
  CardHeader,
} from "@mui/material";
import {
  People as PeopleIcon,
  FilterList as FilterIcon,
  CheckBox as CheckBoxIcon,
  CheckBoxOutlineBlank as CheckBoxOutlineBlankIcon,
} from "@mui/icons-material";
import type { ProcessedData } from "../types";

interface ExperimentSelectorProps {
  data: ProcessedData;
  selectedExperiments: string[];
  onSelectionChange: (experiments: string[]) => void;
}

const ExperimentSelector: React.FC<ExperimentSelectorProps> = React.memo(
  ({ data, selectedExperiments, onSelectionChange }) => {
    const handleExperimentToggle = useCallback(
      (experimentId: string) => {
        const newSelection = selectedExperiments.includes(experimentId)
          ? selectedExperiments.filter((id) => id !== experimentId)
          : [...selectedExperiments, experimentId];

        onSelectionChange(newSelection);
      },
      [selectedExperiments, onSelectionChange]
    );

    const handleSelectAll = useCallback(() => {
      onSelectionChange(data.experiments);
    }, [data.experiments, onSelectionChange]);

    const handleDeselectAll = useCallback(() => {
      onSelectionChange([]);
    }, [onSelectionChange]);

    return (
      <Card
        sx={{
          background:
            "linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(248, 250, 252, 0.95))",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(59, 130, 246, 0.1)",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
          animation: "slideInLeft 0.6s ease-out",
          "@keyframes slideInLeft": {
            from: { transform: "translateX(-30px)", opacity: 0 },
            to: { transform: "translateX(0)", opacity: 1 },
          },
        }}
      >
        <CardHeader
          avatar={
            <Box
              sx={{
                background: "linear-gradient(135deg, #8B5CF6, #A855F7)",
                borderRadius: 2,
                width: 48,
                height: 48,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 8px 25px rgba(139, 92, 246, 0.3)",
              }}
            >
              <PeopleIcon sx={{ color: "white", fontSize: 24 }} />
            </Box>
          }
          title={
            <Box>
              <Typography
                variant="h6"
                sx={{
                  background: "linear-gradient(135deg, #1e293b, #8B5CF6)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  fontWeight: 700,
                  mb: 2,
                }}
              >
                Experiments
              </Typography>
            </Box>
          }
        />
        <Stack direction="row" spacing={1} sx={{ pl: 2 }}>
          <Button
            onClick={handleSelectAll}
            size="small"
            variant="text"
            color="primary"
            sx={{
              background:
                "linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(139, 92, 246, 0.1))",
              "&:hover": {
                background:
                  "linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(139, 92, 246, 0.2))",
                transform: "translateY(-1px)",
              },
              transition: "all 0.2s ease",
              borderRadius: 2,
            }}
          >
            Select All
          </Button>
          <Button
            onClick={handleDeselectAll}
            size="small"
            variant="text"
            color="inherit"
            sx={{
              "&:hover": {
                backgroundColor: "rgba(239, 68, 68, 0.1)",
                color: "error.main",
                transform: "translateY(-1px)",
              },
              transition: "all 0.2s ease",
              borderRadius: 2,
            }}
          >
            Clear
          </Button>
        </Stack>
        <CardContent>
          <Stack spacing={2}>
            {data.experiments.map((experimentId, index) => {
              const isSelected = selectedExperiments.includes(experimentId);
              const metricsCount = Object.keys(
                data.data[experimentId] || {}
              ).length;

              return (
                <Card
                  key={experimentId}
                  variant="outlined"
                  sx={{
                    cursor: "pointer",
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    background: isSelected
                      ? "linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(139, 92, 246, 0.1))"
                      : "linear-gradient(135deg, rgba(255, 255, 255, 0.8), rgba(248, 250, 252, 0.8))",
                    backdropFilter: "blur(10px)",
                    borderColor: isSelected
                      ? "primary.main"
                      : "rgba(59, 130, 246, 0.2)",
                    borderWidth: isSelected ? 2 : 1,
                    boxShadow: isSelected
                      ? "0 8px 25px rgba(59, 130, 246, 0.2)"
                      : "0 4px 15px rgba(0, 0, 0, 0.05)",
                    "&:hover": {
                      borderColor: isSelected ? "primary.main" : "primary.main",
                      background: isSelected
                        ? "linear-gradient(135deg, rgba(59, 130, 246, 0.15), rgba(139, 92, 246, 0.15))"
                        : "linear-gradient(135deg, rgba(59, 130, 246, 0.05), rgba(139, 92, 246, 0.05))",
                      boxShadow: "0 12px 30px rgba(59, 130, 246, 0.15)",
                      transform: "translateY(-2px)",
                    },
                    animation: `fadeInUp 0.4s ease-out ${index * 0.1}s both`,
                    "@keyframes fadeInUp": {
                      from: { opacity: 0, transform: "translateY(20px)" },
                      to: { opacity: 1, transform: "translateY(0)" },
                    },
                  }}
                  onClick={() => handleExperimentToggle(experimentId)}
                >
                  <CardContent sx={{ py: 2, px: 3 }}>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Box sx={{ mr: 2 }}>
                        {isSelected ? (
                          <CheckBoxIcon
                            sx={{ fontSize: 24, color: "primary.main" }}
                          />
                        ) : (
                          <CheckBoxOutlineBlankIcon
                            sx={{ fontSize: 24, color: "grey.400" }}
                          />
                        )}
                      </Box>
                      <Box sx={{ flex: 1 }}>
                        <Typography
                          variant="subtitle1"
                          fontWeight="semibold"
                          color="text.primary"
                          gutterBottom
                        >
                          {experimentId}
                        </Typography>
                        <Stack
                          direction="row"
                          spacing={0.5}
                          alignItems="center"
                        >
                          <FilterIcon
                            sx={{ fontSize: 12, color: "text.secondary" }}
                          />
                          <Typography variant="body2" color="text.secondary">
                            {metricsCount} metric{metricsCount !== 1 ? "s" : ""}
                          </Typography>
                        </Stack>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              );
            })}
          </Stack>

          {selectedExperiments.length > 0 && (
            <Box sx={{ mt: 3, pt: 2, borderTop: 1, borderColor: "grey.200" }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  fontSize: "0.875rem",
                }}
              >
                <Typography variant="body2" color="text.secondary">
                  {selectedExperiments.length} of {data.experiments.length}{" "}
                  selected
                </Typography>
                <Box
                  sx={{
                    width: 8,
                    height: 8,
                    bgcolor: "primary.main",
                    borderRadius: "50%",
                  }}
                />
              </Box>
            </Box>
          )}
        </CardContent>
      </Card>
    );
  }
);

export default ExperimentSelector;
