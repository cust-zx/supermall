<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"/>
    <scroll class="content" ref="scroll" @scroll="contentScroll" :probe-type="3">
      <detail-swiper :top-images="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo" @imgLoad="imgLoad"/>
      <detail-param-info :param-info="goodsParam" ref="params"/>
      <detail-comment-info :comment-info="commentInfo" ref="comment"/>
      <goods-list :goods="recommends" ref="recommend"/>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"/>
    <detail-bottom-bar @addCart="addToCart"/>
    <toast :message="message" :show="show"/>
  </div>
</template>

<script>
  import DetailNavBar from "./childComps/DetailNavBar";
  import DetailSwiper from "./childComps/DetailSwiper";
  import DetailBaseInfo from "./childComps/DetailBaseInfo";
  import Scroll from "../../components/common/scroll/Scroll";
  import DetailShopInfo from "./childComps/DetailShopInfo";
  import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
  import DetailParamInfo from "./childComps/DetailParamInfo";
  import DetailCommentInfo from "./childComps/DetailCommentInfo";
  import GoodsList from "../../components/content/goods/GoodsList";
  import DetailBottomBar from "./childComps/DetailBottomBar";


  import {getDetail, Goods, Shop, GoodsParam, getRecommed} from "../../network/detail";
  import {itemListenerMixin} from "../../common/mixin"
  import BackTop from "../../components/content/backTop/BackTop";
  import Toast from "../../components/common/toast/Toast";


  export default {
    name: "Detail",
    mixins: [itemListenerMixin],
    components: {
      Toast,
      BackTop,
      DetailBottomBar,
      GoodsList,
      DetailCommentInfo,
      DetailParamInfo, DetailGoodsInfo, DetailShopInfo, Scroll, DetailBaseInfo, DetailSwiper, DetailNavBar
    },
    data() {
      return {
        iid: null,
        goods: {},
        shop: {},
        topImages: [],
        detailInfo: {},
        goodsParam: {},
        commentInfo: {},
        recommends: [],
        themeTopYs: [],
        currentIndex: 0,
        isShowBackTop: false,
        message:'',
        show:false
      }
    },
    destroyed() {
      this.$bus.$off('itemImgLoad', this.itemImgListerner)
    },
    created() {
      //保存传入的iid
      this.iid = this.$route.params.id
      //  根据iid请求详情数据
      getDetail(this.iid).then(res => {
        const data = res.result
        //  获取顶部的图片轮播数据
        this.topImages = data.itemInfo.topImages
        //  获取商品信息
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
        //  创建店铺信息的对象
        this.shop = new Shop(data.shopInfo)
        //保存商品的详情数据
        this.detailInfo = data.detailInfo
        //取出参数的信息
        this.goodsParam = new GoodsParam(data.itemParams.info, data.itemParams.rule)
        //  取出评论信息
        if (data.rate.cRate != 0) {
          this.commentInfo = data.rate.list[0]
        }


      })
      //请求推荐数据
      getRecommed().then((res => {
        this.recommends = res.data.list
      }))
    },
    methods: {
      imgLoad() {
        this.newRefresh()
        this.themeTopYs = []
        this.themeTopYs.push(0)
        this.themeTopYs.push(this.$refs.params.$el.offsetTop)
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
      },
      addToCart() {
        //  获取购物车需要展示的信息
        const product = {}
        product.image = this.topImages[0]
        product.price = this.goods.realPrice
        product.title = this.goods.title
        product.desc = this.goods.desc
        product.iid = this.iid
        //  将商品添加到购物车里
        this.$store.dispatch('addCart',product).then(res=>{
          this.show = true;
          this.message = res
          setTimeout(()=>{
            this.show = false
          },1500)
        })
      },
      titleClick(index) {
        this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 200)
      },
      backClick() {
        this.$refs.scroll.scrollTo(0, 0, 500);
      },
      contentScroll(position) {
        const positionY = -position.y
        let length = this.themeTopYs.length
        for (let i = 0; i < length; i++) {
          if ((this.currentIndex !== i) && (i < length - 1 && positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i + 1]) || (i === length - 1 && positionY >= this.themeTopYs[i])) {
            this.currentIndex = i
            this.$refs.nav.currentIndex = this.currentIndex
          }
        }

        //  是否显示回到顶部
        this.isShowBackTop = (-position.y) > 1000;
      }
    }
  }
</script>

<style scoped>
  #detail {
    position: relative;
    z-index: 9;
    background: #ffffff;
    height: 100vh;
    overflow: hidden;
  }

  .content {
    height: calc(100% - 89px);
  }

  .detail-nav {
    position: relative;
    z-index: 20;
    background: #ffffff;
  }
</style>
