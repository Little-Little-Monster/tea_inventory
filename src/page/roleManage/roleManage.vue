<template>
  <div class="main">
    <head-top signin-up='msite' goBack="" head-title="角色管理">
      <span v-if="!chooseRule" slot="right" class="iconfont icon-jia" @click="$router.push({name:'addRole',query:{fromPage:fromPage}})" ></span>
      <div slot="back" class="goback" @click="goBack" >
          <span class="iconfont icon-fanhui title_text"></span>
      </div>
      <!-- <span slot="right" class="iconfont icon-jia" @click="addStore"></span> -->
    </head-top>
    <ul class="supplier_list paddingTop cneter-con" :style="{'margin-bottom':chooseRule?'1rem':''}">
      <li class="supplier_info_list" v-for="list in roleList" @click="editRole(list.id,list.roleName,list.memo,list.type)">
        <div class="list_left">
          <h4>{{list.roleName}}</h4>
          <p><span>{{list.memo}}</span></p>
        </div>
        <div class="list_right">
          <i class="iconfont icon-qianjin" v-if="!chooseRule"></i>
          <em v-if="chooseRule" class="iconfont check-icon" :class="{'icon-radio-checked':chooseId==list.id,'icon-danxuanweizhong':chooseId!=list.id}" @click="chooseId=list.id;chooseName=list.name"></em>
        </div>
      </li>
      <p class="empty_data">没有更多了</p>
    </ul>
     <transition name="loading">
			<loading v-show="showLoading"></loading>
		</transition>
     <div class="bottom" v-if="chooseRule" @click="save">
          保存
      </div>
      <alert-tip v-if="showAlert" :showHide="showAlert" @closeTip="showAlert=false" :alertText="alertText"></alert-tip>
  </div>
</template>
<script>
  import { mapMutations,mapState } from 'vuex'
  import { getStore } from 'src/config/mUtils'
  import { get_role_list } from 'src/service/getData'
  import headTop from 'src/components/header/head'
  import footGuide from 'src/components/footer/footGuide'
  import loading from 'src/components/common/loading'
  import alertTip from '../../components/common/alertTip'

  export default {
    data(){
      return {
        imgPath: 'static/images/head.png',
        userId:getStore('userInfo').id,
        parama:'',
        chooseRule:this.$route.query.chooseRule,
        fromPage:this.$route.query.fromPage,
        roleList:null,
        chooseId:-1,
        chooseName:null,
        showLoading:false,
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
      loading,
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
          if(!this.chooseRule&&!this.fromPage){
          this.$router.push({name:"basic"})
          }else if(!this.chooseRule&&this.fromPage){
            this.$router.push({name:this.fromPage})
          }else{
            switch (this.fromPage) {
              case 'buyOrder':
                this.$router.push({
                  name:this.fromPage,
                })
                break;
            
              default:
                break;
            }
          }
      },
      save(){
        if(!this.chooseRule){
          this.$router.push({name:"basic"})
        }else{
          switch (this.fromPage) {
            case 'buyOrder':
              this.$router.push({
                name:this.fromPage,
              })
              let order = Object.assign({},this.buyOrder,{
                supplierId:this.chooseId==-1?'':this.chooseId,
                supplierName:this.chooseName
              })
              this.RECORD_BUYORDER(order)
              break;
          
            default:
              break;
          }
        }
      },
      getRole(){
        this.showLoading = true;
        get_role_list(this.userId).then((res)=>{
          this.roleList=res.data;
          this.showLoading = false;
        }).catch((err)=>{
          this.showLoading = false;
          this.showAlert = true;
          this.showAlert = err.message
        })
      },
      editRole(roleId,roleName,memo,type){
        if(!this.chooseRule){
          this.$router.push({
            name:'editRole',
            query:{
              roleId:roleId,
              roleName:roleName,
              memo:memo,
              type:type,
              fromPage:this.fromPage
            }
          })
        }
      }
    },
    watch: {}
  }
</script>
<style lang="scss" scoped>
  @import '../../../src/style/mixin';
  .supplier_list{
    @include same_ul_style;
    .supplier_info_list{
      height: 1.6rem;
      padding: 0 0.2rem 0 0.4rem;
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
      .list_left{
        h4{
          font-size: 0.32rem;
          color: #444444;
          line-height: .72rem;
        }
        p{
          font-size: 0.24rem;
          color: #999999;
          width:180%;
          span{
            color: #999999;
          }
        }
      }
      .list_right{
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
