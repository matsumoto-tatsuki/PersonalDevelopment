'use strict'

document.getElementById('date-add').addEventListener('click',()=>{
    
    let dataString = '';
    let inputDate = getCurrentDate();
    console.log(inputDate);
    let weekDate = inputDate.split('~');
    console.log(weekDate);
    let changeSelect = document.getElementById('changeSelect').value;
    const diviName = document.getElementById('divisionSelect').value;

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
    getSales(dataString,diviName); 
});

document.getElementById('date-back').addEventListener('click',()=>{

    let dataString = '';
    let inputDate = getCurrentDate();
    let weekDate = inputDate.split('~');
    console.log(weekDate);
    let changeSelect = document.getElementById('changeSelect').value;
    const diviName = document.getElementById('divisionSelect').value;

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
    getSales(dataString,diviName);  
});

document.getElementById('now').addEventListener('click', () => {
    const diviName = document.getElementById('divisionSelect').value;
    let date = new Date();
    // 結果をyyyy-mm-dd形式の文字列に変換する
    let year = date.getFullYear();
    let month = ('0' + (date.getMonth() + 1)).slice(-2);
    let day = ('0' + date.getDate()).slice(-2);
    let result = year + '-' + month + '-' + day;
    document.getElementById('date').textContent = result;
    document.getElementById('changeSelect').value = 'Day';
    getSales(result,diviName);
});

document.getElementById('divisionSelect').addEventListener('change',()=>{
    const dateString = getCurrentDate();
    const date = dateString === getDayNow() ? '2023' : dateString;
    const diviName = document.getElementById('divisionSelect').value;
    console.log(`DiviSele(date:${date})`);
    getSales(date,diviName);
});

document.getElementById('changeSelect').addEventListener('change',()=>{
    const diviName = document.getElementById('divisionSelect').value;
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
    getSales(dataString,diviName);
});

document.getElementById('all').addEventListener('click',()=>{
    document.getElementById('date').textContent = '全体';
    document.getElementById('divisionSelect').value = 'ALL';
    document.getElementById('changeSelect').value = 'Day';

    getSales('Day','ALL');
});


  
