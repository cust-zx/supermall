<template>
  <div id="tabBar">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: "TabBar"
  }
</script>

<style scoped>
  #tabBar {
    display: flex;
    height: 49px;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    background: #f6f6f6;
    box-shadow: 0px -1px 1px rgba(150,150,150,.2);
  }
</style>
