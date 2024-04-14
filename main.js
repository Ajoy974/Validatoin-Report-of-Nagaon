let bg = 'rgb(122, 141, 226)';
let bg_light = 'rgba(0, 55, 235, 0.301)';

fetch("https://ajoy974.github.io/API-For-Daily-Report/")
    .then((res) => {
        return res.json(); // Return the JSON data
    })
    .then((responseData) => {
        google.charts.load('current', { 'packages': ['corechart'] });
        google.charts.setOnLoadCallback(() => drawChart(responseData));
    });

function drawChart(data) {
    console.log(data);
    const dataTable = google.visualization.arrayToDataTable([
        ['Validator', 'Approved'], // Corrected column names
        [data.users[0].name, parseInt(data.users[0].Total_approved)],
        [data.users[1].name, parseInt(data.users[1].Total_approved)],
        [data.users[2].name, parseInt(data.users[2].Total_approved)],
        [data.users[3].name, parseInt(data.users[3].Total_approved)],
        [data.users[4].name, parseInt(data.users[4].Total_approved)], // Corrected index
        [data.users[5].name, parseInt(data.users[5].Total_approved)]
        // Assuming 263 is some sample data
    ]);
    const pei = google.visualization.arrayToDataTable([
        ['Total', 'Count'],
        ['Total Approved', parseInt(data.total.approved)], // Use actual data from API
        ['Total Rejected', parseInt(data.total.rejected)]  // Use actual data from API
    ]);

    const options = {
        backgroundColor: 'transparent',
        colors: [bg],
        title: '',
        legend: "none",
        yAxis: {
            gridlines: {
                color: 'none' // Set gridline color to 'none'
            }
        },

        tooltip: {
            textStyle: {
                color: '#333',
                fontSize: 12
            },
            isHtml: true // Enable HTML in tooltips
        }
    };

    const chart = new google.visualization.ColumnChart(document.getElementById("demo"));
    const chart1 = new google.visualization.PieChart(document.getElementById("demo-2"));

    chart.draw(dataTable, options);
    chart1.draw(pei, options);

    // Manipulate the DOM
    let ard = document.getElementById('ard');
    let rej = document.getElementById('rej');
    let pen = document.getElementById('pen');

    if (ard && rej && pen) {
        ard.innerHTML = data.total.approved;
        rej.innerHTML = data.total.rejected;
        pen.innerHTML = data.total.pending;
    }
}
function exportToCSV(tableId, filename) {
    const csvRows = [];
    const table = document.getElementById(tableId);
    const rows = table.querySelectorAll('tr');

    rows.forEach((row) => {
        const csvRow = [];
        row.querySelectorAll('th, td').forEach((cell) => {
            csvRow.push(cell.textContent.trim());
        });
        csvRows.push(csvRow.join(','));
    });

    const csvContent = csvRows.join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });

    if (navigator.msSaveBlob) { // IE 10+
        navigator.msSaveBlob(blob, filename);
    } else {
        const link = document.createElement('a');
        if (link.download !== undefined) {
            const url = URL.createObjectURL(blob);
            link.setAttribute('href', url);
            link.setAttribute('download', filename);
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }
}

function showPopUp() {
    document.getElementById("popup").style.height = '100vh';
    document.getElementById("popup").style.width = '100vw';

}
function closepop() {
    document.getElementById("popup").style.height = '0vh';
    document.getElementById("popup").style.width = '0vw';
}

function opensidebar() {
    let pop = document.getElementById('sideNav');
    pop.classList.toggle('active')

}