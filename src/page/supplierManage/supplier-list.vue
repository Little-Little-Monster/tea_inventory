<template>
  <div class="main">
    <head-top signin-up='msite' goBack="" head-title="供应商列表">
      <span slot="right" class="iconfont icon-jia" @click="$router.push({name:'addEditUpplier'})" ></span>
      <div slot="back" class="goback" @click="goBack" >
          <span class="iconfont icon-fanhui title_text"></span>
      </div>
      <!-- <span slot="right" class="iconfont icon-jia" @click="addStore"></span> -->
    </head-top>
    <ul class="supplier_list paddingTop cneter-con" :style="{'margin-bottom':chooseSupplier?'1rem':''}">
      <div class="search-goods">
        <input type="text" v-model="params" placeholder="请输入供应商名称" @keydown.enter="getSupplier">
        <em class="list-option iconfont icon-sousuo" @click="getSupplier"></em>
      </div>
      <li class="supplier_info_list" v-for="list in suppList" @click="editSupp(list)">
        <div class="list_left">
          <h4>{{list.name}}</h4>
          <p>欠供应商欠款： <span>￥{{list.balance}}</span></p>
          <p>联系电话： <span>{{list.mobile}}</span></p>
          <p>负责人： <span>{{list.personHead}}</span></p>
        </div>
        <div class="list_right">
          <i class="iconfont icon-qianjin" v-if="!chooseSupplier"></i>
          <em v-if="chooseSupplier" class="iconfont check-icon" :class="{'icon-radio-checked':chooseId==list.id,'icon-danxuanweizhong':chooseId!=list.id}" @click="chooseId=list.id;chooseName=list.name"></em>
        </div>
      </li>
      <p class="empty_data">没有更多了</p>
    </ul>
    <div class="bottom" v-if="chooseSupplier" @click="save">
          保存
    </div>
    <transition name="loading">
			<loading v-show="showLoading"></loading>
		</transition>
    <alert-tip v-if="showAlert" :showHide="showAlert" @closeTip="showAlert=false" :alertText="alertText"></alert-tip>
  </div>
</template>
<script>
  import { mapMutations,mapState } from 'vuex'
  import { getStore } from 'src/config/mUtils'
  import { get_supplier } from 'src/service/getData'
  import headTop from 'src/components/header/head'
  import footGuide from 'src/components/footer/footGuide'
  import alertTip from '../../components/common/alertTip'
  import loading from 'src/components/common/loading'

  export default {
    data(){
      return {
        imgPath: 'static/images/head.png',
        userId:getStore('userInfo').id,
        params:'',
        chooseSupplier:this.$route.query.chooseSupplier,
        fromPage:this.$route.query.fromPage,
        suppList:null,
        chooseId:-1,
        chooseName:null,
        showAlert:false,
        alertText:'',
        showLoading:true
      }
    },
    created(){
      this.getSupplier();
      if(this.chooseSupplier){
          switch (this.fromPage) {
           case 'buyTrade':case 'buyBack':
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
      alertTip,
      loading
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
      showTip(msg){
        this.showAlert = true;
        this.alertText = msg;
      },
      goBack(){
          if(!this.chooseSupplier&&!this.fromPage){
            this.$router.push({name:"basic"})
          }else if(!this.chooseSupplier&&this.fromPage){
            this.$router.push({name:this.fromPage})
          }else{
            switch (this.fromPage) {
              case 'buyTrade':case 'buyBack':
                this.$router.push({
                  name:this.fromPage
                })
                break;
            
              default:
                break;
            }
          }
      },
      save(){
        if(!this.chooseSupplier){
          this.$router.push({name:"basic"})
        }else{
          switch (this.fromPage) {
           case 'buyTrade':case 'buyBack':
                this.$router.push({
                  name:this.fromPage
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
      getSupplier(){
        this.showLoading = true
        get_supplier(this.userId,this.params).then((res)=>{
          if(res.code==200){
            this.suppList=res.data;
          }else{
            this.showTip(res.message)
          }
           this.showLoading = false
        }).catch((err)=>{
          this.showTip(err.message)
          this.showLoading = false
        })
      },
      editSupp(list){
        if(!this.chooseSupplier){
          this.$router.push({name:'supplierDetail',query:list})
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
      height: 2.2rem;
      padding: 0 0.2rem 0 0.4rem;
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
      .list_left{
        h4{
          font-size: 0.32rem;
          color: #444444;
          margin-bottom:.2rem;
        }
        p{
          font-size: 0.24rem;
          color: #999999;
          line-height:.4rem;
          &:nth-of-type(1){
            span{
              color: #dac1db;
            }
          }
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
