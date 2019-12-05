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
    <v-data-table :headers="headers" :items="SkillData" :search="search">
      <template v-slot:body="{ items }">
        <tbody>
          <tr v-for="item in items" :key="item.name">
            <td style="max-width: 100%,width:20%">
              {{ item.NameSkill }}
            </td>
            <td style="max-width: 100%,width:20%">
              {{ item.Description }}
            </td>
            <td style="max-width: 100%,width:20%">
              {{ item.YearExperience }}
            </td>
            <td style="max-width: 100%,width:20%">
              {{ item.Percent }}
            </td>
            <td style="max-width: 100%,width:20%">
              {{ item.level }}
            </td>
            <td class="justify-center" style="width:90px;">
              <v-icon  color="teal" @click = "ShowModalSua(true,item)">edit</v-icon>
              <v-icon  color="pink" @click= "showXoaSkill()" >delete</v-icon>
            </td>
          </tr>
        </tbody>
        <v-dialog v-model="dialogXoaSkill" persistent max-width="290" >
          <v-card>
            <v-card-title class="headline">Xác nhận xóa</v-card-title>
            <v-card-text>
              Bạn có chắc chắn muốn xóa bản ghi này không?
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="pink" @click = "xacNhanXoa()">Xóa</v-btn>
              <v-btn color="green darken-1" @click.native= "dialogXoaSkill = false"  flat>Hủy</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <modal-skill ref="ModalSkill"></modal-skill>
      </template>
    </v-data-table>
  </v-card>
</template>
<script>
import ModalSkill from './ModalSkill'
import axios from 'axios'
export default {
  components: {
    ModalSkill
  },
  data() {
    return {
      search: "",
      dialogXoaSkill: false,
      headers: [
        {
          text: "Name Skill",
          align: "left",
          value: "NameSkill"
        },
        { text: "Description", value: "Description" },
        { text: "Year Experience", value: "YearExperience" },
        { text: "Percent", value: "Percent"},
        { text: "Level", value: "level"},
        { text: "Manipulation", value: "#" }
      ],
      SkillData: [
        {
          NameSkill: "Nguyễn Thị Huyền Trang",
          Description: "CNTT15",
          YearExperience: "6-9-1998",
          Percent: "Vĩnh Phúc",
          level: "90%"
        },
        {
          NameSkill: "Đỗ Trung Dũng",
          Description: "CDT-15",
          YearExperience: "29-3-1998",
          Percent: "Hà Nội",
          level: "90%"
        },

        {
          NameSkill: "Trần Công Sơn",
          Description: "KTPM15",
          YearExperience: "30-8-1998",
          Percent: "Gia Lâm",
          level: "90%"
        }
      ],
      
    };
  },
  methods: {
      getData(page,size){
        var config = {
          PageSize: page,
          Size: size
        }
        axios.get("https://apiblogprofile20191205011822.azurewebsites.net/api/Skill/Get",config)
        .then((res) => {
          console.log(res);

        })
      },
      showXoaSkill(){
        this.dialogXoaSkill = true;
      },
      xacNhanXoa(){
        this.dialogXoaSkill = true;
      },
      ShowModalSua(isUpdate,id){
        this.$refs.ModalSkill.show(isUpdate,id)

      },
      ShowModalAdd(){
        this.$refs.ModalSkill.show(false,{})
      }
  },
  created() {
    this.getData(0,10);
  },
};
</script>
