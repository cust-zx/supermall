<template>
  <div class="tabbar-item" @click="itemClick">
    <div v-if="isActive">
      <slot name="icon-img"></slot>
    </div>
    <div v-else>
      <slot name="icon-active-img"></slot>
    </div>
    <div :style="textActive">
      <slot name="icon-text"></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: "TabBarItem",
    props: {
      path: {
        type: String,
        required: true
      },
      activeColor: {
        type: String,
        default: '#ff5777'
      }
    }, methods: {
      itemClick() {
        this.$router.replace(this.path);
      }
    },
    computed: {
      isActive() {
        return this.$route.path.indexOf(this.path) === -1
      },
      textActive() {
        return this.isActive ? {} : {'color': this.activeColor}
      }
    }
  }
</script>

<style scoped>
  .tabbar-item {
    flex: 1;
    text-align: center;
  }

  .tabbar-item img {
    width: 24px;
    height: 24px;
    margin-top: 2px;
    margin-bottom: 2px;
    vertical-align: middle;
  }
</style>
