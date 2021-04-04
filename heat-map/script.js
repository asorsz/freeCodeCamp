d3.json('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json', (d) => {
  // const QUARTERS = { 1: 'Q1', 2: 'Q1', 3: 'Q1', 4: 'Q2', 5: 'Q2', 6: 'Q2',
  //   7: 'Q3', 8: 'Q3', 9: 'Q3', 10: 'Q4', 11: 'Q4', 12: 'Q4' }

  // let dates = d.data.map((point) => point[0]);
  // let GDPs = d.data.map((point) => point[1]);;
 
  // const canvasWidth = 1200;
  // const canvasHeight = 800;
  // const margin = { top: 40, right: 40, bottom: 60, left: 60 };
  // const plotWidth = canvasWidth - margin.left - margin.right;
  // const plotHeight = canvasHeight - margin.top - margin.bottom;
  // const barWidth = plotWidth / d.data.length;

  // const yMax = d3.max(d.data, (d) => d[1]);

  // const yScale = d3.scaleLinear()
  //                  .domain([0, yMax])
  //                  .range([0, plotHeight]);
  
  // const yValues = d3.scaleLinear()
  //                   .domain([0, yMax])
  //                   .range([plotHeight, 0]);

  // const yTicks = d3.axisLeft(yValues).ticks(10);

  // const xMin = new Date(d3.min(dates));
  // const xMax = new Date(d3.max(dates));
  
  // const xScale = d3.scaleTime()
  //                   .domain([xMin, xMax])
  //                   .range([0, plotWidth]);

  // const xTicks = d3.axisBottom().scale(xScale);

  // const colors = d3.scaleLinear()
  //   .domain([0, d.data.length])
  //   .range(['#08528a', '#1e8a08']);

  // const tooltip = d3.select('body')
  //   .append('div')
  //   .attr('id', 'tooltip');

  // const chart = d3.select('#viz')
  //                 .append('svg')
  //                 .attr('viewBox', '0 0 1200 800');
  
  // const plotArea = chart.append('g')
  //                       .attr('transform', `translate(${margin.left}, ${margin.right})`)
  //                       .selectAll('rect').data(d.data)
  //                       .enter().append('rect')
  //                         .classed('bar', true)
  //                         .attr('fill', (d, i) => colors(i))
  //                         .attr('width', barWidth)
  //                         .attr('height', 0) // 0
  //                         .attr('x', (d) => xScale(new Date(d[0])))
  //                         .attr('y', (d) => plotHeight)
  //                         .attr('data-date', (d) => d[0])
  //                         .attr('data-gdp', (d) => d[1])
  //                         .on('mouseover', (d, i, nodes) => {
  //                           tooltip.transition().duration(200).style('visibility', 'visible');

  //                           tooltip.html(`${d[0].substr(0,5)}${QUARTERS[parseInt(d[0].substr(5,2))]}<br>$${parseInt(d[1])} bn`)
  //                             .attr('data-date', d[0])
  //                             .style('left', `${d3.event.pageX - 40}px`)
  //                             .style('top', `${d3.event.pageY - 45}px`);

  //                           tempColor = nodes[i].style.fill;
  //                           d3.select(nodes[i])
  //                             .style('fill', 'yellow');
  //                         })
  //                         .on('mouseout', (d, i, nodes) => {
  //                           tooltip.transition().duration(200).style('visibility', 'hidden')
  //                           tooltip.html('');
  //                           d3.select(nodes[i])
  //                             .style('fill', tempColor);
  //                         });

  // const yAxis = chart.append('g')
  //                    .attr('id', 'y-axis')
  //                    .attr('transform', `translate(${margin.left}, ${margin.top})`)
  //                    .call(yTicks);

  // const xAxis = chart.append('g')
  //                    .attr('id', 'x-axis')
  //                    .attr('transform', `translate(${margin.left}, ${margin.top + plotHeight})`)
  //                    .call(xTicks)
  
  // plotArea.transition()
  //   .attr('height', (d) => yScale(d[1]))
  //   .attr('y', (d) => plotHeight - yScale(d[1]))
  //   .delay((d, i) => i * 3)
  //   .duration(1000)
  //   .ease(d3.easeBounceOut)
}); //json import

