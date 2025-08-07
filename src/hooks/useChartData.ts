import { useMemo } from "react";
import type { ProcessedData, ChartData } from "../types";
import { prepareChartData } from "../utils/dataProcessor";
import { useDebounce } from "./useDebounce";

export const useChartData = (
  processedData: ProcessedData | null,
  selectedExperiments: string[],
  selectedMetrics: string[]
) => {
  // Debounce experiment selection to prevent excessive re-renders
  const debouncedSelectedExperiments = useDebounce(selectedExperiments, 500);

  // Memoize chart data to prevent recalculation
  const chartDataMap = useMemo(() => {
    if (
      !processedData ||
      debouncedSelectedExperiments.length === 0 ||
      selectedMetrics.length === 0
    ) {
      return new Map();
    }

    const map = new Map<string, ChartData[]>();
    selectedMetrics.forEach((metric) => {
      map.set(
        metric,
        prepareChartData(processedData, debouncedSelectedExperiments, metric)
      );
    });
    return map;
  }, [processedData, debouncedSelectedExperiments, selectedMetrics]);

  // Debounce chart updates to prevent excessive re-renders
  const debouncedChartDataMap = useDebounce(chartDataMap, 200);

  // Check if data is ready (not empty and has been processed)
  const isDataReady = useMemo(() => {
    return (
      processedData !== null &&
      debouncedSelectedExperiments.length > 0 &&
      selectedMetrics.length > 0 &&
      debouncedChartDataMap.size > 0
    );
  }, [
    processedData,
    debouncedSelectedExperiments,
    selectedMetrics,
    debouncedChartDataMap,
  ]);

  return {
    chartDataMap: debouncedChartDataMap,
    debouncedSelectedExperiments,
    isDataReady,
  };
};
