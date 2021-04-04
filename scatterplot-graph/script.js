d3.json('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json', (data) => {

  data.forEach((d) => {
    const t = d.Time.split(':')
    d.newTime = new Date(Date.UTC(1970, 0, 1, 0, t[0], t[1]));
  });
 
  const canvasWidth = 1200;
  const canvasHeight = 800;
  const margin = { top: 40, right: 40, bottom: 100, left: 100 };
  const plotWidth = canvasWidth - margin.left - margin.right;
  const plotHeight = canvasHeight - margin.top - margin.bottom;

  const yMin = d3.min(data, (d) => d.Time);
  const yMax = d3.max(data, (d) => d.Time);

  const yScale = d3.scaleTime()
                   .domain(d3.extent(data, (d) => d.newTime))
                   .range([0, plotHeight]);
  

  const yTicks = d3.axisLeft(yScale).tickFormat(d3.timeFormat('%M:%S'));

  const xMin = d3.min(data, (d) => d.Year) - 1;
  const xMax = d3.max(data, (d) => d.Year) + 1;
  
  const xScale = d3.scaleLinear()
                    .domain([xMin, xMax])
                    .range([0, plotWidth]);

  const xTicks = d3.axisBottom(xScale).tickFormat(d3.format('d'));

  const tooltip = d3.select('body')
    .append('div')
    .attr('id', 'tooltip');

  const chart = d3.select('#viz')
                  .append('svg')
                  .attr('viewBox', '0 0 1200 800');
  
  const plotArea = chart.append('g')
    .attr('transform', `translate(${margin.left}, ${margin.right})`)
    .selectAll('circle').data(data)
    .enter().append('circle')
      .classed('dot', true)
      .attr('data-xvalue', (d) => d.Year)
      .attr('data-yvalue', (d) => d.newTime.toString())
      .attr('cx', (d) => xScale(d.Year))
      .attr('cy', (d) => yScale(d.newTime))
      .attr('r', 0)
      .attr('fill', (d) => d.Doping === '' ? 'green' : 'red')
      .attr('stroke', '#000')
      .on('mouseover', (d, i, nodes) => {
        tooltip.transition().duration(200).style('visibility', 'visible');

        tooltip.html(`<strong>${d.Name} (${d.Nationality})</strong>
            <br>Year: ${d.Year}, Time: ${d.Time}${d.Doping ? '<br><br>'+d.Doping : ''}`)
          .attr('data-year', d.Year)
          .style('left', `${d3.event.pageX + 10}px`)
          .style('top', `${d3.event.pageY}px`);
      })
      .on('mouseout', (d, i, nodes) => {
        tooltip.transition().duration(200).style('visibility', 'hidden')
        tooltip.html('');
      });

  const yAxis = chart.append('g')
    .attr('id', 'y-axis')
    .attr('transform', `translate(${margin.left}, ${margin.top})`)
    .call(yTicks);
  
  yAxis.append('text')
    .attr('class', 'axis-label')
    .attr('transform', 'rotate(270)')
    .attr('x', -plotHeight / 2 + 50)
    .attr('y', -50)
    .attr('fill', '#000')
    .text('Personal Best (mins)')
                     
  const xAxis = chart.append('g')
    .attr('id', 'x-axis')
    .attr('transform', `translate(${margin.left}, ${margin.top + plotHeight})`)
    .call(xTicks)

  xAxis.append('text')
    .attr('class', 'axis-label')
    .attr('x', plotWidth / 2)
    .attr('y', 50)
    .attr('fill', '#000')
    .text('Year');
  
  const legend = chart.append('g')
    .attr('id', 'legend')
    .attr('transform', `translate(${plotWidth - 150}, 100)`)

  legend.append('rect')
    .attr('width', 25)
    .attr('height', 25)
    .attr('fill','green')
    .attr('stroke', '#000');
  
  legend.append('rect')
    .attr('transform', 'translate(0, 35)')
    .attr('width', 25)
    .attr('height', 25)
    .attr('fill','red')
    .attr('stroke', '#000');

  legend.append('text')
    .attr('transform', 'translate(35, 18)')
    .text('No allegations');
  
    legend.append('text')
    .attr('transform', 'translate(35, 53)')
    .text('Allegations of doping'); 

  plotArea.transition()
    .attr('r', 8)
    .delay((d, i) => i * 100)
    .duration(1000)
}); //json import

