<template>
  <v-container fluid data-app>
    <v-form ref="form" v-model="valid">
      <v-row align="center">
        <v-col class="d-flex" cols="12" sm="12">
          <h2 class="text-center">Giải đấu : {{editData.nameTour}}</h2>
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
        <b-button variant="danger" @click="cancel">Cancel</b-button>
        <b-button color="success" class="mr-4" @click.prevent="submit">EditSubmit</b-button>
      </div>
    </v-form>
  </v-container>
</template>
<script>
import Axios from "axios";
const API_URL2 = "http://localhost:8090/api/v1/team/";
const API_URL3= "http://localhost:8090/api/v1/schedule/";
import Schedule from '@/models/schedule'
export default {
  
 props:{callback:{
        type: Function
      },editData: { type : Object }
  } 
,

  created() {
    console.log(this.callback())
    Axios.get(API_URL2 + "getByTour/"+this.editData.idTour).then(response => {
      this.team = response.data;
    });
      this.selectTeam1=this.editData.team[0].idTeam;
      this.selectTeam2=this.editData.team[1].idTeam;
      this.timeEnd=this.editData.timeEnd;
      this.timeStart=this.editData.timeStart;
      this.description=this.editData.description;
      this.address=this.editData.address;



  },
  data: () => ({
    selectTeam1:'' ,
    selectTour:'' ,
    selectTeam2: '',
    tour: [],
    valid: true,
    timeEnd: '',
    description: "",
    address: "",
    timeStart: '',
    erro: false,
    team: [],
    schedule: new Schedule(),
  }),
  methods:{
    cancel(){
        this.$bvModal.hide('bv-modal-edit');
    },
    submit(){
         if(this.$refs.form.validate()==true&&this.selectTeam1!=this.selectTeam2)
      { 
        this.schedule.idSchedule=this.editData.idSchedule;
        this.schedule.idTour=this.editData.idTour;
        this.schedule.timeStart=this.timeStart;
        this.schedule.timeEnd=this.timeEnd;
        this.schedule.idTeam1=this.selectTeam1;
        this.schedule.idTeam2=this.selectTeam2;
        this.schedule.address=this.address;
        this.schedule.description=this.description;
        Axios.post(API_URL3+"editShedule",this.schedule).then(response=>{
          alert(response.data)
          this.$bvModal.hide('bv-modal-edit')
          this.callback();
       })

      }
      else{
        this.$refs.form.validate()
      }
    }
    
  }
};
</script>