const url = 'http://bt1.geosts.ac.cn/api/image/';
export default context => {
  return group => {
    let list = [];
    context.config.data.forEach(target=>{
      target.userList.forEach(user=>{
        let aim = list.find(en=>en.id==user.id);
        if(!aim) list.push(user);
      })
    })
    let defs = group.append('defs');

    defs.append('clipPath')
      .attr('id', 'chart-content')
      .append('rect')
      .attr('x', context.config.groupWidth)
      .attr('y', 20)
      .attr('height', context.config.boxHeight)
      .attr('width', context.config.width - context.config.groupWidth);

    defs.append('clipPath')
      .attr('id', 'cutline-content')
      .append('rect')
      .attr('x', 0)
      .attr('y', 20)
      .attr('height', context.config.boxHeight)
      .attr('width', context.config.width - context.config.groupWidth);

    let pattern = defs.selectAll('pattern').data(list);
    pattern.enter().append('pattern')
      .attr('id',d=>"img-"+d.id)
      .attr('patternUnits','objectBoundingBox')
      .attr('width',20)
      .attr('height',20)
      .append('image')
      .attr('xlink:href',d=>{
        return d.avatar ? url+d.avatar :url+'69e40dcf53cd73f2dfdd6f56d86f3f99'
      })
      .attr('width',20)
      .attr('height',20)
      .attr('x',0)
      .attr('y',0)

    

  }
}