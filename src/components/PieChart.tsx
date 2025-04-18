import { PieChartProps } from "@/types/chartTypes";
import { getChartOptions } from "@/utils/chartHelper";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import "highcharts/modules/accessibility";
import styles from "@/components/PieChart.module.css";

export const PieChart = ({ series }: PieChartProps) => {
  const chartOptions = getChartOptions(series);

  return (
    <div className={styles.pieChart}>
      <HighchartsReact
        highcharts={Highcharts}
        options={{
          ...chartOptions,
          chart: {
            ...chartOptions.chart,
            width: null,
            height: null,
          },
          responsive: {
            rules: [
              {
                condition: {
                  maxWidth: 500,
                },
                chartOptions: {
                  plotOptions: {
                    pie: {
                      dataLabels: {
                        format: "<b>{point.name}</b>: {point.y}",
                        style: {
                          fontSize: "10px",
                        },
                      },
                    },
                  },
                },
              },
              {
                condition: {
                  maxWidth: 300,
                },
                chartOptions: {
                  plotOptions: {
                    pie: {
                      dataLabels: {
                        format: "{point.name}",
                        style: {
                          fontSize: "9px",
                        },
                      },
                    },
                  },
                },
              },
            ],
          },
        }}
      />
    </div>
  );
};
