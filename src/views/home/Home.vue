<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control :titles="['流行','新款','精选']"
                 @tabClick="tabClick"
                 ref="tabControl1"
                 class="tab-control"
                 v-show="isTabFixed"/>
    <scroll class="content"
            ref="scroll"
            :probeType="3"
            @scroll="contentScroll"
            :pull-up-load="true"
            @pullingUp="loadMore">
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"/>
      <home-recommend-view :recommends="recommends"/>
      <feature-view/>
      <tab-control :titles="['流行','新款','精选']"
                   @tabClick="tabClick"
                   ref="tabControl2"/>
      <goods-list :goods="showGoods"></goods-list>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
  import NavBar from "../../components/common/navbar/NavBar";
  import HomeSwiper from "./childComps/HomeSwiper";
  import HomeRecommendView from "./childComps/HomeRecommendView";
  import FeatureView from "./childComps/FeatureView";
  import TabControl from "../../components/content/tabControl/TabControl";
  import GoodsList from "../../components/content/goods/GoodsList";
  import Scroll from "../../components/common/scroll/Scroll";
  import BackTop from "../../components/content/backTop/BackTop";


  import {getHomeMultidata, getHomeGoods} from "../../network/home"
  import {debounce} from "../../common/utils";
  import {itemListenerMixin} from "../../common/mixin"

  export default {
    name: "Home",
    mixins:[itemListenerMixin],
    data() {
      return {
        banners: [],
        recommends: [],
        goods: {
          'pop': {page: 0, list: []},
          'new': {page: 0, list: []},
          'sell': {page: 0, list: []}
        },
        currentType: 'pop',
        isShowBackTop: false,
        tabOffsetTop: 0,
        isTabFixed: false,
        saveY:0
      }
    },
    created() {
      this.getHomeMultidata()

      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')
    },
    mounted() {
      //图片加载完成的事件监听
    },
    activated() {
      this.$refs.scroll.scrollTo(0,this.saveY,0)
      this.$refs.scroll.refresh()
    },
    deactivated() {
      this.saveY = this.$refs.scroll.getScrollY()
      this.$bus.$off('itemImgLoad',this.itemImgListerner)
    },
    methods: {
      //网络请求相关方法
      getHomeMultidata() {
        getHomeMultidata().then(res => {
          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list;
        })
      },
      getHomeGoods(type) {
        const page = this.goods[type].page + 1;
        getHomeGoods(type, page).then(res => {
          this.goods[type].list.push(...res.data.list);
          this.goods[type].page += 1;
          //  完成上拉加载更多
          this.$refs.scroll.finishPullUp()
        })
      },
      //事件监听相关方法
      tabClick(index) {
        switch (index) {
          case 0:
            this.currentType = 'pop';
            break;
          case 1:
            this.currentType = 'new';
            break;
          case 2:
            this.currentType = 'sell';
        }
        this.$refs.tabControl1.currentIndex = index;
        this.$refs.tabControl2.currentIndex = index;

      },
      backClick() {
        this.$refs.scroll.scrollTo(0, 0, 500);
      },
      contentScroll(position) {
        //判断BackTop是否显示
        this.isShowBackTop = (-position.y) > 1000;
        //  决定tabControl是否吸顶
        this.isTabFixed = (-position.y) > this.tabOffsetTop

      },
      loadMore() {
        this.getHomeGoods(this.currentType)
      },
      swiperImageLoad() {
        //获取tabControl的offsetTop
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
      }

    },
    components: {
      BackTop,
      Scroll,
      GoodsList,
      TabControl,
      FeatureView,
      HomeRecommendView,
      HomeSwiper,
      NavBar
    },
    computed: {
      showGoods() {
        return this.goods[this.currentType].list;
      }
    }
  }
</script>

<style scoped>
  #home {
    height: 100vh;
    overflow: hidden;
  }

  .home-nav {
    background: var(--color-tint);
    text-align: center;
    color: #ffffff;
    z-index: 1;
  }

  .content {
    height: calc(100% - 89px);
    overflow: hidden;
  }

  .tab-control {
    z-index: 1;
    position: relative;

  }

</style>
