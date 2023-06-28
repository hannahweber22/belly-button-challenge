const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// Fetch the JSON data and console log it
let data = d3.json(url); 
d3.json(url).then(function(data) {
    console.log('samples.json', data);
  });

//Fetch the data and create sample_values, otu_ids, and otu_labels
d3.json(url).then(function(data) {
    //Create a variable to hold the data samples
    datasamples = data.samples;
    metadata = data.metadata; 

    //Create a variable to hold the ids
    sample_id = datasamples.map(sample => sample.id);

    //Create a variable to hold the sample_values arrays
    sample_values = datasamples.map(sample => sample.sample_values);

    //Create a variable to hold the otu_ids arrays
    otu_ids = datasamples.map(sample => sample.otu_ids);
    
    //Create a variable to hold the otu_labels arrays
    otu_labels = datasamples.map(sample => sample.otu_labels);

    //Loop through the sample_id list and append values to the selDataset
    for (let i = 0; i < sample_id.length; i++) {
    let id_no = d3.select("#selDataset").append("option");
    id_no.append("value").text(sample_id[i]);
    }

    // On change to the DOM, call getData()
    d3.selectAll("#selDataset").on("change", mod14plots);
    mod14plots();

    // This function is called when a dropdown menu item is selected
    function mod14plots() {
        // Use D3 to select the dropdown menu
        let dropdownMenu = d3.select("#selDataset");
        // Assign the value of the dropdown menu option to a variable
        let dataset = dropdownMenu.property("value");

        // Create a custom filtering function to only select selected ID data
        function filterID(sampleID) {
        return (sampleID.id == dataset);
        };

        // filter() samples for selectedID and sort by descending
        selectedID = datasamples.filter(filterID);

        //filter() metadata for selectedID
        selectedMeta = metadata.filter(filterID)[0];

        //Create a variable to hold the selected ID sample_values array
        selectedSampleValues = selectedID.map(sample => sample.sample_values);

        //Create a variable to hold the selected ID otu_ids array
        selectedOTUIDs = selectedID.map(sample => sample.otu_ids);
        
        //Create a variable to hold the selected ID otu_labels array
        selectedOTULabels = selectedID.map(sample => sample.otu_labels);

        //Compile bubble chart data and plot
        bubblechar();
        function bubblechar() {
        let bubbledata = [{
            //Use otu_ids for the x values.
            x: selectedOTUIDs[0],
            //Use sample_values for the y values.
            y: selectedSampleValues[0],
            mode: 'markers',
            marker: {
            //Use otu_ids for the marker colors.
              color: selectedOTUIDs[0],
            //Use sample_values for the marker size.
              size: selectedSampleValues[0]
            },
            //Use otu_labels for the text values.
            text: selectedOTULabels[0],
          }];

          console.log('bubbledata', bubbledata);
                   
          Plotly.newPlot('bubble', bubbledata);

        }; 

        // Compile bar chart data and plot 
        horzbar();
        function horzbar() {

        //Slice reverse the order of the selected sample ID and slice 10 of the IDs
        let slicedSampleValues = selectedSampleValues[0].slice(0,9).reverse();
        let slicedOTUIDs = selectedOTUIDs[0].slice(0,9).reverse();
        let slicedOTULabels = selectedOTULabels[0].slice(0,9).reverse();
        
        //Put the OUT Ids into a string for labels
        let OTUIDsarray = []
        for (let i=0; i<slicedOTUIDs.length; i++){
            OTUIDsarray.push(`OTU ${slicedOTUIDs[i].toString()}`);
        }

        horzdata = [{
            type: 'bar',
        // Use sample_values as the values for the bar chart.
            x: slicedSampleValues,
        // Use otu_ids as the labels for the bar chart.
            y: OTUIDsarray,
        // Use otu_labels as the hovertext for the chart.
            text: slicedOTULabels,
            orientation: 'h'
        }];

        console.log('horzdata', horzdata);

        Plotly.newPlot("bar", horzdata);

        };


        //Display sample meta data using template literals
        let selectedMetaString = `id: ${selectedMeta.id}<br>
        ethnicity: ${selectedMeta.ethnicity}<br>
        gender: ${selectedMeta.gender}<br>
        age: ${selectedMeta.age}<br>
        location: ${selectedMeta.location}<br>
        bbtype: ${selectedMeta.bbtype}<br>
        wfreq: ${selectedMeta.wfreq}<br>`;

        let metatext = d3.select(".panel-body").html(selectedMetaString);

    };
}); 

