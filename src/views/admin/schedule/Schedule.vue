<template>
  <div>
    <b-container>
      <button @click="$bvModal.show('bv-modal-example')">
        <svg
          width="3em"
          height="3em"
          viewBox="0 0 16 16"
          class="bi bi-plus-square"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"
          />
          <path
            fill-rule="evenodd"
            d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"
          />
        </svg>
      </button>
      <b-modal id="bv-modal-example" hide-footer >
        <template v-slot:modal-title>Add</template>
        <AddSchedule :callback="getListUser"/>
      </b-modal>

      <b-modal id="bv-modal-edit" hide-footer>
        <template v-slot:modal-title>Edit</template>
        <EditSchedule :editData="editData" :callback="getListUser"/>
      </b-modal>
      <b-modal id="modal-prevent-closing" ref="modal" title="Delete" @ok="handleOk">Are Your Sure</b-modal>

      <table class="table" style="margin-top:50px">
        <thead>
          <tr>
            <th scope="col"><button>id</button></th>
            <th scope="col"><button>Tournament</button></th>
            <th scope="col"><button>Teams</button></th>
            <th scope="col"><button>Time</button></th>
            <th scope="col"><button>Address</button></th>
            <th scope="col"><button>status</button></th>
            <th scope="col">Detail</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="schedule in schedule" :key="schedule.idSchedule">
            <th scope="row">{{schedule.idSchedule}}</th>
            <td>{{schedule.nameTour}}</td>
            <td>
              {{schedule.team[0].nameTeam}}
                    <b-avatar variant="info" :src="'http://localhost:8090/'+schedule.team[0].logo"></b-avatar>
              -      <b-avatar variant="info"  :src="'http://localhost:8090/'+schedule.team[1].logo"></b-avatar>

              {{schedule.team[1].nameTeam}}</td>
            <td>{{schedule.timeStart}}/{{schedule.timeEnd}}</td>
            <td>{{schedule.address}}</td>

            <td>{{schedule.status==1? 'đang' : (schedule.status==0?'chưa':'kết thúc')}}</td>
            <td>
                <router-link :to="{ path: '/DetailSchedule/'+ schedule.idSchedule}" id="${schedule.idSchedule}" >
              <b-icon-chevron-double-right></b-icon-chevron-double-right>
                </router-link>
            </td>
            <td>
              <button @click="editPush(schedule)">
                <svg
                  width="2em"
                  height="2em"
                  viewBox="0 0 16 16"
                  class="bi bi-pencil-square"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"
                  />
                  <path
                    fill-rule="evenodd"
                    d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                  />
                </svg>
              </button>
              <button v-b-modal.modal-prevent-closing @click="changeDelete(schedule.idSchedule)">
                <svg
                  width="2em"
                  height="2em"
                  viewBox="0 0 16 16"
                  class="bi bi-trash"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"
                  />
                  <path
                    fill-rule="evenodd"
                    d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                  />
                </svg>
              </button>
              <b-icon-exclamation-diamond variant="danger" v-b-popover.hover.top="'Update now'" title="Update" v-show="schedule.video==null&&schedule.status==2"></b-icon-exclamation-diamond>
            </td>
          </tr>
        </tbody>
      </table>
    </b-container>
  </div>
</template>

<script>
import axios from "axios";
const API_URL = "http://localhost:8090/api/v1/schedule/";
import AddSchedule from "./AddSchedule";
import EditSchedule from "./EditSchedule";
export default {
  data() {
    return {
      perPage: 1,
      pages: 10,
      schedule: [],
      page: 1,
      pagesize: 20,
      nameSearch: "",
      type: "",
      idDelete:''  ,
      editData:{},
      IsLoadingUpdate:false,
  
     
    };
  },
  components: {
    AddSchedule,
    EditSchedule
  },
  created() {
    this.getListUser();
  },
  methods: {
    handleOk() {
              axios.delete(API_URL+"delete/"+this.idDelete).then(response=>{
          alert(response.data);
        })
          
    },
    editPush(iteam){
            this.editData=iteam;
            console.log(this.editData)
      this.$bvModal.show('bv-modal-edit')

    },
    changeDelete(id){
      this.idDelete=id;
    },
    getListUser(){
      console.log('getListUser');
       axios
      .get(API_URL + "search", {
        params: {
          page: this.page,
          pageSize: this.pagesize,
          nameSearch: this.nameSearch,
          type: this.type
        }
      })
      .then(response => {
        console.log(response.data.schedules);
        this.schedule = response.data.schedules;
        this.pages = response.data.totalPage;
      });
    }
  },
  watch: {
    $route(route) {
      if (route.name == "User") {
        this.show = false;
      } else {
        this.show = true;
      }
    }
  }
};
</script>
