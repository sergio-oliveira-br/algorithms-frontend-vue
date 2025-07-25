<script setup>
import { defineProps, computed } from "vue";
import { Bar } from 'vue-chartjs';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
} from "chart.js";

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const props = defineProps({
  chartData: {
    type: Array,
    required: true
  }
});

const dataForChart = computed(() => {
  const labels = props.chartData.map(result => result.algorithmUsed);
  const data = props.chartData.map(result => result.durationNanos);

  return {
    labels: labels,
    datasets: [
      {
        label: 'Elapsed Time (ms)',
        backgroundColor: '#42A5F5',
        data: data,
      },
    ],
  };
});

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugin: {
    title: {
      display: true,
      text: 'Time Comparison of Sorting Algorithms',
      font: {
        size: 12
      },
    },
    tooltip: {
      callbacks: {
        label: function(context) {
          let label = context.dataset.label || '';

          if(label) {
            label += ': ';
          }
          if (context.parsed.y !== null) {
            label += context.parsed.y.toFixed(2) + ' ms';
          }
          return label;
        }
      }
    }
  },
  scales: {
    x: {
      title: {
        display: true,
        text: 'Algorithms',
      },
    },
    y: {
      title: {
        display: true,
        text: 'Time (ms)',
      },
      beginAtZero: true,
    },
  },
};
</script>

<template>
  <div style="height: 300px; width: 100%">
    <Bar id="performance-chart"
         :options="chartOptions"
         :data="dataForChart" >
    </Bar>
  </div>
</template>

<style scoped>

</style>