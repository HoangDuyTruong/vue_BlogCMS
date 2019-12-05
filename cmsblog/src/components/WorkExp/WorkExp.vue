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
              <v-icon  color="pink" @click= "showXoaWorkExp()" >delete</v-icon>
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
              <v-btn color="pink" @click = "xacNhanXoa()">Xóa</v-btn>
              <v-btn color="green darken-1" @click.native= "dialogXoaWorkExp = false"  flat>Hủy</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <modal-work-exp ref="ModalWorkExp"></modal-work-exp>
      </template>
    </v-data-table>
  </v-card>
</template>
<script>
import ModalWorkExp from './ModalWorkExp'
export default {
  components: {
    ModalWorkExp
  },
  data() {
    return {
      search: "",
      dialogXoaWorkExp: false,
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
      WorkExpData: [
        {
          YearExp: "Nguyễn Thị Huyền Trang",
          Level: "CNTT15",
          Percent: "6-9-1998",
          CompanyName: "Vĩnh Phúc",
          Description: "90%",
          Position: "hihi"
        },
        {
          YearExp: "Nguyễn Thị Huyền ",
          Level: "CNTT15",
          Percent: "6-9-1998",
          CompanyName: "Vĩnh Phúc",
          Description: "90%",
          Position: "hihi"
        },

        {
          YearExp: "Nguyễn Huyền Trang",
          Level: "CNTT15",
          Percent: "6-9-1998",
          CompanyName: "Vĩnh Phúc",
          Description: "90%",
          Position: "hihi"
        }
      ],
      
    };
  },
  methods: {
      showXoaWorkExp(){
        this.dialogXoaWorkExp = true;
      },
      xacNhanXoa(){
        this.dialogXoaWorkExp = true;
      },
      ShowModalSua(isUpdate,id){
        this.$refs.ModalWorkExp.show(isUpdate,id)

      },
      ShowModalAdd(){
        this.$refs.ModalWorkExp.show(false,{})
      }
  }
};
</script>
