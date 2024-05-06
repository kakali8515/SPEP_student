<template lang="">
  <div v-if="!getIsMobileViewReady">
    <apexchart
      type="radialBar"
      height="250"
      :options="chartOptions"
      :series="seriesData"
    ></apexchart>
  </div>

  <div v-else>
    <apexchart
      type="radialBar"
      height="160"
      :options="chartOptions2"
      :series="seriesData"
      width="120"
    ></apexchart>
  </div>
</template>
<script>
import vueApexcharts from "vue3-apexcharts";
import { useUserData } from "@/stores/useUserDataCopy";
import { storeToRefs } from "pinia";
export default {

  setup() {
    const userData = useUserData();
    const { getIsMobileViewReady } = storeToRefs(userData);
    return {
      getIsMobileViewReady
    };
  },

  components: {
    apexchart: vueApexcharts,
  },
  props: {
    seriesData: Array,
    categories: Array,
    title: String,
  },
  data() {
    return {
      chartOptions: {
        chart: {
          height: 196,
          type: "radialBar",
        },
        plotOptions: {
          radialBar: {
            hollow: {
              margin: 15,
              size: "70%",
            },

            dataLabels: {
              showOn: "always",
              name: {
                show: false,
                color: "#888",
                fontSize: "13px",
              },
              value: {
                color: "#005DAC",
                fontSize: "30px",
                show: true,
                formatter: function (val) {
                  return val+"%"; 
                }
              },
            },
          },
        },
        // labels: ["label1"],
        colors: ['#005DAC'],
        stroke: {
          lineCap: "round",
        },
      },

      chartOptions2: {
        chart: {
          height: 280,
          type: "radialBar",
          width: 150,
        },
        plotOptions: {
          radialBar: {
            hollow: {
              size: "55%",
            },

            dataLabels: {
              showOn: "always",
              name: {
                show: false,
              },
              value: {
                color: "#005DAC",
                fontSize: "12px",
                show: true,
                offsetY: 8,
              },
            },
          },
        },
        colors: ['#005DAC'],
        // labels: ["label1"],
        stroke: {
          lineCap: "round",
        },
      },
    };
  },

  // watch: {
  //   seriesData: function (newVal, oldVal) {
  //     if (newVal != oldVal) {
  //       this.series[0] = newVal;
  //     }
  //   },
  //   categories: function (newVal, oldVal) {
  //     if (newVal != oldVal) {
  //       this.chartOptions.labels = newVal;
  //     }
  //   },
  // },
};
</script>