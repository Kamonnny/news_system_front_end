<template>
  <router-view/>
</template>

<script>
import axios from "axios";

axios.get("http://127.0.0.1:5000/news").then(function (res){
  console.log(res.data)
})

</script>