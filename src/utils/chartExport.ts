interface ChartExportOptions {
  title?: string;
  titleHeight?: number;
  titleFontSize?: string;
  titleColor?: string;
  backgroundColor?: string;
  fileName?: string;
}

export const exportChartAsImage = async (
  chartRef: HTMLDivElement | null,
  metric: string,
  options: ChartExportOptions = {}
): Promise<void> => {
  if (!chartRef) return;

  const {
    title = metric,
    titleHeight = 60,
    titleFontSize = "bold 24px Arial",
    titleColor = "#1e293b",
    backgroundColor = "#ffffff",
    fileName = `${metric}_chart.png`,
  } = options;

  try {
    // Use html2canvas to capture the chart as image
    const html2canvas = (await import("html2canvas")).default;
    const canvas = await html2canvas(chartRef, {
      background: backgroundColor,
      useCORS: true,
      allowTaint: true,
    });

    // Create a new canvas with title
    const finalCanvas = document.createElement("canvas");
    const ctx = finalCanvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size (add space for title)
    finalCanvas.width = canvas.width;
    finalCanvas.height = canvas.height + titleHeight;

    // Fill background
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, finalCanvas.width, finalCanvas.height);

    // Add title
    ctx.fillStyle = titleColor;
    ctx.font = titleFontSize;
    ctx.textAlign = "center";
    ctx.fillText(title, finalCanvas.width / 2, 35);

    // Draw the chart below the title
    ctx.drawImage(canvas, 0, titleHeight);

    // Convert to blob and download
    finalCanvas.toBlob((blob) => {
      if (blob) {
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      }
    }, "image/png");
  } catch (error) {
    console.error("Error exporting chart:", error);
  }
};
