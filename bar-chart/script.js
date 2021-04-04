d3.json('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json', (d) => {
  let dates = d.data.map((point) => new Date(point[0]));
  let GDPs = d.data.map((point) => point[1]);;
 
  const canvasWidth = 1200;
  const canvasHeight = 800;
  const margin = { top: 40, right: 40, bottom: 60, left: 60 };
  const plotWidth = canvasWidth - margin.left - margin.right;
  const plotHeight = canvasHeight - margin.top - margin.bottom;

  const yScale = d3.scaleLinear()
                   .domain([0, d3.max(d.data, (d) => d[1])])
                   .range([0, plotHeight]);
  
  const yValues = d3.scaleLinear()
                    .domain([0, d3.max(d.data, (d) => d[1])])
                    .range([plotHeight, 0]);
  
  const yTicks = d3.axisLeft(yValues).ticks(10);

  const xScale = d3.scaleBand()
                   .domain(GDPs)
                   .paddingInner(0.1)
                   .paddingOuter(0.1)
                   .range([0, plotWidth]);
  
  const xValues = d3.scaleTime()
                    .domain([d3.min(dates), d3.max(dates)])
                    .range([0, plotWidth]);

  const xTicks = d3.axisBottom(xValues).ticks(d3.timeYear.every(5));

 // const colors = d3.scaleLinear()
  //   .domain([0, 65, d3.max(temperatures)])
  //   .range(['#FFFFFF', '#2D8BCF', '#DA3637']);

  // const tooltip = d3.select('body')
  //   .append('div')
  //   .style('position', 'absolute')
  //   .style('padding', '0 10px')
  //   .style('background', 'white')
  //   .style('opacity', 0);

  const chart = d3.select('#viz')
                  .append('svg')
                  .attr('viewBox', '0 0 1200 800');
  
  const plotArea = chart.append('g')
                        .attr('transform', `translate(${margin.left}, ${margin.right})`)
                        .selectAll('rect').data(d.data)
                        .enter().append('rect')
                          .classed('bar', true)
                          .attr('fill', 'blue')
                          .attr('width', () => xScale.bandwidth())
                          .attr('height', (d) => yScale(d[1])) // 0
                          .attr('x', (d) => xScale(d[1]))
                          .attr('y', (d) => plotHeight - yScale(d[1])) // plotHeight
                          .attr('data-date', (d) => d[0])
                          .attr('data-gdp', (d) => d[1])

   //       .on('mouseover', (d, i, nodes) => {

  //         tooltip.transition().duration(200).style('opacity', 0.9)

  //         tooltip.html(`<div style="font-size: 1.5rem; font-weight: bold">${d}&deg;F</div>`)
  //           .style('left', `${d3.event.pageX - 35}px`)
  //           .style('top', `${d3.event.pageY - 30}px`)
  //         tempColor = nodes[i].style.fill;
  //         d3.select(nodes[i])
  //           .style('fill', 'yellow');
  //       })
  //       .on('mouseout', (d, i, nodes) => {
  //         tooltip.html('');
  //         d3.select(nodes[i])
  //           .style('fill', tempColor);
  //       });

  const yAxis = chart.append('g')
                     .attr('id', 'y-axis')
                     .attr('transform', `translate(${margin.left}, ${margin.top})`)
                     .call(yTicks);

  const xAxis = chart.append('g')
                     .attr('id', 'x-axis')
                     .attr('transform', `translate(${margin.left}, ${margin.top + plotHeight})`)
                     .call(xTicks)
  

  // myChart.transition()
  //   .attr('height', (d) => yScale(d))
  //   .attr('y', (d) => height - yScale(d))
  //   .delay((d, i) => i * 20)
  //   .duration(1000)
  //   .ease(d3.easeBounceOut)
}); //json import

