<template>
  <div class="rolemanagement">
    <Row>
      <Button type="primary" size="large" style="margin-bottom:20px" @click = "creatRole">创建角色</Button>
      <Table border :columns="columns1" :loading="tableLoading" :data="roleList"></Table>
    </Row>
  </div>
</template>
<script>
export default{
  name: 'rolemanagement',
  data () {
    return {
      tableLoading:false,
      columns1:[
        {
            title: 'ID',
            key: 'id'
        },
        {
            title: '角色名称',
            key: 'rolename'
        },
        {
            title: '备注',
            key: 'roleinfo'
        },
        {
            title:'添加时间',
            key:'createtime'
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
                }, '修改'),
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
      roleList:[
        { id:1 ,rolename:"yy",},

      ],
    }
  },
  methods: {
    //获取角色列表数据
    getRoleListData(){
      let _this = this;
      this.tableLoading = true;
      this.$http('/role/getAllRole').then((res) => {
        _this.tableLoading = false;
        if(res.data.code === '200'){
          if(res.data.interfaceStatus === '启用'){
            if(res.data.response.status === '000'){
              _this.roleList = res.data.response.data
              console.log(res.data.response.data)
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
    //创建角色
    creatRole(){
      this.$router.push({
        path:'/index/acquisitioncreate'
      })
    },
    //操作
    handle(params,type){
      let _this = this;
      if(type == 1){
        this.$router.push({
          path:'/index/acquisitioncreate',
          query:{id:params.row.id}
        })
      }else{
        this.$Modal.confirm({
          content:'确认删除吗？',
          onOk(){
            let body = {
              roleId:params.row.id,
            };
            this.$http('/role/delRole',{},body).then( (res) => {
              if(res.data.code === '200'){
                if(res.data.interfaceStatus === '启用'){
                  if(res.data.response.status == '014'){
                    _this.$Message.success(res.data.response.message)
                    _this.getRoleListData()
                  }else{
                    _this.$Message.warning(res.data.response.message)
                  }
                }else{
                  _this.$Message.warning('接口维护中')
                }
              }else{
                _this.$Message.warning(res.data.message)
              }
            }).catch( (err) => {
              this.tableLoading = false;
              console.log(err);
              this.$Message.error('服务器异常');
            })
          }
        })
      }
    }
  },
  created(){
    this.getRoleListData()
    this.$store.dispatch('secondLevelAction','账户管理')
    this.$store.dispatch('threeLevelAction','角色管理')
    this.$store.dispatch('secondRouteAction','/index/rolemanagement')
    this.$store.dispatch('activeNameAction','/index/rolemanagement')
    this.$store.dispatch('openNamesAction',['6'])
  }
}
</script>

<style scoped>

</style>
