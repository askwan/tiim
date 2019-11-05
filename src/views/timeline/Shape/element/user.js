

export default context => {
  return target =>{
    // console.log(userG,'user');
    let padding = 10;
    let targetHeight = context.config.targetHeight;
    let userGroup = target.selectAll('.target-user-group').data(d=>{
      
      return [d]
    });
    let updateUserGroup = userGroup.enter().append('g')
      .classed('target-user-group',true)
      .merge(userGroup)
      .attr('transform',d=>{
        let width = context.getWidth(d);
        return `translate(${padding-width+66},${padding/2+targetHeight/2-2})`
      })
    let userGroupImage = updateUserGroup.selectAll('.target-user-image').data(d=>{
      let width = context.getWidth(d);
      let list = d.userList;
      // console.log(width,'width')
      if(width==context.config.smallWidth){
        if(d.userList.length>2) list = d.userList.slice(0,2)
      }else if(width==context.config.bigWidth){
        if(d.userList.length>5) list = d.userList.slice(0,5);
      }
      return list
    });
    userGroupImage.enter().append('rect')
      .classed('target-user-image',true)
      .attr('width',20)
      .attr('height',20)
      .attr('x',(d,i)=>i*24)
      .attr('rx',10)
      .attr('ry',10)
      .on('mouseover',context.userTip.show)
      .on('mouseout',context.userTip.hide)
      .merge(userGroupImage)
      .attr('fill',d=>`url(#img-${d.id})`)

    userGroupImage.exit().remove();
    userGroup.exit().remove();
    
  }
}