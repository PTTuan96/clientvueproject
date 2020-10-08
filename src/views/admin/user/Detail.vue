<template>
  <div>
    <b-container class="bv-example-row">
      <b-row>
        <b-col>
          <div>
            <div class="container emp-profile">
              <form method="post">
                <div class="row">
                  <div class="col-md-4">
                    <div class="profile-img">
                      <img :src="avatar" alt />
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="profile-head">
                      <h2>{{data && data.profile? data.profile.name : ''}}</h2>
                      <br />
                      <h6 v-show="role">Người Dùng Hệ thống</h6>
                      <h6 v-show="!role">Thành Viên Trong Hệ Thống</h6>
                    </div>
                  </div>
                  <div class="col-md-4"></div>
                </div>
                <div class="row">
                  <div class="col-md-4"></div>
                  <div class="col-md-8">
                    <div class="tab-content profile-tab" id="myTabContent">
                      <div
                        class="tab-pane fade show active"
                        id="home"
                        role="tabpanel"
                        aria-labelledby="home-tab"
                      >
                        <div class="row">
                          <div class="col-md-4">
                            <label>UserName</label>
                          </div>
                          <div class="col-md-4">
                            <p>{{data? data.username : ''}}</p>
                          </div>
                        </div>
                        <div class="row">
                          <div class="col-md-4">
                            <label>Giới tính</label>
                          </div>
                          <div class="col-md-4">
                            <p v-if="data && data.profile && data.profile.gender=='nam'">Nam</p>
                            <p v-else>Nữ</p>
                          </div>
                        </div>
                        <div class="row">
                          <div class="col-md-4">
                            <label>Email</label>
                          </div>
                          <div class="col-md-4">
                            <p>{{data? data.email : ''}}</p>
                          </div>
                        </div>
                        <div class="row">
                          <div class="col-md-4">
                            <label>Phone</label>
                          </div>
                          <div class="col-md-4">
                            <p>{{data && data.profile? data.profile.phone : ''}}</p>
                          </div>
                        </div>
                        <div class="row">
                          <div class="col-md-4">
                            <label>Address</label>
                          </div>
                          <div class="col-md-4">
                            <p>{{data && data.profile? data.profile.address : ''}}</p>
                          </div>
                        </div>
                      </div>
                      <div
                        class="tab-pane fade"
                        id="profile"
                        role="tabpanel"
                        aria-labelledby="profile-tab"
                      >
                        <div class="row">
                          <div class="col-md-6">
                            <label>Experience</label>
                          </div>
                          <div class="col-md-6">
                            <p>Expert</p>
                          </div>
                        </div>
                        <div class="row">
                          <div class="col-md-6">
                            <label>Hourly Rate</label>
                          </div>
                          <div class="col-md-6">
                            <p>10$/hr</p>
                          </div>
                        </div>
                        <div class="row">
                          <div class="col-md-6">
                            <label>Total Projects</label>
                          </div>
                          <div class="col-md-6">
                            <p>230</p>
                          </div>
                        </div>
                        <div class="row">
                          <div class="col-md-6">
                            <label>English Level</label>
                          </div>
                          <div class="col-md-6">
                            <p>Expert</p>
                          </div>
                        </div>
                        <div class="row">
                          <div class="col-md-6">
                            <label>Availability</label>
                          </div>
                          <div class="col-md-6">
                            <p>6 months</p>
                          </div>
                        </div>
                        <div class="row">
                          <div class="col-md-12">
                            <label>Your Bio</label>
                            <br />
                            <p>Your detail description</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script>
import Axios from "axios";
const API_URL = "http://localhost:8090/api/v1/account/";

export default {
  data() {
    return {
      data: {},
      avatar: "",
      role: true
    };
  },
  created() {
    Axios.get(API_URL + "getById/" + this.$route.params.id).then(response => {
      this.data = response.data;
      this.avatar = "http://localhost:8090/" + response.data.profile.avatar;
      if (response.data.role == "ROLE_USER") {
        this.role = true;
      } else {
        this.role = false;
      }
    });
  }
};
</script>
<style>
body {
}
.emp-profile {
  padding: 3%;
  margin-top: 3%;
  margin-bottom: 3%;
  border-radius: 0.5rem;
  background: #fff;
}
.profile-img {
  text-align: center;
}
.profile-img img {
  width: 70%;
  height: 100%;
}
.profile-img .file {
  position: relative;
  overflow: hidden;
  margin-top: -20%;
  width: 70%;
  border: none;
  border-radius: 0;
  font-size: 15px;
  background: #212529b8;
}
.profile-img .file input {
  position: absolute;
  opacity: 0;
  right: 0;
  top: 0;
}
.profile-head h5 {
  color: #333;
}
.profile-head h6 {
  color: #0062cc;
}
.profile-edit-btn {
  border: none;
  border-radius: 1.5rem;
  width: 70%;
  padding: 2%;
  font-weight: 600;
  color: #6c757d;
  cursor: pointer;
}
.proile-rating {
  font-size: 12px;
  color: #818182;
  margin-top: 5%;
}
.proile-rating span {
  color: #495057;
  font-size: 15px;
  font-weight: 600;
}
.profile-head .nav-tabs {
  margin-bottom: 5%;
}
.profile-head .nav-tabs .nav-link {
  font-weight: 600;
  border: none;
}
.profile-head .nav-tabs .nav-link.active {
  border: none;
  border-bottom: 2px solid #0062cc;
}
.profile-work {
  padding: 14%;
  margin-top: -15%;
}
.profile-work p {
  font-size: 12px;
  color: #818182;
  font-weight: 600;
  margin-top: 10%;
}
.profile-work a {
  text-decoration: none;
  color: #495057;
  font-weight: 600;
  font-size: 14px;
}
.profile-work ul {
  list-style: none;
}
.profile-tab label {
  font-weight: 600;
}
.profile-tab p {
  font-weight: 600;
  color: #0062cc;
}
</style>