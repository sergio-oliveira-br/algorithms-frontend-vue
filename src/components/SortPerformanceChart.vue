// src/components/SortPerformanceChart.vue

<script setup lang="ts">

  import { defineProps, computed } from "vue";
  import { Bar } from 'vue-chartjs';
  import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale,
    TooltipItem
  } from "chart.js";
  import {SortResult} from "@/types";

  ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

  const props = defineProps<{
    chartData: SortResult[];
  }>();

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
          label: function(context: TooltipItem<'bar'>) {
            let label = context.dataset.label || '';

            if(label) {
              label += ': ';
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