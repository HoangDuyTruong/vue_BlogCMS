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
    <v-data-table :headers="headers" :items="WorkExpData" :search="search">
      <template v-slot:body="{ items }">
        <tbody>
          <tr v-for="item in items" :key="item.name">
            <td style="max-width: 100%,width:20%">
              {{ item.YearExp }}
            </td>
            <td style="max-width: 100%,width:20%">
              {{ item.Level }}
            </td>
            <td style="max-width: 100%,width:20%">
              {{ item.Percent }}
            </td>
            <td style="max-width: 100%,width:20%">
              {{ item.CompanyName }}
            </td>
            <td style="max-width: 100%,width:20%">
              {{ item.Description }}
            </td>
            <td style="max-width: 100%,width:20%">
              {{ item.Position }}
            </td>
            <td class="justify-center" style="width:90px;">
              <v-icon  color="teal" @click = "ShowModalSua(true,item)">edit</v-icon>
              <v-icon  color="pink" @click= "showXoaWorkExp(item.WorkID)" >delete</v-icon>
            </td>
          </tr>
        </tbody>
        <v-dialog v-model="dialogXoaWorkExp" persistent max-width="290" >
          <v-card>
            <v-card-title class="headline">Xác nhận xóa</v-card-title>
            <v-card-text>
              Bạn có chắc chắn muốn xóa bản ghi này không?
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="pink" @click = "xacNhanXoa(isXoa)">Xóa</v-btn>
              <v-btn color="green darken-1" @click.native= "dialogXoaWorkExp = false"  flat>Hủy</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <modal-work-exp ref="ModalWorkExp" @reloadWorkExp="reloadWorkExp"></modal-work-exp>
      </template>
    </v-data-table>
  </v-card>
</template>
<script>
import ModalWorkExp from './ModalWorkExp'
import axios from 'axios'

export default {
  components: {
    ModalWorkExp
  },
  data() {
    return {
      size: 10,
      totalRow:100,
      search: "",
      dialogXoaWorkExp: false,
      isXoa: 0,
      headers: [
        {
          text: "Year Experience",
          align: "left",
          value: "YearExp"
        },
        { text: "Level", value: "Level" },
        { text: "Percent", value: "Percent" },
        { text: "CompanyName", value: "CompanyName"},
        { text: "Description", value: "Description"},
        { text: "Position", value: "Position"},
        { text: "Manipulation", value: "#" }
      ],
      WorkExpData: []
    };
  },
  methods: {
    getData(page,size){
      axios
        .get("https://apiblogprofile20191205011822.azurewebsites.net/api/WorkExp",{
          params: {
            PageSize: page,
            Size:size
          }
        })
        .then(res => {
          console.log(res)
          this.WorkExpData = res.data.Data
          this.totalRow = res.data.SizePage
        })
    },
    reloadWorkExp () {
      this.getData(0, this.size)
    },
    showXoaWorkExp(id){
      this.dialogXoaWorkExp = true;
      this.isXoa = id;
    },
    xacNhanXoa(id){
      axios.delete("https://localhost:44334/api/WorkExp/"+ id).then(()=>{
          this.getData(0,this.size,"");
          this.dialogXoaWorkExp =false
        }).catch(()=>{
          this.getData(0,this.size,"");
           this.dialogXoaWorkExp =false
        })
    },
    ShowModalSua(isUpdate,id){
      this.$refs.ModalWorkExp.show(isUpdate,id)
    },
    ShowModalAdd(){
      this.$refs.ModalWorkExp.show(false,{})
    }
  },
  mounted () {
    this.getData(0, this.size)
  }
};
</script>
