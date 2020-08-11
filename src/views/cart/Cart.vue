<template>
  <div class="cart">
    <!-- 导航-->
    <nav-bar class="cart-nav">
      <div slot="center">购物车({{cartLength}})</div>
    </nav-bar>

    <!--商品列表-->
    <cart-list></cart-list>
    <!--底部汇总-->
    <cart-bottom-bar></cart-bottom-bar>
  </div>
</template>

<script>
  import NavBar from "../../components/common/navbar/NavBar";
  import {mapGetters} from "vuex"
  import CartList from "./childComps/CartList";
  import CartBottomBar from "./childComps/CartBottomBar";

  export default {
    name: "Cart",
    components: {CartBottomBar, CartList, NavBar},
    computed: {
      ...mapGetters([
        'cartLength',
        'cartList'
      ])
    }
  }
</script>

<style scoped>
  .cart{
    height: 100vh;
  }
  .cart-nav {
    text-align: center;
    color: #ffffff;
    background: var(--color-tint);
    z-index: 200;
  }
</style>
