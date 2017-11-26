<template>
    <div>
    	<head-top signin-up='msite' goBack="" :headTitle="goodsInfo.id?'编辑商品':'添加商品'">
            <div slot="back" class="goback" @click="$router.push({name:'goodsManage'})" >
                <span class="iconfont icon-fanhui title_text"></span>
            </div>
    	</head-top>

        <div class="cneter-con paddingTop">
            <ul class="add_edit_header">
                <li>
                    <div class="list_left">
                    名称 <i>*</i>
                    </div>
                    <div class="list_right">
                        <input type="text" v-model="goodsInfo.name" placeholder="由数字或字母组成" style="width: 2.99rem;">
                    </div>
                </li>
                <li class="margin-bot">
                    <div class="list_left">
                    货号 <i>*</i>
                    </div>
                    <div class="list_right">
                        <input type="text" v-model="goodsInfo.idCard" placeholder="货号唯一，保存后不能修改" style="width: 3.99rem;">
                    </div>
                </li>
                <li>
                    <div class="list_left">
                    采购价 <i>*</i>
                    </div>
                    <div class="list_right">
                        <input type="number" step="0.01" v-model="goodsInfo.buyAmount" placeholder="￥0.00" style="width: 2.99rem;">
                    </div>
                </li>
                <li class="margin-bot">
                    <div class="list_left">
                    销售价 <i>*</i>
                    </div>
                    <div class="list_right">
                        <input type="number" step="0.01" v-model="goodsInfo.saleAmount" placeholder="￥0.00" style="width: 2.99rem;">
                    </div>
                </li>
                <li>
                    <div class="list_left">
                    净含量 <i>*</i>
                    </div>
                    <div class="list_right">
                        <input type="number" step="0.01" v-model="goodsInfo.modelSize" placeholder="0.00" style="width: 2.99rem;">
                    </div>
                </li>
                <li class="margin-bot" @click="getAttr({name:'goodsAttrList',query:{type:'unit'}})">
                    <div class="list_left">
                    单位 <i></i>
                    </div>
                    <div class="list_right">
                        <span v-if="!goodsInfo.goodsUnitId">选择单位</span>
                        <span v-else="!goodsInfo.goodsUnitId">{{goodsInfo.goodsUnitName}}</span>
                        <i class="iconfont icon-xiala2" style="position: relative;top: 1px;"></i>
                    </div>
                </li>
                <li class="margin-bot"  @click="getAttr({name:'goodsAttrList',query:{type:'storeGoodsNum'}})">
                    <div class="list_left">
                    初始库存数量 <i></i>
                    </div>
                    <div class="list_right">
                        <span v-if="!goodsInfo.goodsUnitId">添加</span>
                        <span v-else="!goodsInfo.goodsUnitId">{{goodsInfo.goodsUnitName}}</span>
                        <i class="iconfont icon-qianjin" style="position: relative;top: 1px;"></i>
                    </div>
                </li>
                <li class="margin-bot" style="min-height:1.4rem">
                    <div class="list_left">
                    商品图片 <i></i>
                    </div>
                    <div class="list_right">
                        <i class="iconfont icon-jia" @click="$refs.input.click()" style="font-size:.4rem;font-weight:600;color:#999;position: relative;top: 1px;"></i>
                        <input type="file" ref="input" :value="files" v-show="" class="file-input" id="file-input" @change="getFile($event)">
                    </div>
                </li>
                 <li @click="getAttr({name:'goodsAttrList',query:{type:'goodsType'}})">
                    <div class="list_left">
                    分类 <i></i>
                    </div>
                    <div class="list_right">
                        <span v-if="!goodsInfo.goodsClassificationId">选择分类</span>
                        <span v-else="!goodsInfo.goodsClassificationId">{{goodsInfo.goodsClassificationName}}</span>
                        <i class="iconfont icon-xiala2" style="position: relative;top: 1px;"></i>
                    </div>
                </li>
                 <li class="margin-bot" @click="getAttr({name:'goodsAttrList',query:{type:'goodsBrand'}})">
                    <div class="list_left">
                    品牌 <i></i>
                    </div>
                    <div class="list_right">
                        <span v-if="!goodsInfo.goodsBrandId">选择品牌</span>
                        <span v-else="!goodsInfo.goodsBrandId">{{goodsInfo.goodsBrandName}}</span>
                        <i class="iconfont icon-xiala2" style="position: relative;top: 1px;"></i>
                    </div>
                </li>
                 <li class="limit">
                    <div class="list-con" @click="isShow=!isShow">
                        <div class="list_left">
                        库存预警
                        </div>
                        <div class="list_right list-option">
                            <i class="iconfont" :class="{'icon-shouqi':isShow,'icon-xiala2':!isShow}" style="position: relative;top: 1px;"></i>
                        </div>
                    </div>
                    
                    <div class="limit-con" v-show='isShow'>
                        <div class="list_left">
                            上限 <i></i>
                        </div>
                        <div class="list_right">
                             <input type="number" step="0.01" v-model="upLimit" placeholder="0" style="width: 2.99rem;">
                        </div>
                    </div>
                    <div class="limit-con" v-show='isShow'>
                        <div class="list_left">
                            下限 <i></i>
                        </div>
                        <div class="list_right">
                             <input type="number" step="0.01" v-model="downLimit" placeholder="0" style="width: 2.99rem;">
                        </div>
                    </div>
                </li>
                 <li>
                    <div class="list_left">
                    状态(启用商品)
                    </div>
                    <div class="list_right">
                        <kswitch :checked="Boolean(goodsInfo.status)" @click.native="goodsInfo.status==0?$set(goodsInfo,'status',1):$set(goodsInfo,'status',0)"></kswitch>
                    </div>
                </li>
            </ul>
            <div class="memo">
                <p>历史图库</p>
                <textarea v-model="goodsInfo.memo" placeholder="请输入备注信息" ></textarea>
            </div>
            </ul>
        </div>
        <div class="bottom" @click="saveGoods">
            保存
        </div>
        <alert-tip v-if="showAlert" :showHide="showAlert" @closeTip="showAlert=false" :alertText="alertText"></alert-tip>
    </div>    
</template>

<script>
import {mapMutations,mapState} from 'vuex'
import {getStore} from 'src/config/mUtils'
import {savegoods} from 'src/service/getData'
import headTop from 'src/components/header/head'
import kswitch from 'src/components/common/kswitch'
import alertTip from '../../components/common/alertTip'

export default {
	data(){
        return {
            userId:getStore('userInfo').id,
            goodsInfo:{},
            showAlert:false,
            alertText:null,
            isShow:false,
            upLimit:0,
            downLimit:0,
            files:null,
            file:null
        }
    },
    created(){
        this.$set(this.goodsInfo,"status",1);
        if(this.storeGoodsInfo){
            this.goodsInfo = this.storeGoodsInfo;
        }
        
    },
    mounted(){
        
    },
    components: {
        headTop,
        kswitch,
        alertTip
    },
    computed: {
		...mapState([
			'headTitle','storeGoodsInfo'
		])
    },
    methods: {
    	...mapMutations([
            'RECORD_GOODSINFO'
        ]),
        getAttr(router){
            this.$router.push(router)
            this.RECORD_GOODSINFO(this.goodsInfo);
        },
        async saveGoods(){
            if(!this.goodsInfo.name){
                this.showTip("请输入商品名称");
                return;
            }
            // else if(/^[a-z0-9]{6,16}$/.test(this.goodsInfo.name)){
            //     this.showTip("名称格式不正确");
            //     return;
            // }
            if(this.goodsInfo.warehouseStocks){
                this.goodsInfo.warehouseStocks.forEach(element => {
                    element.upLimit = this.upLimit;
                    element.downLimit = this.downLimit;
                });
            }
            savegoods(this.userId,this.goodsInfo).then((res)=>{
                this.$router.push({name:"goodsManage"})
            }).catch((err)=>{
                this.showTip(err.message);
            })
        },
        showTip(text){
            this.showAlert = true;
            this.alertText = text;
        },
        getFile(event) {
            if(event.target.files[0]){
                this.file = event.target.files[0];
                console.log(this.file);
                var reg = /^.*\.(?:jpg|png|jpeg|gif)$/i;//文件名可以带空格
                if(!reg.test(this.file.name)){
                    this.file={
                        name:'请选择图片!'
                    }
                    this.showTip(this.file.name)
                }else if(this.file.size/1024/1024>2){
                    this.file={
                        name:'文件不能超过2M'
                    }
                    this.showTip(this.file.name)
                }
            }
        }
      },
}

</script>

<style lang="scss" scoped>
    @import 'src/style/mixin';
    .cneter-con{
        padding-bottom: .99rem;
    }
    .title-choose{
        width:100%;
        height:.8rem;
        margin-bottom: 0.1rem;
        background: #fff;
        &>div{
            width:50%;
            float: left;
            text-align: center;
            position: relative;
            line-height: .8rem;
            font-size:.32rem;
            em{
                display: inline-block;
                @include wh(0.3rem,0.06rem);
                background:$green;
                position: absolute;
                bottom: 0;
                left:45%;
            }
        }
    }
     ul {
      @include same_ul_style;
      margin-bottom: 2px;
      li {
        height: 1rem;
        padding: 0 0.4rem;
        input{
          text-align: right;
        }
        .list_left {
          font-size: 0.32rem;
          color: #666666;
          i {
            position: relative;
            top: 3px;
            color: #D29191;
          }
        }
        .list_right {
          font-size: 0.28rem;
          color: #999999;
          input {
            background: none;
            color: #999999 !important;
            font-size: 0.28rem;
          }
          span {
            color: #999999;
            font-size: 0.28rem;
          }
        }
      }
     }
     .margin-bot{
         margin-bottom:.1rem;
     }
     .limit{
         min-height: 1rem;
         height:auto;
         width:100%;
         flex-wrap: wrap;
         .limit-con{
             @include wh(100%,1rem);
             line-height:1rem;
             display: flex;
             position: relative;
             input{
                 position: absolute;
                 right: 0;
                 float: right;
                 @include ct;
             }
         }
         .list-con{
             width:100%;
             height:1rem;
             display: flex;
             flex-wrap: wrap;
              line-height:1rem;
             .list-left{
                @include ct;
             }
         }
         .list-option{
             position: absolute;
             right:.4rem;
         }
     }
     .memo{
         @include wh(100%,3rem);
         background:#fff;
         padding:0 .4rem;
         p{
            @include sc(.32rem,#666)
         }
         textarea{
             @include wh(100%,2rem);
             resize: none;
             padding:.2rem 0;
         }
     }
</style>
