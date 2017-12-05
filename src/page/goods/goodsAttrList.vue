<template>
  <div>
    <head-top signin-up='msite' goBack="" :headTitle="title">
      <div slot="right" v-if="queryType!='storeGoodsNum'" class="iconfont icon-jia" @click="toAddAttr"></div>
      <div slot="back" class="goback" @click="goBackRoute">
        <span class="iconfont icon-fanhui title_text"></span>
      </div>
    </head-top>
    <div class="cneter-con paddingTop">
      <div v-if="queryType!='storeGoodsNum'" class="list" v-for="(list,index) in attrList">
        <v-touch class="parentType" @swipeleft="inputIndex=list.id;singleId=null">
          <span v-show="inputIndex!=list.id">{{list.name}}</span>
          <input type="text" class="input-attr" v-model="list.name" v-show="inputIndex==list.id">
          <em v-show="inputIndex!=list.id" class="list-option iconfont check-icon"
            :class="{'icon-radio-checked':singleId==list.id,'icon-danxuanweizhong':singleId!=list.id}"
            @click="singleId=list.id;singleName=list.name"></em>
          <em class="list-option edit-option" v-show="inputIndex==list.id">
            <i class="iconfont icon-gou" @click="editAttr(sublist)"></i>
            <i class="iconfont icon-cha" @click="inputIndex=-1"></i>
          </em>
        </v-touch>
        <div class="sub-type" v-if="queryType=='goodsType'&&list.children" v-for="sublist in list.children">
          <v-touch @swipeleft="inputIndex=sublist.id;singleId=null" style="height:1rem;min-height:1rem;position:relative">
            <span v-show="inputIndex!=sublist.id">{{sublist.name}}</span>
            <input type="text" class="input-attr" v-model="sublist.name" v-show="inputIndex==sublist.id">
            <em v-show="inputIndex!=sublist.id" class="list-option iconfont check-icon"
              :class="{'icon-radio-checked':singleId==sublist.id,'icon-danxuanweizhong':singleId!=sublist.id}"
              @click="singleId=sublist.id;singleName=sublist.name"></em>
            <em class="list-option edit-option" v-show="inputIndex==sublist.id">
              <i class="iconfont icon-gou" @click="editAttr(sublist)"></i>
              <i class="iconfont icon-cha" @click="inputIndex=-1"></i>
            </em>
          </v-touch>
          <div v-if="queryType=='goodsType'&&sublist.children" v-for="sublist2 in sublist.children">
            <v-touch @swipeleft="inputIndex=sublist2.id;singleId=null" style="height:1rem;min-height:1rem;position:relative;padding-left:5%">
              <span v-show="inputIndex!=sublist2.id">{{sublist2.name}}</span>
              <input type="text" class="input-attr" v-model="sublist2.name" v-show="inputIndex==sublist2.id">
              <em v-show="inputIndex!=sublist2.id" class="list-option iconfont check-icon"
                :class="{'icon-radio-checked':singleId==sublist2.id,'icon-danxuanweizhong':singleId!=sublist2.id}"
                @click="singleId=sublist2.id;singleName=sublist2.name"></em>
              <em class="list-option edit-option" v-show="inputIndex==sublist2.id">
                <i class="iconfont icon-gou" @click="editAttr(sublist2)"></i>
                <i class="iconfont icon-cha" @click="inputIndex=-1"></i>
              </em>
            </v-touch>
            <div v-if="queryType=='goodsType'&&sublist2.children" v-for="sublist3 in sublist2.children">
              <v-touch class="sub-type2" @swipeleft="inputIndex=sublist3.id;singleId=null"
                style="height:1rem;min-height:1rem;position:relative;padding-left:15%">
                <span v-show="inputIndex!=sublist3.id">{{sublist3.name}}</span>
                <input type="text" class="input-attr" v-model="sublist3.name" v-show="inputIndex==sublist3.id">
                <em v-show="inputIndex!=sublist3.id" class="list-option iconfont check-icon"
                  :class="{'icon-radio-checked':singleId==sublist3.id,'icon-danxuanweizhong':singleId!=sublist3.id}"
                  @click="singleId=sublist3.id;singleName=sublist3.name"></em>
                <em class="list-option edit-option" v-show="inputIndex==sublist3.id">
                  <i class="iconfont icon-gou" @click="editAttr(sublist3)"></i>
                  <i class="iconfont icon-cha" @click="inputIndex=-1"></i>
                </em>
              </v-touch>
            </div>
          </div>
        </div>
      </div>
      <div v-if="queryType=='storeGoodsNum'" class="list" v-for="storehouse in storehouseList">
        <span>{{storehouse.storeName}}</span>
        <div class="list-option">
          <input type="number" min="0" step="1" placeholder="0" v-model="storehouse.quantity">
        </div>
      </div>
    </div>
    <div @click="saveAttr" class="bottom">
      保存
    </div>
    <alert-tip v-if="showAlert" :showHide="showAlert" @closeTip="showAlert=false" :alertText="alertText"></alert-tip>
  </div>
</template>
<script>
  import { mapMutations, mapState } from 'vuex'
  import { getStore } from 'src/config/mUtils'
  import {
    get_goods_type,
    get_goods_brand,
    get_goods_unit,
    save_goods_type,
    save_goods_brand,
    save_goods_unit,
    get_storehouse
  } from 'src/service/getData'
  import headTop from 'src/components/header/head'
  import alertTip from '../../components/common/alertTip'

  export default {
    data(){
      return {
        userId: getStore('userInfo').id,
        attrList: null,
        title: null,
        showAlert: false,
        alertText: null,
        singleId: null,
        singleName: null,
        inputIndex: -1,
        storehouseList: {}//仓库列表
      }
    },
    created(){
      this.singleId = this.storeGoodsInfo
      this.queryType = this.$route.query.type;
      if (this.queryType == 'goodsBrand') {
        //选择品牌
        this.title = "选择品牌";
        this.singleId = this.storeGoodsInfo.goodsBrandId;
        get_goods_brand(this.userId).then((res) => {
          this.attrList = res.data;
        }).catch((err) => {
          this.showTip(res.message)
        })
      } else if (this.queryType == 'goodsType') {
        //选择分类
        this.title = "选择分类"
        this.singleId = this.storeGoodsInfo.goodsClassificationId;
        get_goods_type(this.userId).then((res) => {
          this.attrList = res.data;
        }).catch((err) => {
          this.showTip(res.message)
        })
      } else if (this.queryType == 'storeGoodsNum') {
        //设置初始库存数量
        this.title = "设置初始库存数量";
        get_storehouse(this.userId).then((res) => {
          this.storehouseList = res.data;
        }).catch((err) => {
          this.showTip(err.message)
        })
      } else if (this.queryType == 'unit') {
        //选择单位
        this.title = "选择单位"
        this.singleId = this.storeGoodsInfo.goodsUnitId;
        get_goods_unit(this.userId).then((res) => {
          this.attrList = res.data;
        }).catch((err) => {
          this.showTip(res.message)
        })
      }
    },
    mounted(){

    },
    components: {
      headTop,
      alertTip
    },
    computed: {
      ...mapState([
        'headTitle', 'storeGoodsInfo'
      ])
    },
    methods: {
      ...mapMutations([
        'RECORD_GOODSINFO'
      ]),
      showTip(tip){
        this.showAlert = true;
        this.alertText = tip;
      },
      editAttr(list){
        if (this.queryType == 'goodsBrand') {
          //选择品牌
          save_goods_brand(this.userId, list).then((res) => {
            this.showTip('修改成功！');
          }).catch((err) => {
            this.showTip(err.message);
          })
        } else if (this.queryType == 'goodsType') {
          //选择分类
          save_goods_type(this.userId, list).then((res) => {
            this.showTip('修改成功！');
          }).catch((err) => {
            this.showTip(err.message);
          })
        } else if (this.queryType == 'unit') {
          //选择单位
          save_goods_unit(this.userId, list).then((res) => {
            this.showTip('修改成功！');
          }).catch((err) => {
            this.showTip(err.message);
          })
        }
        this.inputIndex = -1;
      },
      async saveAttr(){
        this.goodsInfo = this.storeGoodsInfo;
        if (this.queryType == 'goodsBrand') {
          //选择品牌
          this.goodsInfo.goodsBrandId = this.singleId
          this.goodsInfo.goodsBrandName = this.singleName
        } else if (this.queryType == 'goodsType' && !this.$route.query.getParent) {
          //选择分类
          this.goodsInfo.goodsClassificationId = this.singleId
          this.goodsInfo.goodsClassificationName = this.singleName
        } else if (this.queryType == 'unit') {
          //选择单位
          this.goodsInfo.goodsUnitId = this.singleId
          this.goodsInfo.goodsUnitName = this.singleName
        } else if (this.queryType == 'storeGoodsNum') {
          //仓库初始数量
          this.storehouseList.forEach(element => {
            if (Number(element.quantity) < 0) {
              this.showTip("库存不能为负数！");
              return;
            }
            this.goodsInfo.warehouseStocks.push({
              quantity: element.quantity,
              warehouseId: element.storeId
            })
          });
        }
        this.RECORD_GOODSINFO(this.goodsInfo);
        if (!this.$route.query.getParent) {
          this.$router.push({ name: "addGoods" })
        } else {
          this.attr = JSON.parse(this.$route.query.attr);
          this.attr.parentId = this.singleId;
          this.attr.parentName = this.singleName;
          this.$router.push({
            name: 'goodsAddAttr', query: {
              type: this.queryType,
              attr: JSON.stringify(this.attr)
            }
          })
        }
      },
      toAddAttr(){
        //跳转到添加页面
        this.$router.push({ name: 'goodsAddAttr', query: { type: this.queryType } })
      },
      goBackRoute(){
        if (this.$route.query.getParent) {
          this.$router.push({ name: 'goodsAddAttr', query: { type: this.queryType } })
        } else {
          this.$router.push({ name: 'addGoods' })
        }
      }

    }
  }
</script>
<style lang="scss" scoped>
  @import 'src/style/mixin';

  .title-tip {
    @include wh(100%, .8rem);
    line-height: .8rem;
    @include sc(.28rem, #bbb);
    padding-left: .4rem;
  }

  .input-attr {
    @include ct;
    background: #fff;
    height: .5rem;
  }

  .check-icon {
    @include sc(.4rem, $green)
  }

  .list {
    min-height: 1rem;
    height: auto;
    & > div {
      position: relative;
      height: 1rem;
      line-height: 1rem;
    }
    .parentType {
      padding-left: 5%;
    }
    .sub-type {
      padding-left: 10%;
      min-height: 1rem;
      height: auto;
      position: relative;
      .list-option {
        top: .4rem;
      }
      .sub-type2 {
        position: relative;
        padding-left: 15%;
        min-height: 1rem;
        height: 1rem;
        height: auto;
      }
    }
    .edit-option {
      i {
        @include sc(.4rem, $green);
        margin-left: .2rem;
      }
    }
  }

  .list-option {
    right: .4rem;
    input {
      background: #fff;
      text-align: right;
      height: .4rem;
    }
  }
</style>
