import React from "react";
import ReactApexChart from "react-apexcharts";
import { MdTrendingUp } from "react-icons/md";



const ProductsTable = () => {
  const bestSellingProducts = [
    { name: "Tractor Parts", sales: 38 },
    { name: "Farm Tools", sales: 32 },
    { name: "Seeds", sales: 30 }
  ];

  const chartOptions = {
    series: bestSellingProducts.map(product => product.sales),
    options: {
      chart: {
        height: 180, // Reduced from 250
        type: "pie",
        fontFamily: "'Plus Jakarta Sans', sans-serif",
      },
      labels: bestSellingProducts.map(product => product.name),
      colors: ['#00922F', '#34d399', '#6ee7b7'], // Green shades matching theme
      dataLabels: {
        enabled: true,
        formatter: function (val) {
          return val.toFixed(1) + "%";
        }
      },
      legend: {
        position: 'bottom',
        horizontalAlign: 'center',
        fontSize: '14px',
        markers: {
          width: 10,
          height: 10,
          radius: 50,
        },
      },
      plotOptions: {
        pie: {
          expandOnClick: false,
          donut: {
            size: '75%', // Increased from 65% to make the chart more compact
            labels: {
              show: true,
              name: {
                show: true,
                fontSize: '16px', // Reduced from 22px
                offsetY: -5
              },
              value: {
                show: true,
                fontSize: '14px', // Reduced from 16px
                color: '#666',
                offsetY: 12,
                formatter: function (val) {
                  return val + '%';
                }
              },
              total: {
                show: true,
                label: 'Total',
                color: '#666',
                fontSize: '14px',
                formatter: function (w) {
                  return w.globals.seriesTotals.reduce((a, b) => a + b, 0) + '%';
                }
              }
            }
          }
        }
      }
    }
  };

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6"> {/* Added border class to match SalesChart */}
      <div className="flex justify-between items-center mb-4"> {/* Reduced from mb-6 */}
        <h3 className="text-xl font-semibold text-gray-800">Best Selling Products</h3>
        <div className="flex items-center gap-2 bg-green-50 px-3 py-1 rounded-full">
          <MdTrendingUp className="text-[#00922F]" />
          <span className="text-sm font-medium text-[#00922F]">Top Products</span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4"> {/* Reduced from gap-6 */}
        {/* Chart */}
        <div className="flex justify-center">
          <ReactApexChart
            options={chartOptions.options}
            series={chartOptions.series}
            type="donut"
            height={180} // Reduced from 300
          />
        </div>

        {/* Products List - More compact */}
        <div className="mt-2"> {/* Reduced from mt-4 */}
          {bestSellingProducts.map((product, index) => (
            <div key={index} className="flex items-center justify-between py-2 border-b last:border-0"> {/* Reduced padding */}
              <div className="flex items-center gap-2"> {/* Reduced gap */}
                <div className={`w-2 h-2 rounded-full bg-[#00922F] opacity-${(100 - (index * 25))}%`}></div>
                <span className="font-medium text-gray-700 text-sm">{product.name}</span> {/* Added text-sm */}
              </div>
              <span className="text-gray-600 text-sm">{product.sales}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductsTable;