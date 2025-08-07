import React from "react";
import { Stack, Typography } from "@mui/material";
import { Analytics as AnalyticsIcon } from "@mui/icons-material";

interface ChartStatsProps {
  data: any[];
  selectedExperiments: string[];
}

const ChartStats: React.FC<ChartStatsProps> = ({
  data,
  selectedExperiments,
}) => {
  const stats = React.useMemo(() => {
    if (data.length === 0) return null;

    const allValues = selectedExperiments.flatMap((expId) =>
      data
        .map((point) => point[expId])
        .filter((val) => typeof val === "number" && !isNaN(val))
    ) as number[];

    if (allValues.length === 0) return null;

    let min = allValues[0];
    let max = allValues[0];
    let sum = 0;

    for (let i = 0; i < allValues.length; i++) {
      const val = allValues[i];
      if (val < min) min = val;
      if (val > max) max = val;
      sum += val;
    }

    const avg = sum / allValues.length;

    return { min, max, avg };
  }, [data, selectedExperiments]);

  if (!stats) return null;

  return (
    <Stack direction="row" spacing={2} sx={{ fontSize: "0.875rem" }}>
      <Stack direction="row" spacing={0.5} alignItems="center">
        <AnalyticsIcon sx={{ fontSize: 16, color: "success.main" }} />
        <Typography variant="body2" color="text.secondary">
          Min: {stats.min.toFixed(4)}
        </Typography>
      </Stack>
      <Stack direction="row" spacing={0.5} alignItems="center">
        <AnalyticsIcon sx={{ fontSize: 16, color: "primary.main" }} />
        <Typography variant="body2" color="text.secondary">
          Max: {stats.max.toFixed(4)}
        </Typography>
      </Stack>
      <Stack direction="row" spacing={0.5} alignItems="center">
        <AnalyticsIcon sx={{ fontSize: 16, color: "secondary.main" }} />
        <Typography variant="body2" color="text.secondary">
          Avg: {stats.avg.toFixed(4)}
        </Typography>
      </Stack>
    </Stack>
  );
};

export default ChartStats;
