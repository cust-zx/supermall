<template>
  <div class="cart-bottom-bar">
    <div class="check-content">
      <check-button class="check-button" :isChecked="isSelectAll" @click.native="checkClick"></check-button>
      <span>全选</span>
    </div>
    <div class="price">合计：{{totalPrice}}</div>
    <div class="calculate" @click="calcClick">
      去计算:({{CheckLength}})
    </div>
  </div>
</template>
<script>
  import CheckButton from "../../../components/content/checkButton/CheckButton";
  export default {
    name: "CartBottomBar",
    components: {CheckButton},
    props:{
      isChecked: {
        type:Boolean,
        default:false
      }
    },
    methods:{
      checkClick(){
        if(this.isSelectAll){
          this.$store.getters.cartList.forEach(item=>item.checked = false)
        }else{
          this.$store.getters.cartList.forEach(item=>item.checked = true)
        }
      },
      calcClick(){
        if(!this.isSelectAll){

        }
      }
    },
    computed:{
      totalPrice(){
        return '¥' + this.$store.getters.cartList.filter(item=>{
          return item.checked
        }).reduce((total,item)=>{
          return total + item.price * item.count
        },0).toFixed(2)
      },
      CheckLength(){
        return this.$store.state.cartList.filter(item=>{
          return item.checked
        }).length
      },
      isSelectAll(){
        if(this.$store.getters.cartList.length == 0)return false
        for(let item of this.$store.getters.cartList){
          if(!item.checked){
            return false
          }
        }
        return true
      }
    }
  }
</script>

<style scoped>
  .cart-bottom-bar{
    height: 40px;
    font-size: 14px;
    display: flex;
    position: relative;
    background: #eeeeee;
    line-height: 40px;
  }

  .check-content{
    display: flex;
    align-items: center;
    width: 60px;
  }
  .check-button{
    width: 20px;
    height: 20px;
    line-height: 20px;
    margin: 0 5px;
  }
  .check-content span{
    flex: 1;
  }
  .price{
    margin-left: 40px;
    flex: 1;
  }
  .calculate{
    width: 90px;
    background: red;
    color: #ffffff;
    text-align: center;
  }
</style>
