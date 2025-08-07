export interface ExperimentData {
  experiment_id: string;
  metric_name: string;
  step: number;
  value: number;
}

export interface ProcessedData {
  experiments: string[];
  metrics: string[];
  data: Record<string, Record<string, { step: number; value: number }[]>>;
}

export interface ChartData {
  name: string;
  [key: string]: number | string;
}
