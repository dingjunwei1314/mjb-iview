<template>
  <div class="admanagement">
    <Row type="flex" style="border:1px solid #ccc;padding:20px;margin-bottom:20px">
      <Form  :model="form" :label-width="80" style="width:100%" ref="ruleInline" :rules="ruleInline"> 
        <FormItem label="角色名称" prop="userName">
          <Input v-model="form.userName" placeholder="角色名称" style="width: 200px"></Input>
        </FormItem>

        <FormItem label="角色权限">
          <Row v-for="(item1,index) in jurisdictionListData" :key="item1.pcname">
            <Row style="background:#eee">
              <Checkbox style="margin-left:10px" v-model="form.itemCheckAll[index].isCheck" @on-change = "selectAll(index)">{{item1.pcname+item1.permission}}</Checkbox>
            </Row>
            <CheckboxGroup v-model="form.itemCheckList[index].checkList" style="padding-left:10px;margin:10px 0px" @on-change = "selectItem(index)">
              <Checkbox v-for="(item2,index2) in item1.permissionColumnConfigList" :key="item2.pcname" :label="item2.id">{{item2.pcname}}</Checkbox>
            </CheckboxGroup>
          </Row>
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
      jurisdictionListData:[

      ],
      configList:[

      ],
      form:{
        userName:'',
        itemCheckAll:[
        
        ],
        itemCheckList:[
           
        ],
        listAll:false,
      },
    }
  },
  methods: {
    //获取权限列表数据 
    getJurisdictionListData(){
      let _this = this;
      
      this.$http('/role/getAllPermissionConfig').then((res) => {
        if(res.data.code === '200'){
          if(res.data.interfaceStatus === '启用'){
            if(res.data.response.status === '000'){
              _this.jurisdictionListData = res.data.response.data;
              
              _this.jurisdictionListData.forEach((item,index) => {
                _this.form.itemCheckAll.push({
                  isCheck:false
                });
                _this.form.itemCheckList.push({
                  checkList:[]
                });
                _this.configList.push({
                  idList:[],
                  pcnameList:[]
                });
                item.permissionColumnConfigList.forEach( (item2,index2) => {
                  _this.configList[index].pcnameList.push(item2.pcname+item2.permission);
                  _this.configList[index].idList.push(item2.id);
                });
              });
              console.log(_this.configList)
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
    //返回
    back(){
      this.$router.push('/index/rolemanagement')
    },
    //全选
    selectAll(index){
      if(this.form.itemCheckAll[index].isCheck){
        this.form.itemCheckList[index].checkList = this.configList[index].idList;
      }else{
        this.form.itemCheckList[index].checkList = [];
      }
      this.checkIsAll()
    },
    //全部全选
    selectsAll(val){
      this.form.itemCheckAll.forEach(item => {
        item.isCheck = val;
      })
      this.form.itemCheckList.forEach((item,index) => {
        if(val){
          item.checkList = this.configList[index].idList;
        }else{
          item.checkList = []
        }
      })
    },
    //单选
    selectItem(index){
      let len1 = this.form.itemCheckList[index].checkList.length,
      len2 = this.configList[index].idList.length;
      this.form.itemCheckAll[index].isCheck = len1 === len2;
      this.checkIsAll()
    },
    //检测是否全选
    checkIsAll(){
      let count = 0;
      this.form.itemCheckAll.forEach(item => {
        if(item.isCheck){
          count++
        }
      })
      this.form.listAll = count == this.form.itemCheckAll.length;
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
    this.getJurisdictionListData();
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
