export default context=>{
  return target =>{
    let radius = 4;
    
    const update = ()=>{
      let list = context.state.hightLights;


      

      let rectBg = target.selectAll('.rect-bg').data(d=>[d]);
      rectBg.enter().append('rect')
        .classed('rect-bg',true)
        .classed('animate',true)
        .attr('height',context.config.targetHeight)
        .attr('rx',radius)
        .attr('ry',radius)
        .attr('y',0)
        .attr("filter", "url(#box-show)")
        .merge(rectBg)
        // .transition(context.animate())
        .attr('x',(d)=>{

          let width = context.getWidth(d);
          return -width;

        })
        .attr('width',(d)=>{
          let width = context.getWidth(d);
          return width;
        })
        

      rectBg.exit().remove();



      

      

    };
    update();
    
    
  }
}