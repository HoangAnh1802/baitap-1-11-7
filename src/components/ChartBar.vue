<template>
  <div class="chartcontainer">
    <div ref="chart" :option="options" class="navchart"></div>
    <DoughnutChart />
  </div>
</template>

<script setup>
import DoughnutChart from "@/components/ChartDoughnut.vue";
import { useStore } from "vuex";
import * as echarts from "echarts";
import router from "@/router";
import { ref, onMounted, watch, computed } from "vue";

const chart = ref(null);
const options = ref({});
const store = useStore();
const listStudent = computed(() => store.state.listStudent);
watch(listStudent, () => {});
function count(arr) {
  return arr.reduce(
    (prev, curr) => ((prev[curr] = ++prev[curr] || 1), prev),
    {}
  ); // Tim ra so luong hoc sinh trong lop
}
onMounted(() => {
  watch(listStudent, () => {
    const myChart = echarts.init(chart.value);
    const TenLop = listStudent.value.map((i) => i.value);
    const soLuongHocSinh = Object.values(count(TenLop));
    const locTrung = Object.keys(count(TenLop));
    const dataValue = ref([soLuongHocSinh]);
    const optionsX = {
      title: {
        text: "Tỷ lệ học sinh",
        subtext: "Living Expenses in Shenzhen",
        subtextStyle: {
          left: "20%",
        },
      },
      textStyle: {
        fontFamily: "sans-serif",
        fontSize: 28,
      },
      xAxis: {
        type: "category",
        data: locTrung,
        // ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          center: ["30%", "70%"],
          data: dataValue.value[0],
          // [120, 200, 150, 80, 70, 110, 130]
          type: "bar",
        },
      ],
    };
    optionsX && myChart.setOption(optionsX);
    options.value = optionsX;
    myChart.on("click", function (params) {
      // console.log(params.name);
      store.dispatch("filterStudent", params);
      router.push({ path: "/danhsachhocsinh" });
    });
  });
});
</script>

<style scoped>
.navchart {
  margin-top: 40px;
  width: 400px;
  height: 500px;
}
.chartcontainer {
  display: flex;
  justify-content: space-around;
}
</style>