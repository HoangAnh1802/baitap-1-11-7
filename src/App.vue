<script setup>
</script>
<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <router-link class="el-link" to="/">
          <div type="button" class="btn btn-primary btn-lg">Trang chủ</div>
        </router-link>
      </div>
      <div class="col">
        <router-link class="el-link" to="/danhsachlop">
          <div type="button" class="btn btn-primary btn-lg">Danh sách Lớp</div>
        </router-link>
      </div>
      <div class="col">
        <router-link class="el-link" to="/danhsachhocsinh">
          <div type="button" class="btn btn-primary btn-lg">Danh sách học</div>
        </router-link>
      </div>
    </div>
  </div>
  <router-view />
</template>
<style scoped >

header {
  /* /* display: flex; */
  /* // flex-direction: column;
  // justify-content: center;
  // align-items: center;
  // position: relative; */
  /* min-height: 100vh; */
  font-family: Hack, monospace;
}
.container {
  /* // // background: #f9f9f9; */
  border-color: transparent;
  /* border-width: 4px; */
  background-color: #c6e2ff;
  /* min-height: 60px; */
  border-radius: 5px;
}
li {
  list-style-type: none;
  display: inline-block;
  /* margin: 50px; */
}
.el-link {
  text-align: center;
  /* font-size: 13px;
    color: black;
    font-weight: normal;
    font-size: 13px;
    font-family: Roboto,RobotoDraft,Helvetica,Arial,sans-serif; */
  margin-top: 50px;
  margin-bottom: 50px;
  margin-right: 150px;
  margin-left: 60px;

  text-decoration: none;
  color: #8f8f8f;
  font-size: 20px;
  font-weight: 350;
  transition: all 0.5s ease-in-out;
  position: relative;
  text-transform: uppercase;

  &:hover {
    color: #7abbff;
    transition: all 0.5s ease-in-out;
  }
}
.el-link:hover {
}
.m-2 {
  width: 180px;
}
.link a.router-link-exact-active {
  color: aliceblue;
}
</style>
