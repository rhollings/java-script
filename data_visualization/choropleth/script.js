/*
Uses d3-abstraction-classes
https://codepen.io/fuzzyray/pen/bGEXbwW
*/

// Variable for Test Suite
const projectName = 'choropleth';
localStorage.setItem('example_project', 'D3: Choropleth');

dataURL = 'https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json';
topoURL = 'https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json'
//topoURL = 'https://cdn.jsdelivr.net/npm/us-atlas@3/counties-10m.json';

loadData = () =>
    Promise.all([
      d3.json(dataURL),
      d3.json(topoURL),
    ]).then(([educationData, topoJSONdata]) => {
      const objByCounty = educationData.reduce((accumulator, d) => {
        // noinspection JSDeprecatedSymbols
        accumulator[d.fips] = d;
        return accumulator;
      }, {});

      const counties = topojson.feature(topoJSONdata,
          topoJSONdata.objects.counties);
      counties.features.forEach(d => {
        d.id = +d.id;
        Object.assign(d.properties, objByCounty[d.id]);
      });
      return counties;
    });

loadData().then(data => {
  console.log(data);
  const counties = data.features;
  const mapLabels = {
    className: 'labels',
    header: {id: 'title', text: 'United States Educational Attainment'},
    subheader: {
      id: 'description',
      text: 'Percentage of adults age 25 and older with a bachelor\'s degree or higher (2010-2014)',
    },
    footer: {
      id: 'source',
      text: 'Source: https://www.ers.usda.gov/data-products/county-level-data-sets/download-data.aspx',
    },
    left: {id: 'left-label', text: ''},
    right: {id: 'right-label', text: ''},
  };
  const projection = d3.geoAlbersUsa();
  const colorScale = d3.scaleSequential();
  const colorValue = d => d.properties.bachelorsOrHigher;

  colorScale
      .domain(d3.extent(counties.map(colorValue)))
      .interpolator(d3.interpolatePurples)

  const usMap = new D3Chart({width: 1200, height: 800,  tooltips: true, labels: mapLabels});
  usMap.render();

  const pathGenerator = d3.geoPath()
      // .projection(projection.fitSize(
      //     [texasMap.plotArea.width, texasMap.plotArea.height], data));

  const paths = usMap.svgGroups.plotGroup.selectAll('path')
      .data(counties);
  paths.enter()
      .append('path')
      .attr('class', 'county')
      .attr('d', d => pathGenerator(d))
      .attr('fill', d => colorScale(colorValue(d)))

  // noinspection JSDeprecatedSymbols
  const additionalProps = {
    'data-fips': d => d.properties.fips,
    'data-education': d => d.properties.bachelorsOrHigher,
  }
  usMap.addElementProperties(counties, additionalProps, 'path')

  //state: "AZ", area_name: "Mohave County", bachelorsOrHigher: 12.2
  tooltipValue = (d) => {
    return (
        `<span>${d.properties.area_name}, ${d.properties.state} - ${d.properties.bachelorsOrHigher}</span>`
    )
  }
  usMap.addToolTips(counties, tooltipValue, {id: 'tooltip', 'data-education': d => d.properties.bachelorsOrHigher}, 'n', 'path');

  const colorLegend = d3.legendColor()
      .scale(colorScale)
      .cells(5)
      .shapeHeight(10)
      .shapeWidth(10)

  usMap.svgGroups.leftGroup.append('g')
      .attr('id', 'legend')
      .call(colorLegend)
});
