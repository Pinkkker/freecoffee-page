<template>
   <div>
     <div class="box1">1</div>
     <div class="box2">1</div>
   </div>
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

<style scoped>
.box1{
  background-color:#000000;
  height: 300px;
  width: 300px;
}
.box2{
  background-color:#1d1d1f;
  height: 300px;
  width: 300px;
}
</style>