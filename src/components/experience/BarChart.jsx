import React, { useRef, useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { SkillYears } from '../../data/JobDetails';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = () => {
  const chartRef = useRef(null);
  const containerRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight
        });
      }
    };

    handleResize();

    window.addEventListener('resize', handleResize);
    
    const resizeObserver = new ResizeObserver(handleResize);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      resizeObserver.disconnect();
    };
  }, []);

  let fontColour = 'rgba(255,255,255,0.8)';
  
  const options = {
    maintainAspectRatio: false,
    responsive: true,
    resizeDelay: 0,
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
      tooltip: {
        enabled: true,
        padding: window.innerWidth < 768 ? 6 : 10,
        backgroundColor: 'rgba(0, 20, 40, 0.8)',
        titleColor: fontColour,
        bodyColor: fontColour,
        borderColor: 'rgba(56, 189, 248, 1)',
        borderWidth: 1,
        bodyFont: {
          size: 14,
          family: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        },
        titleFont: {
          size: 14,
          family: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        },
        cornerRadius: 0,
        callbacks: {
          label: (context) => {
            return `${context.parsed.y} years`;
          }
        }
      }
    },
    scales: {
      y: {  
        border: {
          display: false,
        },
        grid: {
          drawBorder: false,
          color: "rgba(255,255,255,0.1)",
          borderColor: "rgba(255,255,255,0.1)",
        },  
        ticks: {
          color: fontColour, 
          font: {
            size: window.innerWidth < 768 ? 14 : 14,
            family: "'Saira', sans-serif",
          },
          stepSize: 1,
          beginAtZero: true
        }
      },
      x: { 
        border: {
          display: false,
        },
        grid: {
          display: false,
        },  
        ticks: {
          color: fontColour, 
          font: {
            size: window.innerWidth < 768 ? 14 : 14,
            family: "'Saira', sans-serif",
          },
          autoSkip: true,
          maxRotation: 45,
          minRotation: 0
        }
      },
    },
    animation: {
      duration: 750,
      easing: 'easeInOutQuart'
    },
    layout: {
      padding: {
        left: window.innerWidth < 768 ? 0 : 10,
        right: window.innerWidth < 768 ? 0 : 10,
        top: 10,
        bottom: 10
      }
    }
  };

  const labels = [
    'React',
    'Javascript',
    'HTML/CSS',
    'Web3',
    'React Native',
  ];

  const useData = SkillYears || [0, 0, 0, 0, 0];
  
  const data = {
    labels,
    datasets: [
      {
        label: 'Years of Experience',
        data: useData,
        backgroundColor: [
          'rgba(44, 226, 230, 0.5)',
          'rgba(246, 0, 157, 0.5)',
          'rgba(173, 29, 235, 0.5)',
          'rgba(255, 108, 17, 0.5)',
          'rgba(0, 231, 137, 0.5)',
          'rgba(253, 224, 71, 0.5)',
        ],
        borderColor: [
          'rgba(44, 226, 230, 1)',
          'rgba(246, 0, 157, 1)',
          'rgba(173, 29, 235, 1)',
          'rgba(255, 108, 17, 1)',
          'rgba(0, 231, 137, 1)',
          'rgba(254, 240, 138, 1)',
        ],
        borderRadius: 4,
        borderWidth: 2,
        barThickness: window.innerWidth < 768 ? 30 : undefined,
        maxBarThickness: window.innerWidth < 768 ? 40 : 50,
      },
    ],
  };

  return (
    <div 
      ref={containerRef}
      className="chart-wrap"
      style={{
        width: '100%',
        height: '100%',
        minHeight: '300px',
        maxHeight: '500px',
        position: 'relative'
      }}
    >
      <Bar 
        ref={chartRef} 
        options={options} 
        data={data}
        redraw={false}
        key={dimensions.width}
      />
    </div>
  );
}

export default BarChart;