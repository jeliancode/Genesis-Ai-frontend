import { useEffect, useRef } from "react";
import { Scatter } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Title,
  TooltipItem,
  Chart,
} from "chart.js";
import { useCluster } from "../hooks/useClusters";

ChartJS.register(LinearScale, PointElement, Tooltip, Legend, Title);

interface ChartPoint {
  x: number;
  y: number;
  title: string;
  category: string;
}

export const ClusterVisualization = () => {
  const { clusterData, isLoading, error } = useCluster();
  const chartRef = useRef<Chart<"scatter"> | null>(null);

  // Limpieza previa del gráfico para evitar el error de canvas en uso
  useEffect(() => {
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
        chartRef.current = null;
      }
    };
  }, [clusterData]);

  if (isLoading)
    return <div className="loading">Cargando visualización...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!clusterData) return null;

  const clusters = [...new Set(clusterData.points.map((p) => p.label))];
  const colors = [
    "#FF6384",
    "#36A2EB",
    "#FFCE56",
    "#4BC0C0",
    "#9966FF",
    "#FF9F40",
    "#8AC24A",
    "#607D8B",
    "#E91E63",
    "#3F51B5",
  ];

  const datasets = clusters.map((cluster, idx) => ({
    label: cluster,
    data: clusterData.points
      .filter((p) => p.label === cluster)
      .map((p) => ({ x: p.x, y: p.y, title: p.title, category: p.category })),
    backgroundColor: colors[idx % colors.length],
    pointRadius: 8,
    pointHoverRadius: 10,
  }));

  const data = { datasets };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: { title: { display: true, text: "Componente 1" } },
      y: { title: { display: true, text: "Componente 2" } },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: (context: TooltipItem<"scatter">) => {
            const point = context.raw as ChartPoint;
            return [
              `Título: ${point.title}`,
              `Categoría: ${point.category}`,
              `Coordenadas: (${context.parsed.x.toFixed(2)}, ${context.parsed.y.toFixed(2)})`,
            ];
          },
        },
      },
      title: {
        display: true,
        text: `Visualización de Clusters (${clusterData.meta.method}) - ${clusterData.meta.n_clusters} clusters`,
        font: { size: 16 },
      },
      legend: { position: "right" as const },
    },
  };

  return (
    <div className="cluster-visualization" style={{ height: "500px" }}>
      <Scatter ref={chartRef} data={data} options={options} />
      <div className="cluster-meta">
        <p>Total documentos: {clusterData.meta.total_documents}</p>
        <p>Método: {clusterData.meta.method}</p>
      </div>
    </div>
  );
};
