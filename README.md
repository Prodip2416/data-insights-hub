# 📊 Data Insights Hub

<div align="center">

![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5.0.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Chart.js](https://img.shields.io/badge/Chart.js-4.4.0-FF6384?style=for-the-badge&logo=chart.js&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.3.0-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![D3.js](https://img.shields.io/badge/D3.js-7.8.5-F9A03C?style=for-the-badge&logo=d3.js&logoColor=white)

**A comprehensive, enterprise-grade data visualization dashboard built with modern React patterns and professional export capabilities.**

[🚀 Live Demo](https://prodip2416.github.io/data-insights-hub/) • [📖 Documentation](#-features) • [🛠️ Installation](#-installation) • [📁 Project Structure](#-project-structure)

</div>

---

## ✨ Features

### 🎨 **Advanced Data Visualization**
- **8 Chart Types**: Line, Area, Bar, Pie, Scatter, Heatmap, Gauge, and Tree charts
- **Interactive Charts**: Hover effects, tooltips, and animations
- **Real-time Updates**: Dynamic data rendering with smooth transitions
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices

### 📤 **Professional Export System**
- **Multiple Formats**: PNG, SVG, PDF, and JPEG export
- **High Resolution**: 2x scale for crisp, professional-quality exports
- **Auto Timestamping**: Unique filenames with timestamps
- **Chart-Specific Optimization**: Tailored export settings for each chart type

### 🎨 **Advanced Theming & Customization**
- **20+ Color Schemes**: Professional color palettes with categories
- **Dark/Light Mode**: Complete theme switching with persistence
- **Dynamic Color Management**: Real-time color scheme updates
- **Customizable Settings**: Animation speed, grid visibility, legend display

### 📊 **Comprehensive Dashboard**
- **Performance Metrics**: KPI cards with trend indicators
- **Financial Summary**: Revenue, expenses, and profit analysis
- **Marketing ROI**: Campaign performance and conversion tracking
- **User Analytics**: Engagement metrics and user behavior insights

### 🔧 **Developer Experience**
- **Modern React Patterns**: Hooks, Context API, and custom components
- **Type Safety**: PropTypes and TypeScript-like patterns
- **Error Handling**: Comprehensive error boundaries and user feedback
- **Performance Optimization**: Memoization and efficient rendering

## 🛠️ Technologies

### **Frontend Framework**
- **React 18.2.0** - Modern React with concurrent features
- **Vite 5.0.0** - Lightning-fast build tool and dev server
- **React Router 6.8.0** - Client-side routing and navigation

### **Data Visualization**
- **Chart.js 4.4.0** - Interactive chart library with animations
- **D3.js 7.8.5** - Advanced data visualization and tree charts
- **React-Chartjs-2 5.2.0** - React wrapper for Chart.js

### **Styling & UI**
- **Tailwind CSS 3.3.0** - Utility-first CSS framework
- **Headless UI 1.7.0** - Unstyled, accessible UI components
- **Heroicons 2.0.0** - Beautiful SVG icons

### **Export & File Handling**
- **html2canvas 1.4.1** - High-quality image capture
- **jsPDF 2.5.1** - PDF generation and export
- **File Upload** - JSON data import/export system

### **State Management**
- **React Context API** - Global state management
- **Custom Hooks** - Reusable state logic
- **Local Storage** - Persistent user preferences

### **Development Tools**
- **ESLint** - Code linting and quality assurance
- **Prettier** - Code formatting
- **Docker** - Containerized development and deployment

## 🚀 Installation

### **Prerequisites**
- Node.js 18.0+ (recommended: 20.0+)
- npm 9.0+ or yarn 1.22+
- Git

### **Quick Start**

**🌐 [View Live Demo](https://prodip2416.github.io/data-insights-hub/)**

1. **Clone the repository**
   ```bash
   git clone https://github.com/prodip2416/data-insights-hub.git
   cd data-insights-hub
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### **Docker Development**

1. **Build and run with Docker Compose**
   ```bash
   docker-compose up --build
   ```

2. **Access the application**
   Navigate to `http://localhost:3000`

### **Production Build**

```bash
# Build for production
npm run build

# Preview production build
npm run preview

# Run linting
npm run lint
```

## 📁 Project Structure

```
data-insights-hub/
├── public/                     # Static assets
├── src/
│   ├── components/            # React components
│   │   ├── common/           # Reusable components
│   │   │   ├── ChartExportButton.jsx
│   │   │   ├── ErrorBoundary.jsx
│   │   │   ├── FileUpload.jsx
│   │   │   └── Notification.jsx
│   │   ├── layout/           # Layout components
│   │   │   ├── Header.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   ├── pages/            # Page components
│   │   │   ├── dashboard/    # Dashboard pages
│   │   │   │   ├── Dashboard.jsx
│   │   │   │   └── charts/   # Dashboard chart components
│   │   │   ├── charts/       # Chart pages
│   │   │   │   ├── LineChart.jsx
│   │   │   │   ├── AreaChart.jsx
│   │   │   │   ├── PieChart.jsx
│   │   │   │   ├── ScatterChart.jsx
│   │   │   │   ├── HeatmapChart.jsx
│   │   │   │   ├── GaugeChart.jsx
│   │   │   │   └── TreeChart.jsx
│   │   │   ├── reports/      # Report pages
│   │   │   │   ├── Reports.jsx
│   │   │   │   ├── SalesReports.jsx
│   │   │   │   ├── UserAnalytics.jsx
│   │   │   │   ├── PerformanceMetrics.jsx
│   │   │   │   ├── FinancialSummary.jsx
│   │   │   │   ├── MarketingROI.jsx
│   │   │   │   └── CustomReports.jsx
│   │   │   ├── settings/     # Settings pages
│   │   │   │   └── Settings.jsx
│   │   │   └── visualizations/ # Visualization pages
│   │   │       └── bar-chart/
│   │   │           └── BarChart.jsx
│   │   └── auth/             # Authentication components
│   │       └── Login.jsx
│   ├── contexts/             # React Context providers
│   │   ├── ThemeContext.jsx
│   │   ├── SettingsContext.jsx
│   │   ├── AuthContext.jsx
│   │   └── NotificationContext.jsx
│   ├── data/                 # Sample data and constants
│   │   └── sampleData.js
│   ├── utils/                # Utility functions
│   │   └── chartExport.js    # Chart export utilities
│   ├── App.jsx              # Main application component
│   ├── main.jsx             # Application entry point
│   └── index.css            # Global styles
├── docker-compose.yml        # Docker Compose configuration
├── Dockerfile               # Docker configuration
├── package.json             # Dependencies and scripts
├── tailwind.config.js       # Tailwind CSS configuration
├── vite.config.js           # Vite configuration
└── README.md               # Project documentation
```

## 🎯 Key Features in Detail

### **📊 Chart Export System**
- **Professional Export**: PNG, SVG, PDF, and JPEG formats
- **High Quality**: 2x scale rendering for crisp exports
- **Smart Naming**: Auto-timestamped filenames
- **Error Handling**: Graceful failure management with user feedback

### **🎨 Advanced Theming**
- **20+ Color Schemes**: Professional palettes with categories
- **Real-time Updates**: Instant theme switching
- **Persistent Settings**: User preferences saved to localStorage
- **Dark Mode**: Complete dark/light theme support

### **📈 Interactive Dashboards**
- **8 Chart Types**: Comprehensive visualization options
- **File Upload**: JSON data import/export
- **Real-time Metrics**: Live performance indicators
- **Responsive Design**: Mobile-first approach

### **🔧 Modern React Patterns**
- **Custom Hooks**: Reusable state logic
- **Context API**: Global state management
- **Error Boundaries**: Graceful error handling
- **Performance Optimization**: Memoization and efficient rendering

## 🚀 Getting Started

### **1. Explore the Dashboard**
- Navigate through different chart types
- Try the dark/light mode toggle
- Upload your own JSON data files
- Test the export functionality

### **2. Customize Settings**
- Change color schemes in Settings
- Adjust animation speeds
- Toggle grid and legend visibility
- Modify chart preferences

### **3. Export Charts**
- Click the "Export Chart" button on any chart
- Choose from PNG, SVG, PDF, or JPEG formats
- Download high-quality exports for presentations

## 📊 Sample Data

The dashboard includes comprehensive sample data for:
- **Sales Trends**: Monthly revenue and profit data
- **User Analytics**: Device usage and engagement metrics
- **Performance Metrics**: KPI indicators with trends
- **Financial Data**: Revenue, expenses, and ROI analysis
- **Marketing Data**: Campaign performance and conversion rates

## 🐳 Docker Commands

```bash
# Build the image
docker build -t data-insights-hub .

# Run the container
docker run -p 3000:3000 data-insights-hub

# Development with hot reload
docker-compose up --build

# Stop containers
docker-compose down
```

## 📝 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build optimized production bundle |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint for code quality |
| `npm run lint:fix` | Fix ESLint issues automatically |

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit your changes**: `git commit -m 'Add amazing feature'`
4. **Push to the branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

### **Development Guidelines**
- Follow the existing code style
- Add tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Links & Resources

- **React Documentation**: [react.dev](https://react.dev/)
- **Chart.js Documentation**: [chartjs.org](https://www.chartjs.org/docs/)
- **D3.js Documentation**: [d3js.org](https://d3js.org/)
- **Tailwind CSS**: [tailwindcss.com](https://tailwindcss.com/)
- **Vite Documentation**: [vitejs.dev](https://vitejs.dev/)

## 🌟 Showcase

This project demonstrates:
- **Advanced React Skills**: Modern patterns and best practices
- **Data Visualization Expertise**: Professional chart implementations
- **UI/UX Design**: Beautiful, responsive interfaces
- **Export Functionality**: Enterprise-grade features
- **Performance Optimization**: Efficient rendering and state management
- **Code Quality**: Clean, maintainable, and well-documented code

---

<div align="center">

**Built with ❤️ using React, Chart.js, D3.js, and Tailwind CSS**

[⭐ Star this repo](https://github.com/prodip2416/data-insights-hub) • [🐛 Report Bug](https://github.com/prodip2416/data-insights-hub/issues) • [💡 Request Feature](https://github.com/prodip2416/data-insights-hub/issues)

</div>