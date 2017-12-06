<template>
  <div class="rolemanagement" style="border:1px solid #ccc">
    <Row>
      <Form ref="formInline" :model="form" :label-width="80" style="width:300px;margin:30px auto 0px" :rules="ruleInline">
        <FormItem label="原密码" prop="oldPassWord">
          <Input v-model="form.oldPassWord" type="password"></Input>
        </FormItem>
        <FormItem label="新密码" prop="newPassWordOnce">
          <Input v-model="form.newPassWordOnce" type="password"></Input>
        </FormItem>
        <FormItem label="确认密码" prop="newPassWord">
          <Input v-model="form.newPassWord" type="password"></Input>
        </FormItem>
        <FormItem>
            <Button type="primary" @click ="submit('formInline')">保存</Button>
            <Button type="ghost" style="margin-left: 8px" @click = "reset">重置</Button>
        </FormItem>
      </Form>
    </Row>
  </div>
</template>
<script>
export default {
  name: 'rolemanagement',
  data () {
    const validatePassCheck = (rule, value, callback) => {
      if (value === '') {
          callback(new Error('请再次输入密码'));
      } else if (value !== this.form.newPassWordOnce) {
          callback(new Error('两次输入的密码不一致!'));
      } else {
          callback();
      }
    };
    return {
      form:{
        oldPassWord:'',
        newPassWordOnce:'',
        newPassWord:''
      },
      ruleInline: {
        oldPassWord: [
            { required: true, min:6 , message: '密码为6-16位字符', trigger: 'blur' }
        ],
        newPassWordOnce: [
            { required: true, min:6 , message: '密码为6-16位字符', trigger: 'blur' },
        ],
        newPassWord: [
            {required: true, validator: validatePassCheck, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    //保存
    submit(name){
      let _this = this;
      this.$refs[name].validate((valid) => {
        if (valid) {
          _this.$Modal.confirm({
            content:'确认修改吗？',
            onOk(){
              let body = _.cloneDeep(_this.form);
              if(body.oldPassWord === body.newPassWord){
                _this.$Message.warning('新密码与旧密码一致');
                return;
              }
              delete body.oldPassWord;
              delete body.newPassWordOnce;
              body.userName = localStorage.userName;

              _this.$http('/user/modifyPassword',{},body,{}).then((res) => {
                if(res.data.code === '200'){
                  if(res.data.interfaceStatus === '启用'){
                    if(res.data.response.status === '000'){
                      _this.$Message.success(res.data.response.message)
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
        }
      })
    },
    //操作
    reset(){
      for(var i in this.form){
        this.form[i] = ''
      }
    }
  },
  created(){
    this.form.oldPassWord = localStorage.passWord;
    this.$store.dispatch('secondLevelAction','账户管理')
    this.$store.dispatch('threeLevelAction','账户密码')
    this.$store.dispatch('secondRouteAction','/index/accountmanagement')
    this.$store.dispatch('activeNameAction','/index/accountmanagement')
    this.$store.dispatch('openNamesAction',['6'])
  }
}
</script>

<style scoped>
  
</style>
