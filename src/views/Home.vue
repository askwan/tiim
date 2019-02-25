<template>
  <div class="hello">
    hello
    <input type="text" v-model="value">
    <button @click="save">save</button>
  </div>
</template>
<script>
  import Psde from '@/psde';
  let sobject;
  export default {
    data(){
      return {
        value:''
      }
    },
    props:{},
    components:{},
    computed:{},
    watch:{
      value(val){
        sobject.modifyAttr({name:val})
      }
    },
    async mounted(){
      localStorage.setItem('token','eyJ1aWQiOjE4OTczLCJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwOi8vd3d3LmJsdWV0aGluay5jbiIsInR5cCI6IkpXVCIsImFsZyI6IkhTMjU2IiwiaWF0IjoxNTUwNzQwMjA0fQ.jWzw34w9HzpuKKZpki8ZNMaBDQxrLhu34uef9_pELgQ')
      let psde = new Psde({
        cache:true
      });
      console.log(psde.objectServer.queryBySobjectId)
      let sobjects = await psde.objectServer.queryBySobjectId('1098510851159232512');
      sobject = sobjects[0];
      // console.log(sobject,'sobject');
      
      // let res = await psde.objectServer.save(sobject);
    },
    methods:{
      save(){
        console.log(sobject);
      }
    }
  }
</script>
<style lang='scss' scoped>

</style>