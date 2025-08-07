import type { ProcessedData } from "../types";

export const exportDataToCSV = (
  processedData: ProcessedData,
  selectedExperiments: string[],
  selectedMetrics: string[]
): void => {
  if (!processedData || selectedExperiments.length === 0) return;

  const exportData = selectedExperiments.flatMap((expId) =>
    selectedMetrics.flatMap((metric) => {
      const metricData = processedData.data[expId]?.[metric] || [];
      return metricData.map((point) => ({
        experiment_id: expId,
        metric_name: metric,
        step: point.step,
        value: point.value,
      }));
    })
  );

  const csv = [
    "experiment_id,metric_name,step,value",
    ...exportData.map(
      (row) =>
        `${row.experiment_id},${row.metric_name},${row.step},${row.value}`
    ),
  ].join("\n");

  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "experiment_metrics_export.csv";
  a.click();
  URL.revokeObjectURL(url);
};
