<template>
  <div>
    <div @click="launchFilePicker()">
      <slot name="activator"></slot>
    </div>
    <input
      type="file"
      ref="file"
      accept="image/*"
      :name="uploadFieldName"
      @change="onFileChange($event.target.name, $event.target.files)"
      style="display:none"
    />
  </div>
</template>

<script>
import http from "@/util/http-common";
export default {
  name: "image-input",
  data() {
    return {
      uploadFieldName: "file"
    };
  },
  methods: {
    launchFilePicker() {
      this.$refs.file.click();
    },
    onFileChange(fieldName, file) {
      let token = localStorage.getItem("token");

      let config = {
        headers: {
          Authorization: `Token ${token}`
        }
      };
      let imageFile = file[0];
      if (file.length > 0) {
        const fd = new FormData();
        fd.append("image", imageFile);
        http
          .put("/accounts/min/image/", fd, config)
          .then(res => {
            console.log(res);
          })
          .catch(err => {
            console.log(err.response);
          });
        // console.log(this.uploadFieldName);
        this.$emit("input");
      }
    }
  }
};
</script>