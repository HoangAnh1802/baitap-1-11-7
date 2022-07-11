<template>
  <div class="container">
    <div class="btn">
      <div class="divseach">
        <el-input
          v-model="input1"
          class="el-buttom"
          size="large"
          placeholder="Seach"
        />
        <button
          type="button"
          @click="filterSeach(input1)"
          class="btn btn-outline-primary"
        >
          Seach
        </button>
      </div>
    </div>
    <div class="addClass">
      <el-button class="el-btn" plain @click="toggle">Thêm Lớp</el-button>
    </div>
    <div class="table">
      <el-table :data="classList" border class="el-table">
        <el-table-column type="index" label="STT" width="100" />
        <el-table-column prop="TenLop" label="Tên Lớp" />
        <el-table-column label="Delete">
          <template #default="scope">
            <el-row class="mb-4" @click="deleteClass(scope.row.id)">
              <el-button type="danger" plain>Delete</el-button>
            </el-row>
          </template>
        </el-table-column>
      </el-table>
      <div class="Pagination">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="totalClass"
          v-model="page"
          @current-change="pagination"
        />
      </div>
    </div>

    <el-dialog v-model="awesome" title="Topup nhập thông tin lớp" width="30%">
      <input
        class="ip"
        type="text"
        name="ten"
        placeholder="Nhập tên lớp"
        v-model="title"
      />
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="onSubmit(title)">Confirm</el-button>
          <el-button @click="awesome = false">Cancel</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import {
  Check,
  Delete,
  Edit,
  Message,
  Search,
  Star,
} from "@element-plus/icons-vue";

import { mapActions } from "vuex";
export default {
  name: "danhsachlop",
  data() {
    return {
      input1: "",
      awesome: false,
      title: "",
      count: "",
      page: 1,
    };
  },
  created() {
    this.$store.dispatch("getClass");
  },
  computed: {
    classList() {
      return this.$store.state.tableDataCoppy;
    },
    totalClass() {
      return this.$store.state.tableData.length;
    },
  },
  methods: {
    pagination(page) {
      console.log(page);
      this.$store.dispatch("getClass");
      this.$store.dispatch("paginationClass", page);
    },
    filterSeach(input1) {
      this.$store.commit("SEACH_CLASS", input1);
      console.log(input1);
    },
    toggle() {
      this.awesome = !this.awesome;
    },
    deleteClass(ID) {
      console.log(ID);
      this.$store.dispatch("deleteClass", ID);
    },
    onSubmit() {
      const data = {
        // id : this.count,
      };
      // this.count++
      // console.log(this.count)
      // console.log(this.title)
      this.$store.dispatch("addClass", this.title);
      this.title = "";
      this.awesome = false;
    },
  },
  // setup() {
  //   const tableData = [
  //     {
  //       STT: "1",
  //       TenLop: "Lop A",
  //     },
  //     {
  //       STT: "2",
  //       TenLop: "Lop B",
  //     },
  //     {
  //       STT: "3",
  //       TenLop: "Lop C",
  //     },
  //     {
  //       STT: "4",
  //       TenLop: "...",
  //     },
  //   ];
  // },
};
</script>

<style scoped>
.addClass {
  float: right;
}
.btn .btn-outline-primary {
  width: 99px;
  height: 35px;
  position: relative;
  top: 16px;
  left: 14px;
}
.Pagination {
  float: right;
  border-top: none !important;
}
.container {
  background: #ecf5ff;
  height: 700px;
  font-family: Hack, monospace;
}
.el-table {
  /* width: 100%; */
  border-width: 3px;
  margin-bottom: 20px;
  border-top: none !important;
  margin-top: 55px;
}
.table {
  /* height: 250px;
  margin: 0px 80px; */
  height: 250px;
  width: 80%;
  margin-left: 10%;
}
.btn {
}
.el-btn {
  float: right;
  margin-bottom: 20px;
  margin-top: 20px;
}
.el-buttom {
  position: relative;
  top: 17px;
  left: 0px;
  width: 220px;
}
.ip {
  border: 1px double #808080;
  border-radius: 3px;
  width: 80%;
  height: 25px;
}
.divseach {
  margin-left: 119px;
}
</style>
<!-- {
        id: "1",
        TenLop: "Lop A",
      },
      {
        id: "2",
        TenLop: "Lop B",
      },
      {
        id: "3",
        TenLop: "Lop C",
      },
      {
        id: "4",
        TenLop: "Lop D",
      } -->
      