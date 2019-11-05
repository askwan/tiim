export default context => {
    let radius = 4;
    return target =>{
        const update = ()=>{
            let list = context.state.hightLights;
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
                // let index = list.findIndex(el=>el==d.id);
                // return index==-1 ? 0 : 3
                return 3
                }).style('display',d=>{
                    let index = list.findIndex(el=>el==d.id);
                    return index==-1 ? 'none' : 'block'
                })

            borderBg.exit().remove();
        };
        update();
        context.on('hightLight',data=>{
            update()
        })
    }
}