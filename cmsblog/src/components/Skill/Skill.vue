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
    <v-data-table :headers="headers"  :items="SkillData" :search="search">
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
              {{ item.YearExp }}
            </td>
            <td style="max-width: 100%,width:20%">
              {{ item.Percent }}
            </td>
            <td style="max-width: 100%,width:20%">
              {{ item.Level }}
            </td>
            <td class="justify-center" style="width:90px;">
              <v-icon  color="teal" @click = "ShowModalSua(true,item)">edit</v-icon>
              <v-icon  color="pink" @click= "showXoaSkill(item.SkillID)" >delete</v-icon>
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
              <v-btn color="pink" @click = "xacNhanXoa(idXoa)">Xóa</v-btn>
              <v-btn color="green darken-1" @click.native= "dialogXoaSkill = false"  flat>Hủy</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <modal-skill @SaveEmit="Save" ref="ModalSkill"></modal-skill>
      </template>
    </v-data-table>
    <div class="text-center pt-2">
      <v-pagination v-model="Page" :length="PageCount"></v-pagination>
    </div>
  </v-card>
</template>
<script>
import ModalSkill from './ModalSkill'
import axios from 'axios'
export default {
  components: {
    ModalSkill
  },
  watch: {
    search: function () {
        this.getData(0,10,this.search);
    },
    Page: function () {
      this.getData(this.Page,this.size,this.search)
    }
  },
  data() {
    return {
      Page:0,
      size: 10,
      totalRow: 100,
      PageCount: 0,
      search: "",
      dialogXoaSkill: false,
      idXoa: 0,
      headers: [
        {
          text: "Name Skill",
          align: "left",
          value: "NameSkill"
        },
        { text: "Description", value: "Description" },
        { text: "Year Experience", value: "YearExp" },
        { text: "Percent", value: "Percent"},
        { text: "Level", value: "Level"},
        { text: "Manipulation", value: "#" }
      ],
      SkillData: [],
      
    };
  },
  methods: {
      Save(){
        console.log("data");
        this.getData(0,10,"");
      },
      getData(page,size,search){
        axios.get("https://localhost:44334/api/Skill",{
          params: {
            PageSize: page,
            Size:size,
            NameSkill:search
          }
        })
        .then((res) => {
          this.SkillData = res.data.Data
          this.totalRow = res.data.SizePage;
          this.PageCount = this.totalRow/this.size
          if(this.PageCount == undefined)
            this.PageCount = 0
        })
      },
      showXoaSkill(id){
        this.dialogXoaSkill = true;
        this.idXoa = id;
      },
      xacNhanXoa(id){
        console.log(id)
        axios.delete("https://localhost:44334/api/Skill/"+ id).then(()=>{
          this.getData(0,this.size,"");
          this.dialogXoaSkill =false
        }).catch(()=>{
          this.getData(0,this.size,"");
           this.dialogXoaSkill =false
        })
      },
      ShowModalSua(isUpdate,id){
        this.$refs.ModalSkill.show(isUpdate,id)
      },
      ShowModalAdd(){
        this.$refs.ModalSkill.show(false,{})
      }
  },

  created() {
    this.getData(0,this.size,"");
  },
};
</script>
