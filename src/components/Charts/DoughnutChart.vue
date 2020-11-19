<script>
import { Doughnut } from "vue-chartjs";
export default {
  extends: Doughnut,
  data() {
    return {
      chartData: {
        labels: ["Fatiga", "Distraccion", "Velocidad"],
        datasets: [
          {
            borderWidth: 1,
            borderColor: [
              "rgba(255,99,132,1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)"
            ],
            backgroundColor: [
              "rgba(255, 99, 132, 0.5)",
              "rgba(54, 162, 235, 0.5)",
              "rgba(255, 206, 86, 0.5)",
              "rgba(75, 192, 192, 0.5)",
              "rgba(153, 102, 255, 0.5)"
            ],
            data: [60, 30, 10]
          }
        ]
      },
      options: {
        legend: {
          display: true,
          position: "right"
        },
        responsive: true,
        maintainAspectRatio: false
      }
    };
  },
  mounted() {
    this.renderChart(this.chartData, this.options);
  }
};
</script>
