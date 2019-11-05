import d3_tip from 'd3-tip'
export default context =>{
  return (svg) =>{
    context.userTip = d3_tip()
      .attr('class','d3-tip')
      .offset([50,0])
      .html((d)=>{
        return `<div class="tip-content">${d.name}</div>`
      })

    svg.call(context.userTip);

    context.progressTip = d3_tip()
      .attr('class','d3-tip')
      .offset([-5,0])
      .html((d)=>`<div class="tip-progress">${d.targetProgress*100}%</div>`)

    svg.call(context.progressTip);

  }
}