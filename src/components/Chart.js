import React from 'react';
var d3 = require('d3');

class Chart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterType: 'Correct'
    }
    this.graph = this.graph.bind(this)
    this.filterData = this.filterData.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.clearGraph = this.clearGraph.bind(this)
  }

  handleChange(event) {
    let filterType;
    if (event.target.value === 'language') {
      filterType = 'Language'
    } else if (event.target.value === 'difficulty') {
      filterType = 'Difficulty'
    } else {
      filterType = 'Correct'
    }
    this.setState({
      filterType: filterType
    })
    const data = this.filterData(event.target.value);
    this.clearGraph();
    this.graph(data);
  }

  clearGraph() {
    d3.selectAll("svg > *").remove();
  }

  filterData(filterBy) {
    let object = {};
    let sortable = this.props.pieData;
    for (let i = 0; i < sortable.length; i++) {
      if (object.hasOwnProperty(sortable[i][filterBy])) {
        object[sortable[i][filterBy]]++;
      } else {
        object[sortable[i][filterBy]] = 1;
      }
    }
    let retVal = [];
    for (let key in object) {
      let obj;
      if (key === 'true') {
        obj = {
          'key': 'Correct',
          'value': object[key]
        }
      } else if (key === 'false') {
        obj = {
          'key': 'Incorrect',
          'value': object[key]
        }
      } else {
        obj = {
          'key': key,
          'value': object[key]
        }
      }
      retVal.push(obj)
    }
    return retVal
  }

  graph(data) {
    var svg = d3.select("svg"),
            width = svg.attr("width"),
            height = svg.attr("height"),
            radius = Math.min(width, height) / 2;

    var g = svg.append("g")
               .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    var color = d3.scaleOrdinal(['#4daf4a','#377eb8','#ff7f00','#984ea3','#e41a1c']);

    var pie = d3.pie().value(function(d) {
            return d.value;
        });

    var path = d3.arc()
                 .outerRadius(radius - 10)
                 .innerRadius(0);

    var label = d3.arc()
                  .outerRadius(radius)
                  .innerRadius(radius - 80);

    var arc = g.selectAll(".arc")
                      .data(pie(data))
                      .enter().append("g")
                      .attr("class", "arc");

    arc.append("path")
        .attr("d", path)
        .attr("fill", function(d) { return color(d.data.key); });

    arc.append("text")
        .attr("transform", function(d) {
                 return "translate(" + label.centroid(d) + ")";
         })
        .text(function(d) { return d.data.key; });


    svg.append("g")
        .attr("transform", "translate(" + (width / 2 - 120) + "," + 20 + ")")
        .append("text")
        .attr("class", "title")
  }

  componentDidMount() {
    const data = this.props.pieData
    const retVal = [{
      key: 'Correct',
      value: 0,
    },{
      key: 'Incorrect',
      value: 0,
    }];
    for (let i = 0; i < data.length; i++) {
      if (data[i].correct) {
        retVal[0].value++;
      } else {
        retVal[1].value++;
      }
    }
    this.graph(retVal);
  }

  render() {
    return (
      <div>
        <h4 className="center">{this.state.filterType}</h4>
        <select className="center" onChange={this.handleChange}>
          <option value="correct">Correct</option>
          <option value="language">Language</option>
          <option value="difficulty">Difficulty</option>
        </select>
        <br/>
        <svg width="300" height="200"> </svg>
      </div>
    )
  }
}


export default Chart;
