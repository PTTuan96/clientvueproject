export default class Schedule {
    constructor( timeStart,timeEnd,scoreTeam1,scoreTeam2, idTeam1,idTeam2,idwinner,video,description,address,status,idTour,idSchedule,file) {
      this.timeStart = timeStart;
      this.scoreTeam1=scoreTeam1;
      this.scoreTeam2=scoreTeam2;
      this.timeEnd = timeEnd;
      this.idTeam1=idTeam1;
      this.idTeam2=idTeam2;
      this.idwinner=idwinner;
      this.video=video;
      this.description=description;
      this.address=address;
      this.status=status;
      this.idTour=idTour;
      this.idSchedule=idSchedule;
      this.file=file
    }
  }
  