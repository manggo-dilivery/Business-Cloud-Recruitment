<template>
    <mt-header fixed :title='title'>
        <router-link to="/" slot="left">
            <mt-button @click.native="handleClick" icon="back"></mt-button>
        </router-link>
    </mt-header>
</template>

<script>
  export default {
    name: "topNav",
    props:['title'],
    methods:{
      handleClick(){
        this.$router.go('-1')
      }
    }
  }
</script>

<style scoped>

</style>
