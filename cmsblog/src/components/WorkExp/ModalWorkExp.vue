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
            >Close</v-btn
          >
          <v-btn color="blue darken-1" text @click.native ="isShow = false">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  data: () => ({
    isShow: false,
    isUpdate: true,
    WorkExp: {
        YearExp: "C#",
        Level: "ABCXYZ",
        Percent: "1 years",
        CompanyName: "90%",
        Description: "5",
        Position: "a"
    }
  }),
  methods: {
      show(isUpdate,id){
        this.isUpdate = isUpdate;
        if(isUpdate){
          this.WorkExp = id;
          this.isShow = true;
        } else  {
          this.isShow = true;
          this.WorkExp = {};
        }
      }
  }
};
</script>
