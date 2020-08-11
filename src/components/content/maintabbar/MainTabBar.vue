<template>
  <div id="mainTabBar">
    <tab-bar>
      <tab-bar-item path="/home">
        <img src="../../../assets/img/tabbar/home.svg" slot="icon-img">
        <img src="../../../assets/img/tabbar/home_active.svg" slot="icon-active-img">
        <div slot="icon-text">首页</div>
      </tab-bar-item>
      <tab-bar-item path="/category">
        <img src="../../../assets/img/tabbar/category.svg" slot="icon-img">
        <img src="../../../assets/img/tabbar/category_active.svg" slot="icon-active-img">
        <div slot="icon-text">分类</div>
      </tab-bar-item>
      <tab-bar-item path="/cart">
        <img src="../../../assets/img/tabbar/shopcart.svg" slot="icon-img">
        <img src="../../../assets/img/tabbar/shopcart_active.svg" slot="icon-active-img">
        <div slot="icon-text">购物车</div>
      </tab-bar-item>
      <tab-bar-item path="/profile">
        <img src="../../../assets/img/tabbar/profile.svg" slot="icon-img">
        <img src="../../../assets/img/tabbar/profile_active.svg" slot="icon-active-img">
        <div slot="icon-text">我的</div>
      </tab-bar-item>
    </tab-bar>
  </div>
</template>

<script>
  import TabBar from "../../common/tabbar/TabBar";
  import TabBarItem from "../../common/tabbar/TabBarItem";

  export default {
    name: "MainTabBar",
    components: {TabBarItem, TabBar}
  }
</script>

<style scoped>

</style>
