<template>
  <div class="admanagement">
    <Row type="flex" style="border:1px solid #ccc;padding:20px;margin-bottom:20px">
      <Form  :model="form" :label-width="80" style="width:100%" ref="ruleInline" :rules="ruleInline"> 
        <FormItem label="角色名称" prop="userName">
          <Input v-model="form.userName" placeholder="角色名称" style="width: 200px"></Input>
        </FormItem>

        <FormItem label="角色权限">
          <Row style="background:#eee">
            <Checkbox style="margin-left:10px" v-model="form.list1All" @on-change = "selectAll(1)">面板管理</Checkbox>
          </Row>
          <CheckboxGroup v-model="form.list1" style="padding-left:10px" @on-change = "selectItem(2,'list1','list1All')">
            <Checkbox label="1">采集照片</Checkbox>
            <Checkbox label="2">审核照片</Checkbox>
          </CheckboxGroup>

          <Row style="background:#eee;margin-top:10px">
            <Checkbox style="margin-left:10px" v-model="form.list2All" @on-change = "selectAll(2)">楼盘管理</Checkbox>
          </Row>
          <CheckboxGroup v-model="form.list2" style="padding-left:10px" @on-change = "selectItem(4,'list2','list2All')">
            <Checkbox label="1">楼盘信息查看</Checkbox>
            <Checkbox label="2">楼盘信息查看、编辑</Checkbox>
            <Checkbox label="3">新增楼盘查看</Checkbox>
            <Checkbox label="4">新增楼盘查看、编辑</Checkbox>
          </CheckboxGroup>

          <Row style="background:#eee;margin-top:10px">
            <Checkbox style="margin-left:10px" v-model="form.list3All" @on-change = "selectAll(3)">任务管理</Checkbox>
          </Row>
          <CheckboxGroup v-model="form.list3" style="padding-left:10px" @on-change = "selectItem(4,'list3','list3All')">
            <Checkbox label="1">采集任务查看</Checkbox>
            <Checkbox label="2">采集任务查看、编辑</Checkbox>
            <Checkbox label="3">审核任务查看</Checkbox>
            <Checkbox label="4">审核任务查看、编辑</Checkbox>
          </CheckboxGroup>

          <Row style="background:#eee;margin-top:10px">
            <Checkbox style="margin-left:10px" v-model="form.list4All" @on-change = "selectAll(4)">评分管理</Checkbox>
          </Row>
          <CheckboxGroup v-model="form.list4" style="padding-left:10px" @on-change = "selectItem(1,'list4','list4All')">
            <Checkbox label="1">评分指标管理</Checkbox>
          </CheckboxGroup> 

          <Row style="background:#eee;margin-top:10px">
            <Checkbox style="margin-left:10px" v-model="form.list5All" @on-change = "selectAll(5)">统计管理</Checkbox>
          </Row>
          <CheckboxGroup v-model="form.list5" style="padding-left:10px" @on-change = "selectItem(2,'list5','list5All')">
            <Checkbox label="1">拍照量统计</Checkbox>
            <Checkbox label="2">审核量统计</Checkbox>
          </CheckboxGroup>

          <Row style="background:#eee;margin-top:10px">
            <Checkbox style="margin-left:10px" v-model="form.list6All" @on-change = "selectAll(6)">账户管理</Checkbox>
          </Row>
          <CheckboxGroup v-model="form.list6" style="padding-left:10px" @on-change = "selectItem(1,'list6','list6All')">
            <Checkbox label="1">账户管理</Checkbox>
          </CheckboxGroup>

          <Row style="background:#eee">
            <Checkbox style="margin-left:10px" v-model="form.listAll" @on-change = "selectsAll">全选</Checkbox>
          </Row>
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
    return {
      ruleInline:{
        userName: [
          { required: true, message: '请输入角色名称', trigger: 'blur' }
        ],
      },
      form:{
        userName:'',
        listAll:false,
        list1All:false,
        list2All:false,
        list3All:false,
        list4All:false,
        list5All:false,
        list6All:false,
        list1:[],
        list2:[],
        list3:[],
        list4:[],
        list5:[],
        list6:[]
      },
    }
  },
  methods: {
    //返回
    back(){
      this.$router.push('/index/rolemanagement')
    },
    //全选
    selectAll(type){
      if(type == 1){
        if(this.form.list1All){
          this.form.list1 = ['1','2']
        }else{
          this.form.list1 = []
        }
      }else if(type == 2){
        if(this.form.list2All){
          this.form.list2 = ['1','2','3','4']
        }else{
          this.form.list2 = []
        }
      }else if(type == 3){
        if(this.form.list3All){
          this.form.list3 = ['1','2','3','4']
        }else{
          this.form.list3 = []
        }
      }else if(type == 4){
        if(this.form.list4All){
          this.form.list4 = ['1']
        }else{
          this.form.list4 = []
        }
      }
      else if(type == 5){
        if(this.form.list5All){
          this.form.list5 = ['1','2']
        }else{
          this.form.list5 = []
        }
      }else{
        if(this.form.list6All){
          this.form.list6 = ['1']
        }else{
          this.form.list6 = []
        }
      }
      this.checkIsAll()
    },
    //全部全选
    selectsAll(val){
      if(val){
        this.form.list1All = true;
        this.form.list2All = true;
        this.form.list3All = true;
        this.form.list4All = true;
        this.form.list5All = true;
        this.form.list6All = true;
        this.form.list1 = ['1','2']
        this.form.list2 = ['1','2','3','4']
        this.form.list3 = ['1','2','3','4']
        this.form.list4 = ['1']
        this.form.list5 = ['1','2']
        this.form.list6 = ['1']
      }else{
        for(var i in this.form){
          if(typeof this.form[i] === 'boolean'){
            this.form[i] = false;
          }else if(typeof this.form[i] === 'object'){
            this.form[i] = [];
          }
        }
      }
    },
    //单选
    selectItem(len,property1,property2){
      if(this.form[property1].length == len){
        this.form[property2] = true;
      }else{
        this.form[property2] = false;
      } 
      this.checkIsAll()
    },
    checkIsAll(){
      if(this.form.list1All && this.form.list2All && this.form.list3All && this.form.list4All && this.form.list5All && this.form.list6All){
        this.form.listAll = true;
      }else{
        this.form.listAll = false;
      }
    },
    //操作
    submit(name){
      let _this = this;
      this.$refs[name].validate((valid) => {
        if (valid) {
          _this.$Modal.confirm({
            content:'确认修改吗？',
            onOk(){
              let body = {
           
              };
              this.$http('/user/login',{},body,{}).then((res) => {
                if(res.data.code === '200'){
                  if(res.data.interfaceStatus === '启用'){
                    if(res.data.response.status === '000'){
                      _this.$Message.success('提交成功')
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
        }
      })
    },
  },
  created(){
    this.$store.dispatch('secondLevelAction','账户管理')
    this.$store.dispatch('threeLevelAction','新建角色')
    this.$store.dispatch('secondRouteAction','/index/rolemanagement')
    this.$store.dispatch('activeNameAction','/index/rolemanagement')
    this.$store.dispatch('openNamesAction',['6'])
  }
}
</script>

<style scoped>
  
</style>
