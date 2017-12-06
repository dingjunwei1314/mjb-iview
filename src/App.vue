<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app',
}
</script>

<style>
html,body,#app{height: 100%}
body::-webkit-scrollbar-thumb{background: #324157;width: 3px}
body::-webkit-scrollbar-track{background: #ccc;width: 3px}
body::-webkit-scrollbar{width: 5px}
#app::-webkit-scrollbar-thumb{background: #324157;width: 3px}
#app::-webkit-scrollbar-track{background: #ccc;width: 3px}
#app::-webkit-scrollbar{width: 5px}

html::-webkit-scrollbar-thumb{background: #324157;width: 3px}
html::-webkit-scrollbar-track{background: #ccc;width: 3px}
html::-webkit-scrollbar{width: 5px}


body{

-moz-user-select: none; /*火狐*/

-webkit-user-select: none; /*webkit浏览器*/

-ms-user-select: none; /*IE10*/

-khtml-user-select: none; /*早期浏览器*/

user-select: none;

}
</style>
