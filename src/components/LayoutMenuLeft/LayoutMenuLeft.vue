<template>
  <Menu :open-names="openNames" ref="leftMenu" :active-name="activeName" @on-select="route" accordion theme="dark" width="auto">
    <div class="layout-logo-left">
      买家帮
    </div>
    <Submenu name="1">
      <template slot="title">
          <Icon type="ios-person"></Icon>
          个人<span class="layout-text">面板</span>
      </template>
      <MenuItem name="1-1">
          <Icon type="ios-navigate" :size="iconSize"></Icon>
          <span class="layout-text">Option 1</span>
      </MenuItem>
    </Submenu>
    <Submenu name="2">
      <template slot="title">
          <Icon type="ios-keypad"></Icon>
          任务<span class="layout-text">管理</span>
      </template>
      <MenuItem name="/index/acquisitionmanagement">
          <Icon type="ios-navigate" :size="iconSize"></Icon>
          <p class="layout-text">采集任务管理</p>
      </MenuItem>
      <MenuItem name="/index/examinemanagement">
          <Icon type="ios-navigate" :size="iconSize"></Icon>
          <p class="layout-text">审核任务管理</p>
      </MenuItem>
    </Submenu> 
    <Submenu name="3">
      <template slot="title">
          <Icon type="ios-grid-view"></Icon>
          楼盘<span class="layout-text">管理</span>
      </template>
      <MenuItem name="/index/estatemanagement">
          <Icon type="ios-navigate" :size="iconSize"></Icon>
          <p class="layout-text">楼盘信息</p>
      </MenuItem>
      <MenuItem name="/index/examinemanagement">
          <Icon type="ios-navigate" :size="iconSize"></Icon>
          <p class="layout-text">楼盘信息</p>
      </MenuItem>
    </Submenu>
    <Submenu name="4">
      <template slot="title">
          <Icon type="calculator"></Icon>
          评分<span class="layout-text">管理</span>
      </template> 
      <MenuItem name="4-1">
          <Icon type="ios-navigate" :size="iconSize"></Icon>
          <span class="layout-text">Option 1</span>
      </MenuItem>
    </Submenu>
    <Submenu name="5">
      <template slot="title">
          <Icon type="connection-bars"></Icon>
          统计<span class="layout-text">管理</span>
      </template>  
      <MenuItem name="/index/photographstatistics">
          <Icon type="ios-navigate" :size="iconSize"></Icon>
          <p class="layout-text">拍照量统计</p>
      </MenuItem>
      <MenuItem name="/index/auditstatistics">
          <Icon type="ios-navigate" :size="iconSize"></Icon>
          <p class="layout-text">审核量统计</p>
      </MenuItem>
    </Submenu>
    <Submenu name="6">
      <template slot="title">
          <Icon type="chatbubbles"></Icon>
          账户<span class="layout-text">管理</span>
      </template> 
      <MenuItem name="/index/rolemanagement">
          <Icon type="ios-navigate" :size="iconSize"></Icon>
          <p class="layout-text">角色管理</p>
      </MenuItem>
      <MenuItem name="/index/administratorsmanagement">
          <Icon type="ios-navigate" :size="iconSize"></Icon>
          <p class="layout-text">管理员管理</p>
      </MenuItem>
      <MenuItem name="/index/accountmanagement">
          <Icon type="ios-navigate" :size="iconSize"></Icon>
          <p class="layout-text">账号密码</p>
      </MenuItem>
      <MenuItem name="/index/feedbackmanagement">
          <Icon type="ios-navigate" :size="iconSize"></Icon>
          <p class="layout-text">问题反馈</p>
      </MenuItem>
      
    </Submenu>

  </Menu>
</template>

<script>
export default {
    data () { 
      return {
       
      }
    },
    computed: {
      iconSize () {
        return this.spanLeft === 4 ? 14 : 24;
      },
      activeName(){
        return this.$store.getters.GetActiveName
      },
      openNames(){
        return this.$store.getters.GetOpenNames
      }
    },
    watch:{
      'openNames':function(val){
        this.$nextTick(
          function(){
            this.$refs.leftMenu.updateOpened()
          }
          
        )
      }
    },
    methods: {
      route(path){
        this.$router.push({path})
      }
    },
    mounted(){
      
    }
}
</script>

<style scoped>
  
</style>
