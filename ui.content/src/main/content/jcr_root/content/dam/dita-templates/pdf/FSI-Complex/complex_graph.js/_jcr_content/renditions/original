window.addEventListener('DOMContentLoaded', function () {
  window.pdfLayout.onBeforePagination(function () {

    // Create a canvas element
    var parent = document.querySelector(".chart-container");
    var canvas = document.createElement("canvas");
    canvas.classList.add("eligible-categories-bar");

    if (document.querySelector(".chart-container canvas.eligible-categories-bar")) {
      return;
    }

    parent.appendChild(canvas);

    var ctx = canvas.getContext('2d');

    var mixedChart = new Chart(ctx, {
      type: 'bar', // Define the type of the chart (bar chart)
      data: {
        labels: ["2020", "2021", "2022", "2024"], // Data labels (X-axis)
        datasets: [
          {
            label: 'Assets Evaluation', // The first dataset label
            data: [12, 19, 3, 5, 2, 3], // Data for the first group
            backgroundColor: '#FFD700', // Bar color for the first group
            borderColor: '#FFD700', // Border color for the first group
            borderWidth: 1 // Border width for the first group
          },
          {
            label: 'Selection Process', // The second dataset label
            data: [15, 9, 7, 8, 6, 4], // Data for the second group
            backgroundColor: '#01EA57', // Bar color for the second group
            borderColor: '#01EA57', // Border color for the second group
            borderWidth: 1 // Border width for the second group
          }
        ]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true // Start the Y-axis at zero
            }
          }]
        },
        // Make sure the bars don't overlap
        barPercentage: 0.4, // Adjust the width of the bars
        categoryPercentage: 0.5 // Adjust the space between each group
      }
    });
  });
});