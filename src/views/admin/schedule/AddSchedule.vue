<template>
  <v-container fluid data-app>
    <v-form ref="form" v-model="valid">
      <v-row align="center">
        <v-col class="d-flex" cols="12" sm="12">
          <v-autocomplete
            v-model="selectTour"
            :items="tour"
            item-text="nameTour"
            item-value="idTour"
            dense
            label="Tournament"
            :rules="[v => !!v || 'Item is required',v=>v!='' ||'Item is required']"
          ></v-autocomplete>
        </v-col>

        <v-col class="d-flex" cols="12" sm="6">
            <v-autocomplete
            v-model="selectTeam1"
            :items="team"
            item-text="nameTeam"
            item-value="idTeam"
            dense
            label="Team1"
            
            :rules="[v => !!v || 'Item is required',v=>v!='' ||'Item is required']"
          ></v-autocomplete>
        </v-col>

        <v-col class="d-flex" cols="12" sm="6">
           <v-autocomplete
            v-model="selectTeam2"
            :items="team"
            item-text="nameTeam"
            item-value="idTeam"
            dense
            label="Team2"
            :rules="[v => !!v || 'Item is required',v=>v!='' ||'Item is required']"
          ></v-autocomplete>
        </v-col>
        <v-col class="d-flex" cols="12" sm="12">
          <div>
            <label for="example-datepicker">Time Start</label>
          </div>
          <b-input-group class="mb-3">
            <b-form-input
              id="example-input"
              v-model="timeStart"
              type="text"
              placeholder="YYYY-MM-DD"
              required
            ></b-form-input>
            <b-input-group-append>
              <b-form-datepicker
                v-model="timeStart"
                button-only
                right
                locale="en-US"
                reset-value
                aria-controls="example-input"
              ></b-form-datepicker>
            </b-input-group-append>
          </b-input-group>
        </v-col>

        <v-col class="d-flex" cols="12" sm="12">
          <div>
            <label for="example-datepicker">Time End</label>
          </div>
          <b-input-group class="mb-3">
            <b-form-input
              id="example-input"
              v-model="timeEnd"
              type="text"
              placeholder="YYYY-MM-DD"
              required
            ></b-form-input>
            <b-input-group-append>
              <b-form-datepicker
                v-model="timeEnd"
                button-only
                right
                locale="en-US"
                reset-value
                aria-controls="example-input"
              ></b-form-datepicker>
            </b-input-group-append>
          </b-input-group>
        </v-col>
        <v-col class="d-flex" cols="12" sm="12" v-if="erro">
          <p style="color:red">error date</p>
        </v-col>
      </v-row>
      <v-col class="d-flex" cols="12" sm="12">
        <v-text-field
          label="Address"
          v-model="address"
          required
          :rules=" [v => !!v || 'Address is required']"
        ></v-text-field>
      </v-col>
      <v-col class="d-flex" cols="12" sm="12">
        <v-textarea
          name="input-7-1"
          label="Description"
          v-model="description"
          required
          :rules=" [v => !!v || 'Description is required']"
        ></v-textarea>
      </v-col>
      <div style="text-align:right">
        <b-button variant="danger" @click="reset">Reset</b-button>
        <b-button  color="success" class="mr-4" @click.prevent="validate">Submit</b-button>
      </div>
    </v-form>
  </v-container>
</template>

<script>
import Axios from "axios";
const API_URL1 = "http://localhost:8090/api/v1/tournament/";
const API_URL2 = "http://localhost:8090/api/v1/team/";
const API_URL3= "http://localhost:8090/api/v1/schedule/";

import Schedule from '@/models/schedule'

export default {
  props: {
      callback: {
        type: Function
      }
    },
  data: () => ({
    selectTeam1:'' ,
    selectTour:'' ,
    selectTeam2: '',
    tour: [],
    valid: true,
    timeEnd: new Date().toISOString().substr(0, 10),
    description: "",
    address: "",
    timeStart: new Date().toISOString().substr(0, 10),
    erro: false,
    team: [],
    schedule: new Schedule(),
  }),

  created() {
    Axios.get(API_URL1 + "getTourAction").then(response => {
      this.tour = response.data;
    });
   
  },
  methods: {
    validate() {
      if(this.$refs.form.validate()==true)
      {
        this.schedule.idTour=this.selectTour;
        this.schedule.timeStart=this.timeStart;
        this.schedule.timeEnd=this.timeEnd;
        this.schedule.idTeam1=this.selectTeam1;
        this.schedule.idTeam2=this.selectTeam2;
        this.schedule.address=this.address;
        this.schedule.description=this.description;
        Axios.post(API_URL3+"create",this.schedule).then(response=>{
          alert(response.data)
          this.$bvModal.hide('bv-modal-example')
          this.callback();
       })

      }
      else{
        this.$refs.form.validate()
      }

    },
    reset() {
      this.$refs.form.reset();
      this.timeEnd = this.timeStart = new Date().toISOString().substr(0, 10);
    }
  },
  watch: {
    timeEnd() {
      if (this.timeEnd < this.timeStart) {
        this.erro = true;
        console.log(this.selectTour);
      }
      else{
        this.erro = false;
      }
    },
    selectTour(){
       Axios.get(API_URL2 + "getByTour/"+this.selectTour).then(response => {
      this.team = response.data;
    });
    }
  }
};
</script>