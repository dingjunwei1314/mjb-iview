<template>
    <div class="layout-breadcrumb">
      <Breadcrumb>
          <BreadcrumbItem href="#">首页</BreadcrumbItem>
          <BreadcrumbItem :href="secondRoute">{{secondLevel}}</BreadcrumbItem>
          <BreadcrumbItem>{{threeLevel}}</BreadcrumbItem>
      </Breadcrumb>
    </div>
</template>

<script>

export default {
	name:'Index',
	components:{
		
	},
  data () {
      return {

      }
  },
  computed: {
    secondLevel:function(){
      return this.$store.getters.GetSecondLevel
    },
    threeLevel:function(){
      return this.$store.getters.GetThreeLevel
    },
    secondRoute:function(){
      return this.$store.getters.GetSecondRoute
    }
  },
  methods: {
    
  }
}
</script>

<style scoped>

</style>
