<template>
  <v-row justify="center">
    <v-dialog v-model="isShow" persistent max-width="600px">
      <v-card>
        <v-card-title v-if="isUpdate">
          <span class="headline">Update Skill</span>
        </v-card-title>
        <v-card-title v-if="!isUpdate">
          <span class="headline">Add Skill</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field label="Name Skill" v-model="Skill.NameSkill" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Description"
                  type="text"
                  required
                  v-model="Skill.Description"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Year Experience"
                  type="text"
                  required
                  v-model="Skill.YearExperience"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Percent"
                  type="text"
                  required
                  v-model="Skill.Percent"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Level"
                  type="text"
                  required
                  v-model="Skill.level"
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
    Skill: {
        NameSkill: "C#",
        Desciption: "ABCXYZ",
        YearExperience: "1 years",
        Percent: "90%",
        Level: "5"
    }
  }),
  methods: {
      show(isUpdate,id){
        this.isUpdate = isUpdate;
        if(isUpdate){
          this.Skill = id;
          this.isShow = true;
        } else  {
          this.isShow = true;
          this.Skill = {};
        }
      }
  }
};
</script>
