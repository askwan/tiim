export default context=>{
  return target =>{
    let radius = 4;
    
    const update = (list=[])=>{

      let rectBg = target.selectAll('.rect-bg').data(d=>[d]);
      rectBg.enter().append('rect')
        .classed('rect-bg',true)
        .classed('animate',true)
        .attr('height',context.config.targetHeight)
        .attr('rx',radius)
        .attr('ry',radius)
        .attr('y',0)
        .merge(rectBg)
        .attr('x',(d)=>{

          let width = context.getWidth(d);
          return -width;

        })
        .attr('width',(d)=>{
          let width = context.getWidth(d);
          return width;
        })
        

      rectBg.exit().remove();

      let borderBg = target.selectAll('.rect-bg-border').data(d=>[d])
      borderBg.enter().append('rect')
        .classed('rect-bg-border',true)
        .classed('animate',true)
        .attr('height',context.config.targetHeight)
        .attr('rx',radius)
        .attr('ry',radius)
        .attr('y',0)
        .attr('fill','rgba(0,0,0,0)')
        .attr('stroke','red')
        .merge(borderBg)
        .attr('x',d=>{
          let width = context.getWidth(d);
          return -width
        })
        .attr('width',d=>context.getWidth(d))
        .attr('stroke-width',d=>{
          let index = list.findIndex(el=>el==d.id);
          return index==-1 ? 0 : 3
        })

      borderBg.exit().remove();

    };
    update();
    


    // context.on('change',()=>{
    //   update();
    // })
    context.on('hightLight',data=>{
      console.log(data.list,'list')
      update(data.list)
    })
  }
}