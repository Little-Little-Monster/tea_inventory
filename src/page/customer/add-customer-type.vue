<template>
  <div class="add_customer_type paddingTop main">
    <head-top goBack="" :headTitle="$route.query.id?'编辑分类':'添加分类'">
      <!-- <span slot="right" class="iconfont icon-jia" @click="addStore"></span> -->
      <span slot="back" @click="$router.push({name:'customerType',query:{fromPage:$route.query.fromPage,chooseCustomer:$route.query.chooseCustomer}})">
          <span class="back iconfont icon-fanhui"></span>
      </span>
    </head-top>
    <div class="add-content cneter-con">
      <ul>
        <li>
          <div class="list_left">
            名称 <i class="required" style="position:absolute;top:.4rem;left:-.2rem">*</i>
          </div>
          <div class="list_right">
            <input type="text" v-model="typeInfo.name" placeholder="请输入客户名称" style="width: 2.27rem;">
          </div>
        </li>
        <li class="describe">
          <div>
            描述<br>
            <textarea placeholder="请输入用户类型描述" v-model="typeInfo.memo"></textarea>
          </div>
        </li>
      </ul>
      <ul class="add_edit_content">
        <li>
          <div class="list_left">
            启用分类价格
          </div>
          <div class="list_right">
            <kswitch :checked="enable" @click.native="enable=!enable"></kswitch>
          </div>
        </li>
      </ul>
    </div>
    <div@click="saveCustomerType" class="bottom">
      保存
    </div>
    <transition name="loading">
			<loading v-show="showLoading"></loading>
		</transition>
    <alert-tip v-if="showAlert" :showHide="showAlert" @closeTip="showAlert=false" :alertText="alertText"></alert-tip>
  </div>
</template>
<script>
  import { mapMutations } from 'vuex'
  import { getStore } from 'src/config/mUtils'
  import headTop from 'src/components/header/head'
  import { save_customer_type,get_customer_type_detail } from 'src/service/getData';
  import kswitch from 'src/components/common/kswitch'
  import alertTip from '../../components/common/alertTip'
  import loading from 'src/components/common/loading'

  export default {
    data(){
      return {
        imgPath: 'static/images/head.png',
        userId:getStore('userInfo').id,
        enable: true,
        showAlert: false,
        alertText: null,
        typeInfo: {},
        showLoading:false
      }
    },
    created(){
      if(this.$route.query.id){
        this.getCustomerType()
      }
    },
    mounted(){

    },
    components: {
      headTop,
      kswitch,
      alertTip,
      loading
    },
    computed: {},
    methods: {
      ...mapMutations([
        'CHANGE_HEADER'
      ]),
      toAddress(name){
        this.$router.push(name)
      },
      async saveCustomerType(){
        //保存
        if (!this.typeInfo.name) {
          this.showAlert = true;
          this.alertText = "请输入名称";
          return;
        }
        this.showLoading = true
        this.typeInfo.status = this.enable?1:0;
        save_customer_type(this.userId,this.typeInfo).then((res) => {
          this.$router.replace({name:'customerType',query:{
            fromPage:this.$route.query.fromPage,
            chooseCustomer:this.$route.query.chooseCustomer,
            }})
            this.showLoading = false
        }).catch((err) => {
          this.showAlert = true;
          this.alertText = err.message
          this.showLoading = false
        })
      },
      getCustomerType(){
        this.showLoading = true
        get_customer_type_detail(this.$route.query.id).then((res)=>{
          this.typeInfo = res.data;
          this.enable = Boolean(this.typeInfo.status);
          this.showLoading = false
        }).catch((err)=>{
          this.showAlert = true;
          this.alertText = err.message
          this.showLoading = false
        })
      }

    },
    watch: {}
  }
</script>
<style lang="scss" scoped>
  @import '../../../src/style/mixin';

  .add_customer_type {
    .add-content{
      overflow: hidden;
      ul {
        @include same_ul_style;
        margin-top: 0.1rem;
        li {
          height: 1rem;
          padding: 0 0.4rem;
          input {
            text-align: right;
          }
          .list_left {
            font-size: 0.3rem;
            color: #444;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: flex-start;
        }
        .list_right {
            font-size: 0.26rem;
            color: #ccc;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: flex-end;
        }
          .list_left {
            position: relative;
            font-size: 16px;
            color: #666666;
            i {
              position: relative;
              top: 3px;
              color: #D29191;
            }
          }
          .list_right {
            font-size: 14px;
            color: #999999;
            input {
              background: none;
              color: #999999 !important;
              font-size: 14px;
            }
            span {
              color: #999999;
              font-size: 14px;
            }
          }
          &.describe{
            width: 100%;
            height: 1.78rem;
            display: block;
            padding-top: 0.33rem;
            div{
              font-size: 16px;
              color: #666666;
              width: 100%;

            }
            textarea{
              background: none;
              width: 100%;
              text-align: left;
              resize: none;
              padding:.1rem .5rem
            }
          }
        }

      }
    }
  }

  .back {
    font-size: 14px;
    color: #444;
    margin-left: .3rem;
  }
</style>
