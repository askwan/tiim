export default context => {
    return group =>{
        let currentDate = new Date();

        let cilpLine = group.append('g')
            .attr('clip-path', 'url(#chart-content)')
        
        let line = cilpLine.append('line')
            .classed('current-time',true)
            
            .attr('y1',context.config.bottom)
            .attr('y2',context.config.boxHeight)
            .attr('stroke-width',2)
            .attr('stroke','#f00');
        const update = ()=>{
            let fn = context._t ||context._x;
            line.attr('x1',fn(currentDate))
                .attr('x2',fn(currentDate))
        }
        update();
        context.on('change',()=>{
            update();
        })
        context.on('reset',()=>{
             line.attr('y1',context.config.bottom)
                 .attr('y2',context.config.boxHeight)
        })
    }
}