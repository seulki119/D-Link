<template>
  <v-container class="fill-height" style="max-width:450px">
    <div id="app">
      <v-app id="inspire">
        <v-card class="mx-auto" max-width="400" v-if="file">
          <v-img :src="preview" class="img-fluid" />
          <v-card-text class="text--primary">
            <v-textarea v-model="content" label="내용" counter maxlength="120" full-width single-line></v-textarea>
          </v-card-text>
        </v-card>
        <v-divider></v-divider>
        <v-file-input
          small-chips
          color="deep-purple accent-4"
          placeholder="업로드할 파일을 골라주세요"
          accept="image/*"
          label="사진 업로드"
          prepend-icon="mdi-camera"
          outlined
          dense
          :show-size="1000"
          v-model="file"
          @change="add"
        ></v-file-input>
      </v-app>
    </div>
  </v-container>
</template>

<script>
export default {
  //   data: () => ({
  //     file: [],
  //     reader: []
  //   }),

  //   methods: {
  //     add() {
  //       console.log("file", this.file);
  //       this.file.forEach((fi, f) => {
  //         this.reader[f] = new FileReader();
  //         this.reader[f].onloadend = e => {
  //           let fileData = this.reader[f].result;
  //           let imgRef = this.$refs.fi[f];
  //           imgRef.src = fileData;
  //           console.log(fileData);
  //           console.log(e);
  //           // send to server here...
  //         };

  //         this.reader[f].readAsDataURL(this.file[f]);
  //       });
  //     }
  //   }
  data() {
    return {
      file: null,
      reader: null,
      preview: null
    };
  },
  methods: {
    add() {
      this.reader = new FileReader();
      this.reader.onloadend = () => {
        let fileData = this.reader.result;
        this.preview = fileData;
        // send to server here...
      };
      this.reader.readAsDataURL(this.file);
    }
  }
};
</script>

<style scoped lang="scss">
</style>