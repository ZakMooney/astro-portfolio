import React, { useRef, useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { RoleYears } from '../../data/JobDetails';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = () => {
  const chartRef = useRef(null);
  const containerRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [screenSize, setScreenSize] = useState({
    isMobile: window.innerWidth < 768,
    isTablet: window.innerWidth >= 768 && window.innerWidth < 1024,
    isDesktop: window.innerWidth >= 1024,
  });

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight
        });
      }
      setScreenSize({
        isMobile: window.innerWidth < 768,
        isTablet: window.innerWidth >= 768 && window.innerWidth < 1024,
        isDesktop: window.innerWidth >= 1024,
      });
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
  
  const getCutoutSize = () => {
    if (screenSize.isMobile) return '50%';
    if (screenSize.isTablet) return '55%';
    return '60%';
  };

  ChartJS.defaults.color = fontColour;

  const options = {
    maintainAspectRatio: true,
    aspectRatio: screenSize.isMobile ? 1 : 1,
    responsive: true,
    resizeDelay: 0,
    cutout: getCutoutSize(),
    plugins: {
      legend: {
        onClick: null,
        display: true,
        position: screenSize.isMobile ? 'bottom' : 'bottom',
        align: screenSize.isMobile ? 'center' : 'center',
        labels: {
          color: fontColour,
          position: screenSize.isMobile ? 'right' : 'bottom',
          align: 'center',
          font: {
            size: screenSize.isMobile ? 14 : screenSize.isTablet ? 14 : 14,
            family: "'Saira', sans-serif",
          },
          padding: screenSize.isMobile ? 8 : 15,
          boxWidth: screenSize.isMobile ? 12 : 15,
          boxHeight: screenSize.isMobile ? 12 : 15,
          generateLabels: (chart) => {
            const datasets = chart.data.datasets;
            const labels = chart.data.labels;
            
            return labels.map((label, i) => {
              const value = datasets[0].data[i];
              const shortLabel = screenSize.isMobile && label.length > 12 
                ? label.substring(0, 12) + '...' 
                : label;
                
              return {
                text: `${shortLabel} (${value}y)`,
                fillStyle: datasets[0].backgroundColor[i],
                strokeStyle: datasets[0].borderColor[i],
                lineWidth: datasets[0].borderWidth,
                hidden: false,
                index: i,
                fontColor: fontColour,
              };
            });
          }
        }
      },
      title: {
        display: false,
      },
      tooltip: {
        enabled: true,
        padding: screenSize.isMobile ? 6 : 10,
        backgroundColor: 'rgba(0, 20, 40, 0.8)',
        titleColor: fontColour,
        bodyColor: fontColour,
        borderColor: 'rgba(56, 189, 248, 1)',
        borderWidth: 1,
        bodyFont: {
          size: screenSize.isMobile ? 14 : 14,
          family: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        },
        titleFont: {
          size: screenSize.isMobile ? 14 : 14,
          family: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        },
        cornerRadius: 0,
        callbacks: {
          label: (context) => {
            const label = context.label || '';
            const value = context.parsed || 0;
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const percentage = ((value / total) * 100).toFixed(1);
            return `${label}: ${value} years (${percentage}%)`;
          }
        }
      }
    },
    animation: {
      animateRotate: true,
      animateScale: screenSize.isMobile ? false : true,
      duration: screenSize.isMobile ? 500 : 750,
    },
    layout: {
      padding: 0
    },
    elements: {
      arc: {
        borderWidth: screenSize.isMobile ? 1 : 2,
        hoverBorderWidth: screenSize.isMobile ? 2 : 3,
        hoverOffset: screenSize.isMobile ? 5 : 8,
      }
    }
  };

  const labels = ['Web3 DApp', 'Frontend Dev', 'Mobile Apps'];
  const useData = RoleYears || [0, 0, 0];

  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Years in Role',
        data: useData,
        backgroundColor: [
          'rgba(246, 0, 157, 0.5)',
          'rgba(173, 29, 235, 0.5)',
          'rgba(44, 226, 230, 0.5)',
          'rgba(255, 108, 17, 0.5)',
          'rgba(0, 231, 137, 0.5)',
        ],
        borderColor: [
          'rgba(246, 0, 157, 1)',
          'rgba(173, 29, 235, 1)',
          'rgba(44, 226, 230, 1)',
          'rgba(255, 108, 17, 1)',
          'rgba(0, 231, 137, 1)',
        ],
        borderWidth: screenSize.isMobile ? 1 : 2,
        hoverBorderWidth: screenSize.isMobile ? 2 : 3,
        hoverOffset: screenSize.isMobile ? 5 : 10,
      },
    ],
  };

  return (
    <div 
      ref={containerRef}
      className="pie-chart-wrap"
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Doughnut 
        ref={chartRef}
        options={options} 
        data={data}
        key={`${dimensions.width}-${screenSize.isMobile}`}
      />
    </div>
  );
};

export default PieChart;