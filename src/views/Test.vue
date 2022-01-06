<template>
  <el-upload
    class="upload-demo"
    action="api/v3/upload"
    :on-success="onSuccess"
    :on-preview="handlePreview"
    accept=".jpg"
    :limit="10"
  >
    <el-button size="small" type="primary">点击上传</el-button>
    <div slot="tip" class="el-upload__tip">
      只能上传jpg/png文件，且不超过1mb
    </div>
  </el-upload>
</template>

<script>
export default {
  methods: {
    onSuccess(response, file, fileList) {
      console.log(response);
      console.log(file);
      console.log(fileList);
    },
    handlePreview(file) {
      console.log(file);
      console.log(file.response.url);
      window.open(file.response.url);
    },
  },
};
</script>

<style>
</style>