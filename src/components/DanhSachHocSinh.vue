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
        <!-- <button class="buttonSeach" @click="filterSeach(input1)">Seach</button> -->
        <button
          type="button"
          @click="filterSeach(input1)"
          class="btn btn-outline-primary"
        >
          Seach
        </button>
      </div>
    </div>
    <div class="addStudent">
      <el-button class="el-btn" plain @click="toggle">Thêm Học Sinh</el-button>
    </div>
    <div class="table">
      <el-table :data="listStudent" border class="el-table">
        <el-table-column type="index" label="STT" width="100" />
        <el-table-column prop="nameId" label="Tên Học Sinh" width="270" />
        <el-table-column prop="dateId" label="Ngày Sinh" width="240" />
        <el-table-column prop="value" label="Tên Lớp" width="150" />
        <el-table-column label="" width="200">
          <template #default="scope">
            <div>
              <el-button class="btd" plain @click="editRow(scope.row)"
                >Edit</el-button
              >
              <el-row class="btd" @click="deleteStudent(scope.row.id)">
                <el-button type="danger" plain>Delete</el-button>
              </el-row>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <div class="Pagination">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="20"
          v-model="page"
          @current-change="pagination"
        />
      </div>
    </div>
  </div>
  <el-dialog
    v-model="awesome"
    title="Popup nhập thông tin hoc sinh"
    width="30%"
  >
    <input
      class="ip"
      type="text"
      name="ten"
      placeholder="Nhập tên học sinh..."
      v-model="formStudents.nameId"
    />
    <input
      class="ip2"
      type="text"
      name="ten"
      placeholder="Nhập ngày sinh học sinh..."
      v-model="formStudents.dateId"
    />
    <div>
      <el-select
        class="ip3"
        v-model="formStudents.value"
        placeholder="Chọn lớp..."
      >
        <el-option
          v-for="item in classList"
          :key="item.id"
          :label="item.TenLop"
          :value="item.TenLop"
          :disabled="item.disabled"
        />
      </el-select>
    </div>

    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="addStudent(formStudents)"
          >Đồng ý</el-button
        >
        <el-button @click="awesome = false">Hủy bỏ</el-button>
      </span>
    </template>
  </el-dialog>

  <el-dialog v-model="edits" title="Popup nhập thông tin học sinh" width="30%">
    <input
      class="ip"
      type="text"
      name="ten"
      placeholder="Sửa tên học sinh..."
      v-model="formEdit.nameId"
    />
    <input
      class="ip2"
      type="text"
      name="ten"
      placeholder="Sửa ngày sinh học sinh..."
      v-model="formEdit.dateId"
    />
    <div>
      <el-select class="ip3" v-model="formEdit.value" placeholder="Chọn lớp...">
        <el-option
          v-for="item in classList"
          :key="item.id"
          :label="item.TenLop"
          :value="item.TenLop"
          :disabled="item.disabled"
        />
      </el-select>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="editStudent(this.formEdit)"
          >Đồng ý</el-button
        >
        <el-button @click="edits = false">Hủy bỏ</el-button>
      </span>
    </template>
  </el-dialog>
</template>
 
<script>
import { ref } from "vue";
export default {
  name: "danhsachhocsinh",
  computed: {
    classList() {
      return this.$store.state.tableData;
    },
    listStudent() {
      return this.$store.state.listStudent;
    },
  },
  data() {
    return {
      input1: "",
      awesome: false,
      formStudents: {
        nameId: "",
        dateId: "",
        value: "",
      },
      value: ref(""),
      title: "",
      edits: false,
      // formEdit: {
      //   id: null,
      //   nameId: null,
      //   dateId: null,
      //   value: null
      // }
    };
  },
  created() {
    this.$store.dispatch("getClass");
    this.$store.dispatch("getStudent");
  },
  methods: {
    pagination(page) {
      console.log(page);
      this.$store.dispatch("getStudent");
      this.$store.dispatch("paginationStudent", page);
    },
    filterSeach(input1) {
      this.$store.commit("SEACH_STUDENT", input1);
      console.log(input1);
    },
    toggle() {
      this.awesome = !this.awesome;
    },
    addStudent(formStudents) {
      // this.$store.dispatch('getStudent')
      this.$store.dispatch("addStudent", formStudents);
      // this.formStudents.nameId = ''
      // this.formStudents.dateId = ''
      // this.formStudents.value = ''
      this.formStudents = "";
      this.awesome = false;
    },
    deleteStudent(ID) {
      this.$store.dispatch("deleteStudent", ID);
    },
    editRow(thisStudent) {
      this.edits = !this.edits;
      this.formEdit = thisStudent;
      // this.formEdit.id = thisStudent.id;
      // this.formEdit.editName = thisStudent.nameId;
      // this.formEdit.editDate = thisStudent.dateId;
      // this.formEdit.editValue = thisStudent.value;
    },
    editStudent(formEdit) {
      this.$store.dispatch("editStudent", formEdit);
      this.edits = false;
    },
  },
};
</script>
<style scoped>
.divseach{
  margin-left: 119px;
}
.addStudent {
  float: right;
}
.el-buttom {
  border-radius: 4px;
  border-color: #e5e8ed;
  /* background: none;
  outline: none; */
  float: left;
  padding: 0;
  color: #706c94;
  font-size: 15px;
  transition: 0.4s;
  line-height: 40px;
  width: 0px;
}
.btn .btn-outline-primary {
    width: 99px;
    height: 35px;
    position: relative;
    top: 19px;
    left: 14px;
}
.el-buttom {
  position: relative;
  top: 17px;
  left: 0px;
  width: 220px;
}

.container {
  background: #ecf5ff;
  height: 800px;
  font-family: Hack, monospace;
}
.Pagination {
  float: right;
  border-top: none !important;
}
.el-table {
  width: 100%;
  border-width: 3px;
  margin-bottom: 20px;
  margin-top: 57px;
  border-top: none !important;
}
.table {
  height: 250px;
  width: 80%;
  margin-left: 10%;
}
.btn {
}
.el-btn {
  float: right;
  margin-bottom: 20px;
  margin-top: 33px;
}
.ip {
  border: 1px double #808080;
  border-radius: 3px;
  width: 80%;
  height: 25px;
}
.ip2 {
  border: 1px double #808080;
  border-radius: 3px;
  width: 80%;
  height: 25px;
  margin-top: 10px;
}
.ip3 {
  width: 82%;
  margin-top: 10px;
}
.btd {
  margin-left: 10px;
  display: inline-block;
}
</style>