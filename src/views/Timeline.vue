<template>
  <div class="timeline-root">
    <div id="timeline"></div>
    <button @click="button">button</button>
  </div>
</template>
<script>
import Timeline from "./timeline/Timeline.js";
import axios from 'axios'
let timeline;


export default {
  data() {
    return {};
  },
  props: {},
  components: {},
  computed: {},
  mounted() {
    // this.initTimeLine();
    this.query('./data.json');

  },
  methods: {
    initTimeLine() {
      
    },
    async query(){

      let res = await axios.get('./data.json');

      let list = res.data.data.list;

      let options = {
        container:'#timeline',
        // groupHeight:200,
        // targetHeight:80,
        data:list,
        posiDate:new Date(2018,6,1)
      };
      timeline = new Timeline(options,()=>{
        console.log('ready')
      });
      // timeline.on('change',(data)=>{
      //     console.log(data.domain);
      //     console.log(data.domain[0].toString())
      // });
      timeline.on('select',d=>{
          // console.log(d);
      });

    },
    button(){
      // axios.get('./eg.json').then(res=>{
      //   // console.log(res.data.data,'res');
      //   timeline.reset(res.data.data.list);
      // })
      timeline.zoomTo(new Date(2019,1,1));
      // timeline.resetData()
    }
  }
};



</script>
<style lang='scss' scoped>
.timeline-root {
  // height: 800px;
}
#timeline {
  height: 500px;
  width: 100%;
  border: 1px solid #eee;
  overflow: hidden;
}
</style>