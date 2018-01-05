<template>
    <div class="main">
    	<head-top goBack="" :headTitle="$route.query.employeeId?'编辑员工':'添加员工'">
            <!-- <div slot="right" >
                <span class="save" @click="saveWorker">保存</span>
            </div> -->
            <div slot="back" class="goback" @click="$router.push({name:'worker'})" >
                <span class="iconfont icon-fanhui title_text"></span>
            </div>
    	</head-top>

        <div class="cneter-con paddingTop">
            <div class="list">
                <em class="required">*</em>
                <span>账号</span>
                <input type="text" maxlength="16" placeholder="由数字或字母组成，用于员工登录" v-model="worker.account">
            </div>
            <div class="list">
                <em class="required">*</em>
                <span>姓名</span>
                <input type="text" placeholder="请输入姓名" v-model="worker.employeeName">
            </div>
            <div class="list">
                <em class="required">*</em>
                <span>电话</span>
                <input type="text" placeholder="请输入联系电话" v-model="worker.mobile">
            </div>
            <div class="list" @click="goStore">
                <em class="required">*</em>
                <span>门店</span>
                <em class="store-name ellipsis">
                    <i v-for="store in worker.storeIds">{{store.storeName}}，</i> 
                </em>
                <em class="list-option iconfont icon-qianjin"></em>
            </div>
            <div class="list" v-if="!employeeId">
                <em class="required">*</em>
                <span>密码</span>
                <input type="password" placeholder="请输入密码" v-model="worker.password">
            </div>
            <div class="list" v-if="!employeeId">
                <em class="required">*</em>
                <span>确认密码</span>
                <input type="password" placeholder="请输入确认密码" v-model="secondPwd">
            </div>
            <div class="list" @click="worker.status==0?worker.status=1:worker.status=0">
                <span>账户是否启用</span>
                <em class="user-satus list-option iconfont " :class="{'icon-radio-checked':worker.status==1,'icon-danxuanweizhong':worker.status==0}"></em>
            </div>
            <div class="list">
                <span>性别</span>
                <em class='list-option sex-con'>
                    <i class="iconfont " :class="{'icon-radio-checked':worker.sex==1,'icon-danxuanweizhong':worker.sex==0}" @click="worker.sex=1">男</i>
                    <i class="iconfont " :class="{'icon-radio-checked':worker.sex==0,'icon-danxuanweizhong':worker.sex==1}" @click="worker.sex=0">女</i>
                </em>
            </div>
            <div class="list worker-name">
                <span>年龄</span>
                <input type="number" placeholder="请输入年龄" v-model="worker.age">
            </div>
            
            <div class=" memo">
                <span>备注</span><br>
                <textarea placeholder="请输入备注信息" v-model="worker.memo"></textarea>
            </div>
            <p class="role-tit">所属角色</p>
            <div class="role-list">
                <div class="role" v-for="role in roleList" @click="role.selected?role.selected=false:role.selected=true">
                    <em class="iconfont" :class="{'icon-radio-checked':role.selected,'icon-danxuanweizhong':!role.selected}"></em>
                    <span>{{role.roleName}}</span>
                </div>
            </div>
        </div>
        <div class="bottom"  @click="saveWorker">
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
import alertTip from '../../components/common/alertTip'
import {worker_handel,get_rolelist,get_employee} from 'src/service/getData'
import headTop from 'src/components/header/head';
import {omit} from 'lodash'
import md5 from "blueimp-md5"
import loading from 'src/components/common/loading'

export default {
	data(){
        return {
            worker:{},
            userId:getStore('userInfo').id,
            alertText:null,
            showAlert:false,
            secondPwd:null,
            roleList:null,
            employeeId:null,
            showLoading:false
        }
    },
    created(){
        this.$set(this.worker,'status',1)
        this.$set(this.worker,'sex',1)
        this.getRoleList();
        if(this.$route.query.employeeId &&!this.$route.query.worker){
            //编辑员工，获取员工信息
            this.employeeId = this.$route.query.employeeId;
            this.getEmployee()
        }else if(this.$route.query.employeeId && this.$route.query.worker){
            //编辑员工(从store返回)
            this.employeeId = this.$route.query.employeeId;
            this.worker = JSON.parse(this.$route.query.worker);
            this.$set(this.worker,'storeIds', JSON.parse(this.$route.query.storeIds))
            this.secondPwd = this.worker.secondPwd;
            // this.worker = this.$route.query.worker;
        }else if(!this.$route.query.employeeId && this.$route.query.worker){
            this.worker = JSON.parse(this.$route.query.worker);
            this.$set(this.worker,'storeIds', JSON.parse(this.$route.query.storeIds));
            this.secondPwd = this.worker.secondPwd;
            //获取员工角色列表
            this.getRoleList();
        }
    },
    mounted(){

    },
    components: {
    	headTop,alertTip,loading
    },
    computed: {
		...mapState([
			'headTitle'
		])
    },
    methods: {
    	...mapMutations([
            
    	]),
        showTip(text){
            this.showAlert = true;
            this.alertText = text
        },
        getEmployee(){
            this.showLoading = true
            get_employee(this.userId,this.employeeId).then((res)=>{
                this.worker = res.data;
                this.worker.storeIds = [];
                this.roleList = res.data.roleVos;
                this.worker.storeVos.forEach(el=>{
                    if(el.selected){
                        this.worker.storeIds.push({
                            id:el.storeId,
                            storeName:el.storeName
                        })
                    }
                })
                this.showLoading = false
                // this.worker.storeIds = this.worker.storeVos;
            }).catch((err)=>{
                this.showTip(err.message)
                this.showLoading = false
            })
        },
        goStore(){
            this.worker.secondPwd = this.secondPwd
            this.$router.push(
                {
                    name:'store',
                    query:{
                        'getStore':true,
                        'worker':JSON.stringify(this.worker),
                        'employeeId':this.employeeId
                    }
                })
        },
        async saveWorker(){
            if(!this.worker.account){
               this.showTip('请输入账号！');
               return;
            }else{
                let reg = new RegExp(/^[a-z0-9]{6,16}$/);
                if(!reg.test(this.worker.account)){
                    this.showTip('账号为6-16位的数字或字母');
                    return;
                }
            }
            if(!this.worker.employeeName){
               this.showTip('请输入姓名！');
               return;
            }
            if(!this.worker.password){
               this.showTip('请输入密码！');
               return;
            }
            let newsStore = []
            if(this.worker.storeIds){
                this.worker.storeIds.forEach(el=>{
                    newsStore.push(el.id)
                });
                this.worker.storeIds = newsStore;
            }else{
                this.showTip('请选择门店！');
                return;
            }
            
            if(!this.employeeId){
                if(!this.secondPwd){
                    this.showTip('请输入确认密码！');
                    return;
                }
                if(this.worker.password!==this.secondPwd){
                    this.showTip('两次输入密码不一致！');
                    return;
                }else{
                    this.worker.password = md5(this.secondPwd)
                }
            }
            this.showLoading = true
            
            this.worker.roles =  this.roleList
            // this.roleList.forEach(el=>{
            //     if(el.selected){
            //         this.worker.roles.push(el.id)
            //     }
            // });
            worker_handel(this.userId,this.worker).then((res)=>{
                this.$router.push({name:"worker"})
                this.showLoading = false
            }).catch((err)=>{
                this.alertText = err.message;
                this.showAlert = true;
                this.showLoading = false
            })
        },
        getRoleList(){
            get_rolelist(this.userId).then((res)=>{
                this.roleList = res.data;
                this.roleList.forEach(element => {
                    this.$set(element,'selected',false)
                });
            }).catch((err)=>{
                this.alertText = err.message;
                this.showAlert = true;
            })
        }
    },
    watch: {

    }
}

</script>

<style lang="scss" scoped>
    @import 'src/style/mixin';
    .cneter-con{
        margin-bottom:1rem;
        .list{
            span{
                left:.4rem;
                position: absolute;
                // display: inline-block;
            }
            input{
                padding-left:15%;
                @include wh(95%,96%);
                background: #fff;
                text-align: right;
            }
            .required{
                @include ct;
                left:0.1rem;
            }
            .sex-con{
                i{
                    color:$green;
                }
            }
            .store-name{
                display: inline;
                width:50%;
                position: absolute;
                left:30%;
                line-height:1rem;
                color:$line_detail;
                i{
                    @include sc(.28rem,$line_detail)
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
    .right{
        width:20%;
        text-align: center;
        .save{
            font-size:.28rem;
            color:#444;
        }
    }
    .worker-name{
        margin-bottom: .1rem;
    }
    .user-satus{
        @include sc(.4rem,$green)
    }
    .memo{
        @include wh(100%,2.5rem);
        background: #fff;
        margin-bottom: .3rem;
        padding:.4rem;
        textarea{
            padding:.2rem 0;
            width:100%;
            resize: none;
        }
    }
    .role-tit{
        padding: 0 0 .3rem .4rem;
    }
    .role-list{
        background: #fff;
        padding:.5rem .6rem;
        overflow: hidden;
        height:auto;
        .role{
            width:50%;
            height:auto;
            float: left;
            padding-bottom: .33rem;
            em{
                @include sc(.35rem,$green)
            }
        }
    }
    .head_goback{
        left: 0.259rem;
        @include wh(0.6rem, 0.88rem);
        line-height: 0.88rem;
        margin-left: .2rem;
    }
    .goback{
        @include wh(.6rem,100%);
        text-align:center;
    }
    

</style>
