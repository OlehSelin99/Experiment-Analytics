import type { ExperimentData, ProcessedData, ChartData } from "../types";

// Cache for chart data to avoid recalculation
const chartDataCache = new Map<string, ChartData[]>();

export const processCSVData = (rawData: ExperimentData[]): ProcessedData => {
  if (rawData.length === 0) {
    return {
      experiments: [],
      metrics: [],
      data: {},
    };
  }

  const experiments = new Set<string>();
  const metrics = new Set<string>();
  const data: Record<
    string,
    Record<string, { step: number; value: number }[]>
  > = {};

  // Process data in chunks to avoid blocking the UI
  const chunkSize = 1000;
  for (let i = 0; i < rawData.length; i += chunkSize) {
    const chunk = rawData.slice(i, i + chunkSize);

    chunk.forEach((row) => {
      experiments.add(row.experiment_id);
      metrics.add(row.metric_name);

      if (!data[row.experiment_id]) {
        data[row.experiment_id] = {};
      }

      if (!data[row.experiment_id][row.metric_name]) {
        data[row.experiment_id][row.metric_name] = [];
      }

      data[row.experiment_id][row.metric_name].push({
        step: row.step,
        value: row.value,
      });
    });
  }

  // Sort data points by step
  Object.values(data).forEach((experimentData) => {
    Object.values(experimentData).forEach((metricData) => {
      metricData.sort((a, b) => a.step - b.step);
    });
  });

  return {
    experiments: Array.from(experiments).sort(),
    metrics: Array.from(metrics).sort(),
    data,
  };
};

export const prepareChartData = (
  processedData: ProcessedData,
  selectedExperiments: string[],
  metric: string
): ChartData[] => {
  if (!processedData || selectedExperiments.length === 0) {
    return [];
  }

  // Create cache key
  const sortedExperiments = [...selectedExperiments].sort();
  const cacheKey = `${metric}:${sortedExperiments.join(",")}`;

  // Check cache first
  if (chartDataCache.has(cacheKey)) {
    return chartDataCache.get(cacheKey)!;
  }

  const chartData: ChartData[] = [];

  // Optimize: Create a map for faster lookups
  const experimentDataMap = new Map<string, Map<number, number>>();

  selectedExperiments.forEach((expId) => {
    const metricData = processedData.data[expId]?.[metric] || [];
    const stepMap = new Map<number, number>();
    metricData.forEach((point) => stepMap.set(point.step, point.value));
    experimentDataMap.set(expId, stepMap);
  });

  // Get all unique steps more efficiently
  const allSteps = new Set<number>();
  experimentDataMap.forEach((stepMap) => {
    stepMap.forEach((_, step) => allSteps.add(step));
  });

  const sortedSteps = Array.from(allSteps).sort((a, b) => a - b);

  // Build chart data more efficiently
  sortedSteps.forEach((step) => {
    const dataPoint: ChartData = { name: `Step ${step}` };

    selectedExperiments.forEach((expId) => {
      const stepMap = experimentDataMap.get(expId);
      const value = stepMap?.get(step);
      dataPoint[expId] = value !== undefined ? value : 0;
    });

    chartData.push(dataPoint);
  });

  // Cache the result
  chartDataCache.set(cacheKey, chartData);

  // Limit cache size to prevent memory leaks
  if (chartDataCache.size > 100) {
    const firstKey = chartDataCache.keys().next().value;
    if (firstKey) {
      chartDataCache.delete(firstKey);
    }
  }

  return chartData;
};

// Clear cache when new data is loaded
export const clearChartDataCache = () => {
  chartDataCache.clear();
};
