<template lang="">
  <div>
    <apexchart 
        type="bar"
        height="350" 
        :options="chartOptions" 
        :series="series">
    </apexchart>
  </div>
</template>
<script>
import vueApexcharts from "vue3-apexcharts";
export default {
  components: {
    apexchart: vueApexcharts,
  },
  props: {
    // seriesData: Array,
    // categoriesData: Array,
    // title: String,
    isStack: Boolean,
    borderRadiusApp: String,
    strokeWidth: Number,
  },
  data() {
    return {
      //series: this.seriesData,
      //categories: this.categoriesData,
      //isStack: this.isStack,
      series: [{
            name: 'Comprehension',
            data: [7, 7, 7, 7, 7, 7, 7, 7]
          }, {
            name: 'Content',
            data: [10, 10, 10, 10, 10, 10, 10, 10]
          }, {
            name: 'Completion',
            data: [13, 13, 13, 13, 13, 13, 13, 13]
          }, {
            name: 'Accuracy',
            data: [14, 14, 14, 14, 14, 14, 14, 14]
          }, {
            name: 'Complexity',
            data: [14, 14, 14, 14, 14, 14, 14, 14]
          }, {
            name: 'Diversity',
            data: [13, 13, 13, 13, 13, 13, 13, 13]
          }, {
            name: 'Vocabulary',
            data: [10, 10, 10, 10, 10, 10, 10, 10]
          }, {
            name: 'Punctuation',
            data: [7, 7, 7, 7, 7, 7, 7, 7]
          }],
      chartOptions: {
        chart: {
            type: 'bar',
            height: 350,
            width: '100%',
            stacked: this.isStack,
            toolbar: {
            show: false
            },
            zoom: {
            enabled: false
            }
        },
        stroke: {
            width: this.strokeWidth,
            colors: ['#fff']
        },
        dataLabels: {
            enabled: false,
        },
        responsive: [{
            breakpoint: 480,
            options: {
            legend: {
                position: 'bottom',
                offsetX: -10,
                offsetY: 0
            }
            }
        }],
        plotOptions: {
            bar: {
            horizontal: false,
            columnWidth: '80%',
            borderRadius: 5,
            borderRadiusApplication: this.borderRadiusApp, // 'around', 'end'
            borderRadiusWhenStacked: 'last', // 'all', 'last'
            dataLabels: {
                total: {
                    enabled: false,
                    style: {
                        fontSize: '13px',
                        fontWeight: 900
                    }
                }
            }
            },
        },
        colors: ['#5B55EE', '#30764f', '#8474F6', '#766130', '#C5C3EC', '#f6de42', '#e842f6', '#f6b042'],
        xaxis: {
            type: 'string',
            categories: ['Level 1', 'Level 2', 'Level 3', 'Level 4', 'Level 5', 'Level 6', 'Level 7', 'Level 8'
            ],
        },
        legend: {
            position: 'right',
            offsetY: 40
        },
        fill: {
            opacity: 1
        }
      },
    };
  },

//   watch: {
//     seriesData: function (newVal, oldVal) {
//       if (newVal != oldVal) {
//         this.series[0] = newVal;
//       }
//     },
//     categoriesData: function (newVal, oldVal) {
//       if (newVal !== oldVal) {
//         this.categories = newVal;
//         this.chartOptions.labels = newVal; 
//       }
//     },
//   },
};
</script>
