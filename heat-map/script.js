d3.json('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json', (data) => {
  console.log(data);
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const years = [...new Set(data.monthlyVariance.map((point) => point.year))];
  const decades = years.filter((year) => year % 10 === 0);

  const canvasWidth = 1200;
  const canvasHeight = 800;
  const margin = { top: 30, right: 30, bottom: 100, left: 70 };
  const plotWidth = canvasWidth - margin.left - margin.right;
  const plotHeight = canvasHeight - margin.top - margin.bottom;
  const cellWidth = plotWidth / years.length;
  const cellHeight = plotHeight / months.length;
  const palette = ['#4575b4', '#74add1', '#abd9e9', '#e0f3f8', '#ffffbf', '#fee090', '#fdae61', '#f46d43', '#d73027'];

  const yScale = d3.scaleBand()
                   .domain(months)
                   .paddingInner(0)
                   .paddingOuter(0)
                   .range([0, plotHeight]);
  
  const yTicks = d3.axisLeft(yScale).tickSizeOuter(0);

  const xScale = d3.scaleBand()
                    .domain(years)
                    .paddingInner(0)
                    .paddingOuter(0)
                    .range([0, plotWidth]);

  const xTicks = d3.axisBottom(xScale).tickValues(decades).tickFormat(d3.format('d'))

  const minTemp = d3.min(data.monthlyVariance, (d) => d.variance);
  const maxTemp = d3.max(data.monthlyVariance, (d) => d.variance);

  const colors = d3.scaleQuantile()
    .domain([-6, 6])
    .range(palette);
  
  const tempScale = d3.scaleLinear()
    .domain([-6, 6])
    .range([0, 270])

  const tempTicks = d3.axisBottom(tempScale)

  const tooltip = d3.select('body')
    .append('div')
    .attr('id', 'tooltip');

  const chart = d3.select('#viz')
    .append('svg')
    .attr('viewBox', '0 0 1200 800');
  
  const plotArea = chart.append('g')
    .attr('transform', `translate(${margin.left}, ${margin.right})`)
    .selectAll('rect').data(data.monthlyVariance)
    .enter().append('rect')
    .classed('cell', true)
    .attr('fill', (d) => colors(d.variance))
    .attr('width', cellWidth)
    .attr('height', cellHeight)
    .attr('x', (d) => xScale(d.year))
    .attr('y', (d) => yScale(months[d.month - 1]))
    .attr('data-month', (d) => d.month - 1)
    .attr('data-year', (d) => d.year)
    .attr('data-temp', (d) => d.variance)
    .on('mouseover', (d, i, nodes) => {
      tooltip.transition().duration(200).style('visibility', 'visible');

      tooltip.html(`${months[d.month - 1]} ${d.year}: ${Math.round(d.variance * 100) / 100}&deg;C`)
        .attr('data-year', d.year)
        .style('left', `${d3.event.pageX + 10}px`)
        .style('top', `${d3.event.pageY}px`);

      d3.select(nodes[i])
        .style('stroke', '#000');
    })
    .on('mouseout', (d, i, nodes) => {
      tooltip.transition().duration(200).style('visibility', 'hidden')
      tooltip.html('');
      d3.select(nodes[i])
        .style('stroke', 'none');
    });

  const yAxis = chart.append('g')
                     .attr('id', 'y-axis')
                     .attr('transform', `translate(${margin.left}, ${margin.top})`)
                     .call(yTicks);

  const xAxis = chart.append('g')
                     .attr('id', 'x-axis')
                     .attr('transform', `translate(${margin.left}, ${margin.top + plotHeight})`)
                     .call(xTicks)
  
  const legend = chart.append('g')
    .attr('id', 'legend')
    .attr('transform', `translate(${canvasWidth / 2 - 135}, ${plotHeight + 20})`)
    .selectAll('rect').data(palette)
    .enter().append('rect')
    .attr('x', (d, i) => i * 30)
    .attr('y', 50)
    .attr('width', 30)
    .attr('height', 30)
    .attr('fill', (d) => d)
    .attr('stroke', '#000')

  const legendAxis = chart.append('g')
    .attr('transform', `translate(${canvasWidth / 2 - 135}, ${plotHeight + 100})`).call(tempTicks)


});

