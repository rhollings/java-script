// Variables to set the test for the test suite
const projectName = "bar-chart";
localStorage.setItem("example_project", "D3: Bar Chart");

const dataURL =
  "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json";

const aspectRatio = 19.5 / 9;
const width = 1000;
const height = width / aspectRatio;

const calcMargins = (percentValue, width, height) => {
  const percent = percentValue / 100;
  const heightMargin = (height * percent) / 2;
  const widthMargin = (width * percent) / 2;
  return {
    top: heightMargin,
    right: widthMargin,
    bottom: heightMargin,
    left: widthMargin
  };
};
const marginPercent = 18;
const margins = calcMargins(marginPercent, width, height);

// Add touchstart event listener to body, so hover semi-works on mobile
d3.select("body").on("touchstart", () => {});

const svg = d3
  .select("#root")
  .append("svg")
  .attr("id", "canvas")
  .attr("viewBox", `0 0 ${width} ${height}`)
  .attr("preserveAspectRatio", "xMidYMid meet");

// Create the chart area first so the tooltip is on top
const chartArea = svg
  .append("g")
  .attr("transform", `translate(${margins.left}, ${margins.top})`);

// tooltip implementation based on:
// https://bl.ocks.org/d3noob/a22c42db65eb00d4e369
const tooltipHeight = height / 10;
const tooltipWidth = width / 10;
const tooltipMargins = calcMargins(2.5, tooltipWidth, tooltipHeight);

const tooltipGroup = svg.append("g").attr("id", "tooltip").attr("opacity", 0);
const tooltip = tooltipGroup
  .append("rect")
  .attr("width", width / 10)
  .attr("height", height / 10)
  .attr("rx", tooltipWidth / 10);

const tooltipDateValue = tooltipGroup
  .append("text")
  .attr("font-size", tooltipHeight / 3)
  .attr("x", tooltipWidth / 2)
  .attr("y", tooltipHeight / 4)
  .attr("text-anchor", "middle")
  .attr("dominant-baseline", "middle")
  .text("Date");

const tooltipGDPValue = tooltipGroup
  .append("text")
  .attr("font-size", tooltipHeight / 3)
  .attr("x", tooltipWidth / 2)
  .attr("y", tooltipHeight / 2 + tooltipHeight / 4)
  .attr("text-anchor", "middle")
  .attr("dominant-baseline", "middle")
  .text("GDP");

const showTooltip = (data, prop, xPos) => {
  tooltipGroup
    .selectAll("text")
    .data(data)
    .join("text")
    .text((d) => d);
  let translateX = margins.left + (xPos - tooltipWidth) - 20;
  translateX = translateX < margins.left ? margins.left : translateX;
  const translateY = height / 2;
  tooltipGroup
    .attr("opacity", 1)
    .attr("data-date", prop)
    .attr("transform", `translate(${translateX}, ${translateY})`);
};

const hideTooltip = (data) => {
  tooltipGroup.attr("opacity", 0);
};

const renderLabels = (labels, margins) => {
  // positioning of text from:
  // https://stackoverflow.com/questions/5546346/how-to-place-and-center-text-in-an-svg-rectangle

  // Render the Title
  const titleHeight = margins.top;
  const titleWidth = width - (margins.right + margins.left);
  const titleMargins = calcMargins(5, titleWidth, titleHeight);
  const titleAreaX = margins.right + titleMargins.right;
  const titleAreaY = titleMargins.top;
  const titleAreaHeight =
    titleHeight - (titleMargins.top + titleMargins.bottom);
  const titleAreaWidth = titleWidth - (titleMargins.right + titleMargins.left);

  svg
    .append("text")
    .attr("id", "title")
    .attr("font-size", titleAreaHeight)
    .attr("x", titleAreaX + titleAreaWidth / 2)
    .attr("y", titleAreaY + titleAreaHeight / 2)
    .attr("text-anchor", "middle")
    .attr("dominant-baseline", "middle")
    .text(labels.title);

  // Render the yLabel
  const yLabelHeight = height - (margins.top + margins.bottom);
  const yLabelWidth = margins.left;
  const yLabelMargins = calcMargins(5, yLabelWidth, yLabelHeight);
  const yAreaX = yLabelMargins.left;
  const yAreaY = margins.top + yLabelMargins.top;
  const yAreaHeight = yLabelHeight - (yLabelMargins.top + yLabelMargins.bottom);
  const yAreaWidth =
    (yLabelWidth - (yLabelMargins.right + yLabelMargins.left)) / 2;
  const yLabelX = yAreaX + yAreaWidth / 2;
  const yLabelY = yAreaY + yAreaHeight / 2;

  svg
    .append("text")
    .attr("id", "yLabel")
    .attr("font-size", yAreaWidth / 2)
    .attr("x", yLabelX)
    .attr("y", yLabelY)
    .attr("text-anchor", "middle")
    .attr("dominant-baseline", "middle")
    .attr("transform", `rotate(-90, ${yLabelX}, ${yLabelY})`)
    .text(labels.yLabel);

  // Render the xLabel
  const xLabelHeight = margins.bottom / 2;
  const xLabelWidth = width - (margins.right + margins.left);
  const xLabelMargins = calcMargins(5, xLabelWidth, xLabelHeight);
  const xLabelAreaX = margins.right + xLabelMargins.right;
  const xLabelAreaY = height - xLabelHeight + xLabelMargins.top;
  const xLabelAreaHeight =
    xLabelHeight - (xLabelMargins.top + xLabelMargins.bottom);
  const xLabelAreaWidth =
    xLabelWidth - (xLabelMargins.right + xLabelMargins.left);

  svg
    .append("text")
    .attr("id", "xLabel")
    .attr("font-size", xLabelAreaHeight / 2)
    .attr("x", xLabelAreaX + xLabelAreaWidth / 2)
    .attr("y", xLabelAreaY + xLabelAreaHeight / 2)
    .attr("text-anchor", "middle")
    .attr("dominant-baseline", "middle")
    .text(labels.xLabel);
};

const renderBarChart = (data, margins) => {
  const chartHeight = height - (margins.top + margins.bottom);
  const chartWidth = width - (margins.right + margins.left);
  const barWidth = chartWidth / data.length;

  const xValueDate = (d) => new Date(d[0]);
  const xValueString = (d) => d[0];
  const yValue = (d) => d[1];

  const xScale = d3
    .scaleTime()
    .domain(d3.extent(data, xValueDate))
    .range([0, chartWidth]);
  const yScale = d3
    .scaleLinear()
    .domain([0, d3.max(data, yValue)])
    .range([chartHeight, 0]);

  const xAxis = d3.axisBottom(xScale);
  const yAxis = d3.axisLeft(yScale);

  const xAxisX = margins.right;
  const xAxisY = height - margins.bottom;
  const yAxisX = margins.right;
  const yAxisY = margins.top;

  const xAxisArea = svg
    .append("g")
    .call(xAxis)
    .attr("transform", `translate(${xAxisX}, ${xAxisY})`)
    .attr("id", "x-axis")
    .attr("font-family", "inherit")
    .attr("font-size", 12);
  const yAxisArea = svg
    .append("g")
    .call(yAxis)
    .attr("transform", `translate(${yAxisX}, ${yAxisY})`)
    .attr("id", "y-axis")
    .attr("font-family", "inherit")
    .attr("font-size", 12);

  chartArea
    .selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("data-date", xValueString)
    .attr("data-gdp", yValue)
    .attr("height", (d) => chartHeight - yScale(yValue(d)))
    .attr("width", barWidth)
    .attr("x", (d) => xScale(xValueDate(d)))
    .attr("y", (d) => yScale(yValue(d)))
    .on("mouseover", (d) =>
      showTooltip(d, xValueString(d), xScale(xValueDate(d)))
    )
    .on("mouseout", (d) => hideTooltip(d));
};

fetch(dataURL)
  .then((response) => response.json())
  .then((json) => {
    const labels = {
      title: "US Gross Domestic Product",
      yLabel: "GDP Value in Billions",
      xLabel: `Data Source: ${json.display_url}`
    };
    renderLabels(labels, margins);
    renderBarChart(json.data, margins);
  })
  .catch((err) => {
    console.error(err);
  });
