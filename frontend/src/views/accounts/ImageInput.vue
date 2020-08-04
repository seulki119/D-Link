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
      @change="onFileChange(
          $event.target.name, $event.target.files)"
      style="display:none"
    />
  </div>
</template>

<script>
export default {
  name: "image-input",
  data() {
    return {
      uploadFieldName: "file"
    };
  },
  // props: {
  //   // Use "value" to enable using v-model
  //   value: Object
  // },
  methods: {
    launchFilePicker() {
      this.$refs.file.click();
    },
    onFileChange(fieldName, file) {
      let imageFile = file[0];
      if (file.length > 0) {
        let formData = new FormData();
        let imageURL = URL.createObjectURL(imageFile);
        formData.append(fieldName, imageFile);
        this.$emit("input", { formData, imageURL });
      }
    }
  }
};
</script>