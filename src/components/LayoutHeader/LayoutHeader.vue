<template>
    <div class="layout-header">
      <Button type="text" @click="toggleClick">
          <Icon type="navicon" size="32"></Icon>
      </Button>
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
    },
    methods: {
      toggleClick () {
        this.$emit('toggleClick')
      }
    }
}
</script>

<style scoped>

</style>
