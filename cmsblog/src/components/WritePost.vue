<template>
<div>
<v-form>
      <v-container>
        <v-row>
          <v-col cols="6" sm="6" md="12">
            <v-text-field
              outlined
              filled
              v-model="BlogModel.TitleBlog"
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
              v-model="BlogModel.AuthorName"
            ></v-text-field>
          </v-col>
          <v-col cols="6" sm="6" md="6">
              <v-file-input  @click='pickFile' v-model="imageName" label="Chọn ảnh bìa"></v-file-input>
              <input
                type="file"
                style="display: none"
                ref="image"
                accept="image/*"
                @change="onFilePicked"
              >
          </v-col>
        </v-row>
        <v-row>
           <v-col cols="12" sm="12" md="12">
            <v-textarea
              outlined
              filled
              label="Mô tả"
              v-model="BlogModel.Description"
            ></v-textarea>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
    <quill-editor
			v-model="BlogModel.Content"
			ref="myQuillEditor"
			:options="editorOption"
		/>
    <div class="my-2">
        <v-btn @click="Save" depressed small color="primary">Save</v-btn>
      </div>
</div>
    
</template>

<script>
  import 'quill/dist/quill.snow.css'
  import { quillEditor } from 'vue-quill-editor'
  import axios from "axios";
  export default {
    components: {
      quillEditor
    },
    data() {
      return {
        BlogModel: {
          BlogID: 0,
          Content: "",
          Description: "",
          AbumImageID: 0,
          AmountVote: 0,
          CategoryBlogID: 0,
          TitleBlog: "",
          AuthorName: "",
          SourceBlog: "",
          PublicationDate: null,
          ImageTypes:[]
        },
        imageName: null,
        imageFile:{},
        AbumImage:[],
        TypeImage: {
          ImageID: 0,
          TypeImage: "1"
        },
        editorOption: {
          placeholder: 'Type your post...',
          readOnly: true,
          theme: 'snow'
        },
      }
    },
    methods: {
      Save: function() {
      this.BlogModel.ImageTypes.push(this.TypeImage)
      axios.post("https://localhost:44334/api/BlogApi",this.BlogModel)
        .then(result => {
          console.log(result)
        })
        .catch(err => {
          console.log(err);
        });
      },
      pickFile () {
          this.$refs.image.click()
      },
      onFilePicked (e) {
        const files = e.target.files
        if(files[0] !== undefined) {
          this.imageName = files[0].name
          if(this.imageName.lastIndexOf('.') <= 0) {
            return
          }
          const fr = new FileReader ()
          fr.readAsDataURL(files[0])
          fr.addEventListener('load', () => {
            this.imageUrl = fr.result
            this.imageFile = files[0] // this is an image file that can be sent to server...
            let formData = new FormData();
            formData.append("file", files[0]);
            axios.post("https://localhost:44334/api/Images/PostUserImage",
            formData).then((res)=>{
              this.TypeImage.ImageID = res.data.ImageID
            })
          })
        } else {
          this.imageName = ''
          this.imageFile = ''
          this.imageUrl = ''
        }
      }
    }
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
