<template>
  <div>
    <head-top signin-up='msite' goBack="" head-title="角色管理">
      <span v-if="!chooseRule" slot="right" class="iconfont icon-jia" @click="$router.push({name:'addRole'})" ></span>
      <div slot="back" class="goback" @click="goBack" >
          <span class="iconfont icon-fanhui title_text"></span>
      </div>
      <!-- <span slot="right" class="iconfont icon-jia" @click="addStore"></span> -->
    </head-top>
    <ul class="supplier_list paddingTop" :style="{'margin-bottom':chooseRule?'1rem':''}">
      <li class="supplier_info_list" v-for="list in roleList" @click="editRole(list.id,list.roleName,list.memo)">
        <div class="list_left">
          <h4>{{list.roleName}}</h4>
          <p><span>{{list.memo}}</span></p>
        </div>
        <div class="list_right">
          <i class="iconfont icon-qianjin" v-if="!chooseRule"></i>
          <em v-if="chooseRule" class="iconfont check-icon" :class="{'icon-radio-checked':chooseId==list.id,'icon-danxuanweizhong':chooseId!=list.id}" @click="chooseId=list.id;chooseName=list.name"></em>
        </div>
      </li>
    </ul>
     <div class="bottom" v-if="chooseRule" @click="save">
          保存
      </div>
  </div>
</template>
<script>
  import { mapMutations,mapState } from 'vuex'
  import { getStore } from 'src/config/mUtils'
  import { get_role_list } from 'src/service/getData'
  import headTop from 'src/components/header/head'
  import footGuide from 'src/components/footer/footGuide'

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
        chooseName:null
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
          if(!this.chooseRule){
          this.$router.push({name:"msite"})
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
  .supplier_list{
    @include same_ul_style;
    .supplier_info_list{
      height: 1.6rem;
      padding: 0 0.2rem 0 0.4rem;
      .list_left{
        h4{
          font-size: 0.32rem;
          color: #444444;
          line-height: .72rem;
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
