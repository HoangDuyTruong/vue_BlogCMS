<template>
  <v-card>
    <v-card-title>
      <v-text-field
        v-model="search"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
      <v-spacer></v-spacer>
      <v-btn fab dark small color="primary" @click="ShowModalAdd()">
        <v-icon>add</v-icon>
      </v-btn>
    </v-card-title>
    <v-data-table :headers="headers" :items="InforProfileData" :search="search">
      <template v-slot:body="{ items }">
        <tbody>
          <tr v-for="item in items" :key="item.name">
            <td style="max-width: 100%,width:20%">
              {{ item.Email }}
            </td>
            <td style="max-width: 100%,width:20%">
              {{ item.NumberPhone }}
            </td>
            <td style="max-width: 100%,width:20%">
              {{ item.Adress }}
            </td>
            <td style="max-width: 100%,width:20%">
              {{ item.FullName }}
            </td>
            <td style="max-width: 100%,width:20%">
              {{ item.Dob }}
            </td>
            <td style="max-width: 100%,width:20%">
              {{ item.LinkFacebook }}
            </td>
            <td style="max-width: 100%,width:20%">
              {{ item.Description }}
            </td>
            <td style="max-width: 100%,width:20%">
              {{ item.Slogan }}
            </td>
            <td class="justify-center" style="width:90px;">
              <v-icon color="teal" @click="ShowModalSua(true, item)"
                >edit</v-icon
              >
              <v-icon color="pink" @click="showXoaInforProfile(item.InfoProfileID)"
                >delete</v-icon
              >
            </td>
          </tr>
        </tbody>
        <v-dialog v-model="dialogXoaInforProfile" persistent max-width="290">
          <v-card>
            <v-card-title class="headline">Xác nhận xóa</v-card-title>
            <v-card-text>
              Bạn có chắc chắn muốn xóa bản ghi này không?
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="pink" @click="xacNhanXoa(idXoa)">Xóa</v-btn>
              <v-btn
                color="green darken-1"
                @click.native="dialogXoaInforProfile = false"
                text
                >Hủy</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-dialog>
        <modal-InforProfile @handlSave ="Save" ref="ModalInforProfile"></modal-InforProfile>
      </template>
    </v-data-table>
  </v-card>
</template>
<script>
import ModalInforProfile from "./ModalInforProfile";
import axios from "axios";
export default {
  components: {
    ModalInforProfile
  },
  data() {
    return {
      idXoa: 0,
      size: 10,
      search: "",
      dialogXoaInforProfile: false,
      headers: [
        {
          text: "Email",
          align: "left",
          value: "Email"
        },
        { text: "NumberPhone", value: "NumberPhone" },
        { text: "Adress", value: "Adress" },
        { text: "FullName", value: "FullName" },
        { text: "Dob", value: "Dob" },
        { text: "LinkFacebook", value: "LinkFacebook" },
        { text: "Description", value: "Description" },
        { text: "Slogan", value: "Slogan" },
        { text: "Manipulation", value: "#" }
      ],
      InforProfileData: []
    };
  },
  methods: {
    getData(page, size) {
      axios
        .get(
          "https://apiblogprofile20191205011822.azurewebsites.net/api/InfoProfile",
          {
            params: {
              PageSize: page,
              Size: size
            }
          }
        )
        .then(res => {
          this.InforProfileData = res.data.Data;
        })
        .catch(error => {
          console.log(error);
        });
    },
    showXoaInforProfile(id) {
      this.dialogXoaInforProfile = true;
      this.idXoa = id;
    },
    xacNhanXoa(id) {
      console.log(id);
      axios
        .delete(
          "https://apiblogprofile20191205011822.azurewebsites.net/api/InfoProfile/" +
            id
        )
        .then(() => {
          this.getData(0, this.size, "");
          this.dialogXoaInforProfile = false;
        })
        .catch(() => {
          this.getData(0, this.size, "");
          this.dialogXoaInforProfile = false;
        });
    },
    Save() {
        this.getData(0, this.size);
    },
    ShowModalSua(isUpdate, id) {
      this.$refs.ModalInforProfile.show(isUpdate, id);
    },
    ShowModalAdd() {
      this.$refs.ModalInforProfile.show(false, {});
    }
  },
  mounted() {
    this.getData(0, this.size);
  }
};
</script>
