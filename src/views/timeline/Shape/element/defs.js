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

    let chart = defs.append('clipPath')
      .attr('id', 'chart-content')
      .append('rect')
      .attr('x', context.config.groupWidth)
      .attr('y', 20)
      .attr('height', context.config.boxHeight)
      .attr('width', context.config.width - context.config.groupWidth);

    let culine = defs.append('clipPath')
      .attr('id', 'cutline-content')
      .append('rect')
      .attr('x', 0)
      .attr('y', 20)
      .attr('height', context.config.boxHeight)
      .attr('width', context.config.width - context.config.groupWidth);

    let pattern = defs.selectAll('.pattern-radius').data(list);
    pattern.enter().append('pattern')
      .attr('id',d=>"img-"+d.id)
      .classed('pattern-radius',true)
      .attr('patternUnits','objectBoundingBox')
      .attr('width',20)
      .attr('height',20)
      .append('image')
      .attr('xlink:href',d=>{
        // return 'http://bt1.geosts.ac.cn/api/image/ea3e0180a17dcd7cce2496698a7072a9'
        return d.avatar ? url+d.avatar :url+'69e40dcf53cd73f2dfdd6f56d86f3f99'
      })
      .attr('width',20)
      .attr('height',20)
      .attr('x',0)
      .attr('y',0);

    pattern.exit().remove()


      var filter = defs.append("defs")
        .append("filter")
        .attr("id", "box-show")
        .attr("x", 0)
        .attr("y", 0)
        .attr("width", 1.5)
        .attr("height", 1.5);
      filter.append("feOffset")
        .attr("result", "offOut")
        .attr("in", "SourceAlpha")
        .attr("dx", "-3")
        .attr("dy", "-3");
      filter.append("feGaussianBlur")
        .attr("result", "blurOut")
        .attr("in", "offOut")
        .attr("stdDeviation", 5);
      filter.append("feBlend")
        .attr("in", "SourceGraphic")
        .attr("in2", "blurOut")
        .attr("mode", "normal");

      context.on('reset',()=>{
        chart.attr('height', context.config.boxHeight)
          .attr('width', context.config.width);
  
        culine.attr('height', context.config.boxHeight)
          .attr('width', context.config.width);
      })
      // context.on('reset',()=>{
      //   re
      // })

  }
}