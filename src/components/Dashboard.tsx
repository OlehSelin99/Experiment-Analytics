import { useMemo, useCallback, useState } from "react";
import { Box, Stack } from "@mui/material";
import { processCSVData } from "../utils/dataProcessor";
import { exportDataToCSV } from "../utils/exportUtils";
import { CHART_COLORS } from "../constants/chartColors";
import { ANIMATIONS } from "../constants/animations";
import { STYLES } from "../constants/styles";
import { useExperimentData } from "../hooks/useExperimentData";
import { useChartData } from "../hooks/useChartData";
import FileUpload from "./FileUpload";
import ExperimentSelector from "./ExperimentSelector";
import MetricsChart from "./MetricsChart";
import Header from "./ui/Header";
import EmptyState from "./ui/EmptyState";
import MetricsSelector from "./ui/MetricsSelector";

const Dashboard = () => {
  const {
    rawData,
    selectedExperiments,
    selectedMetrics,
    isProcessing,
    setIsProcessing,
    handleDataLoaded,
    handleExperimentSelectionChange,
    handleMetricToggle,
    handleReset,
  } = useExperimentData();

  const [isChartLoading, setIsChartLoading] = useState(false);

  // Memoize processed data to avoid recalculation
  const processedData = useMemo(() => {
    if (rawData.length === 0) return null;
    setIsProcessing(true);
    try {
      const result = processCSVData(rawData);
      return result;
    } finally {
      setIsProcessing(false);
    }
  }, [rawData, setIsProcessing]);

  const { chartDataMap, debouncedSelectedExperiments, isDataReady } =
    useChartData(processedData, selectedExperiments, selectedMetrics);

  const handleExperimentSelectionChangeWithLoading = useCallback(
    (experiments: string[]) => {
      setIsChartLoading(true);
      handleExperimentSelectionChange(experiments, processedData);

      // Hide loading indicator after a short delay
      setTimeout(() => setIsChartLoading(false), 300);
    },
    [handleExperimentSelectionChange, processedData, setIsChartLoading]
  );

  const handleExport = useCallback(() => {
    if (processedData) {
      exportDataToCSV(processedData, selectedExperiments, selectedMetrics);
    }
  }, [processedData, selectedExperiments, selectedMetrics]);

  if (rawData.length === 0) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          width: "100vw",
          p: 4,
          pt: 6,
          background: STYLES.gradients.background,
          backdropFilter: "blur(10px)",
          margin: 0,
          overflow: "hidden",
        }}
      >
        <Box sx={{ maxWidth: "1200px", mx: "auto", width: "100%" }}>
          <Stack spacing={6} alignItems="center" textAlign="center">
            <Stack spacing={2} alignItems="center">
              <Box
                sx={{
                  background: "linear-gradient(135deg, #1e293b, #3b82f6)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  fontWeight: 700,
                  fontSize: "3rem",
                  animation: "fadeInUp 1s ease-out",
                  "@keyframes fadeInUp": ANIMATIONS.fadeInUp,
                }}
              >
                Experiment Metrics Visualizer
              </Box>
              <Box
                sx={{
                  maxWidth: "3xl",
                  lineHeight: 1.6,
                  fontSize: "1.25rem",
                  color: "text.secondary",
                  animation: "fadeInUp 1s ease-out 0.2s both",
                  "@keyframes fadeInUp": ANIMATIONS.fadeInUp,
                }}
              >
                Upload your experiment CSV file to visualize and compare metrics
                across different training runs with our advanced analytics
                dashboard.
              </Box>
            </Stack>
            <Box
              sx={{
                maxWidth: "2xl",
                width: "100%",
                animation: "fadeInUp 1s ease-out 0.4s both",
                "@keyframes fadeInUp": ANIMATIONS.fadeInUp,
              }}
            >
              <FileUpload onDataLoaded={handleDataLoaded} isProcessing={isProcessing} />
            </Box>
          </Stack>
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: "100vh" }}>
      <Header
        processedData={processedData}
        isProcessing={isProcessing}
        selectedExperimentsCount={selectedExperiments.length}
        onExport={handleExport}
        onReset={handleReset}
      />

      <Box sx={{ py: 4, px: 4, width: "100%" }}>
        <Box
          sx={{
            display: "flex",
            gap: 2,
            flexDirection: { xs: "column", lg: "row" },
            maxWidth: "1400px",
            mx: "auto",
          }}
        >
          {/* Sidebar */}
          <Box sx={{ width: { xs: "100%", lg: "25%" } }}>
            <Stack spacing={3}>
              <ExperimentSelector
                data={processedData!}
                selectedExperiments={selectedExperiments}
                onSelectionChange={handleExperimentSelectionChangeWithLoading}
              />

              {selectedExperiments.length > 0 && (
                <MetricsSelector
                  metrics={processedData?.metrics || []}
                  selectedMetrics={selectedMetrics}
                  selectedExperiments={selectedExperiments}
                  processedData={processedData}
                  onMetricToggle={handleMetricToggle}
                />
              )}
            </Stack>
          </Box>

          {/* Charts */}
          <Box sx={{ width: { xs: "100%", lg: "75%" } }}>
            {selectedExperiments.length === 0 ? (
              <EmptyState
                title="Select Experiments"
                description="Choose one or more experiments from the sidebar to view their metrics and start analyzing your data."
              />
            ) : selectedMetrics.length === 0 ? (
              <EmptyState
                title="Select Metrics"
                description="Choose one or more metrics to visualize and compare across your selected experiments."
                gradient={STYLES.gradients.success}
                iconColor="success.main"
              />
            ) : (
              <Stack spacing={4}>
                {selectedMetrics.map((metric) => {
                  const chartData = chartDataMap.get(metric) || [];
                  const isLoading = !isDataReady || isChartLoading;

                  return (
                    <MetricsChart
                      key={metric}
                      data={chartData}
                      metric={metric}
                      selectedExperiments={debouncedSelectedExperiments}
                      colors={[...CHART_COLORS]}
                      isLoading={isLoading}
                    />
                  );
                })}
              </Stack>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
