<template>
  <div class="main">
    <head-top signin-up='msite' goBack="" head-title="选择菜单">
      <div slot="back" class="goback" @click="$router.go(-1)" >
          <span class="iconfont icon-fanhui title_text"></span>
      </div>
      <!-- <span slot="right" class="iconfont icon-jia" @click="addStore"></span> -->
    </head-top>
    <ul class="supplier_list cneter-con" :style="{'margin-bottom':'1.2rem'}">
      <li class="supplier_info_list" v-for="menu in menuList">
        <div class="list_left">
          <h4 class="iconfont" :class=menu.icon ><span>{{menu.name}}</span></h4>
        </div>
        <div class="list_right">
          <em  class="iconfont check-icon" :class="{'icon-danxuanweizhong':!menu.selected,'icon-radio-checked':menu.selected}" @click="menu.selected =!menu.selected"></em>
        </div>
      </li>
    </ul>
    <alert-tip v-if="showAlert" :showHide="showAlert" @closeTip="showAlert=false" :alertText="alertText"></alert-tip>
    <div class="bottom"  @click="save">
          保存
    </div>
  </div>
</template>
<script>
  import { mapMutations,mapState } from 'vuex'
  import { getStore,setStore } from 'src/config/mUtils'
  import { get_role_list,save_menu } from 'src/service/getData'
  import headTop from 'src/components/header/head'
  import footGuide from 'src/components/footer/footGuide'
  import alertTip from '../../components/common/alertTip'

  export default {
    data(){
      return {
        imgPath: 'static/images/head.png',
        userId:getStore('userInfo').id,
        parama:'',
        menuList:getStore('menu'),
        chooseRule:this.$route.query.chooseRule,
        fromPage:this.$route.query.fromPage,
        roleList:null,
        chooseId:-1,
        chooseName:null,
        showAlert:false,
        alertText:''
      }
    },
    created(){
      this.getRole();
      if(this.chooseSupplier){
          switch (this.fromPage) {
            case 'buyOrder':
              this.chooseId = this.buyOrder.supplierId
              this.chooseName = this.buyOrder.supplierName
              break;
          
            default:
              break;
        }
      }
    },
    mounted(){
      
    },
    components: {
      headTop,
      footGuide,
      alertTip
    },
    computed: {
      ...mapState([
        'buyOrder'
      ])
    },
    methods: {
      ...mapMutations([
        "RECORD_BUYORDER"
      ]),
      toAddress(name){
        this.$router.push(name)
      },
      goBack(){
        this.$router.push({name:"msite"})
      },
      showTip(msg){
        this.alertTip = msg;
        this.showAlert = true;
      },
      save(){
        let menu = {
          menuShowVos:this.menuList,
          userId:this.userId
        }
        save_menu(menu).then((res)=>{
          if(res.code==200){
            this.$router.push({name:"msite"});
            setStore('menu',this.menuList)
          }else{
            this.showTip(res.message)
          }
        }).catch((err)=>{
          this.showTip(err.message)
        })
      },
      getRole(){
        get_role_list(this.userId).then((res)=>{
          this.roleList=res.data;
        }).catch((err)=>{

        })
      },
      editRole(roleId,roleName,memo){
        if(!this.chooseRule){
          this.$router.push({name:'editRole',query:{roleId:roleId,roleName:roleName,memo:memo}})
        }
      }
    },
    watch: {}
  }
</script>
<style lang="scss" scoped>
  @import '../../../src/style/mixin';
  @import '../../../src/style/common';
  .supplier_list{
    @include same_ul_style;
    .supplier_info_list{
      height: 1rem;
      padding: 0 0.2rem 0 0.4rem;
      position: relative;
      .check-icon{
        @include ct;
        right:.4rem;
      }
      .list_left{
        float: left;
        @include wh(80%,100%);
        h4{
          font-size: 0.32rem;
          color: $green;
          line-height: 1rem;
          span{
            margin-left:.4rem;
            color:#444444;
          }
        }
        p{
          font-size: 0.24rem;
          color: #999999;
          span{
            color: #999999;
          }
        }
      }
      .list_right{
        float: right;
        @include wh(1rem,100%);
        i{
          color: #999999;
        }
      }
    }
  }
  .check-icon{
    @include sc(.4rem,$green)
  }
</style>
