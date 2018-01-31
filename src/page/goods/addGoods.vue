<template>
    <div class="main">
    	<head-top signin-up='msite' goBack="" :headTitle="goodsInfo.id?'编辑商品':'添加商品'">
            <div slot="back" class="goback" @click="returnBack" >
                <span class="iconfont icon-fanhui title_text"></span>
            </div>
    	</head-top>

        <div class="cneter-con paddingTop">
            <ul class="add_edit_header">
                <li>
                    <div class="list_left">
                    名称 <i class="required" style="position:absolute;top:.4rem;left:-.2rem">*</i>
                    </div>
                    <div class="list_right">
                        <input type="text" v-model="goodsInfo.name" placeholder="由数字或字母组成" style="width: 2.99rem;">
                    </div>
                </li>
                <li class="margin-bot">
                    <div class="list_left">
                    货号 <i class="required" style="position:absolute;top:.4rem;left:-.2rem">*</i>
                    </div>
                    <div class="list_right">
                        <input type="text" v-model="goodsInfo.idCard" placeholder="货号唯一，保存后不能修改" style="width: 3.99rem;">
                    </div>
                </li>
                <li>
                    <div class="list_left">
                    采购价 <i class="required" style="position:absolute;top:.4rem;left:-.2rem">*</i>
                    </div>
                    <div class="list_right">
                        <input type="number" step="0.01" v-model="goodsInfo.buyAmount" placeholder="￥0.00" style="width: 2.99rem;">
                    </div>
                </li>
                <li class="margin-bot">
                    <div class="list_left">
                    销售价 <i class="required" style="position:absolute;top:.4rem;left:-.2rem">*</i>
                    </div>
                    <div class="list_right">
                        <input type="number" step="0.01" v-model="goodsInfo.saleAmount" placeholder="￥0.00" style="width: 2.99rem;">
                    </div>
                </li>
                <li>
                    <div class="list_left">
                    净含量 <i class="required" style="position:absolute;top:.4rem;left:-.2rem">*</i>
                    </div>
                    <div class="list_right">
                        <input type="number" step="0.01" v-model="goodsInfo.modelSize" placeholder="0.00" style="width: 2.99rem;">
                    </div>
                </li>
                <li class="margin-bot" @click="getAttr({name:'goodsAttrList',query:{type:'unit',fromPage:$route.query.fromPage,fromPage2:$route.query.fromPage2,fromPage3:$route.name}})">
                    <div class="list_left">
                    单位 <i></i>
                    </div>
                    <div class="list_right">
                        <span v-if="!goodsInfo.goodsUnitId">选择单位</span>
                        <span v-else="!goodsInfo.goodsUnitId">{{goodsInfo.goodsUnitName}}</span>
                        <i class="iconfont icon-xiala2" style="position: relative;top: 1px;"></i>
                    </div>
                </li>
                <!-- <li class="margin-bot"  @click="getAttr({name:'goodsAttrList',query:{type:'storeGoodsNum'}})">
                    <div class="list_left">
                    初始库存数量 <i></i>
                    </div>
                    <div class="list_right">
                        <span v-if="!goodsInfo.goodsUnitId">添加</span>
                        <span v-else="!goodsInfo.goodsUnitId">{{goodsInfo.goodsUnitName}}</span>
                        <i class="iconfont icon-qianjin" style="position: relative;top: 1px;"></i>
                    </div>
                </li> -->
                <li class="margin-bot" style="min-height:1.4rem">
                    <div class="list_left">
                    商品图片 <i></i>
                    </div>
                    <div class="list_right">
                        <img :src="goodsInfo.attachmentUrl" alt="">
                        <i class="iconfont icon-jia" @click="$refs.input.click()" style="font-size:.4rem;font-weight:600;color:#999;position: relative;top: 1px;"></i>
                        <input type="file" ref="input" :value="files" v-show="" class="file-input" id="file-input" @change="getFile($event)">
                    </div>
                </li>
                 <li @click="getAttr({name:'goodsAttrList',query:{type:'goodsType',fromPage:$route.query.fromPage,fromPage2:$route.query.fromPage2,fromPage3:$route.name}})">
                    <div class="list_left">
                    分类 <i></i>
                    </div>
                    <div class="list_right">
                        <span v-if="!goodsInfo.goodsClassificationId">选择分类</span>
                        <span v-else="!goodsInfo.goodsClassificationId">{{goodsInfo.goodsClassificationName}}</span>
                        <i class="iconfont icon-xiala2" style="position: relative;top: 1px;"></i>
                    </div>
                </li>
                 <li class="margin-bot" @click="getAttr({name:'goodsAttrList',query:{type:'goodsBrand',fromPage:$route.query.fromPage,fromPage2:$route.query.fromPage2,fromPage3:$route.name}})">
                    <div class="list_left">
                    品牌 <i></i>
                    </div>
                    <div class="list_right">
                        <span v-if="!goodsInfo.goodsBrandId">选择品牌</span>
                        <span v-else="!goodsInfo.goodsBrandId">{{goodsInfo.goodsBrandName}}</span>
                        <i class="iconfont icon-xiala2" style="position: relative;top: 1px;"></i>
                    </div>
                </li>
                <!-- <li class="limit">
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
                </li> -->
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
        <transition name="loading">
			<loading v-show="showLoading"></loading>
		</transition>
        <alert-tip v-if="showAlert" :showHide="showAlert" @closeTip="showAlert=false" :alertText="alertText"></alert-tip>
    </div>    
</template>

<script>
import {mapMutations,mapState} from 'vuex'
import {getStore} from 'src/config/mUtils'
import {save_goods,get_goods_info} from 'src/service/getData'
import headTop from 'src/components/header/head'
import kswitch from 'src/components/common/kswitch'
import alertTip from '../../components/common/alertTip'
import { baseUrl} from '../../config/env'
import loading from 'src/components/common/loading'

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
            file:null,
            imgUrl:'',
            showLoading: false, //显示加载动画
        }
    },
    created(){
        this.$set(this.goodsInfo,"status",1);
        if(JSON.stringify(this.storeGoodsInfo)!='{}'){
            this.goodsInfo = this.storeGoodsInfo;
        }
        if(this.$route.query.edit){
            this.getGoodsInfo()
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
    computed: {
		...mapState([
			'headTitle','storeGoodsInfo','buyOrder'
		])
    },
    methods: {
    	...mapMutations([
            'RECORD_GOODSINFO','RECORD_BUYORDER'
        ]),
        getAttr(router){
            this.$router.push(router)
            this.RECORD_GOODSINFO(this.goodsInfo);
        },
        getGoodsInfo(){
            //编辑商品获取信息
            get_goods_info(this.$route.query.goodsId).then((res)=>{
                 this.goodsInfo = res.data;
                 this.imgUrl = this.goodsInfo.attachmentUrl;
            })
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
            this.showLoading = true
            if(this.goodsInfo.warehouseStocks){
                this.goodsInfo.warehouseStocks.forEach(element => {
                    element.upLimit = this.upLimit;
                    element.downLimit = this.downLimit;
                });
            }
            // this.goodsInfo.attachmentUrl = this.imgUrl;
            save_goods(this.userId,this.goodsInfo).then((res)=>{
                this.RECORD_GOODSINFO({})
                const warehouseId = this.buyOrder.warehouseId;
                const warehouseName = this.buyOrder.warehouseName;
                const settleAccountId = this.buyOrder.settleAccountId;
                const settleAccountName = this.buyOrder.settleAccountName;
                const supplierId = this.buyOrder.supplierId;
                const supplierName = this.buyOrder.supplierName;
                const customerId = this.buyOrder.customerId;
                const customerName = this.buyOrder.customerName;
                const saleName = this.buyOrder.saleName;
                const saleId = this.buyOrder.saleId;
                const storeId = this.buyOrder.storeId;
                this.RECORD_BUYORDER({
                    warehouseId:warehouseId,
                    warehouseName:warehouseName,
                    settleAccountId:settleAccountId,
                    settleAccountName:settleAccountName,
                    supplierId:supplierId,
                    supplierName:supplierName,
                    saleId:saleId,
                    saleName:saleName,
                    customerName:customerName,
                    customerId:customerId,
                    storeId:storeId
                });
                this.returnBack();
                this.showLoading = false
            }).catch((err)=>{
                this.showTip(err.message);
                this.showLoading = false
            })
        },
        showTip(text){
            this.showAlert = true;
            this.alertText = text;
        },
        async getFile(event) {
            if(event.target.files[0]){
                this.file = event.target.files[0];
                var reg = /^.*\.(?:jpg|png|jpeg|gif)$/i;//文件名可以带空格
                if(!reg.test(this.file.name)){
                    this.file={
                        name:'请选择图片!'
                    }
                    this.showTip(this.file.name)
                    return;
                }else if(this.file.size/1024/1024>2){
                    this.file={
                        name:'文件不能超过2M'
                    }
                    this.showTip(this.file.name)
                    return;
                    
                }
                this.showLoading = true;
                let formData = new FormData();
                formData.append('files',this.file);
                formData.append('type','application/octet-stream');

                fetch(baseUrl+'/api/invoicing/image/file/upload', {
                    method: 'POST',
                    body: formData,
                }).then((res)=>{
                    let resJson = res.json()
                    resJson.then((res2)=>{
                            if(res2.code==200){
                            this.imgUrl = res2.data.path;
                            this.$set(this.goodsInfo,'attachmentUrl',this.imgUrl);
                            this.showLoading = false
                        }else{
                            this.showTip(res2.message)
                            this.showLoading = false
                        }
                    }).catch((err)=>{
                        this.showTip(err.message)
                        this.showLoading = false
                    })
                }).catch((err)=>{
                    this.showTip(err.message)
                    this.showLoading = false
                })
            }
        },
        returnBack(){
            this.$router.push({name:this.$route.query.fromPage2?this.$route.query.fromPage2:this.$route.query.fromPage,query:{
                fromPage:this.$route.query.fromPage?this.$route.query.fromPage:''
            }});
            this.RECORD_GOODSINFO({})
        },
        uploadImage(url,params){
            return new Promise(function (resolve, reject) {
                let formData = new FormData();
                for (var key in params){
                    formData.append(key, params[key]);
                }
                let file = {uri: params.path, type: 'application/octet-stream', name: 'image.jpg'};
                formData.append("file", file);
                fetch(common_url + url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'multipart/form-data;charset=utf-8',
                        "x-access-token": token,
                    },
                    body: formData,
                }).then((response) => response.json())
                    .then((responseData)=> {
                        // console.log('uploadImage', responseData);
                        resolve(responseData);
                    })
                    .catch((err)=> {
                        // console.log('err', err);
                        reject(err);
                    });
            });
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
          img{
              width:1rem;
              height:1rem;
              margin-right:.5rem;
              border:none!important;
          }
            img[src=""],
            img:not([src]) {
                opacity: 0;
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
