<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <ChartBar />
      </div>
      <!-- <div class="col">Column</div> -->
    </div>
  </div>
</template>

<script>
import ChartDoughnut from "@/components/ChartDoughnut.vue";
import { created } from "vue";
import ChartBar from "@/components/ChartBar.vue";

export default {
  name: "Home",
  components: { ChartBar, ChartDoughnut },
  computed: {
    totalClass() {
      return this.$store.state.tableData.length;
    },
    totalStudent() {
      return this.$store.state.listStudent.length;
    },
  },
  created() {
    this.$store.dispatch("getClass");
    this.$store.dispatch("getStudent");
  },
};
</script>

<style scoped>
.p-item {
  list-style: none;
  color: #25426d;
}
.item {
}
.navbar {
  background: #ecf5ff;
  height: 700px;
}
.container {
  background: #ecf5ff;
  height: 700px;
  font-family: Hack, monospace;
  /* margin-top: -16px; */
  /* margin-left: 80px;
  margin-top: 100px; */
}
.el-link {
}
.el-link .el-icon--right.el-icon {
  vertical-align: text-bottom;
}
</style>