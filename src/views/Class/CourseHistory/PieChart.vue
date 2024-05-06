<template lang="">
  <div>
    <apexchart
      type="pie"
      height="350"
      :options="chartOptions"
      :series="series"
    ></apexchart>
  </div>
</template>
<script>
import vueApexcharts from "vue3-apexcharts";
export default {
  components: {
    apexchart: vueApexcharts,
  },
  props: {
    seriesData: Array,
    categoriesData: Array,
    title: String,
  },
  data() {
    return {
      series: this.seriesData,
      categories: this.categoriesData,
      chartOptions: {
        chart: {
          height: 350,
          type: "pie",
        },
        plotOptions: {
            pie: {},
        },
        labels: this.categoriesData, // Set labels to categories data
        colors: ['#5B55EE', '#5F6CF6', '#8474F6', '#7CA8F8', '#C5C3EC'],
      },
      // chartOptions: {
      //   chart: {
      //     width: "100%",
      //     type: "donut",
      //     fontFamily: "Spoqa Han Sans Neo, sans-serif",
      //   },

      //   plotOptions: {
      //     pie: {
      //       startAngle: 0,
      //       endAngle: 360,
      //       expandOnClick: false,
      //       toolbar: {
      //         show: false,
      //       },
      //       donut: {
      //         size: "50%",
      //         labels: {
      //           show: true,
      //           name: {
      //             show: false,
      //           },
      //           total: {
      //             showAlways: true,
      //             show: true,
      //           },
      //         },
      //       },
      //     },
      //   },
      //   legend: {
      //     fontSize: "20px",
      //     fontWeight: 400,
      //     width: "277px",
      //     height: "24px",
      //     itemMargin: {
      //       horizontal: 0,
      //       vertical: 16,
      //     },
      //   },

      //   labels: this.categories,
      //   dataLabels: {
      //     enabled: true,
      //     formatter: function (val) {
      //       return Math.floor(val);
      //     },
      //   },
      //   // fill: {
      //   //   type: "gradient",
      //   // },

      //   title: {
      //     text: this.title,
      //     style: {
      //       fontSize: "28px",
      //       fontWeight: 400,
      //     },
      //   },
      //   responsive: [
      //     {
      //       breakpoint: 768,
      //       options: {
      //         chart: {
      //           width: "100%",
      //         },
      //         legend: {
      //           show: true,
      //           position: "bottom",
      //           width: "222px",
      //           fontSize: "16px",
      //           fontWeight: 200,
      //           itemMargin: {
      //             horizontal: 2,
      //             vertical: 2,
      //           },
      //         },
      //         title: {
      //           text: "업종별",
      //           style: {
      //             fontSize: "24px",
      //             fontWeight: 400,
      //           },
      //         },
      //       },
      //     },
      //   ],
      // },
    };
  },

  watch: {
    seriesData: function (newVal, oldVal) {
      if (newVal != oldVal) {
        this.series[0] = newVal;
      }
    },
    categoriesData: function (newVal, oldVal) {
      if (newVal !== oldVal) {
        this.categories = newVal;
        this.chartOptions.labels = newVal; 
      }
    },
  },
};
</script>
