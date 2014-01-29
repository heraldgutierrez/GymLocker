var NIKE = function(){
    return {
        new_review : function(){
            var nikeChart,
                nikeDistance = [],
                nikeDates    = [],
                options      = {
                chart: {
                        renderTo: 'main-container',
                        marginRight: 0,
                        marginBottom: 120,
                    },
                    title: {
                        text: 'Nike Plus',
                        x: -20 //center
                    },
					subtitle: {
						text: '20 Most Recent Runs',
						x: -20
					},
                    xAxis: {
                        categories: [],
                        labels:{
                            rotation: 90,
                            align: 'left'
                        }
                    },
                    yAxis: {
                        title: {
                            text: 'km'
                        },
                        plotLines: [{
                            value: 0,
                            width: 1,
                            color: '#808080'
                        }],
                    },
                    tooltip: {
                        formatter: function() {
                            return '<b>'+ this.x +'</b><br/>'+ this.y +' km';
                        }
                    },
                    legend: {
                        borderWidth: 0
                    },
                    series: []
            };
            $.getJSON('/nikeplus', function(data){
                var allRuns = [];
                $.each( data, function(key, value){
                    nikeDistance.push(parseFloat(data[key].distance));
                    nikeDates.push(data[key].date);
                });
                options.series = [{
                    name:'Distance',
                    type: 'spline',
                    data: nikeDistance,
                    color: '#4572A7',
                }];
                options.xAxis.categories = nikeDates;
                nikeChart = new Highcharts.Chart(options);
            });
        }
    }
}();