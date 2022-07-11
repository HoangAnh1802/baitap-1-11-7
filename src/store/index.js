import { createStore } from 'vuex';
import axios from 'axios'
export default createStore({
  state: {
    tableData: [
    // {
    //   id: "1",
    //   TenLop: "6A",
    // },
    // {
    //   id: "2",
    //   TenLop: "2B",
    // },
    // {
    //   id: "3",
    //   TenLop: "7C",
    // },
    // {
    //   id: "4",
    //   TenLop: "9D",
    // }
  ],
  tableDataCoppy: [],
    listStudent: [
      // {
      //   id: '1',
      //   nameId: 'Nguyen Van A',
      //   dateId: '1/2/2000',
      //   value: 'Lop A',
      // },
      // {
      //   id: '2',
      //   nameId: 'Nguyen Van B',
      //   dateId: '6/2/2000',
      //   value: 'Lop B',
      // },
      // {
      //   id: '3',
      //   nameId: 'Nguyen Van C',
      //   dateId: '1/12/2000',
      //   value: 'Lop C',
      // },
      // {
      //   id: '4',
      //   nameId: 'Nguyen Van D',
      //   dateId: '3/8/2000',
      //   value: 'Lop D',
      // },
    ],
  },
  getters: {
  },
  mutations: {
    SEACH_STUDENT(state, input1) {
      state.listStudent = state.listStudent.filter(i => i.nameId === input1)
    },
    SEACH_CLASS(state, input1) {
      state.tableDataCoppy = state.tableDataCoppy.filter(i => i.TenLop === input1)
      console.log(input1)
    },
    ADD_CLASS(state, newClass) {
      let newId = state.tableData.length + 1
      let obj = {id: newId, TenLop: newClass}
      state.tableData.push(obj)
    },
    DELETE_CLASS(state, ID) {
      state.tableData = state.tableData.filter(t => t.id !== ID)
    },
    DELETE_STUDENT(state, ID) {
      console.log(ID)
      state.listStudent = state.listStudent.filter(t => t.id !== ID)
    },
    ADD_STUDENT(state, formStudents) {
      const newId = state.listStudent.length + 1
      let obj = {id: newId, nameId: formStudents.nameId, dateId: formStudents.dateId, value: formStudents.value}
      state.listStudent.push(obj)
    },
    EDIT_STUDENT(state, formEdit) {
      // console.log(formEdit)
      // const findEdit = state.listStudent.find(el => el.id == formEdit.id)
      // console.log('2',findEdit)
      // const indexEdit = state.listStudent.indexOf(formEdit.id)
      // state.listStudent[indexEdit] = formEdit
      // console.log(indexEdit)
    },
    SET_CLASS(state, apiClass) {
      state.tableData = apiClass.map(item => ({id: item.id, TenLop: item.class.toString() + item.rank }))
      state.tableDataCoppy = state.tableData.slice(0, 10)
    },
    SET_STUDENT(state, apiStudent) {
      state.listStudent = apiStudent.map(item =>({id: item.id, nameId: item.name, dateId: item.birth_day, value: item.class}))
    },
    PAGINAGION_CLASS(state, page) {
      console.log(page)
      const stn = Number(`${page - 1}0`)
      console.log(stn)
      const sth = Number(`${page}0`)
      console.log(sth);
      state.tableDataCoppy = state.tableData.slice(stn, sth)
      
    },
    FILTER_STUDENT(state, params){
      // this.listStudent = this.listStudent.map(item =>({id: item.id, nameId: item.name, dateId: item.birth_day, value: item.class}))
      state.listStudent = state.listStudent.filter(i => i.value === params.name)
       console.log(params.name)
    },
    PAGINAGION_STUDENT(state, page) {
      console.log(page)
      const stn = Number(`${page - 1}0`)
      console.log(stn)
      const sth = Number(`${page}0`)
      console.log(sth);
      state.listStudent = state.listStudent.slice(stn, sth)
  }
},
  actions: {
    filterStudent({commit}, params) {
     
      commit ('FILTER_STUDENT', params)
      console.log(params.name)
      
    },
    async paginationClass({commit}, page) {
      try {
        const from = {
          "is_calc_total": true,
          "limit": 20,
          "offset": 0,
          "query": "",
          "timeout": 30
        }
        const respose = await axios.post('https://staging.pontusinc.com/api/category_management/v1/intern/class/list', from)
        const avd = respose.data.result.data
        commit ('PAGINAGION_CLASS', page)
      } catch (error) {
        console.log(error)
      }
    },
    async paginationStudent({commit}, page) {
      try {
        const by = {
          "is_calc_total": true,
          "limit": 200,
          "offset": 0,
          "query": "",
          "timeout": 30
        }
        const respose = await axios.post('https://staging.pontusinc.com/api/category_management/v1/intern/student/list', by)
        const link = respose.data.result.data
        commit ('PAGINAGION_STUDENT', page)
      } catch (error) {
        console.log(error)
      }
    },
    async deleteClass({ commit }, ID){
      try {
        await axios.delete(`https://staging.pontusinc.com/api/category_management/v1/intern/class/${ID}/delete`)
        commit('DELETE_CLASS', ID)
      } catch (error) {
        console.log(error)
      }
    },
    async deleteStudent({ commit }, ID){
      try {
        await axios.delete(`https://staging.pontusinc.com/api/category_management/v1/intern/student/${ID}/delete`)
        commit('DELETE_STUDENT', ID)
      } catch (error) {
        console.log(error)
      }
    },
    async addClass({ commit }, title){
      console.log(title)
      try {
        const from = {
          "class": title[0],
          "rank": title[1]
        }
        await axios.post(`https://staging.pontusinc.com/api/category_management/v1/intern/class/create`, from)
        commit('ADD_CLASS', title)
      } catch (error) {
        console.log(error)
      }
    },
    async addStudent({ commit }, formStudents){
      console.log(formStudents)
      try {
        const from = {
          name: formStudents.nameId,
          birth_day: formStudents.dateId,
          address: "Ha Noi",
          class: formStudents.value
        }
        await axios.post(`https://staging.pontusinc.com/api/category_management/v1/intern/student/create`, from)
        commit('ADD_STUDENT', formStudents)
      } catch (error) {
        console.log(error)
      }
    },
    async editStudent({ commit }, thisStudent){
      console.log(thisStudent)
      try {
        const from = {
          name: thisStudent.nameId,
          birth_day: thisStudent.dateId,
          address: '',
          class: thisStudent.value
        }
        await axios.put(`https://staging.pontusinc.com/api/category_management/v1/intern/student/${thisStudent.id}/update`, from)
        commit('EDIT_STUDENT', thisStudent)
      } catch (error) {
        console.log(error)
      }
    },

    async getClass({commit}) {
      try {
        const from = {
          "is_calc_total": true,
          "limit": 20,
          "offset": 0,
          "query": "",
          "timeout": 30
        }
        const respose = await axios.post('https://staging.pontusinc.com/api/category_management/v1/intern/class/list', from)
        const avd = respose.data.result.data
        commit ('SET_CLASS', avd)
      } catch (error) {
        console.log(error)
      }
    },
    async getStudent({commit}) {
      try{
        const by = {
          "is_calc_total": true,
          "limit": 200,
          "offset": 0,
          "query": "",
          "timeout": 30
        }
        const respose = await axios.post('https://staging.pontusinc.com/api/category_management/v1/intern/student/list', by)
        const link = respose.data.result.data
        commit ('SET_STUDENT', link)
      }catch (error) {
        console.log(error)
      }
    },

  },
  modules: {
  }
})
