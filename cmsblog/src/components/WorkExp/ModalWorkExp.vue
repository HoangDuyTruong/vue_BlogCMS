<template>
  <v-row justify="center">
    <v-dialog v-model="isShow" persistent max-width="600px">
      <v-card>
        <v-card-title v-if="isUpdate">
          <span class="headline">Update WorkExp</span>
        </v-card-title>
        <v-card-title v-if="!isUpdate">
          <span class="headline">Add WorkExp</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field label="Year Experience" v-model="WorkExp.YearExp" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Level"
                  type="text"
                  required
                  v-model="WorkExp.Level"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Percent"
                  type="text"
                  required
                  v-model="WorkExp.Percent"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="CompanyName"
                  type="text"
                  required
                  v-model="WorkExp.CompanyName"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Description"
                  type="text"
                  required
                  v-model="WorkExp.Description"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Position"
                  type="text"
                  required
                  v-model="WorkExp.Position"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click.native ="isShow = false"
            >Close</v-btn>
          <v-btn color="blue darken-1" text @click.native ="save">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import axios from 'axios'

export default {
  data: () => ({
    isShow: false,
    isUpdate: true,
    WorkExp: {
      YearExp: 0,
      Level: 0,
      Percent: 0,
      CompanyName: '',
      Description: '',
      Position: ''
    }
  }),
  methods: {
    save () {
      if (this.isUpdate) {
        console.log(this.WorkExp)
        axios
          .put("https://apiblogprofile20191205011822.azurewebsites.net/api/WorkExp", this.WorkExp)
          .then((res) => {
            console.log(res)
            this.isShow = false
            this.$emit('reloadWorkExp')
          })
      } else {
        axios
          .post("https://apiblogprofile20191205011822.azurewebsites.net/api/WorkExp", this.WorkExp)
          .then(() => {
            this.isShow = false
            this.$emit('reloadWorkExp')
          })
      }
    },
    show(isUpdate,item){
      this.isUpdate = isUpdate;
      if(isUpdate){
        this.WorkExp.YearExp = item.YearExp
        this.WorkExp.Level = item.Level
        this.WorkExp.Percent = item.Percent
        this.WorkExp.CompanyName = item.CompanyName
        this.WorkExp.Description = item.Description
        this.WorkExp.Position = item.Position
        this.isShow = true;
      } else {
        this.WorkExp.YearExp = ''
        this.WorkExp.Level = ''
        this.WorkExp.Percent = ''
        this.WorkExp.CompanyName = ''
        this.WorkExp.Description = ''
        this.WorkExp.Position = ''
        this.isShow = true;
      }
    }
  }
};
</script>
