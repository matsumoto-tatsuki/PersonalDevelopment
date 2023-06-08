'use strict'

document.getElementById('date-add').addEventListener('click',()=>{
    let dataString = '';
    let inputDate = getCurrentDate();
    console.log(inputDate);
    let weekDate = inputDate.split('~');
    console.log(weekDate);
    let changeSelect = document.getElementById('changeSelect').value;
    const diviName = document.getElementById('divisionName').textContent;

    switch(changeSelect){
        case 'Day':
            dataString = incrementDate(weekDate[0]);
            document.getElementById('date').textContent = dataString;
            break;
        case 'Week':
            let weekString = [];
            if(weekDate.length === 2){
                weekString = getWeekBounds(incrementDate(weekDate[1]));
            }else{
                weekString = getWeekBounds(weekDate[0]);
            }
            dataString = `${weekString.start}~${weekString.end}`;
            document.getElementById('date').textContent = dataString;
            break;
        case 'Month':
            dataString = incrementMonth(weekDate[0]);
            document.getElementById('date').textContent = dataString;
            break;
        case 'Year':
            dataString = incrementYear(weekDate[0]);
            document.getElementById('date').textContent = dataString;
            break;
    } 
    console.log(`dataString:${dataString}`);
    console.log(`diviName:${diviName}`);
    getDivisionSales(dataString,diviName); 
});

document.getElementById('date-back').addEventListener('click',()=>{

    let dataString = '';
    let inputDate = getCurrentDate();
    let weekDate = inputDate.split('~');
    console.log(weekDate);
    let changeSelect = document.getElementById('changeSelect').value;
    const diviName = document.getElementById('divisionName').textContent;

    switch(changeSelect){
        case 'Day':
            dataString = decrementDate(weekDate[0]);
            document.getElementById('date').textContent = dataString;
            break;
        case 'Week':
            let weekString = [];
            if(weekDate.length === 2){
                weekString = getWeekBounds(decrementDate(weekDate[0]));
            }else{
                weekString = getWeekBounds(weekDate[0]);
            }
            dataString = `${weekString.start}~${weekString.end}`;
            document.getElementById('date').textContent = dataString;
            break;
        case 'Month':
            dataString = decrementMonth(weekDate[0]);
            document.getElementById('date').textContent = dataString;
            break;
        case 'Year':
            dataString = decrementYear(weekDate[0]);
            document.getElementById('date').textContent = dataString;
            break;
    }
    console.log(`dataString:${dataString}`);
    console.log(`diviName:${diviName}`);
    getDivisionSales(dataString,diviName);  
});

document.getElementById('now').addEventListener('click', () => {
    const diviName = document.getElementById('divisionName').textContent;
    let date = new Date();
    // 結果をyyyy-mm-dd形式の文字列に変換する
    let year = date.getFullYear();
    let month = ('0' + (date.getMonth() + 1)).slice(-2);
    let day = ('0' + date.getDate()).slice(-2);
    let result = year + '-' + month + '-' + day;
    document.getElementById('date').textContent = result;
    document.getElementById('changeSelect').value = 'Day';
    getDivisionSales(result,diviName);
});


document.getElementById('changeSelect').addEventListener('change',()=>{
    const diviName = document.getElementById('divisionName').textContent;
    const changeSelect = document.getElementById('changeSelect').value;
    let dataString = '';
    let inputDate = getCurrentDate();
    let weekDate = inputDate.split('~');

    switch(changeSelect){
        case 'Day':
            dataString = getDay(weekDate[0]);
            document.getElementById('date').textContent = dataString;
            break;
        case 'Week':
            let weekString = [];
            if(weekDate.length === 2){
                weekString = getWeekBounds(decrementDate(weekDate[0]));
            }else{
                weekString = getWeekBounds(weekDate[0]);
            }
            dataString = `${weekString.start}~${weekString.end}`;
            document.getElementById('date').textContent = dataString;
            break;
        case 'Month':
            dataString = getMonth(weekDate[0]);
            console.log(dataString);
            document.getElementById('date').textContent = dataString;
            break;
        case 'Year':
            dataString = getYear(weekDate[0]);
            document.getElementById('date').textContent = dataString;
            break;
    }
    console.log(`dataString:${dataString}`);
    console.log(`diviName:${diviName}`);
    getDivisionSales(dataString,diviName);
});

document.getElementById('all').addEventListener('click',()=>{
    document.getElementById('date').textContent = '全体';
    const diviName = document.getElementById('divisionName').textContent;
    document.getElementById('changeSelect').value = 'Day';

    getDivisionSales('Day',diviName);
});


function getDetailPass(id){
    location.href = `/salesDetail/${id}`;
}



function getDivisionSales(dateString,diviName) {
    const table = document.getElementById('table');
    let sum = 0;
    table.innerHTML = '';
    let strhtml='';
      fetch(`/api/sales/${diviName}/${dateString}`)
      .then(res => {
        if(res.status === 400) {
          console.log('error')
        } else {
          res.json()
          .then(data => {
            console.log(data)
            strhtml += `<thead>
            <tr>
                <th>日付</th>
                <th>費用</th>
                <th>売上</th>
                <th>利益</th>
                <th>詳細</th>
            </tr>
            </thead>`;
            strhtml += '<tbody>';
            for(let i=0;i < data.length;i++){

                const date = data[i].date;
                const cost = data[i].cost;
                const price = data[i].price;
                const returns = price - cost;
                sum += returns;

                strhtml += `<tr><td>${date}</td><td>${cost}</td><td>${price}</td><td>${returns}</td><td><a class="detail_btn" onClick='getDetailPass(${data[i].id})'>詳細</a></td></tr>`;
            }
            table.innerHTML = strhtml;
            document.getElementById('returns').textContent = sum;
          })
        }
    });
}