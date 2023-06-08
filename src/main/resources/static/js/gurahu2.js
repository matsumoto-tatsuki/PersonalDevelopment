'use strict'

/*    main      */
let divisionName = document.getElementById('divisionName').textContent;
getSales(divisionName);

/*              */



function getSales(divisionName) {
    fetch(`/api/salesAnalysisDivision/${divisionName}`)
    .then(res => {
        if(res.status === 400) {
            console.log('error')
        } else {
            res.json()
            .then(data => {
                lineBarChart(data);
            });
        }
    });
}

function listInit() {
    const label = [];
    const data = [];
    const color = [];
    let blueColor = "rgba(0, 128, 255, 0.3)";
  
    for (let i = 4; i < 10; i++) {
        label.push(`2023-0${i}`);
        data.push(0);
        color.push(blueColor);
    }
  
    return {
        resultLabel : label,
        resultData : data,
        resultColor : color
    };
}

function lineBarChart(data){

    const labels = listInit().resultLabel;
    const dataNum = listInit().resultData;
    const colorInfo = listInit().resultColor;

    let redColor = "rgba(255, 0, 0, 0.3)";

    for(let i=0;i<data.length;i++){
        let label = 0;
        for(let j=0;j<6;j++){
            if(data[i].date === labels[j]){
                label = j;
                break;
            }
        }
        dataNum[label] = data[i].returns;
        if(data[i].returns < 0){
            colorInfo[label] = redColor;
        }
    }

    let dataSet ={
        labels : labels,
        datasets:[
            {
                label:'折れ線グラフ',
                data: dataNum,
                fill: false,
                borderColor: 'green',
                tension: 0.3,
                type: "line" // 折れ線グラフを指定
            },
            {
                label:'棒グラフ',
                data: dataNum,
                backgroundColor: colorInfo,
                type: "bar" // 折れ線グラフを指定
            }
        ]
    };

    let ctx = document.getElementById("myChart").getContext("2d");
    new Chart(ctx, {
        type: "bar",
        data: dataSet,
        options: {
            responsive: false,
            maintainAspectRatio: false,
        }
    });

}