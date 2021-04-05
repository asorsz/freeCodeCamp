(() => {

  const canvasWidth = 1200;
  const canvasHeight = 675;
  const margin = { top: 25, right: 0, bottom: 0, left: 150 };
  const plotWidth = canvasWidth - margin.left - margin.right;
  const plotHeight = canvasHeight - margin.top - margin.bottom;

  const palette = ["#fff5eb","#fee6ce","#fdd0a2","#fdae6b","#fd8d3c","#f16913","#d94801","#8c2d04"];
  const noColors = palette.length;

  const legendWidth = 30;
  const legendHeight = 15;
  const legendX = 650;
  const legendY = 570;
  const totalLegendWidth = legendWidth * noColors;

  const chart = d3.select('#viz')
    .append('svg')
    .attr('viewBox', `0 0 ${canvasWidth} ${canvasHeight}`);

  const tooltip = d3.select('body')
    .append('div')
    .attr('id', 'tooltip');

  const render = (err, eduData, usData) => {
    if (err) throw new Error('Data not retrieved');

    const COUNTIES = topojson.feature(usData, usData.objects.counties).features;

    const max = 80 // d3.max(eduData, (d) => d.bachelorsOrHigher);
    const min = 0 //d3.min(eduData, (d) => d.bachelorsOrHigher);
    const increment = (max - min) / noColors
    
    const colors = d3.scaleQuantile()
      .domain(d3.range(min, max + increment / 2, increment))
      .range(palette);
    
    const legendScale = d3.scaleLinear()
      .domain([min, max])
      .range([0, totalLegendWidth])

    const legendTicks = d3.axisBottom(legendScale).tickSize(20).tickFormat((d) => `${Math.round(d)}%`).tickValues(colors.domain());
    
    const map = chart.append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`)
      .selectAll('path').data(COUNTIES)
      .enter().append('path')
        .attr('class', 'county')
        .attr('data-fips', (d) => d.id)
        .attr('data-education', (d) => {
          const match = eduData.filter((county) => county.fips === d.id);
          return match[0] ? match[0].bachelorsOrHigher : 0         
        })
        .attr('fill', (d) => {
          const match = eduData.filter((county) => county.fips === d.id);
          return match[0] ? colors(match[0].bachelorsOrHigher) : 0         
        })
        .attr('d', d3.geoPath())
        .on('mouseover', (d, i, nodes) => {
          tooltip.transition().duration(200).style('visibility', 'visible');
          
          const match = eduData.filter((county) => county.fips === d.id);
          const county = match[0] ? match[0].area_name : null;
          const state = match[0] ? match[0].state : null;
          const percentage = match[0] ? match[0].bachelorsOrHigher : null;

          tooltip.html(`${county}, ${state}: ${percentage}%`)
            .attr('data-education', percentage)
            .style('left', `${d3.event.pageX + 10}px`)
            .style('top', `${d3.event.pageY - 5}px`);

          d3.select(nodes[i])
            .style('stroke', '#000');
        })
        .on('mouseout', (d, i, nodes) => {
          tooltip.transition().duration(200).style('visibility', 'hidden')

          tooltip.html('')
            .attr('data-education', 0);
          
          d3.select(nodes[i])
            .style('stroke', 'none');
        });
        
    const legend = chart.append('g')
      .attr('id', 'legend')
      .attr('transform', `translate(${legendX}, ${legendY})`)
      .selectAll('rect').data(colors.range())
      .enter().append('rect')
      .attr('width', legendWidth)
      .attr('height', legendHeight)
      .attr('fill', (d, i) => colors(i * (max / palette.length)))
      .attr('x', (d, i) => i * legendWidth)   

    const legendAxis = chart.append('g')
      .attr('transform', `translate(${legendX}, ${legendY})`)
      .call(legendTicks)  
  }
  
  d3.queue()
    .defer(d3.json, 'https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json')
    .defer(d3.json, 'https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json')
    .await(render);
})()

  


  
 

