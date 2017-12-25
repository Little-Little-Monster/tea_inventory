<template>
  <div class="main">
    <head-top signin-up='msite' goBack="true" :head-title="$route.query.roleId?'编辑角色':'添加角色'">
      <!-- <span slot="right" class="iconfont icon-jia" @click="addStore"></span> -->
    </head-top>
    <ul class="add-edit-upplier cneter-con paddingTop">
      <li>
        <div class="list_left">
          角色名称 <i class="required" style="position:absolute;top:.4rem;left:-.2rem">*</i>
        </div>
        <div class="list_right">
          <input type="text" v-model="userInfo.roleName" placeholder="请输入角色名称" style="width: 2.27rem;">
        </div>
      </li>
      <li class="memo">
        <div class="memo-tit">
          备注
        </div>
        <textarea placeholder="请输入备注" v-model="userInfo.memo"></textarea>
      </li>
      <li class="tip">
        提示：员工的角色权限修改后，需要重新登录才能生效。部分权限
        仅当登录电脑版时有效，如首页、采购订单、销售订单等功能仅在
        电脑版使用。
      </li>
      <li>
        <div class="list_left">
          角色权限配置
        </div>
      </li>
      <li  class="role-con">
        <div class="role-left">
          <div class="role-father" v-for="(role,index) in resource">
            <input type="checkbox" @click="setSubSel(role.selected,index)" class="check-box-input" :id="role.id" v-model="role.selected">
            <label :for="role.id"   :class="{'icon-radio-checked':role.selected,'icon-danxuanweizhong':!role.selected}" class="iconfont" ></label>
            <span @click="setRoleFather(index)">{{role.name}}</span>
            <em @click="setRoleFather(index)" :class="{'icon-xiala2':fatherIndex!=index,'icon-qianjin':fatherIndex==index}" class="iconfont"></em>
          </div>
        </div>
        <div class="role-right">
          <div class="role-sub" v-for="(subRole,index2) in resource[fatherIndex].subMenus">
            <div class="role-sub-con">
              <span  @click="setRoleSub(index2)"> {{subRole.name}}</span>
              <div class="sub-option">
                <em @click="setRoleSub(index2)" :class="{'icon-xiala2':subIndex!=index2,'icon-shouqi':subIndex==index2}" class="iconfont"></em>
                <input type="checkbox"  @click="setFunSel(subRole.selected,fatherIndex,index2)" class="check-box-input" :id="subRole.id" v-model="subRole.selected">
                <label :for="subRole.id"   :class="{'icon-radio-checked':subRole.selected,'icon-danxuanweizhong':!subRole.selected}" class="iconfont" ></label>
              </div>
            </div>
            <div class="sub-fun" v-if="subIndex==index2" v-for="(func,index3) in subRole.subMenuFunctions">
              <input type="checkbox"  class="check-box-input" :id="func.id" v-model="func.selected">
              <label :for="func.id" :class="{'icon-check':func.selected,'icon-xuanzhong':!func.selected}" class="iconfont sub-sel" ></label>
              <span> {{func.name}}</span>
            </div>
          </div>
        </div>
      </li>
    </ul>
    <div class="bottom" @click="saveRole">
            保存
    </div>
    <alert-tip v-if="showAlert" :showHide="showAlert" @closeTip="showAlert=false" :alertText="alertText"></alert-tip>
  </div>
</template>
<script>
  import { mapMutations } from 'vuex'
  import { getStore } from 'src/config/mUtils'
  import { get_role_resource,role_handel,delete_role } from 'src/service/getData'
  import headTop from 'src/components/header/head'
  import footGuide from 'src/components/footer/footGuide'
  import alertTip from '../../components/common/alertTip'
  import kswitch from 'src/components/common/kswitch'

  export default {
    data(){
      return {
        enable: true,
        imgPath: 'static/images/head.png',
        userId:getStore("userInfo").id,
        userInfo:{},
        showAlert:false,
        alertText:null,
        resource:[],
        fatherIndex:0,
        subIndex:-1,
        roleId:this.$route.query.roleId?this.$route.query.roleId:0
      }
    },
    created(){
      if(this.$route.name=='editRole'){
        this.userInfo.roleName = this.$route.query.roleName
        this.userInfo.memo = this.$route.query.memo
        this.userInfo.id = this.$route.query.roleId
      }
      this.getResouce()
    },
    mounted(){

    },
    components: {
      headTop,
      footGuide,
      kswitch,
      alertTip
    },
    computed: {},
    methods: {
      ...mapMutations([
        'CHANGE_HEADER'
      ]),
      getResouce(){
        get_role_resource(this.userId,this.roleId).then((res)=>{
          if(res.code!=200){
            this.showTip(res.message)
          }else{
            this.resource = res.data;
          }
        }).catch((err)=>{
          this.showTip(err.message)
        })
      },
      setRoleFather(index){
        if(this.fatherIndex==index){
          this.fatherIndex = -1;
        }else{
          this.fatherIndex = index;
          this.subIndex = -1;
        }
      },
      setRoleSub(index2){
        if(this.subIndex==index2){
          this.subIndex = -1;
        }else{
          this.subIndex = index2;
        }
      },
      setSubSel(selcted,fatherIndex){
       if(fatherIndex!=-1){
         this.resource[fatherIndex].subMenus.forEach(sub => {
           sub.selected = !selcted;
         });
       }
      },
      setFunSel(selcted,fatherIndex,subIndex){
       if(subIndex!=-1){
         this.resource[fatherIndex].subMenus.forEach(sub => {
           sub.subMenuFunctions[subIndex].selected = !selcted;
         });
       }
      },
      showTip(msg){
        this.alertText = msg;
        this.showAlert = true;
      },
      async saveRole(){
            if(!this.userInfo.roleName){
              this.alertText = "请输入角色名称";
              this.showAlert = true;
              return;
            }
            this.userInfo.menuVos = this.resource;
            role_handel(this.userId,this.userInfo).then((res)=>{
              if(res.code!=200){
                this.alertText = res.message;
                this.showAlert = true;
              }else{
                this.$router.go(-1)
              }
            }).catch((err)=>{
                this.alertText = err.message;
                this.showAlert = true;
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
            flex-direction: row;
            justify-content: flex-end;
            align-items: center;
        }
      .list_left {
        font-size: 0.32rem;
        color: #666666;
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
    .memo{
      height: 2rem;
      flex-wrap: wrap;
      .memo-tit{
        height:auto;
      }
      textarea{
        width:100%;
        height:60%;
        resize: none;
      }
    }
    .tip{
      background: inherit;
      @include wh(100%,1.78rem);
      @include sc(.24rem,#a1a1a1);
      line-height: .4rem;
    }
    .role-con{
      @include wh(100%,4.7rem);
      background: #fff;
      margin-bottom:1.2rem;
      display: flex;
      padding:0;
      @include sc(.24rem,#a5a5a5)
      .check-box-input{
        display: none;
      }
      .role-left{
        flex:1.5;
        overflow: auto;
        @include wh(2.6rem,100%);
        .role-father{
          border-right:1px solid $bc;
          border-bottom: 1px solid $bc;
          @include wh(100%,1rem);
          display: flex;
          flex:1;
          align-items: center;
          text-align: center;
          span{
            flex:1;
            @include sc(.24rem,#a5a5a5)
          }
          label{
            flex:1;
            @include sc(.36rem,$green)
          }
          em{
            flex:1;
          }
        }
      }
      .role-right{
        flex:3;
        height:100%;
        overflow: auto;
        .role-sub{
          border-bottom: 1px solid $bc;
          @include wh(100%,1rem);
          min-height:1rem;
          height:auto;
          display: flex;
          flex-wrap: wrap;
          flex:1;
          align-items: center;
          text-align: center;
          position: relative;
          .role-sub-con{
            padding-left:.42rem;
            @include wh(100%,1rem);
            border-bottom:.01rem solid $bc;
            position: relative;
            .sub-option{
              position: absolute;
              right:.4rem;
              width:auto;
              height:auto;
              @include ct;
            }
          }
          
          .sub-fun{
            @include wh(100%,1rem);
            padding-left:1rem;
            position: relative;
            .sub-sel{
              @include ct;
              left:.4rem;
            }
          }
          span{
            display: block;
            @include wh(80%,100%);
            text-align: left;
            line-height:1rem;
            @include sc(.24rem,#666)
          }
          label{
            flex:1;
            @include sc(.36rem,$green)
          }
        }
      }
    }
  }
  .bottom{
      background: $green;
      text-align: center;
      line-height:1rem;
      color:#fff;
  }
</style>
