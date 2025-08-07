import { useState, useCallback } from "react";
import Papa from "papaparse";
import type { ExperimentData } from "../types";

export const useFileUpload = (
  onDataLoaded: (data: ExperimentData[]) => void
) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const processFile = useCallback(
    (file: File) => {
      setError(null);

      if (!file.name.endsWith(".csv")) {
        setError("Please upload a CSV file");
        return;
      }

      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (results: Papa.ParseResult<ExperimentData>) => {
          if (results.errors.length > 0) {
            setError("Error parsing CSV file");
            return;
          }

          const data = results.data;

          // Validate data structure
          const requiredFields = [
            "experiment_id",
            "metric_name",
            "step",
            "value",
          ];
          const hasAllFields = data.every((row) =>
            requiredFields.every((field) => field in row)
          );

          if (!hasAllFields) {
            setError(
              "CSV file must contain columns: experiment_id, metric_name, step, value"
            );
            return;
          }

          // Convert step and value to numbers
          const processedData = data.map((row) => ({
            ...row,
            step: Number(row.step),
            value: Number(row.value),
          }));

          onDataLoaded(processedData);
        },
        error: () => {
          setError("Error reading file");
        },
      });
    },
    [onDataLoaded]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragOver(false);

      const files = e.dataTransfer.files;
      if (files.length > 0) {
        processFile(files[0]);
      }
    },
    [processFile]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (files && files.length > 0) {
        processFile(files[0]);
      }
    },
    [processFile]
  );

  return {
    isDragOver,
    error,
    handleDrop,
    handleDragOver,
    handleDragLeave,
    handleFileSelect,
    processFile,
  };
};
