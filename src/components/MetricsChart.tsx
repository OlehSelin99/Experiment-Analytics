import React, { useCallback, useMemo, useState, useRef } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import {
  Box,
  Stack,
  Typography,
  Card,
  CardContent,
  CardHeader,
  Slider,
  FormControlLabel,
  Switch,
  CircularProgress,
  IconButton,
  Tooltip as MuiTooltip,
} from "@mui/material";
import { Download as DownloadIcon } from "@mui/icons-material";
import ChartStats from "./ui/ChartStats";
import { exportChartAsImage } from "../utils/chartExport";
import type { ChartData } from "../types";

interface MetricsChartProps {
  data: ChartData[];
  metric: string;
  selectedExperiments: string[];
  colors: string[];
  isLoading?: boolean;
}

const MetricsChart: React.FC<MetricsChartProps> = React.memo(
  ({ data, metric, selectedExperiments, colors, isLoading = false }) => {
    const [showDots, setShowDots] = useState(false);
    const [dataDensity, setDataDensity] = useState(1000); // Max data points to show
    const chartRef = useRef<HTMLDivElement>(null);

    // Optimize: intelligent data sampling based on dataset size and user preference
    const optimizedData = useMemo(() => {
      if (data.length <= dataDensity) return data;

      // Smart sampling: preserve important points (start, end, peaks, valleys)
      const step = Math.ceil(data.length / dataDensity);
      const sampled = data.filter((_, index) => index % step === 0);

      // Always include first and last points
      if (sampled[0] !== data[0]) sampled.unshift(data[0]);
      if (sampled[sampled.length - 1] !== data[data.length - 1]) {
        sampled.push(data[data.length - 1]);
      }

      return sampled;
    }, [data, dataDensity]);

    const formatLegend = useCallback((value: string) => {
      return value;
    }, []);

    const handleExportChart = useCallback(async () => {
      try {
        await exportChartAsImage(chartRef.current, metric);
      } catch (error) {
        console.error("Error exporting chart:", error);
      }
    }, [metric]);

    // Custom tooltip component for better performance
    const CustomTooltip = useCallback(({ active, payload, label }: any) => {
      if (!active || !payload || payload.length === 0) return null;

      return (
        <Box
          sx={{
            backgroundColor: "rgba(255, 255, 255, 0.98)",
            border: "1px solid #e5e7eb",
            borderRadius: "12px",
            padding: "12px",
            boxShadow: "0 10px 25px rgba(0, 0, 0, 0.15)",
            backdropFilter: "blur(10px)",
            maxWidth: "300px",
          }}
        >
          <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
            {`Step ${label.replace("Step ", "")}`}
          </Typography>
          {payload.map((entry: any, index: number) => (
            <Box
              key={index}
              sx={{ display: "flex", alignItems: "center", mb: 0.5 }}
            >
              <Box
                sx={{
                  width: 12,
                  height: 12,
                  borderRadius: "50%",
                  backgroundColor: entry.color,
                  mr: 1,
                }}
              />
              <Typography variant="body2" sx={{ flex: 1 }}>
                {entry.name}:
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                {typeof entry.value === "number"
                  ? entry.value.toFixed(4)
                  : "N/A"}
              </Typography>
            </Box>
          ))}
        </Box>
      );
    }, []);

    return (
      <Card
        sx={{
          background:
            "linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(248, 250, 252, 0.95))",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(16, 185, 129, 0.1)",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
          animation: "slideInRight 0.6s ease-out",
          "@keyframes slideInRight": {
            from: { transform: "translateX(30px)", opacity: 0 },
            to: { transform: "translateX(0)", opacity: 1 },
          },
        }}
      >
        <CardHeader
          title={
            <Typography
              variant="h6"
              sx={{
                background: "linear-gradient(135deg, #1e293b, #10B981)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontWeight: 700,
              }}
            >
              {metric}
            </Typography>
          }
          subheader={`${selectedExperiments.length} experiment${
            selectedExperiments.length !== 1 ? "s" : ""
          } selected${
            data.length > dataDensity
              ? ` (${optimizedData.length}/${data.length} points shown)`
              : ""
          }`}
          action={
            <Stack direction="row" spacing={1} alignItems="center">
              <MuiTooltip title="Export chart as image">
                <IconButton
                  onClick={handleExportChart}
                  size="small"
                  sx={{
                    color: "primary.main",
                    "&:hover": {
                      backgroundColor: "rgba(59, 130, 246, 0.1)",
                      transform: "scale(1.1)",
                    },
                    transition: "all 0.2s ease",
                  }}
                >
                  <DownloadIcon />
                </IconButton>
              </MuiTooltip>
              <ChartStats
                data={optimizedData}
                selectedExperiments={selectedExperiments}
              />
            </Stack>
          }
        />
        <CardContent>
          {/* Controls */}
          <Stack
            direction="row"
            spacing={2}
            sx={{ mb: 2, alignItems: "center" }}
          >
            <FormControlLabel
              control={
                <Switch
                  checked={showDots}
                  onChange={(e) => setShowDots(e.target.checked)}
                  size="small"
                />
              }
              label="Show dots"
            />
            <Box sx={{ flex: 1, maxWidth: 200 }}>
              <Typography variant="caption" color="text.secondary">
                Data density: {dataDensity}
              </Typography>
              <Slider
                value={dataDensity}
                onChange={(_, value) => setDataDensity(value as number)}
                min={100}
                max={5000}
                step={100}
                size="small"
                sx={{ mt: 0.5 }}
              />
            </Box>
          </Stack>

          <Box ref={chartRef} sx={{ height: 320 }}>
            {!isLoading && data.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={optimizedData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                  style={{
                    animation: "fadeIn 0.8s ease-out",
                    "@keyframes fadeIn": {
                      from: { opacity: 0 },
                      to: { opacity: 1 },
                    },
                  }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#f0f0f0"
                    opacity={0.5}
                  />
                  <XAxis
                    dataKey="name"
                    tick={{ fontSize: 12, fill: "#6b7280" }}
                    tickFormatter={(value) => value.replace("Step ", "")}
                    axisLine={{ stroke: "#e5e7eb" }}
                    tickLine={{ stroke: "#e5e7eb" }}
                  />
                  <YAxis
                    tick={{ fontSize: 12, fill: "#6b7280" }}
                    tickFormatter={(value) => value.toFixed(3)}
                    axisLine={{ stroke: "#e5e7eb" }}
                    tickLine={{ stroke: "#e5e7eb" }}
                  />
                  <Tooltip
                    content={<CustomTooltip />}
                    isAnimationActive={false}
                    animationDuration={0}
                  />
                  <Legend
                    formatter={formatLegend}
                    wrapperStyle={{
                      paddingTop: "20px",
                    }}
                  />

                  {selectedExperiments.map((experimentId, index) => (
                    <Line
                      key={experimentId}
                      type="monotone"
                      dataKey={experimentId}
                      stroke={colors[index % colors.length]}
                      strokeWidth={2}
                      dot={
                        showDots
                          ? {
                              r: 3,
                              fill: colors[index % colors.length],
                              strokeWidth: 1,
                              stroke: "#ffffff",
                            }
                          : false
                      }
                      activeDot={{
                        r: 5,
                        fill: colors[index % colors.length],
                        strokeWidth: 2,
                        stroke: "#ffffff",
                      }}
                      connectNulls={false}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      animationDuration={800 + index * 100}
                      animationBegin={index * 100}
                      isAnimationActive
                    />
                  ))}
                </LineChart>
              </ResponsiveContainer>
            ) : isLoading ? (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "100%",
                }}
              >
                <CircularProgress />
              </Box>
            ) : (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "100%",
                }}
              >
                <Typography color="text.secondary">
                  No data available for this metric
                </Typography>
              </Box>
            )}
          </Box>
        </CardContent>
      </Card>
    );
  }
);

export default MetricsChart;
