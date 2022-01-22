/*
Uses d3-abstraction-classes
https://codepen.io/fuzzyray/pen/bGEXbwW
*/

// Variable for Test Suite
const projectName = 'tree-map';
localStorage.setItem('example_project', 'D3: Tree Map');

const DATASETS = {
  kickstarter: {
    dataURL: 'https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/kickstarter-funding-data.json',
    title: 'Kickstarter Projects',
    description: 'Top 100 highest pledged campaigns grouped by category',
  },
  movies: {
    dataURL: 'https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/movie-data.json',
    title: 'Movies',
    description: 'Top 95 highest grossing movies grouped by genre',
  },
  videogames: {
    dataURL: 'https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/video-game-sales-data.json',
    title: 'Video Game Sales',
    description: 'Top 100 games sold grouped by console',
  },
};

const DEFAULT_DATASET = DATASETS.videogames;

const mapLabels = {
  header: {id: 'title', text: DEFAULT_DATASET.title},
  subheader: {id: 'description', text: DEFAULT_DATASET.description},
  footer: {id: '', text: ''},
  left: {id: '', text: ''},
  right: {id: '', text: ''},
};

const colorScheme = d3.interpolateWarm;
const treeMap = new D3Chart(
    {labels: mapLabels, tooltips: true, aspectRatio: 19.5 / 9});

const createTreeMap = (tileData, categoryColorValue) => {
  const colorScale = d3.scaleSequential();
  const colorValue = d => categoryColorValue[d.data.category].colorvalue;

  colorScale
      .domain(d3.extent(tileData.map(colorValue)))
      .interpolator(colorScheme);

  treeMap.render();
  const tiles = treeMap.svgGroups.plotGroup.selectAll('g')
      .data(tileData)
      .enter()
      .append('g');
  tiles
      .attr('transform', d => `translate(${d.x0}, ${d.y0})`)
      .attr('class', 'tile-group')
      .append('rect')
      .attr('class', 'tile')
      .attr('width', d => d.x1 - d.x0)
      .attr('height', d => d.y1 - d.y0)
      .attr('fill', d => colorScale(colorValue(d)));

  const wordSplit = (str, startX, startY, height, width) => {
    const result = [];
    let y = startY;
    str = str.replace(/\//g, '/ ');
    const wordArray = str.split(/\s/);
    // Each letter is ~6px at 8pt, truncate word if > width
    // Don't display words, when we exceed height
    const maxWordLengthIndex = Math.floor(width / 6) + 1;
    for (let i = 0; i < wordArray.length; i++) {
      let word = wordArray[i].slice(0, maxWordLengthIndex);
      result.push({x: startX, y: y, word: word});
      y = y + 8;
      if (y > height) {
        break;
      }
    }
    return result;
  };

  tiles
      .append('text')
      .attr('class', 'tile-text')
      .attr('font-size', 8)
      .selectAll('text')
      .data(d => wordSplit(d.data.name, 2, 9, d.y1 - d.y0, d.x1 - d.x0))
      .enter()
      .append('tspan')
      .attr('x', d => d.x)
      .attr('y', d => d.y)
      .text(d => d.word);

  const additionalProps = {
    'data-name': d => d.data.name,
    'data-category': d => d.data.category,
    'data-value': d => d.data.value,
  };
  treeMap.addElementProperties(tileData, additionalProps, '.tile');

  const tooltipValue = (d) => {
    return (
        `<span>Name: ${d.data.name}</span><br><span>Category: ${d.data.category}</span><br>span>Value: ${d.data.value}</span>`
    );
  };

  treeMap.addToolTips(tileData, tooltipValue,
      {id: 'tooltip', 'data-value': d => d.data.value}, 'n', '.tile-group');

  const categories = Object.values(categoryColorValue);
  const legend = treeMap.svgGroups.rightGroup.append('g')
      .attr('id', 'legend')
      .attr('transform', 'translate(10, 7)')
      .selectAll('g')
      .data(categories)
      .enter()
      .append('g');

  legend.append('rect')
      .attr('class', 'legend-item')
      .attr('width', 15)
      .attr('height', 15)
      .attr('y', (d, i) => i * 20)
      .attr('fill', d => colorScale(d.colorvalue))
      .attr('stroke', 'black');
  legend.append('text')
      .attr('x', 25)
      .attr('y', (d, i) => (i * 20) + 7.5)
      .attr('dominant-baseline', 'middle')
      .attr('font-size', 12)
      .text(d => d.category);
};

const createHierarchyData = (json => {
  const hierarchy = d3.hierarchy(json, d => d.children)
      .sum(d => d.value)
      .sort((a, b) => b.height - a.height || b.value - a.value);
  const treeMapTileData = d3.treemap()
      .size([treeMap.plotArea.width, treeMap.plotArea.height])
      .paddingInner([1])
      .paddingOuter([2])
      (hierarchy).leaves();

  // Give numerical id to the categories to be able to use a sequential scale
  // to map colors as d3's category schemes only go to 9 colors
  const categoryValue = json.children.reduce((accumulator, d, i) => {
    accumulator[d.name] = {category: d.name, colorvalue: i};
    return accumulator;
  }, {});
  createTreeMap(treeMapTileData, categoryValue);
});

const loadData = (dataURL) => {
  d3.json(dataURL).then(json => {
    createHierarchyData(json);
  }).catch(error => console.error(error));
};

loadData(DEFAULT_DATASET.dataURL);
