
export default context => {
  return target=>{
    const update = ()=>{
      let circle = target.selectAll('.target-circle').data(d=>[d])
      circle.enter().append('circle')
        .classed('target-circle',true)
        .attr('cx',0)
        .attr('r',5)
        .attr('cy',0)
        .attr('fill',d=>d.color)
        .on('mouseover',d=>{
          console.log('over')
        })
        .on('mouseout',d=>{
          console.log("out")
        })
        .merge(circle)
        .style('display',(d)=>{
          let width = context.getWidth(d);
          let str = 'inherit';
          if(width>0) str = 'none';
          return str;
        })
        
      circle.exit().remove();

      


    }
    update();

    // context.on('change',()=>{
    //   update();
    // })
  }
}