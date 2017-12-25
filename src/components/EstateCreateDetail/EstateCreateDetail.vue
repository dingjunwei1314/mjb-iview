<template>
  <div class="estateCreateDetail">
    <Row style="border:1px solid #ccc;padding:20px">
      <h4 style="margin-left:20px">当前楼盘名称：普华浅水湾</h4>
      <p class="tit-lab">
        基础信息
      </p>
      <Form style="padding-left:20px" :label-width="150">
        <FormItem prop="user" label="楼盘名称：">
          <Input v-model="form.buildname" placeholder="" style="width: 300px" v-if="type === 'edit'"></Input>
          <p v-else>

          </p>
        </FormItem>
        <FormItem prop="user" label="楼盘规划期数：">
          <Select v-model="form.buildperiods" size="small" style="width:100px" v-if="type === 'edit'">
            <Option v-for="item in periodsList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
          <p v-else>

          </p>
        </FormItem>
        <FormItem prop="user" label="楼幢数量：">
          <Select v-model="form.buildnum" size="small" style="width:100px" v-if="type === 'edit'">
            <Option v-for="item in 50" :value="item" :key="item">{{ item }}</Option>
          </Select>
          <p v-else>

          </p>
        </FormItem>
        <FormItem prop="user" label="所在地区：">

        </FormItem>
        <FormItem prop="user" label="梯户比：">

        </FormItem>
        <FormItem prop="user" label="最高层数：">
          <Select v-model="form.buildnumlist" size="small" style="width:100px" v-if="type === 'edit'">
            <Option v-for="item in 50" :value="item" :key="item">{{ item }}</Option>
          </Select>
          <p v-else>

          </p>
        </FormItem>
        <FormItem prop="user" label="备注信息：">
          <Input v-model="form.buildmessage" placeholder="" type="textarea" :autosize="true" style="width:50%" v-if="type === 'edit'"></Input>
          <p v-else>

          </p>
        </FormItem>
        <FormItem prop="user" label="审核：">
          <RadioGroup v-model="form.audit" v-if="type === 'edit'">
            <Radio label="1">审核通过</Radio>
            <Radio label="2">合并楼盘</Radio>
            <Radio label="3">驳回</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem prop="user" label="选择合并楼盘：">

        </FormItem>
        <FormItem prop="user" label="楼盘照片量：">

        </FormItem>
        <FormItem prop="user" label="楼盘创建人：">

        </FormItem>
        <FormItem prop="user" label="楼盘创建时间：">

        </FormItem>
        <FormItem v-if="type === 'edit'">
          <Button type="primary"  @click="submit">保存</Button>
          <Button type="primary"  @click="back">取消</Button>
        </FormItem>
      </Form>
      <Spin size="large" fix v-if="spinShow"></Spin>
    </Row>
  </div>
</template>
<script>
export default {
  name: 'estateCreateDetail',
  data () {
    return {
      spinShow:false,
      periodsList:[
        {value:'1',label:'一期'},
        {value:'2',label:'二期'},
        {value:'3',label:'三期'},
        {value:'4',label:'四期'},
        {value:'5',label:'五期'},
        {value:'6',label:'六期'},
        {value:'7',label:'七期'},
        {value:'8',label:'八期'},
        {value:'9',label:'九期'},
        {value:'10',label:'十期'},
      ],
     towerList:[
            /*{value: '1', label2: '1'},
            {value: '2', label2: '2'},
            {value: '3', label2: '3'},
            {value: '4', label2: '4'},
            {value: '5', label2: '5'},
            {value: '6', label2: '6'},
            {value: '7', label2: '7'},
            {value: '8', label2: '8'},
            {value: '9', label2: '9'},
            {value: '10', label2: '10'},
            {value: '11', label2: '11'},
            {value: '12', label2: '12'},
            {value: '13', label2: '13'},
            {value: '14', label2: '14'},
            {value: '15', label2: '15'},
            {value: '16', label2: '16'},
            {value: '17', label2: '17'},
            {value: '18', label2: '18'},*/
        ],
        numberList:[ ],
        model1: '',
      ladderList:[
        {value:'一梯一户',label:'1'},
        {value:'一梯两户',label:'2'},
        {value:'一梯三户',label:'3'},
        {value:'两梯二户',label:'4'},
        {value:'两梯三户',label:'5'},
        {value:'两梯四户',label:'6'},
        {value:'两梯五户',label:'7'},
        {value:'两梯六户',label:'8'},
        {value:'两梯七户',label:'9'},
        {value:'两梯八户',label:'10'},
        {value:'两梯九户',label:'11'},
        {value:'三梯三户',label:'12'},
        {value:'三梯四户',label:'13'},
        {value:'三梯五户',label:'14'}
      ],
      form:{
        province:'',
        city:'',
        buildingName:'',
        buildname:'',
        buildperiods:'',
        buildnum:'',
        buildnumlist:'',
        buildmessage:'',
        audit:'',
        gb:[]
      },
      acData:{

      },
    }
  },
  created:function(){
     //getnumberList()

  },
  computed:{
    type:function(){
       return this.$route.query.type;
    }
  },
  methods: {
   /*getnumberList(){
          let  numberLists=[];
              for(let i=1;i<=50;i++){
                let obj={};
                obj.value=""+i;
                obj.label3=""+i;
                numberLists.push(obj);
              }
         },*/

    //获取详情数据
    getEstateBasicInfoData(){
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
      let _this = this;
      this.$Modal.confirm({
        content:'确认提交吗？',
        onOk(){
          let body = _.cloneDeep(_this.form);
          _this.spinShow = true;
          this.$http('/user/login',{},body,{}).then((res) => {
            _this.spinShow = false;
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
            _this.spinShow = false;
            _this.$Message.warning('网络请求失败')
          })
        }
      })
    },
    //返回
    back(){
      this.$router.push('/index/estatemanagement')
    }
  },
  created(){
     //this.getnumberList();
     //this.getEstateBasicInfoData();
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
    margin-bottom: 10px
  }
</style>
