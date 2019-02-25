
import {scaleTime as d3_scaleTime} from 'd3-scale';
import {axisBottom as d3_axisBottom,axisTop as d3_axisTop} from 'd3-axis';
import {timeFormat as d3_timeFormat} from 'd3-time-format'
import {event as d3_event} from 'd3-selection'
import {zoom as d3_zoom} from 'd3-zoom'

export default context => {
  return svg =>{

    let domain = context.state.domain;
    context._x = d3_scaleTime()
      .domain(domain)
      .range([context.config.groupWidth,context.config.width]);
    let xAxis;
    if(context.config.xbottom){
      xAxis = d3_axisBottom(context._x)
        .tickSize(-context.config.height).ticks(context.config.tick)
    }else{
      xAxis = d3_axisTop(context._x)
        .tickFormat(d3_timeFormat('%Y-%m-%d'))
        .tickSize(-context.config.height).ticks(context.config.tick)
    }

    const zoomed = ()=>{
      context._t = d3_event.transform.rescaleX(context._x);
      context.state.transform = d3_event.transform;
      let scale = context.state.transform.k
      if(scale<0.5){
        context.state.status = 'msss'
      }else if(scale<1&&scale>=0.5){
        context.state.status = 'bmss';
      }else if(scale>=1&&scale<4){
        context.state.status = 'bbms';
      }else if(scale>=4&&scale<9){
        context.state.status = 'bbbm';
      }else if(scale>=9){
        context.state.status = 'bbbb';
      }
      context.group.select('.x.axis').call(xAxis.scale(context._t))
      context.fire('change',{domain:context._t.domain()});
      for(let name in context.shapes){
        if(typeof context.shapes[name].update==='function') context.shapes[name].update();
      }
      // console.log(d3.event.transform.k);
      // if(d3.event.sourceEvent.type=='mousemove'){
      //   d3.select('.target-group').attr('transform',`translate(0,${d3.event.transform.y})`);
      //   d3.select('.cutline-group').attr('transform',`translate(0,${d3.event.transform.y})`)
      // }

    }
        

    let zoom = d3_zoom()
      // .scaleExtent([0.00001,Number.POSITIVE_INFINITY])
      .scaleExtent([0.1,50])
      .on('zoom',zoomed);

    context.group = svg.append('g')
      .attr('transform',`translate(${context.config.top},${context.config.left})`).call(zoom);
  
    
    context.group.append('rect')
      .attr('class', 'chart-bounds')
      .attr('x', context.config.groupWidth)
      .attr('y', 0)
      .attr('height', context.config.height)
      .attr('fill','rgba(0,0,0,0)')
      .attr('width', context.config.width - context.config.groupWidth)
      .on('click',()=>{
        context.state.currentTarget = null;
        context.fire('select',{data:null});
      })


    let y = context.config.xbottom?context.config.height-context.config.bottom:context.config.bottom;
    let xAxisG =  context.group.append('g')
      // .attr('clip-path', 'url(#chart-content)')
      .attr('class', 'x axis')
      .attr('transform', 'translate(0,' + (y) + ')')
      .call(xAxis);
  
    xAxisG.selectAll('path.domain').attr('fill',"none").attr('stroke','none')

  }
}