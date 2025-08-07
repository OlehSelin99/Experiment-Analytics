import React, { useState } from "react";
import {
  Box,
  Stack,
  Typography,
  Button,
  Card,
  CardContent,
  Alert,
  CircularProgress,
} from "@mui/material";
import {
  CloudUpload as CloudUploadIcon,
  Description as FileTextIcon,
  Error as ErrorIcon,
  PlayArrow as PlayArrowIcon,
} from "@mui/icons-material";
import { useFileUpload } from "../hooks/useFileUpload";
import type { ExperimentData } from "../types";

interface FileUploadProps {
  onDataLoaded: (data: ExperimentData[]) => void;
  isProcessing?: boolean;
}

const FileUpload: React.FC<FileUploadProps> = ({ onDataLoaded, isProcessing = false }) => {
  const [isLoadingDemo, setIsLoadingDemo] = useState(false);
  const [isLoadingFile, setIsLoadingFile] = useState(false);
  const [demoError, setDemoError] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const { error, processFile } = useFileUpload(onDataLoaded);

  const handleDemoLoad = async () => {
    setIsLoadingDemo(true);
    setDemoError(null);
    try {
      const response = await fetch("/logs_25k.csv");
      if (!response.ok) {
        throw new Error("Failed to load demo file");
      }

      const csvText = await response.text();
      const file = new File([csvText], "logs_25k.csv", { type: "text/csv" });

      // Use the processFile function directly
      processFile(file);
    } catch (error) {
      console.error("Error loading demo file:", error);
      setDemoError("Failed to load demo file. Please try again.");
      setIsLoadingDemo(false);
    }
  };

  const handleFileUpload = (files: FileList | null) => {
    if (files && files.length > 0) {
      setIsLoadingFile(true);
      processFile(files[0]);
    }
  };

  const handleCustomDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      setIsLoadingFile(true);
      processFile(files[0]);
    }
  };

  const handleCustomDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleCustomDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  // Reset loading states when processing is complete
  React.useEffect(() => {
    if (!isProcessing) {
      setIsLoadingDemo(false);
      setIsLoadingFile(false);
    }
  }, [isProcessing]);

  // Show loading state when either demo is loading or file is being processed
  const isUploading = isLoadingDemo || isLoadingFile || isProcessing;

  return (
    <Box sx={{ width: "100%", maxWidth: "2xl", mx: "auto" }}>
      <Card
        sx={{
          border: "2px dashed",
          borderColor: isDragOver ? "primary.main" : "rgba(59, 130, 246, 0.3)",
          background: isDragOver
            ? "linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(139, 92, 246, 0.1))"
            : "linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(248, 250, 252, 0.9))",
          backdropFilter: "blur(20px)",
          transform: isDragOver ? "scale(1.05)" : "scale(1)",
          transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
          boxShadow: isDragOver
            ? "0 25px 50px rgba(59, 130, 246, 0.3)"
            : "0 10px 30px rgba(0, 0, 0, 0.1)",
          "&:hover": {
            borderColor: "primary.main",
            boxShadow: "0 20px 40px rgba(59, 130, 246, 0.2)",
            transform: "scale(1.02)",
          },
          opacity: isUploading ? 0.7 : 1,
          pointerEvents: isUploading ? "none" : "auto",
          position: "relative",
        }}
        onDrop={isUploading ? undefined : handleCustomDrop}
        onDragOver={isUploading ? undefined : handleCustomDragOver}
        onDragLeave={isUploading ? undefined : handleCustomDragLeave}
      >
        {isUploading && (
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "rgba(255, 255, 255, 0.9)",
              backdropFilter: "blur(4px)",
              zIndex: 1,
              borderRadius: 2,
            }}
          >
            <Stack spacing={2} alignItems="center">
              <CircularProgress size={48} color="primary" />
              <Typography variant="h6" color="primary.main">
                {isLoadingDemo ? "Loading demo data..." : "Processing file..."}
              </Typography>
            </Stack>
          </Box>
        )}
        <CardContent sx={{ p: 12, textAlign: "center" }}>
          <Stack spacing={6} alignItems="center">
            <Box
              sx={{
                position: "relative",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: 100,
                height: 100,
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(135deg, #3B82F6, #8B5CF6)",
                  borderRadius: "50%",
                  opacity: 0.3,
                }}
              />
              <Box
                sx={{
                  position: "relative",
                  background: "linear-gradient(135deg, #ffffff, #f8fafc)",
                  borderRadius: "50%",
                  p: 5,
                  boxShadow: "0 15px 35px rgba(59, 130, 246, 0.2)",
                  border: "2px solid rgba(59, 130, 246, 0.1)",
                  backdropFilter: "blur(10px)",
                }}
              >
                <CloudUploadIcon sx={{ fontSize: 48, color: "primary.main" }} />
              </Box>
            </Box>

            <Typography variant="h4" color="text.primary">
              Upload Experiment Data
            </Typography>
            <Typography
              color="text.secondary"
              variant="h6"
              sx={{ lineHeight: 1.6 }}
            >
              Drag and drop your CSV file here, or click to browse
            </Typography>

            <Stack direction="row" spacing={2}>
              <input
                type="file"
                accept=".csv"
                onChange={(e) => handleFileUpload(e.target.files)}
                style={{ display: "none" }}
                id="file-upload"
              />
              <Button
                component="label"
                variant="contained"
                size="large"
                startIcon={
                  isUploading ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    <FileTextIcon />
                  )
                }
                sx={{
                  background: "linear-gradient(135deg, #3B82F6, #8B5CF6)",
                  boxShadow: "0 8px 25px rgba(59, 130, 246, 0.3)",
                  "&:hover": {
                    boxShadow: "0 15px 35px rgba(59, 130, 246, 0.4)",
                    background: "linear-gradient(135deg, #2563EB, #7C3AED)",
                  },
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  borderRadius: 3,
                  px: 4,
                  py: 1.5,
                  fontSize: "1.1rem",
                  fontWeight: 600,
                }}
                onClick={() => document.getElementById("file-upload")?.click()}
                disabled={isUploading}
              >
                {isUploading ? (isLoadingDemo ? "Loading..." : "Uploading...") : "Choose File"}
              </Button>

              <Button
                variant="outlined"
                size="large"
                startIcon={
                  isLoadingDemo ? (
                    <CircularProgress size={24} color="success" />
                  ) : (
                    <PlayArrowIcon />
                  )
                }
                onClick={handleDemoLoad}
                disabled={isLoadingDemo || isUploading}
                sx={{
                  borderColor: "rgba(16, 185, 129, 0.3)",
                  color: "success.main",
                  "&:hover": {
                    borderColor: "success.main",
                    backgroundColor: "rgba(16, 185, 129, 0.05)",
                    transform: "translateY(-2px)",
                  },
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  borderRadius: 3,
                  px: 4,
                  py: 1.5,
                  fontSize: "1.1rem",
                  fontWeight: 600,
                }}
              >
                {isLoadingDemo ? "Loading..." : "Get Demo"}
              </Button>
            </Stack>

            {error && (
              <Alert severity="error" sx={{ mt: 3 }}>
                <ErrorIcon />
                {error}
              </Alert>
            )}

            {demoError && (
              <Alert severity="error" sx={{ mt: 3 }}>
                <ErrorIcon />
                {demoError}
              </Alert>
            )}

            <Stack
              spacing={2}
              sx={{ mt: 8, fontSize: "0.875rem", color: "text.secondary" }}
            >
              <Typography variant="body2" fontWeight="medium">
                Expected CSV format:
              </Typography>
              <Box
                sx={{
                  bgcolor: "grey.100",
                  px: 3,
                  py: 1,
                  borderRadius: 2,
                  fontSize: "0.75rem",
                  fontFamily: "mono",
                }}
              >
                experiment_id,metric_name,step,value
              </Box>
            </Stack>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
};

export default FileUpload;
