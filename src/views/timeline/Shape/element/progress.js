export default context => {
  return target =>{
    const update =  ()=>{
      let progressGroup = target.selectAll('.progress-group').data(d=>[d])
      let updateProgressGroup = progressGroup.enter().append('g')
        .classed('progress-group',true)
        .on('mouseover',context.progressTip.show)
        .on('mouseout',context.progressTip.hide)
        .merge(progressGroup)
        .attr('transform',d=>{
          let width = context.getWidth(d);
          let str = ''
          if(width>0){
            str = `translate(${-width},${context.config.targetHeight-4})`
          }else{
            str = 'translate(-10000,-10000)'
          }
          return str;
        })

      let totalRect = updateProgressGroup.selectAll('.total-rect').data(d=>[d])
      totalRect.enter().append('rect')
        .classed('total-rect',true)
        .attr('fill','rgba(0,0,0,.4)')
        .attr('height',4)
        .merge(totalRect)
        .attr('width',d=>context.getWidth(d))
        
      totalRect.exit().remove();

      let complateRect = updateProgressGroup.selectAll('.complate-rect').data(d=>[d])

      complateRect.enter().append('rect')
        .classed('complate-rect',true)
        .attr('fill','rgb(21,141,239)')
        .attr('width',50)
        .attr('height',4)
        .merge(complateRect)

      complateRect.exit().remove();

      progressGroup.exit().remove();
    }
    update();
    // context.on('change',()=>{
    //   update();
    // })
  }
}