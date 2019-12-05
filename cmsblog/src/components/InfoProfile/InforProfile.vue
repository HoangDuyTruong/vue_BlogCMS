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
      <v-btn fab dark small color="primary" @click = "ShowModalAdd()">
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
              <v-icon  color="teal" @click = "ShowModalSua(true,item)">edit</v-icon>
              <v-icon  color="pink" @click= "showXoaInforProfile()" >delete</v-icon>
            </td>
          </tr>
        </tbody>
        <v-dialog v-model="dialogXoaInforProfile" persistent max-width="290" >
          <v-card>
            <v-card-title class="headline">Xác nhận xóa</v-card-title>
            <v-card-text>
              Bạn có chắc chắn muốn xóa bản ghi này không?
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="pink" @click = "xacNhanXoa()">Xóa</v-btn>
              <v-btn color="green darken-1" @click.native= "dialogXoaInforProfile = false"  flat>Hủy</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <modal-InforProfile ref="ModalInforProfile"></modal-InforProfile>
      </template>
    </v-data-table>
  </v-card>
</template>
<script>
import ModalInforProfile from './ModalInforProfile'
export default {
  components: {
    ModalInforProfile,
  },
  data() {
    return {
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
        { text: "FullName", value: "FullName"},
        { text: "Dob", value: "Dob"},
        { text: "LinkFacebook", value: "LinkFacebook"},
        { text: "Description", value: "Description"},
        { text: "Slogan", value: "Slogan"},
        { text: "Manipulation", value: "#" }
      ],
      InforProfileData: [
        {
          Email: "Nguyễn Thị Huyền Trang",
          NumberPhone: "CNTT15",
          Adress: "6-9-1998",
          FullName: "Vĩnh Phúc",
          Dob: "90%",
          LinkFacebook: "ac",
          Description: "a",
          Slogan: "a"
        },
        {
          Email: "Nguyễn  Huyền Trang",
          NumberPhone: "CNTT15",
          Adress: "6-9-1998",
          FullName: "Vĩnh Phúc",
          Dob: "90%",
          LinkFacebook: "ac",
          Description: "a",
          Slogan: "a"
        },

        {
          Email: "Nguyễn Thị Huyền Trang",
          NumberPhone: "CNTT15",
          Adress: "6-9-1998",
          FullName: "Vĩnh Phúc",
          Dob: "90%",
          LinkFacebook: "ac",
          Description: "a",
          Slogan: "a"
        }
      ],
      
    };
  },
  methods: {
      showXoaInforProfile(){
        this.dialogXoaInforProfile = true;
      },
      xacNhanXoa(){
        this.dialogXoaInforProfile = true;
      },
      ShowModalSua(isUpdate,id){
        this.$refs.ModalInforProfile.show(isUpdate,id)
      },
      ShowModalAdd(){
        this.$refs.ModalInforProfile.show(false,{})
      }
  }
};
</script>
