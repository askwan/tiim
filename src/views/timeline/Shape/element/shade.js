export default context => {
  return target => {
    let radius = 4
    const update = (list)=> {
      
      let shadeRect = target.selectAll('.shade-rect').data(list);
      shadeRect.enter().append('rect')
      .classed('rect-bg',true)
      .classed('animate',true)
      .attr('height',context.config.targetHeight)
      .attr('rx',radius)
      .attr('ry',radius)
      .attr('y',0)
      .merge(shadeRect)
      .attr('x',(d)=>{
        let width = context.getWidth(d);
        return -width;
      })
      .attr('width',(d)=>{
        let width = context.getWidth(d);
        return width;
      })
    }

    // context.on('select',d=>{
    //   console.log(d.data,'dd');

    // })


  }
}