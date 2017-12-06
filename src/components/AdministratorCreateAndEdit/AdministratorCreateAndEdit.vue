<template>
  <div class="admanagement">
    <Row type="flex" style="border:1px solid #ccc;padding:20px;margin-bottom:20px">
      <Form  :model="form" :label-width="80" style="width:100%" ref="ruleInline" :rules="ruleInline"> 
        <FormItem label="用户名" prop="userName">
          <Input v-model="form.userName" placeholder="用户名" style="width: 200px"></Input>
        </FormItem>

        <FormItem label="性别">
          <RadioGroup v-model="form.sex">
            <Radio label="1">
              <span>男</span>
            </Radio>
            <Radio label="0">
              <span>女</span>
            </Radio>
          </RadioGroup>
        </FormItem>

        <FormItem label="所在区域">
          <Select 
            style="width:150px"
            v-model="form.province" 
            clearable  
            @change = "provinceChange(form.province)"
            placeholder="省">
            <Option 
              v-for="item in provinceIdsList"
              :key="item.cityId"
              :label="item.cityName"
              :value="item.cityId">
            </Option>
          </Select>

          <Select 
            v-model="form.city" 
            clearable  
            placeholder="市"
            style="width:150px">
            <Option
              v-for="item in cityIdsList"
              :key="item.cityId"
              :label="item.cityName"
              :value="item.cityId">
            </Option>
          </Select>
        </FormItem>

        <FormItem label="所在部门">
          <Select 
            style="width:150px"
            v-model="form.bm">
            <Option label="工程" value="1"></Option>
            <Option label="规划" value="2"></Option>
            <Option label="景观" value="3"></Option>
            <Option label="物业" value="4"></Option>
          </Select>
        </FormItem>

        <FormItem label="密码" prop="newPassWordOnce">
          <Input v-model="form.newPassWordOnce" type="password" style="width: 200px"></Input>
        </FormItem>

        <FormItem label="确认密码" prop="newPassWord">
          <Input v-model="form.newPassWord" type="password" style="width: 200px"></Input>
        </FormItem>

        <FormItem label="角色分配">
          <Select 
            style="width:150px"
            v-model="form.gl">
            <Option label="超级管理员" value="1"></Option>
            <Option label="普通管理员" value="2"></Option>
          </Select>
        </FormItem>

        <FormItem label="设备ID">
          <Input v-model="form.sb" type="password" style="width: 200px"></Input>
        </FormItem>

        <FormItem label="备注">
          <Input v-model="form.bz" type="textarea" :rows="6" style="width:600px" :autosize = "true"></Input>
        </FormItem>


        <FormItem>
          <Button type="primary"  @click="submit('ruleInline')">保存</Button>
          <Button type="primary"  @click="back">取消</Button>
        </FormItem>
      </Form>
    </Row>
  </div>
</template>
<script>
export default {
  name: 'admanagement',
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
      provinceIdsList:[],
      cityIdsList:[],
      ruleInline:{
        userName: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        newPassWordOnce: [
            { required: true, min:6 , message: '密码为6-16位字符', trigger: 'blur' },
        ],
        newPassWord: [
            {required: true, validator: validatePassCheck, trigger: 'blur' }
        ]
      },
      form:{
        userName:'',
        sex:'1',
        province:'',
        city:'',
        bm:'1',
        newPassWordOnce:'',
        newPassWord:'',
        gl:'1',
        sb:'',
        bz:''
      },
    }
  },
  methods: {
    //获取数据
    getAdData(){
      let body = {id:this.$route.query.id};
      this.$http(url,{},body,{}).then((res) => {
        if(res.data.code === '200'){
          if(res.data.interfaceStatus === '启用'){
            if(res.data.response.status === '000'){
              _this.form = res.data.response.data;  
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
    //省市联动
    provinceChange(parentid){
      this.getProCityData(2,parentid)
    },
    //获取省数据
    getProCityData(pramas,parentid = 9999){
      let _this=this;
      let body = '';
      if(pramas == 1){
          body = {cityType:1}
      }else{
          body = {cityType:2,parentid:parentid}
      }
      _this.$http('/citis/cityLists',{body},{},{},'post').then(function(res){
         
        if(res.data.code==0){
     
          if(pramas == 1){
            _this.provinceIdsList = res.data.response.cityList
          }else{
            _this.form.city = '';
            _this.cityIdsList = res.data.response.cityList
          }
                
        }else if(res.data.code == 300){
          _this.$router.push('/login')
        }else{
          message(_this,res.data.message,'warning')
        }

      }).catch(function(err){
        console.log(err)
      })   
    },
    //返回
    back(){
      this.$router.push('/index/administratorsmanagement')
    },
    //操作
    submit(name){
      let _this = this;
      this.$refs[name].validate((valid) => {
        if (valid) {
          _this.$Modal.confirm({
            content:'确认提交吗？',
            onOk(){
              let body = _.cloneDeep(_this.form),url;
              if(_this.$route.query.type == 'create'){
                url = ''
              }else{
                url = ''
              }
              delete body.newPassWordOnce;
              this.$http(url,{},body,{}).then((res) => {
                if(res.data.code === '200'){
                  if(res.data.interfaceStatus === '启用'){
                    if(res.data.response.status === '000'){
                      _this.$Message.success('提交成功')
                      _this.$router.push('/index/administratorsmanagement')    
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
  },
  created(){
    this.$store.dispatch('secondLevelAction','账户管理')
    if(this.$route.query.type == 'create'){
      this.$store.dispatch('threeLevelAction','新建管理员')
    }else{
      this.$store.dispatch('threeLevelAction','编辑管理员')
    }
    
    this.$store.dispatch('secondRouteAction','/index/administratorsmanagement')
    this.$store.dispatch('activeNameAction','/index/administratorsmanagement')
    this.$store.dispatch('openNamesAction',['6'])
  }
}
</script>

<style scoped>
  
</style>
