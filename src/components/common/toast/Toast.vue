<template>
  <div class="toast" v-show="show">
    <div>{{message}}</div>
  </div>
</template>

<script>
  export default {
    name: "Toast",
    props:{
      message:{
        type:String,
        default:''
      },
      show:{
        type: Boolean,
        default: false
      }
    }
  }
</script>

<style scoped>
  .toast{
    position: fixed;
    left:50%;
    top: 50%;
    transform: translate(-50%,-50%);
    padding: 8px 10px;
    color: #ffffff;
    background: rgba(0,0,0,.8);
    border-radius: 5px;
  }
</style>
