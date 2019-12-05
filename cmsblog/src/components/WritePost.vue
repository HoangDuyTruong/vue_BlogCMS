<template>
<div>
<v-form>
      <v-container>
        <v-row>
          <v-col cols="6" sm="6" md="12">
            <v-text-field
              outlined
              filled
              label="Tiêu đề"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="6" sm="6" md="6">
            <v-text-field
              outlined
              filled
              label="Tác Giả"
            ></v-text-field>
          </v-col>
          <v-col cols="6" sm="6" md="6">
              <v-file-input label="Chọn ảnh bìa"></v-file-input>
          </v-col>
        </v-row>
        <v-row>
           <v-col cols="12" sm="12" md="12">
            <v-textarea
              outlined
              filled
              label="Tiêu đề"
            ></v-textarea>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
    <vue-editor id="editor" useCustomImageHandler @imageAdded="handleImageAdded" v-model="content"> </vue-editor>
</div>
    
</template>

<script>
  import { VueEditor } from "vue2-editor";
  import axios from "axios";
  export default {
    components: {
      VueEditor
    },
    data() {
      return {
         content: "<h1>Html For Editor</h1>",
      }
    },
    methods: {
      handleImageAdded: function(file, Editor, cursorLocation, resetUploader) {
      // An example of using FormData
      // NOTE: Your key could be different such as:
      // formData.append('file', file)

      var formData = new FormData();
      formData.append("image", file);

      axios({
        url: "https://fakeapi.yoursite.com/images",
        method: "POST",
        data: formData
      })
        .then(result => {
          let url = result.data.url; // Get url from response
          Editor.insertEmbed(cursorLocation, "image", url);
          resetUploader();
        })
        .catch(err => {
          console.log(err);
        });
      }
    },
  }
</script>

<style lang="scss" scoped>
  .quill-code {
    border: none;
    height: auto;
    > code {
      width: 100%;
      margin: 0;
      padding: 1rem;
      border: 1px solid #ccc;
      border-top: none;
      border-radius: 0;
      height: 10rem;
      overflow-y: auto;
      resize: vertical;
    }
  }
</style>