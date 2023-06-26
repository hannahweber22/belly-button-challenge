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

    //Create a variable to hold the ids
    sample_id = datasamples.map(sample => sample.id);
    console.log('sample_id', sample_id);   

    //Create a variable to hold the sample_values arrays
    sample_values = datasamples.map(sample => sample.sample_values);
    console.log('sample_values', sample_values);

    //Create a variable to hold the otu_ids arrays
    otu_ids = datasamples.map(sample => sample.otu_ids);
    console.log('otu_ids', otu_ids);
    
    //Create a variable to hold the otu_labels arrays
    otu_labels = datasamples.map(sample => sample.otu_labels);
    console.log('otu_labels', otu_labels);

    //Loop through the sample_id list and append values to the selDataset
    for (let i = 0; i < sample_id.length; i++) {
    let id_no = d3.select("#selDataset").append("option");
    id_no.append("value").text(sample_id[i]);
    }

    // On change to the DOM, call getData()
    d3.selectAll("#selDataset").on("change", horzbar);
    horzbar();

    // This function is called when a dropdown menu item is selected
    function horzbar() {
        // Use D3 to select the dropdown menu
        let dropdownMenu = d3.select("#selDataset");
        // Assign the value of the dropdown menu option to a variable
        let dataset = dropdownMenu.property("value");
        // Initialize x and y arrays
        let sampleValues = [];
        let otuIDs = [];
        let otuLabels = [];

        // Create a custom filtering function to only select selected ID data
        function filterID(sampleID) {
        return sampleID.id == dataset;
        };

        // filter() uses the custom function as its argument
        let selectedID = datasamples.filter(filterID);
        console.log('selectedID', selectedID)

        //Create a variable to hold the selected ID sample_values array
        let selectedSampleValues = selectedID.map(sample => sample.sample_values);
        console.log('Selected sample_values', selectedSampleValues);


        //Create a variable to hold the selected ID otu_ids array
        let selectedOTUIDs = selectedID.map(sample => sample.otu_ids);
        console.log('Selected otu_ids', selectedOTUIDs);
        
        //Create a variable to hold the selected ID otu_labels array
        let selectedOTULabels = selectedID.map(sample => sample.otu_labels);
        console.log('Selected otu_labels', selectedOTULabels);

    };
}); 

// Use sample_values as the values for the bar chart.
// Use otu_ids as the labels for the bar chart.
// Use otu_labels as the hovertext for the chart.

