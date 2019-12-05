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
    <quill-editor
    v-model="content"
    ref="myQuillEditor"
    :options="editorOption"
    />
   
</div>
    
</template>

<script>
  import 'quill/dist/quill.snow.css'
  import { quillEditor } from 'vue-quill-editor'
  //import axios from "axios";
  export default {
    components: {
      quillEditor
    },
    data() {
      return {
          content: "",
          editorOption: {
            debug: 'info',
            placeholder: 'Type your post...',
            readOnly: true,
            theme: 'snow'
         }
      }
    },
    methods: {
      
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