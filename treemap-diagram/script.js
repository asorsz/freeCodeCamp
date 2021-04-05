d3.json('https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/video-game-sales-data.json', (d) => {
  const canvasWidth = 1200;
  const canvasHeight = 850;
  const margin = { top: 20, right: 20, bottom: 60, left: 20 };
  const plotWidth = canvasWidth - margin.left - margin.right;
  const plotHeight = canvasHeight - margin.top - margin.bottom;

  const consoles = d.children.map((console) => (console.name));

  const root = d3.hierarchy(d).sum((d) => d.value);

  d3.treemap()
    .size([plotWidth, plotHeight])
    .padding(0)
    (root)

  const colors = d3.scaleOrdinal()
    .domain(consoles)
    .range(d3.schemeCategory20);

  const legendPadding = 6;
  const legendWidth = (plotWidth - (consoles.length * legendPadding)) / consoles.length;
  const legendHeight = 25;
  
  const legendX = margin.left;
  const legendY = canvasHeight - margin.bottom + 15;
  
  const tooltip = d3.select('body')
  .append('div')
  .attr('id', 'tooltip');

  const canvas = d3.select('#viz')
    .append('svg')
    .attr('viewBox', `0 0 ${canvasWidth} ${canvasHeight}`);

  const tiles = canvas.append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`)
    .selectAll('rect').data(root.leaves())
    .enter().append('rect')
      .attr('class', 'tile')
      .attr('data-name', (d) => d.data.name)
      .attr('data-category', (d) => d.parent.data.name)
      .attr('data-value', (d) => d.data.value)
      .attr('x', (d) => d.x0)
      .attr('y', (d) => d.y0)
      .attr('width', (d) => d.x1 - d.x0)
      .attr('height', (d) => d.y1 - d.y0)
      .attr('stroke', '#DDD')
      .attr('fill', (d) => colors(d.parent.data.name))
      .on('mousemove', (d, i, nodes) => {
        tooltip.transition().duration(200).style('visibility', 'visible');

        tooltip.html(`Name: ${d.data.name}<br>Console: ${d.parent.data.name}<br>Sales: ${d.data.value}m`)
          .attr('data-value', d.data.value)
          .style('left', `${d3.event.pageX + 10}px`)
          .style('top', `${d3.event.pageY - 20}px`);
      })
      .on('mouseout', (d, i, nodes) => {
        tooltip.transition().duration(200).style('visibility', 'hidden')
        tooltip.html('');
      });
  
   
  const labels = canvas.append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`)
    .selectAll('foreignObject').data(root.leaves())
    .enter().append('foreignObject')
      .attr('class', 'label')
      .attr('x', (d) => d.x0)
      .attr('y', (d) => d.y0)
      .attr('width', (d) => d.x1 - d.x0)
      .attr('height', 1)
      .text((d) => d.data.name)

  const legend = canvas.append('g')
    .attr('id', 'legend')
    .attr('transform', `translate(${legendX + legendPadding/2}, ${legendY})`)
    .selectAll('rect').data(colors.domain())
    .enter().append('rect')
      .attr('class', 'legend-item')
      .attr('width', legendWidth)
      .attr('height', legendHeight)
      .attr('fill', (d, i) => colors(d))
      .attr('stroke', '#000')
      .attr('x', (d, i) => i * (legendWidth + legendPadding))
  
  const legendText = canvas.append('g')
    .attr('id', 'legend-text')
    .attr('transform', `translate(${legendX + legendPadding}, ${legendY + 17})`)
    .selectAll('text').data(colors.domain())
    .enter().append('text')
      .attr('class', 'legend-label')
      .attr('fill', (d, i) => colors(d))
      .attr('stroke', '#000')
      .attr('x', (d, i) => i * (legendWidth + legendPadding))
      .text((d) => d)
}); 

