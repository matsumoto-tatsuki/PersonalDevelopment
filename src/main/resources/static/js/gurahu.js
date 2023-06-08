'use strict'

    getSales('2023');



    function listInit() {
        const label = [];
        const data = [];
      
        for (let i = 4; i < 10; i++) {
            label.push(`2023-0${i}`);
            data.push(0);
        }
      
        return {
            resultLabel : label,
            resultData : data
        };
    }

    function datasetsInit(label,data,color){
        return{
            label: label,
            data: data,
            borderColor:color,
            tension: 0.3,
            fill:false,
        }
    }

    
    
    function getSales(dateString) {
        const table = document.getElementById('table');
        fetch(`/api/salesAnalysis/${dateString}`)
        .then(res => {
            if(res.status === 400) {
              console.log('error')
            } else {
              res.json()
                .then(data => {
                    lineChart(data);
                    pieChart(data);
                });
            }
        });
    }

    function lineChart(data){
        console.log(data);
        const init = listInit();
        let dbLabel= init.resultLabel;
        let dbData1= init.resultData;
        let dbData2= listInit().resultData; 
        let dbData3= listInit().resultData; 
        let dbData5= listInit().resultData;
        let strHtml = `<thead><tr>
                        <th>事業部名</th>
                        <th>年月</th>
                        <th>利益</th>
                        </tr></thead>`;
        strHtml += '<tbody>';
        for(let i = 0;i < data.length;i++){
            let label = 0;
            for(let j=0;j<6;j++){
                if(data[i].date === dbLabel[j]){
                    label = j;
                    break;
                }
            }
            switch(data[i].divisionName){
                case '第1事業部':
                    dbData1[label] = data[i].returns;
                    break;
                case '第2事業部':
                    dbData2[label] = data[i].returns;
                    break;
                case '第3事業部':
                    dbData3[label] = data[i].returns;
                    break;
                case '第5事業部':
                    dbData5[label] = data[i].returns;
                    break;
            }
            strHtml += `<tr>
                            <td>${data[i].divisionName}</td>
                            <td>${data[i].date}</td>
                            <td>${data[i].returns}</td>
                        <tr>`;
        }
        strHtml += '</tbody>';


        let dataset = {
            labels: [],
            datasets: [
                {
                label: '第2事業部',
                data: [100, 95, 80, 85, 75],
                borderColor: 'blue',
                fill: false
                }
            ]
        };

        console.log(dbLabel);
        console.log(dbData1);
        console.log(dbData2);
        console.log(dbData3);
        console.log(dbData5);
        
        
        dataset.labels = dbLabel;
        dataset.datasets[0] = datasetsInit('第1事業部',dbData1,'red');
        dataset.datasets[1] = datasetsInit('第2事業部',dbData2,'blue');
        dataset.datasets[2] = datasetsInit('第3事業部',dbData3,'black');
        dataset.datasets[3] = datasetsInit('第5事業部',dbData5,'green');

        // table.innerHTML = strHtml;


        let ctx = document.getElementById('myChart').getContext('2d');
        let myChart = new Chart(ctx, {
            type: 'line',
            data: dataset,
            options: {
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: '月'
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: '利益'
                        }
                    }
                },
                responsive: false,
                maintainAspectRatio: false,
            }
        });
    }

    function pieChart(data){
        const data1 = pieDataSet();
        const data2 = pieDataSet();
        const data3 = pieDataSet();
        const data5 = pieDataSet();

        let labelString = listInit().resultLabel;
        console.log(labelString);

        for(let i = 0;i < data.length;i++){
            let label = 0;
            for(let j=0;j<6;j++){
                if(data[i].date === labelString[j]){
                    label = j;
                    break;
                }
            }
            switch(data[i].divisionName){
                case '第1事業部':
                    data1.datasets[0].data[label] = data[i].returns;
                    break;
                case '第2事業部':
                    data2.datasets[0].data[label] = data[i].returns;
                    break;
                case '第3事業部':
                    data3.datasets[0].data[label] = data[i].returns;
                    break;
                case '第5事業部':
                    data5.datasets[0].data[label] = data[i].returns;
                    break;
            }
        }

        console.log(data1.datasets[0].data);
        console.log(data2.datasets[0].data);
        console.log(data3.datasets[0].data);
        console.log(data5.datasets[0].data);
        pieCreate('pie1',data1);
        pieCreate('pie2',data2);
        pieCreate('pie3',data3);
        pieCreate('pie5',data5);
    }

    function pieDataSet(){
        const color = ["red", "blue", "yellow","black","green","orange"];
        const label = listInit().resultLabel;

        return {
            labels: label,
            datasets: [
              {
                data: [0, 0, 0, 0, 0, 0],
                fill: false,
                backgroundColor: color,
              }
            ]
        };
    }

    function pieCreate(id,data){
        let options ={
            plugins: {
            legend: {
              display: false 
            },
            },
            responsive: false,
            maintainAspectRatio: false,
        };

        let ctx = document.getElementById(id).getContext("2d");
        new Chart(ctx, {
            type: "pie",
            data: data,
            options: options
        });
    }
    