function buildMetadata(firstSample) {

  // @TODO: Complete the following function that builds the metadata panel
  // var selector = d3.select("#selDataset");

  d3.json("/metadata/"+firstSample).then((sampleNames) => {
     console.log(sampleNames);
     var panel=d3.select("#sample-metadata");
     panel.html("");
     var panelbody=Object.entries(sampleNames);
    console.log(panelbody);
    panelbody.forEach((metadatapair) => {
      panel.append("h5").text(metadatapair[0]+":"+metadatapair[1]);
      console.log(metadatapair);
  });
      });
  // Use `d3.json` to fetch the metadata for a sample
    // Use d3 to select the panel with id of `#sample-metadata`

    // Use `.html("") to clear any existing metadata

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.

}

function buildCharts(firstSample) {

  // @TODO: Use `d3.json` to fetch the sample data for the plots

    // @TODO: Build a Bubble Chart using the sample data

    // @TODO: Build a Pie Chart
    // function buildPie(irstSample) {
  console.log("This is a pie chart")
  var url = `/samples/${firstSample}`
  d3.json(url).then((data) => {
      console.log(data);
      const pieLabels = data.otu_ids
      const pieValues = data.sample_values
      const pieDescription = data.otu_labels
      console.log(pieLabels)
      console.log(pieValues)
      console.log(pieDescription)

      var layout = {
        margin: { t: 0, l: 0 }
      };

      var data = [{
          values: pieValues.slice(0,10),
          labels: pieLabels.slice(0,10),
          type: "pie",
          name: "Top 10 Samples",
          text_info: "percent",
          text: pieDescription,
          text_position: "inside",
          hoverinfo: "label+value+text+percent" 
      }];

      Plotly.plot("pie", data, layout);
  })
}
    // HINT: You will need to use slice() to grab the top 10 sample_values,
    // otu_ids, and labels (10 each).


function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
    console.log(sampleNames);
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    
    buildMetadata(firstSample);
    buildCharts(firstSample);
  });
}

function optionChanged(firstSample) {
  // Fetch new data each time a new sample is selected
 
  buildMetadata(firstSample);
  buildCharts(firstSample);
}

// Initialize the dashboard
init();
