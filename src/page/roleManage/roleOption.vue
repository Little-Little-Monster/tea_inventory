<template>
  <div class="main">
    <head-top signin-up='msite' :head-title="$route.query.roleId?'编辑角色':'添加角色'">
      <div slot="back" class="goback" @click="goBack" >
          <span class="iconfont icon-fanhui title_text"></span>
      </div>
    </head-top>
    <ul class="add-edit-upplier cneter-con">
      <li>
        <div class="list_left">
          角色名称 <i class="required" style="position:absolute;top:.3rem;left:-.2rem">*</i>
        </div>
        <div class="list_right">
          <input type="text" :disabled="type==0" v-model="userInfo.roleName" placeholder="请输入角色名称" style="width: 2.27rem;">
        </div>
      </li>
      <li class="memo">
        <div class="memo-tit">
          备注
        </div>
        <textarea placeholder="请输入备注" :disabled="type==0" v-model="userInfo.memo"></textarea>
      </li>
      <li class="tip">
        提示：管理员给店长、店员分配功能权限，分配后需要重新登陆功能才生效。
      </li>
      <li>
        <div class="list_left">
          角色权限配置
        </div>
      </li>
      <li  class="role-con">
        <div class="role">
          <div class="role-left">
            <div class="role-father" @click="setRoleFather(index)" v-for="(role,index) in resource">
              <input type="checkbox" @click.stop="setSubSel(role.selected,index)" class="check-box-input" :disabled="type==0" :id="role.id" v-model="role.selected">
              <label :for="role.id"   :class="{'icon-radio-checked':role.selected,'icon-danxuanweizhong':!role.selected,'disable':type==0}" class="iconfont" ></label>
              <span >{{role.name}}</span>
              <em  :class="{'icon-xiala2':fatherIndex!=index,'icon-qianjin':fatherIndex==index}" class="iconfont"></em>
            </div>
          </div>
          <div class="role-right">
            <div class="role-sub" v-for="(subRole,index2) in resource[fatherIndex].subMenus" v-if="resource[fatherIndex].subMenus">
              <div class="role-sub-con">
                <span  @click="setRoleSub(index2)"> {{subRole.name}}</span>
                <div class="sub-option">
                  <em @click="setRoleSub(index2)" :class="{'icon-xiala2':subIndex!=index2,'icon-shouqi':subIndex==index2}" class="iconfont"></em>
                  <input type="checkbox" :disabled="type==0" @click="setFunSel(subRole.selected,fatherIndex,index2)" class="check-box-input" :id="subRole.id" v-model="subRole.selected">
                  <label :for="subRole.id"   :class="{'icon-radio-checked':subRole.selected,'icon-danxuanweizhong':!subRole.selected,'disable':type==0}" class="iconfont" ></label>
                </div>
              </div>
              <div class="sub-fun" v-if="subIndex==index2&&subRole.subMenuFunctions" v-for="(func,index3) in subRole.subMenuFunctions" >
                <input type="checkbox" :disabled="type==0" class="check-box-input" :id="func.id" v-model="func.selected">
                <label :for="func.id" :class="{'icon-check':func.selected,'icon-xuanzhong':!func.selected,'disable':type==0}" class="iconfont sub-sel" ></label>
                <span> {{func.name}}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div class="bottom" @click="saveRole" v-if="type!=0">
          保存
        </div>
      </li>
    </ul>
    <transition name="loading">
			<loading v-show="showLoading"></loading>
		</transition>
    
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
  import loading from 'src/components/common/loading'

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
        roleId:this.$route.query.roleId?this.$route.query.roleId:0,
        showLoading:false,
        selLength:0,
        type:this.$route.query.type,
        fromPage:this.$route.query.fromPage,
        userType:getStore("userInfo").type//1表示店主，0表示管理员
      }
    },
    created(){
      if(this.$route.name=='editRole'){
        this.userInfo.roleName = this.$route.query.roleName
        this.userInfo.memo = this.$route.query.memo
        this.userInfo.id = this.$route.query.roleId
      }
      if(this.roleId){
        if(this.userType==0){
          this.type=1;
        }
      }else{
        this.type=1;
      }
      
      this.getResouce()
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
      goBack(){
        this.$router.push({
          name:"roleManage",
          query:{
            fromPage:this.fromPage
          }
        })
      },
      getResouce(){
        this.showLoading = true;
        get_role_resource(this.userId,this.roleId).then((res)=>{
          if(res.code!=200){
            this.showTip(res.message)
          }else{
            this.resource = res.data;
          }
          this.showLoading = false;
        }).catch((err)=>{
          this.showTip(err.message)
           this.showLoading = false;
        })
      },
      setRoleFather(index){
        if(this.fatherIndex==index){
          // this.fatherIndex = -1;
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
      async setSubSel(selcted,fatherIndex){
        if(this.type==0){
          return;
        }
       if(fatherIndex!=-1&&this.resource[fatherIndex]){
         this.resource[fatherIndex].subMenus.forEach(sub => {
           sub.selected = !selcted;
         });
       }
      },
      async setFunSel(selcted,fatherIndex,subIndex){
        if(this.type==0){
          return;
        }
       if(subIndex!=-1&&this.resource[fatherIndex]){
         this.resource[fatherIndex].subMenus.forEach(sub => {
           if(sub.subMenuFunctions[subIndex]){
             sub.subMenuFunctions[subIndex].selected = !selcted;
           }
         });
       }
         
         if(!selcted){
           this.selLength=1;
         }else{
           this.selLength=0;
         }
         this.resource[fatherIndex].subMenus.forEach(sub => {
           if(sub.selected){
             this.selLength ++
           }
         });
        
         if(selcted &&this.selLength==1){
           this.resource[fatherIndex].selected = false;
         }else if(!selcted &&this.selLength){
           this.resource[fatherIndex].selected = true;
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
            this.showLoading = true;
            this.userInfo.menuVos = this.resource;
            role_handel(this.userId,this.userInfo).then((res)=>{
              if(res.code!=200){
                this.alertText = res.message;
                this.showAlert = true;
              }else{
                this.goBack();
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
    overflow: hidden;
    display: flex;
    flex-direction: column;
    @include same_ul_style;
    input{
      text-align: right;
    }
    li {
      height: .8rem;
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
      height: 1.2rem;
      flex-wrap: wrap;
      .memo-tit{
        height:auto;
      }
      textarea{
        width:100%;
        height:60%;
        resize: none;
        background: #fff;
      }
    }
    .tip{
      background: inherit;
      @include wh(100%,.68rem);
      @include sc(.2rem,#a1a1a1);
      line-height: .3rem;
    }
    .role-con{
      @include wh(100%,5.2rem);
      background: #fff;
      // margin-bottom:1.2rem;
      display: flex;
      flex-direction: column;
      flex:1;
      padding:0;
      @include sc(.24rem,#a5a5a5)
      .check-box-input{
        display: none;
      }
      .role{
        flex:1;
        display: flex;
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
          .disable{
            color:$disabled;
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
          .disable{
            color:$disabled;
          }
        }
      }
    }
  }
  .bottom{
      background: $green;
      text-align: center;
      line-height:.8rem;
      color:#fff;
      height:.8rem;
      position: static;
  }
</style>
