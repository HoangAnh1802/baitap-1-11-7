<template>
  <div>
    <div class="navchart" ref="chart" :option="options"></div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from "vue";
import { useStore } from "vuex";
import * as echarts from "echarts";
import router from "@/router";
const chart = ref(null);
const options = ref({});
const store = useStore();
const listStudent = computed(() => store.state.listStudent);

watch(listStudent, () => {});
onMounted(() => {
  watch(listStudent, () => {
    const myChart = echarts.init(chart.value);
    const resultCount = {};
    const ltc = listStudent.value.map((i) => i.value);
    ltc.forEach((item) => {
      if (resultCount[item]) {
        resultCount[item]++;
      } else {
        resultCount[item] = 1;
      }
    });
    // console.log(resultCount);
    const kqData = [];
    for (let key in resultCount) {
      let pt = { value: resultCount[key], name: key };
      kqData.push(pt);
    }
    // console.log(kqData);
    const optionsX = {
      title: {
        text: "Tỷ lệ học sinh",
        textStyle: {
          fontFamily: "sans-serif",
        },
        // bottom: 40,
      },
      tooltip: {
        trigger: "item",
      },
      legend: {
        top: "7%",
        left: "center",
      },
      series: [
        {
          name: "Access From",
          type: "pie",

          center: ["45%", "55%"],
          radius: ["30%", "80%"],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: "#fff",
            borderWidth: 2,
          },
          label: {
            show: false,
            position: "center",
          },
          emphasis: {
            label: {
              show: true,
              fontSize: "40",
              fontWeight: "bold",
            },
          },
          labelLine: {
            show: false,
          },
          data: kqData,
          // [
          //   { value: 1048, name: "Search Engine" },
          //   { value: 735, name: "Direct" },
          //   { value: 580, name: "Email" },
          //   { value: 484, name: "Union Ads" },
          //   { value: 300, name: "Video Ads" },
          // ]
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
</style>
