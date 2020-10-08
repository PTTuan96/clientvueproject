<template>
  <b-container>
    <h1 class="text-center">{{this.schedule.nameTour}}</h1>
    <h3 class="text-center">{{this.schedule.address}}</h3>
    <h4 class="text-center">{{schedule && schedule.team? schedule.team[0].type : ''}}</h4>
    <b-container class="bv-example-row">
      <b-row>
        <b-col></b-col>
        <b-col>
          <p class="text-center">
            Team One
            <img
              v-show="isWinner==1&&isEdit"
              style="width:30px"
              src="https://static.thenounproject.com/png/124607-200.png"
            />
          </p>
          <div class="text-center">
            <b-img thumbnail fluid  alt="Image Team 1" :src="'http://localhost:8090/'+schedule.team[0].logo"></b-img>
          </div>
          <h2 class="text-center" style="color:red" v-show="isEdit">{{this.schedule.scoreTeam1}}</h2>
          <h2 class="text-center" style="color:red" v-show="!isEdit">
            <v-text-field label="Score team 1" v-model="score1"></v-text-field>
          </h2>
        </b-col>
        <b-col>
          <p class="text-center">
            Team Two
            <img
              v-show="isWinner==2&&isEdit"
              style="width:30px"
              src="https://static.thenounproject.com/png/124607-200.png"
            />
          </p>
          <div class="text-center">
            <b-img thumbnail fluid :src="'http://localhost:8090/'+schedule.team[1].logo" alt="Image Team 2"></b-img>
          </div>
          <h2 class="text-center" style="color:red" v-show="isEdit">{{this.schedule.scoreTeam2}}</h2>
          <h2 class="text-center" style="color:red" v-show="!isEdit">
            <v-text-field v-model="score2" label="Score team 2"></v-text-field>
          </h2>
        </b-col>

        <b-col></b-col>
      </b-row>
    </b-container>
    <div style="margin:100px 70px 70px 70px">
      <h2>#Description</h2>
      <p style="
    word-break: break-word" v-show="isEdit">{{this.description}}</p>
      <v-textarea
        v-show="!isEdit"
        name="input-7-1"
        label="Default style"
        v-model="description"
        hint="Hint text"
      ></v-textarea>
    </div>
    <div>
      <div style="margin:100px 70px 70px 70px">
        <h2>#Video</h2>
        <div class="text-center">
          <video controls v-show="isEdit" :src="this.video" ></video>

          <v-file-input
            v-show="!isEdit"
            :rules="rules"
            accept="video/mp4"
            placeholder="Pick an avatar"
            prepend-icon="mdi-video"
            label="Video"
            v-model="file"
          ></v-file-input>
        </div>
      </div>
    </div>
    <div class="text-center">
      <v-btn class="ma-2" tile outlined color="success" v-show="isEdit" @click="edit">
        <v-icon>mdi-pencil</v-icon>Edit
      </v-btn>
      <v-btn class="ma-2" tile outlined color="success" @click="Cancel" v-show="!isEdit">
        <v-icon dark left>mdi-minus_circle</v-icon>Cancel
      </v-btn>
      <v-btn class="ma-2" tile outlined color="success" @click="Submit" v-show="!isEdit">
        <v-icon>mdi-pencil</v-icon>OK
      </v-btn>
    </div>
  </b-container>
</template>
<script>
import Axios from "axios";
import Schedule from "@/models/schedule";
const API_URL = "http://localhost:8090/api/v1/schedule/";

export default {
  data() {
    return {
      schedule: new Schedule(),
      description: "",
      isEdit: true,
      isWinner: 0,
      score1: "",
      score2: "",
      video: "",
      file: {},
      rules: [
        value =>
          !value ||
          value.size < 200000000000000000000000000000000000 ||
          "Avatar size should be less than 1 GB!"
      ]
    };
  },
  computed: {
    videoElement() {
      return this.$refs.video;
    },
  },

    methods: {
      getSchedule() {
        Axios.get(API_URL + "getById/", {
          params: { idSchedule: this.$route.params.id }
        }).then(response => {
          this.schedule = response.data;
          this.description = response.data.description;
          this.video = " http://localhost:8090/" + response.data.video;

          if (response.data.idwinner == response.data.team[0].idTeam) {
            this.isWinner = 1;
          } else if (response.data.idwinner == response.data.team[1].idTeam) {
            this.isWinner = 2;
          } else {
            this.isWinner = 0;
          }
          console.log(this.isWinner);
        });
      },
      edit() {
        this.isEdit = false;
        console.log(this.video);
      },
      Cancel(){
          this.isEdit = true;
      }
      ,
      Submit() {
        this.schedule.file = this.file;
        var bodyFormData = new FormData();

        bodyFormData.append("idSchedule", this.schedule.idSchedule);
        bodyFormData.append("scoreTeam1", this.score1);
        bodyFormData.append("scoreTeam2", this.score2);
        bodyFormData.append("idTeam1", this.schedule.idTeam1);
        bodyFormData.append("idTeam2", this.schedule.idTeam2);

        bodyFormData.append("description", this.description);
        bodyFormData.append("file", this.schedule.file);
        Axios.post(API_URL + "updateShedule", bodyFormData).then(response => {
          alert(response.data);
          this.getSchedule();
          this.isEdit = true;
        });
      }
    },

    created() {
      this.getSchedule();
    }
  }

</script>
