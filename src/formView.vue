<template>
	<div class="formViewBox">
		<!-- <router-view></router-view> -->
		<p>原生的东西</p>
		<button class="btn" @click = 'clickbtn("呵呵哒")'>我是一个button按钮</button>
		<ul>
			<li>1</li>
			<li>2</li>
			<li>3</li>
		</ul>
		<br>
		<hr>
		<br>
		<h2>下面是一个ElementUI搭建的视图</h2>
		
		<el-button type="primary" >主要按钮</el-button>
		<el-button type="success" >成功按钮</el-button>
		<el-button type="info" >信息按钮</el-button>
		<el-button type="warning" >警告按钮</el-button>
		<el-button type="danger" disabled>危险按钮</el-button>
		<br>
		<br>
		
		<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" id='myForm'>
		  <el-form-item label="活动名称" prop="name">
			<el-input v-model="ruleForm.name"></el-input>
		  </el-form-item>
		  <el-form-item label="活动区域" prop="region">
			<el-select v-model="ruleForm.region" placeholder="请选择活动区域">
			  <el-option label="区域一" value="shanghai"></el-option>
			  <el-option label="区域二" value="beijing"></el-option>
			</el-select>
		  </el-form-item>
		  <el-form-item label="活动时间" required>
			<el-col :span="11">
			  <el-form-item prop="date1">
				<el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date1" style="width: 100%;"></el-date-picker>
			  </el-form-item>
			</el-col>
			<el-col class="line" :span="2">-</el-col>
			<el-col :span="11">
			  <el-form-item prop="date2">
				<el-time-picker placeholder="选择时间" v-model="ruleForm.date2" style="width: 100%;"></el-time-picker>
			  </el-form-item>
			</el-col>
		  </el-form-item>
		  <el-form-item label="即时配送" prop="delivery">
			<el-switch v-model="ruleForm.delivery"></el-switch>
		  </el-form-item>
		  <el-form-item label="活动性质" prop="type">
			<el-checkbox-group v-model="ruleForm.type">
			  <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
			  <el-checkbox label="地推活动" name="type"></el-checkbox>
			  <el-checkbox label="线下主题活动" name="type"></el-checkbox>
			  <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
			</el-checkbox-group>
		  </el-form-item>
		  <el-form-item label="特殊资源" prop="resource">
			<el-radio-group v-model="ruleForm.resource">
			  <el-radio label="线上品牌商赞助"></el-radio>
			  <el-radio label="线下场地免费"></el-radio>
			</el-radio-group>
		  </el-form-item>
		  <el-form-item label="活动形式" prop="desc">
			<el-input type="textarea" v-model="ruleForm.desc"></el-input>
		  </el-form-item>
		  
		  <div class="center_input_box">
			  <el-form-item label="手机" class='spr' prop="phonenum">
				  <el-input v-model="ruleForm.phonenum" placeholder="审批人手机号"></el-input>
			  </el-form-item>
			  <el-form-item label="活动区域" class='huodong'>
				  <el-select v-model="ruleForm.region" placeholder="区域选择">
					  <el-option label="区域一" value="shanghai"></el-option>
					  <el-option label="区域二" value="beijing"></el-option>
				  </el-select>
			  </el-form-item>
		  </div>
		  
		  
		  <el-form-item>
			<el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
			<el-button @click="resetForm('ruleForm')">重置</el-button>
		  </el-form-item>
		</el-form>
		<br>
		<br>
		<hr>
		<p>
			<router-link to='oneNewView'>去一个测试界面</router-link>
			<!-- <button @click="goNextView()" ref='gonext'>gonext</button> -->
		</p>
		
		<!-- <oneNewView></oneNewView> -->
		
	</div>
	
</template>

<script>
	import oneNewView from './oneNewView.vue'
	
	//name: 作用： 只有作为组件选项时起作用。
	/*
	 * https://blog.csdn.net/weixin_39015132/article/details/83573896
	 允许组件模板递归地调用自身。注意，组件在全局用 Vue.component() 注册时，
	 全局 ID 自动作为组件的 name。

	指定 name 选项的另一个好处是便于调试。有名字的组件有更友好的警告信息。
	另外，当在有 vue-devtools，未命名组件将显示成 <AnonymousComponent>，
	这很没有语义。通过提供 name 选项，可以获得更有语义信息的组件树。
	 
	 * 
	 * */
	
	
	var validPhone = (rule, value, callback) => {
		if(!value) {
			return callback(new Error('手机号不能为空'));
		} else {
			const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
			console.log(reg.test(value));
			if(reg.test(value)) {
				callback();
			} else {
				return callback(new Error('请输入正确的手机号'));
			}
		}
	}
	
	export default {
		name:'formView',
		data(){
			return{
				btnmsg:"哈哈哈哈",
				ruleForm: {
				  name: '',
				  region: '',
				  date1: '',
				  date2: '',
				  delivery: false,
				  type: [],
				  resource: '',
				  desc: '',
				  phonenum:'',
				  
				},
				rules: {
				  name: [
					{ required: true, message: '请输入活动名称', trigger: 'blur' },
					{ min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
				  ],
				  region: [
					{ required: true, message: '请选择活动区域', trigger: 'change' }
				  ],
				  date1: [
					{ type: 'date', required: true, message: '请选择日期', trigger: 'change' }
				  ],
				  date2: [
					{ type: 'date', required: true, message: '请选择时间', trigger: 'change' }
				  ],
				  type: [
					{ type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
				  ],
				  resource: [
					{ required: true, message: '请选择活动资源', trigger: 'change' }
				  ],
				  desc: [
					{ required: true, message: '请填写活动形式', trigger: 'blur' }
				  ],
				  phonenum:[
      					{ required: true, trigger: 'blur', validator: validPhone }
      				]
				}
			}
		},
		methods:{
			clickbtn(msg){
				alert("button点击了---"+msg);
			},
			goNextView(){
				
			}
			
		},
		components:{
			oneNewView
		}
		
	}
	
	
	
</script>

<style lang="less">
	.formViewBox{
		margin-bottom: 100px;
	}
	#myForm{
		width: 600px;
		margin: auto;
		.fotmtitle{
			text-align: left;
			margin-left: 10px;
			color: #5daf34;
			font: 700 15px/30px "微软雅黑";
			line-height: 30px;
			text-decoration: underline;
		}
		.el-input{
			width: 520px;
		}
		.line.el-col.el-col-2 {
		    text-align: center;
		}
		.el-form-item__content{
			text-align: left;
		}
		label.el-checkbox{
			margin-right: 10px;
		}
		.el-checkbox__inner,.el-radio__inner{
			border: 1px solid #000000;
		}
		.center_input_box{
			text-align: left;
			font-size: 0;
			.spr,.huodong{
				display: inline-block;
				width: 300px;
				.el-input{
					width: 220px;
				}
			}
		}
		
	}
	
</style>
