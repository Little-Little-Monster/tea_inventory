<template>
  <div class="main">
    <head-top signin-up='msite' goBack="true" :head-title="$route.query.id?'编辑供应商':'新增供应商'">
      <!-- <span slot="right" class="iconfont icon-jia" @click="addStore"></span> -->
    </head-top>
    <ul class="add-edit-upplier cneter-con paddingTop">
      <li>
        <div class="list_left">
          名称 <i class="required" style="position:absolute;top:.4rem;left:-.2rem">*</i>
        </div>
        <div class="list_right">
          <input type="text" v-model="userInfo.name" placeholder="请输入供应商名称" style="width: 2.27rem;">
        </div>
      </li>
      <li>
        <div class="list_left">
          手机
          <i class="required" style="position:absolute;top:.4rem;left:-.2rem">*</i>
        </div>
        <div class="list_right">
          <input type="mobile" v-model="userInfo.mobile" placeholder="请输入手机号码" style="width: 1.99rem;">
        </div>
      </li>
      <li>
        <div class="list_left">
          负责人
        </div>
        <div class="list_right">
          <input type="text" v-model="userInfo.personHead" placeholder="请输入负责人名称" style="width: 2.27rem;">
        </div>
      </li>
      <li>
        <div class="list_left">
          折扣(%)
        </div>
        <div class="list_right">
          <input type="number" v-model="userInfo.discount" placeholder="请输入折扣" style="width: 1.42rem;">
        </div>
      </li>
      <li>
        <div class="list_left">
           启用
        </div>
        <div class="list_right">
          <kswitch :checked="enable" @click.native="enable=!enable"></kswitch>
        </div>
      </li>
      
      <li>
        <div class="list_left">
          电话
        </div>
        <div class="list_right">
          <input type="number" v-model="userInfo.telphone" placeholder="请输入座机号" style="width: 1.71rem;">
        </div>
      </li>
    </ul>
    <div class="bottom" @click="addSupp">
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
  import { supplier_handel } from 'src/service/getData'
  import headTop from 'src/components/header/head'
  import footGuide from 'src/components/footer/footGuide'
  import alertTip from '../../components/common/alertTip'
  import kswitch from 'src/components/common/kswitch'
  import loading from 'src/components/common/loading'

  export default {
    data(){
      return {
        enable: true,
        imgPath: 'static/images/head.png',
        userId:getStore("userInfo").id,
        userInfo:{},
        showAlert:false,
        showLoading:false
      }
    },
    created(){
      if(this.$route.query.id){
        this.userInfo = this.$route.query;
      }
    },
    mounted(){

    },
    components: {
      headTop,
      footGuide,
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
      async addSupp(){
            if(!this.userInfo.name){
              this.alertText = "请输入供应商名称";
              this.showAlert = true;
              return;
            }
            let reg = new RegExp(/^((13|14|15|17|18|10)[0-9]{1}\d{8})$/);
            if(!reg.test(this.userInfo.mobile)){
              this.alertText = "请输入11位手机号码";
              this.showAlert = true;
              return;
            }
            if(!this.userInfo.name){
              this.alertText = "请输入供应商名称";
              this.showAlert = true;
              return;
            }
            this.showLoading = true;
            this.enable?this.userInfo.status=1:this.userInfo.status=0;
            supplier_handel(this.userId,this.userInfo).then((res)=>{
                // this.$router.push({name:"supplierList"})
                if(res.code!=200){
                  this.alertText = res.message;
                  this.showAlert = true;
                }else{
                  this.$router.go(-1);
                }
                this.showLoading = false;
            }).catch((err)=>{
                this.alertText = err.message;
                this.showAlert = true;
                this.showLoading = false;
            })
        }
    },
    watch: {}
  }
</script>
<style lang="scss" scoped>
  @import '../../../src/style/mixin';

  .add-edit-upplier {
    @include same_ul_style;
    input{
      text-align: right;
    }
    li {
      height: 1rem;
      padding: 0 0.4rem;
      &:nth-child(1) {
        .list_right {
          color: #444;
        }
      }
      .list_left {
            font-size: 0.3rem;
            color: #444;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: flex-start;
            position: relative;
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
        font-size: 0.32rem;
        color: #666666;
        cneter-con
        i{
          position: relative;
          top: 3px;
          color: #D29191;
        }
      }
      .list_right {
        font-size: 0.28rem;
        color: #999999;
        input{
          background: none;
          color: #999999!important;
        }
      }
    }
  }
  .bottom{
      background: $green;
      text-align: center;
      line-height:.8rem;
      color:#fff;
  }
</style>
