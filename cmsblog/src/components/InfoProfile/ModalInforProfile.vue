<template>
  <v-row justify="center">
    <v-dialog v-model="isShow" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline" v-if="isUpdate">Update InforProfile</span>
        </v-card-title>
        <v-card-title>
          <span class="headline" v-if="!isUpdate">Add InforProfile</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  label="Email"
                  v-model="InforProfile.Email"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="NumberPhone"
                  type="text"
                  required
                  v-model="InforProfile.NumberPhone"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Adress"
                  type="text"
                  required
                  v-model="InforProfile.Adress"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="FullName"
                  type="text"
                  required
                  v-model="InforProfile.FullName"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Dob"
                  type="text"
                  required
                  v-model="InforProfile.Dob"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="LinkFaceBook"
                  type="text"
                  required
                  v-model="InforProfile.LinkFaceBook"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Description"
                  type="text"
                  required
                  v-model="InforProfile.Description"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Slogan"
                  type="text"
                  required
                  v-model="InforProfile.Slogan"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" @click=" Close" text @click.native="isShow = false"
            >Close</v-btn
          >
          <v-btn color="blue darken-1" @click="Save" text @click.native="isShow = false"
            >Save</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import axios from 'axios'
export default {
  data: () => ({
    isUpdate: false,
    isShow: false,
    InforProfile: {
    }
  }),
  methods: {
    show(isUpdate, id) {
      this.isUpdate = isUpdate;
      if (isUpdate) {
        this.InforProfile = id;
        this.isShow = true;
      } else {
        this.isShow = true;
        this.InforProfile = {};
      }
    },
    Save() {
      console.log(this.InforProfile)
      if (this.isUpdate) {
        axios
          .put(
            "https://apiblogprofile20191205011822.azurewebsites.net/api/InfoProfile",
            this.InforProfile
          )
          .then(() => {
            this.$emit("handlSave");
          })
          .catch(() => {
            this.$emit("handlSave");
          });
      } else {
        axios
          .post(
            "https://apiblogprofile20191205011822.azurewebsites.net/api/InfoProfile",
            this.InforProfile
          )
          .then(() => {
            this.$emit("handlSave");
          })
          .catch(() => {
            this.$emit("handlSave");
          });
      }
     },
    Close() {
      this.$emit("handlSave");
    }
  }
};
</script>
