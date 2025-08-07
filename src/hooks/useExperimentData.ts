import { useState, useCallback } from "react";
import type { ExperimentData, ProcessedData } from "../types";
import { clearChartDataCache } from "../utils/dataProcessor";

export const useExperimentData = () => {
  const [rawData, setRawData] = useState<ExperimentData[]>([]);
  const [selectedExperiments, setSelectedExperiments] = useState<string[]>([]);
  const [selectedMetrics, setSelectedMetrics] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleDataLoaded = useCallback((data: ExperimentData[]) => {
    // Clear cache when new data is loaded
    clearChartDataCache();
    setRawData(data);
    setSelectedExperiments([]);
    setSelectedMetrics([]);
  }, []);

  const handleExperimentSelectionChange = useCallback(
    (experiments: string[], processedData: ProcessedData | null) => {
      setSelectedExperiments(experiments);

      // Auto-select metrics that are available for all selected experiments
      if (processedData && experiments.length > 0) {
        const commonMetrics = processedData.metrics.filter((metric) =>
          experiments.every(
            (expId) =>
              processedData.data[expId] && processedData.data[expId][metric]
          )
        );
        setSelectedMetrics(commonMetrics);
      }
    },
    []
  );

  const handleMetricToggle = useCallback((metric: string) => {
    setSelectedMetrics((prev) =>
      prev.includes(metric)
        ? prev.filter((m) => m !== metric)
        : [...prev, metric]
    );
  }, []);

  const handleReset = useCallback(() => {
    setRawData([]);
    setSelectedExperiments([]);
    setSelectedMetrics([]);
  }, []);

  return {
    rawData,
    selectedExperiments,
    setSelectedExperiments,
    selectedMetrics,
    setSelectedMetrics,
    isProcessing,
    setIsProcessing,
    handleDataLoaded,
    handleExperimentSelectionChange,
    handleMetricToggle,
    handleReset,
  };
};
