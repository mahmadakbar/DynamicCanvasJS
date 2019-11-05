window.onload = function () {
    var dataPoints1 = [];
    var dataPoints2 = [];

    var chart = new CanvasJS.Chart("chartContainer", {
        exportEnabled: true,
        zoomEnabled: true,
        theme: "light2",
        title:{
            text: "Grafik Suhu dan Kelembapan"
        },
        toolTip: {
            shared: true,
        },
        legend:{
            cursor:"pointer",
            verticalAlign: "bottom",
            horizontalAlign: "left",
            dockInsidePlotArea: true,
            itemclick: toogleDataSeries
        },
        axisX:{
            labelFontSize: 15,
            intervalType: "time",
            //valueFormatString: "HH:mm:ss",
            crosshair: {
                enabled: true,
                snapToDataPoint: true
            }
        },
        axisY: {
            interval: 10,
            valueFormatString: "0.0#",
            crosshair: {
                enabled: true
            }
        },
        data: [{
            type: "line",
            name: "Kelembapan",
            markerSize: 7,
            color: "#2980b9",
            xValueFormatString:"DD MMM HH:mm:ss <br/>-------------------------",
            yValueFormatString:"0.0'%'",
            showInLegend: true,
            lineDashType: "dash", 
            dataPoints: dataPoints1
        },
        {
            type: "line",
            name: "Suhu",
            markerSize: 7,
            color: "#c0392b",
            yValueFormatString:"0.0'&#8451;'",
            showInLegend: true, 
            dataPoints: dataPoints2
        }]

    });    

    function toogleDataSeries(e){
        if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
            e.dataSeries.visible = false;
        } else{
            e.dataSeries.visible = true;
        }
        chart.render();
    };

    
    var updateInterval = 1000;
    var dataLength = 10;
    //var time = new Date;

    function updateChart(){
        function addData (data){

            for (var i = 0; i < data.length; i++) {
                //time.setTime(time.getTime()+ updateInterval);

                dataPoints1.push({
                    x: new Date(data[i].datta0),
                    y: data[i].datta1
                });
                dataPoints2.push({
                    x: new Date(data[i].datta0),
                    y: data[i].datta2
                });
            }

        }
        $.getJSON("http://localhost/graphTest/graph1/data.php", addData); 

        if ((dataPoints1.length && dataPoints2.length) > dataLength) {
            dataPoints1.shift();
            dataPoints2.shift();
        }
        
        chart.render();         
                
    };

 
    updateChart(dataLength);    
    setInterval(function(){updateChart()}, updateInterval);

    chart.render();    
  

};