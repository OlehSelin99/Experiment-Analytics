# Experiment Metrics Visualizer

A modern React application for visualizing and comparing machine learning experiment metrics. Upload your CSV files and get beautiful, interactive charts to analyze your training runs.

## Features

- **Easy File Upload**: Just drag and drop your CSV files or click to browse
- **Smart Experiment Selection**: Pick which experiments you want to compare
- **Beautiful Charts**: See all your metrics in interactive line charts
- **Works Everywhere**: Looks great on desktop, tablet, and phone
- **Export Your Data**: Download your selected data as CSV
- **Smooth Experience**: Clean interface with nice animations

## Tech Stack

- **React 18** with TypeScript
- **Vite** for fast development and building
- **Material-UI** for modern UI components
- **Recharts** for data visualization
- **PapaParse** for CSV parsing
- **Lucide React** for icons



## Live Demo

🚀 **Try the application live:** [Experiment Metrics Visualizer](https://experiment-analytics.vercel.app/)

## Getting Started

### Prerequisites

- Node.js 16+
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/OlehSelin99/Experiment-Analytics.git
cd experiment-metrics
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Usage

### CSV Format

Your CSV files should have these columns:

- `experiment_id`: The name or ID of your experiment
- `metric_name`: What you're measuring (like "loss" or "accuracy")
- `step`: Which training step this is
- `value`: The actual measurement

Here's an example:

```csv
experiment_id,metric_name,step,value
exp_1,loss,0,0.8995359313058078
exp_1,loss,1,0.8921633542579104
exp_1,accuracy,0,0.123456789
exp_1,accuracy,1,0.234567890
```

### How to Use

1. **Upload your data**: Drag and drop your CSV file or click to browse
2. **Pick experiments**: Choose which experiments you want to compare
3. **Select metrics**: Pick what you want to see (loss, accuracy, etc.)
4. **Analyze**: Look at the charts and compare your experiments
5. **Export**: Download your data if you need it

## What It Does

### File Upload

- Just drag and drop your files
- Checks if your CSV is formatted correctly
- Shows helpful error messages if something's wrong
- Works with big files too

### Experiment Selection

- Shows all your experiments
- Tells you how many metrics each experiment has
- You can select multiple experiments at once
- Clear visual feedback when you select things

### Charts

- Interactive line charts that look great
- Compare multiple experiments on the same chart
- Hover over points to see exact values
- Works on any screen size
- Each experiment gets its own color
- Smooth loading when data is processing
- Adjust data density for big datasets
- Toggle dots on/off for cleaner charts

### Data Processing

- Fast CSV parsing
- Automatically checks your data
- Only shows metrics that all your selected experiments have
- Handles missing data gracefully
- Smooth updates without lag
- Smart sampling for big datasets

## Development

### Project Structure

```
src/
├── components/          # React components
│   ├── Dashboard.tsx   # Main dashboard component
│   ├── FileUpload.tsx  # File upload component
│   ├── ExperimentSelector.tsx # Experiment selection
│   ├── MetricsChart.tsx # Chart visualization
│   ├── AnimatedBackground.tsx # Animated background
│   └── ui/             # UI components
│       ├── Header.tsx  # Application header
│       ├── EmptyState.tsx # Empty state components
│       ├── ChartStats.tsx # Chart statistics
│       └── MetricsSelector.tsx # Metrics selection
├── hooks/              # Custom React hooks
│   ├── useExperimentData.ts # Experiment data management
│   ├── useChartData.ts # Chart data processing
│   ├── useFileUpload.ts # File upload logic
│   └── useDebounce.ts # Debounce utility
├── utils/              # Utility functions
│   ├── dataProcessor.ts # Data processing logic
│   └── exportUtils.ts # Export functionality
├── constants/          # Application constants
│   ├── chartColors.ts # Chart color schemes
│   ├── animations.ts # Animation definitions
│   └── styles.ts # Style constants
├── types.ts            # TypeScript type definitions
└── App.tsx             # Root component
```

### Key Components

- **Dashboard**: Main orchestrator component managing state and layout
- **FileUpload**: Handles CSV file upload with drag & drop
- **ExperimentSelector**: Manages experiment selection with bulk operations
- **MetricsChart**: Renders interactive line charts using Recharts
- **AnimatedBackground**: Provides animated particle background
- **Header**: Application header with export and reset functionality
- **EmptyState**: Empty state components with smooth animations

### State Management

Uses React's built-in state management:

- `useState` for component state
- `useMemo` for expensive calculations
- `useCallback` for performance
- Custom hooks for complex logic
- Debounced updates for smooth experience

## Deployment

### Vercel (Recommended)

1. Install Vercel CLI:

```bash
npm i -g vercel
```

2. Deploy:

```bash
vercel
```

### GitHub Pages

1. Add to `package.json`:

```json
{
  "homepage": "https://yourusername.github.io/experiment-metrics",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

2. Install gh-pages:

```bash
npm install --save-dev gh-pages
```

3. Deploy:

```bash
npm run deploy
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details



## Acknowledgments

Built for visualizing ML experiments, inspired by tools like MLflow and Weights & Biases.
