<template>
  <div class="Login">
    <Card  class="login-card">
      <Row>
        <Col span="12">
         <!-- <p class="images"><img src="../../assets/u167.png"></p> -->
          <p class="title">全流程监控数据信息管理系统</p>
          <p class="copy">v1.0</p>
        </Col>
        <Col span="12">
          <Form ref="formInline" :model="formInline" :rules="ruleInline">
            <FormItem prop="userName">
                <Input type="text" v-model="formInline.userName" placeholder="Username">
                    <Icon type="ios-person-outline" slot="prepend"></Icon>
                </Input>
            </FormItem>
            <FormItem prop="contactNumber">
                <Input type="password" v-model="formInline.contactNumber" placeholder="Password">
                    <Icon type="ios-locked-outline" slot="prepend"></Icon>
                </Input>

            </FormItem>
            <FormItem prop="code" style="position:relative">
                <Input type="text" v-model="formInline.code" style="width:200px;" placeholder="Code">
                </Input>
                <span class="code" @click="changeCode">
                  <i>{{code}}</i>
                </span>
            </FormItem>
            <FormItem>
                <Button type="primary" @click="handleSubmit('formInline')">登陆</Button>
                <Button type="ghost" @click="reset">重置</Button>
            </FormItem>
          </Form>
          <p>版权所有：北京买家帮网络科技有限公司</p>
        </Col>
      </Row>
    </Card>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    const validateCode = (rule, value, callback) => {
      if (value === '') {
          callback(new Error('请输入验证码'));
      } else if (value != this.code) {
          callback(new Error('验证码错误'));
      } else {
          callback();
      }
    };
    return {
      code:'',
      formInline:{
        userName:'',
        contactNumber:'',
        code:''
      },
      ruleInline: {
          userName: [
              { required: true, message: '请输入账户', trigger: 'blur' }
          ],
          contactNumber: [
              { required: true, message: '请输入密码', trigger: 'blur' },
              { type: 'string', min: 6, max:16, message: '密码为6-16位字符', trigger: 'blur' }
          ],
          code:[
              { required: true, validator: validateCode, trigger: 'blur' }
          ]
      }
    }
  },
  created(){
    this.getCode()
  },
  methods: {
    //登陆
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          let _this = this,
          body = _.cloneDeep(this.formInline);
          delete body.code;
          this.$http('/user/login',{},body,{}).then((res) => {
            if(res.data.code === '200'){
              if(res.data.interfaceStatus === '启用'){
                if(res.data.response.status === '000'){
                  localStorage.token = res.data.response.data.token;
                  localStorage.userName = res.data.response.data.userName;
                  localStorage.passWord = res.data.response.data.passWord;
                  _this.$router.push('/index/rolemanagement')
                }else{
                  _this.$Message.warning(res.data.response.message)
                }
              }else{
                _this.$Message.warning('接口维护中')
              }
            }else{
              _this.$Message.warning(res.data.message)
            }
          }).catch(err => {
            console.log(err)
            _this.$Message.warning('网络请求失败')
          })
        }
      })
    },
    //获取验证码
    getCode(){
      let _this = this;
      this.$http('/user/getCode').then((res) => {
        if(res.data.code === '200'){
          if(res.data.interfaceStatus === '启用'){
            if(res.data.response.status === '000'){
              _this.code = res.data.response.data
            }else{
              _this.$Message.warning(res.data.response.message)
            }
          }else{
            _this.$Message.warning('接口维护中')
          }
        }else{
          _this.$Message.warning(res.data.message)
        }
      }).catch(err => {
        console.log(err)
        _this.$Message.warning('网络请求失败')
      })
    },
    //重置
    reset(){
      this.formInline.userName = '';
      this.formInline.contactNumber = '';
      this.formInline.code = '';
    },
    //重新获取验证码
    changeCode(){
      this.getCode()
    }
  }
}
</script>

<style scoped>
  .Login{
    height: 100%;
    background: #464c5b;
  }
  .login-card{
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -320px;
    margin-top: -200px;
    width:640px;
    padding: 30px;

  }
  .title{
     margin-top: 70px;
     font-size:16px;
  }
  .copy{
     margin-top: 20px;
  }
  .images{
     margin-top: 20px;
  }
  .copy,.title,.images{text-align: center;}
  .code{cursor:pointer;width:50px;height:32px;vertical-align:center;background:#2b85e4;text-align: center;line-height: 32px;color: #313131;font-weight: bold;letter-spacing:2px;position: absolute;right: 0;top: 0}
</style>
