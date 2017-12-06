<template>
  <div class="acqmana">
    <Row style="border:1px solid #ccc;padding:20px">
      <h4 style="margin-left:20px">当前楼盘名称：普华浅水湾</h4>
      <p class="tit-lab">
        基础信息
      </p>
      <Form style="padding-left:20px" :label-width="150">
        <FormItem prop="user" label="楼盘规划期数：">

        </FormItem>
        <FormItem prop="user" label="楼幢数量：">
          
        </FormItem>
        <FormItem prop="user" label="所在地区：">
          
        </FormItem>
        <FormItem prop="user" label="详细地址：">
          
        </FormItem>
        <FormItem prop="user" label="物业类型：">
          
        </FormItem>
        <FormItem prop="user" label="楼盘来源：">
          
        </FormItem>
        <FormItem prop="user" label="是否严选：">
          
        </FormItem>
        <FormItem prop="user" label="APP上是否上线：">
          
        </FormItem>
        <FormItem prop="user" label="需跟进楼盘：">
          
        </FormItem>
        <FormItem prop="user" label="分配人：">
          
        </FormItem>
      </Form>
      <Row v-if = "$route.query.type == 'edit'">
        <p class="tit-lab">
          编辑操作
        </p>
        <Form style="padding-left:20px" :model="form" :label-width="150">
          <FormItem prop="user" label="指派人员：">

          </FormItem>
          <FormItem>
            <Button type="primary"  @click="submit('ruleInline')">确定</Button>
            <Button type="primary"  @click="back">关闭</Button>
          </FormItem>
        </Form>
      </Row>
      <Spin size="large" fix v-if="spinShow"></Spin>
    </Row>
  </div>
</template>
<script>
export default {
  name: 'acqmana',
  data () {
    return {
      spinShow:false,
      form:{
        province:'',
        city:'',
        buildingName:'',
        gman:'',
        gb:''
      },
      acData:{
    
      },
    }
  },
  methods: {
    //获取详情数据
    getAcData(){
      let _this = this;
      this.spinShow = true;
      this.$http('/role/getAllRole').then((res) => {
        _this.spinShow = false;
        if(res.data.code === '200'){
          if(res.data.interfaceStatus === '启用'){
            if(res.data.response.status === '000'){
              _this.roleList = res.data.response.data
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
        _this.spinShow = false;
        _this.$Message.warning('网络请求失败')
      })
    },
    //提交
    submit(){
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
    //返回
    back(){
      this.$router.push('/index/acquisitionmanagement')
    }
  },
  created(){
    this.getAcData();
    this.$store.dispatch('secondLevelAction','任务管理');
    this.$store.dispatch('threeLevelAction','编辑采集任务管理');
    this.$store.dispatch('secondRouteAction','/index/acquisitionmanagement');
    this.$store.dispatch('activeNameAction','/index/acquisitionmanagement');
    this.$store.dispatch('openNamesAction',['2']);
  }
}
</script>

<style scoped>
  .tit-lab{
    height: 30px;
    line-height: 30px;
    background: #eee;
    padding-left: 22px;
    margin: 20px 0px;
  }
  .ivu-form-item{
    margin-bottom: 0px
  }
</style>
