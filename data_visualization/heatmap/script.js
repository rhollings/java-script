/*
Uses d3-abstraction-classes
https://codepen.io/fuzzyray/pen/bGEXbwW
*/

// Variable for Test Suite
const projectName = 'heat-map';
localStorage.setItem('example_project', 'Heat Map');

dataURL = 'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json';

const parsedMonth = d3.utcParse('%m');
const formattedMonth = d3.utcFormat('%B');

const monthNames = () => {
  const monthNames = [];
  for (let i = 1; i <= 12; i++) {
    monthNames.push(formattedMonth(parsedMonth(i)));
  }
  return monthNames;
};

const createHeatMap = (data) => {
  const months = monthNames();
  const monthlyData = data.monthlyVariance;
  const mapLabels = {
    header: {text: 'Monthly Global Temperature', id: 'title'},
    subheader: {
      text: `Base Temperature ${data.baseTemperature}°C`,
      id: 'description',
    },
    footer: {text: 'Years', id: 'footer'},
    right: {text: '', id: ''},
    left: {text: 'Months', id: 'y-label'},
  };
  const xValue = d => {
    const yearParse = d3.utcParse('%Y');
    return yearParse(d.year);
  };
  const yValue = d => d.monthName;

  console.log(monthlyData);

  const width = 1000;
  const aspect = 19.5 / 9;
  const height = width / aspect;
  const margins = {
    top: height * 0.1,
    right: width * 0.025,
    bottom: height * 0.1,
    left: width * 0.1,
  };
  const heatMap = new D3Chart({
    width: width,
    height: height,
    margins: margins,
    labels: mapLabels,
    tooltips: true,
  });
  heatMap.setScale('xAxis', d3.scaleUtc, [0, heatMap.plotArea.width]);
  heatMap.setDomain('xAxis', d3.extent(monthlyData, xValue));
  heatMap.setAxis('xAxis', d3.axisBottom);
  heatMap.render();
  // Render our own yAxis so we can customize the end ticks
  const yScale = d3.scaleBand()
      .range([0, heatMap.plotArea.height])
      .domain(months);
  const yAxis = d3.axisLeft()
      .scale(yScale)
      .tickSizeOuter(0);
  heatMap.svg.append('g')
      .attr('id', 'y-axis')
      .attr('transform', `translate(${heatMap.yAxis.x}, ${heatMap.yAxis.y})`)
      .call(yAxis);

  const numYears = d3.max(monthlyData, d => d.year) -
      d3.min(monthlyData, d => d.year);
  const colorScale = d3.scaleSequential();
  const colorValue = d => d.temperature;
  colorScale
      .domain(
          [d3.max(monthlyData, colorValue), d3.min(monthlyData, colorValue)])
      .interpolator(d3.interpolateRdBu);

  heatMap.svgGroups.plotGroup.selectAll('rect')
      .data(monthlyData)
      .enter()
      .append('rect')
      .attr('class', 'cell')
      .attr('height', yScale.bandwidth())
      .attr('width', heatMap.plotArea.width / numYears)
      .attr('x', d => heatMap.xAxis.scale(xValue(d)))
      .attr('y', d => yScale(yValue(d)))
      .attr('fill', d => colorScale(colorValue(d)));

  const tooltipValue = d => {
    return (
        `<span>${d.monthName}, ${d.year}</span><br><span>Temperature: ${d.temperature}°C</span><br><span>Variance: ${d.variance}°C</span>`
    );
  };
  heatMap.addToolTips(monthlyData, tooltipValue,
      {id: 'tooltip', 'data-year': d => d.year}, 'n', 'rect');

  // Subtract 1 from month for testing, doesn't make sense to me why
  // they want 0 - 11 instead of the 1 - 12 from the data
  const additionalProps = {
    'data-month': d => d.month - 1,
    'data-year': d => d.year,
    'data-temp': d => d.temperature,
  };
  heatMap.addElementProperties(monthlyData, additionalProps, 'rect');

  const colorLegend = d3.legendColor()
      .scale(colorScale)
      .orient('horizontal')
      .shapeHeight(12)
      .shapeWidth(12)
      .shapePadding(6)
      .labelFormat('0.1f')
      .cells(10)
      .ascending('true')
      .labelAlign('middle')
      .labelOffset(1.5);

  heatMap.svgGroups.footerGroup.append('g')
      .attr('id', 'legend')
      .attr('transform', 'translate(-20, 22)')
      .call(colorLegend);

  console.log(heatMap);
};

d3.json(dataURL)
    .then(data => {
      data.monthlyVariance.forEach(d => {
        d.monthName = formattedMonth(parsedMonth(d.month));
        Object.assign(d,
            {temperature: +(data.baseTemperature + d.variance).toFixed(3)});
      });
      createHeatMap(data);
    })
    .catch(err => {
      console.error(err);
    });
