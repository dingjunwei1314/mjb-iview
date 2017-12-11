<template>
  <div class="feedmanagement">
    <Row>
      <Table border :columns="columns1" :loading="tableLoading" :data="feedListData"></Table>
    </Row>

    <Modal
      v-model="modalDetail"
      title="Common Modal dialog box title">
      <p slot="header" style="text-align:center">
          <Icon type="information-circled"></Icon>
          <span>问题反馈详情</span>
      </p>
      <div>
          <Row style = "text-align:right">
            <Col span="5">ID：</Col>
            <Col span="19"></Col>
          </Row>
          <Row style = "text-align:right">
            <Col span="5">反馈人：</Col>
            <Col span="19"></Col>
          </Row>
          <Row style = "text-align:right">
            <Col span="5">反馈时间：</Col>
            <Col span="19"></Col>
          </Row>
          <Row style = "text-align:right">
            <Col span="5">反馈内容：</Col>
            <Col span="19"></Col>
          </Row>
      </div>
      <div slot="footer" style="text-align:center">
          <Button type = "primary" @click="close">关闭</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
export default {
  name: 'feedmanagement',
  data () {
    return {
      modalDetail:false,
      tableLoading:false,
      columns1:[
        {
            title: 'ID',
            key: 'id'
        },  
        {
            title: '反馈内容',
            key: 'name'
        },
        {
            title: '反馈时间',
            key: 'address'
        },
        {
            title:'反馈人',
            key:'time'
        },
        {
          title:'操作',
          key:'action',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                    props: {
                        type: 'primary',
                        size: 'small'
                    },
                    style: {
                        marginRight: '5px'
                    },
                    on: {
                        click: () => {
                            this.handle(params,1)
                        }
                    }
                }, '查看'),
                h('Button', {
                    props: {
                        type: 'primary',
                        size: 'small'
                    },
                    on: {
                        click: () => {
                            this.handle(params,2)
                        }
                    }
                }, '删除')
            ]);
          }
        }
      ],
      feedListData:[
        {
          id:1,
          name:'大名楼',
          address:'北京市',
          isf:'是',
          tman:'丁军伟',
          time:'2017-9-1'
        }
      ],
      feedData:{}
    }
  },
  methods: {
    //获取角色列表数据 
    getFeedListData(){
      let _this = this;
      this.tableLoading = true;
      this.$http('/role/getAllRole').then((res) => {
        _this.tableLoading = false;
        if(res.data.code === '200'){
          if(res.data.interfaceStatus === '启用'){
            if(res.data.response.status === '000'){
              _this.feedListData = res.data.response.data
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
        _this.tableLoading = false;
        _this.$Message.warning('网络请求失败')
      })
    },
    //关闭模态框
    close(){
      this.modalDetail = false;
    },
    //操作
    handle(params,type){
      console.log(params)
      let _this = this;
      if(type == 1){
        let body = {
          id:params.row.id,
        };
        this.$http('',{body},{},{},'post').then( (res) => {
          if(res.data.code == 0){
            if(res.data.response.status == 1){
              _this.feedData = res.data.response;
              _this.modalDetail = true;
            }
          }else{
            this.$Message.warning('删除失败');
          }
        }).catch( (err) => {
          console.log(err);
          this.$Message.error('服务器异常');
        })
      }else{
        this.$Modal.confirm({
          content:'确认删除吗？',
          onOk(){
            let body = {
              id:params.row.id,
              delete:1
            };
            this.$http('',{body},{},{},'post').then( (res) => {
              if(res.data.code == 0){
                if(res.data.response.status == 1){
                  _this.$Message.success('已删除');
                  _this.getFeedListData()
                }
              }else{
                this.$Message.warning('删除失败');
              }
            }).catch( (err) => {
              console.log(err);
              this.$Message.error('服务器异常');
            })
          }
        })
      }
    }
  },
  created(){
    this.$store.dispatch('secondLevelAction','账户管理')
    this.$store.dispatch('threeLevelAction','问题反馈')
    this.$store.dispatch('secondRouteAction','/index/feedbackmanagement')
    this.$store.dispatch('activeNameAction','/index/feedbackmanagement')
    this.$store.dispatch('openNamesAction',['6'])
  }
}
</script>

<style scoped>
  
</style>
