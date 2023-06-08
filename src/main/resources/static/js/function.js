function getCurrentDate(){
    const value = document.getElementById('date').textContent;
    console.log(`value:${value}`);
    if(value === '全体'){
        let date = new Date();
        // 結果をyyyy-mm-dd形式の文字列に変換する
        let year = date.getFullYear();
        let month = ('0' + (date.getMonth() + 1)).slice(-2);
        let day = ('0' + date.getDate()).slice(-2);
        return year + '-' + month + '-' + day;
    }else{
        return value;
    }
}

function getDayNow(){
    // 入力された文字列をDateオブジェクトに変換する
    let date = new Date();
  
  
    // 結果をyyyy-mm-dd形式の文字列に変換する
    let year = date.getFullYear();
    let month = ('0' + (date.getMonth() + 1)).slice(-2);
    let day = ('0' + date.getDate()).slice(-2);
    let result = year + '-' + month + '-' + day;
  
    return result;
}

function getDay(dateString){
    // 入力された文字列をDateオブジェクトに変換する
    let date = new Date(dateString);
  
  
    // 結果をyyyy-mm-dd形式の文字列に変換する
    let year = date.getFullYear();
    let month = ('0' + (date.getMonth() + 1)).slice(-2);
    let day = ('0' + date.getDate()).slice(-2);
    let result = year + '-' + month + '-' + day;
  
    return result;
}

function getMonth(dateString){
    // 入力された文字列をDateオブジェクトに変換する
    let date = new Date(dateString);
  
  
    // 結果をyyyy-mm-dd形式の文字列に変換する
    let year = date.getFullYear();
    let month = ('0' + (date.getMonth() + 1)).slice(-2);

    let result = year + '-' + month;
  
    return result;
}

function getYear(dateString){
    // 入力された文字列をDateオブジェクトに変換する
    let date = new Date(dateString);
  
  
    // 結果をyyyy-mm-dd形式の文字列に変換する
    let year = date.getFullYear();

    let result = year;
  
    return result;
}

function incrementDate(dateString) {
    // 入力された文字列をDateオブジェクトに変換する
    let date = new Date(dateString);
  
    // 日付を1日進める
    date.setDate(date.getDate() + 1);
  
    // 結果をyyyy-mm-dd形式の文字列に変換する
    let year = date.getFullYear();
    let month = ('0' + (date.getMonth() + 1)).slice(-2);
    let day = ('0' + date.getDate()).slice(-2);
    let result = year + '-' + month + '-' + day;
  
    return result;
}

function decrementDate(dateString) {
    // 入力された文字列をDateオブジェクトに変換する
    let date = new Date(dateString);
  
    // 日付を1日進める
    date.setDate(date.getDate() - 1);
  
    // 結果をyyyy-mm-dd形式の文字列に変換する
    let year = date.getFullYear();
    let month = ('0' + (date.getMonth() + 1)).slice(-2);
    let day = ('0' + date.getDate()).slice(-2);
    let result = year + '-' + month + '-' + day;
  
    return result;
}

function getWeekBounds(dateString) {
    let today = new Date(dateString);
    let dayOfWeek = today.getDay();
    let start = new Date(today);
    let end = new Date(today);
  
    start.setDate(today.getDate() - dayOfWeek); // 週の最初の日
    end.setDate(today.getDate() + (6 - dayOfWeek)); // 週の最後の日
  
    // 結果をyyyy-mm-dd形式の文字列に変換する
    let startYear = start.getFullYear();
    let startMonth = ('0' + (start.getMonth() + 1)).slice(-2);
    let startDay = ('0' + start.getDate()).slice(-2);
    let endYear = end.getFullYear();
    let endMonth = ('0' + (end.getMonth() + 1)).slice(-2);
    let endDay = ('0' + end.getDate()).slice(-2);
  
    let startString = startYear + '-' + startMonth + '-' + startDay;
    let endString = endYear + '-' + endMonth + '-' + endDay;
  
    return {
      start: startString,
      end: endString
    };
}

function incrementMonth(dateString) {
    let today = new Date(dateString);
    let currentMonth = today.getMonth();
    let currentYear = today.getFullYear();
    let nextMonth;
    let nextYear;
  
    if (currentMonth === 11) {
      nextMonth = 0;
      nextYear = currentYear + 1;
    } else {
      nextMonth = currentMonth + 1;
      nextYear = currentYear;
    }
  
    let nextMonthString = nextYear + '-' + ('0' + (nextMonth + 1)).slice(-2);
  
    return nextMonthString;
}

function decrementMonth(dateString) {
    let today = new Date(dateString);
    let currentMonth = today.getMonth();
    let currentYear = today.getFullYear();
    let nextMonth;
    let nextYear;
  
    if (currentMonth === 0) {
      nextMonth = 11;
      nextYear = currentYear - 1;
    } else {
      nextMonth = currentMonth - 1;
      nextYear = currentYear;
    }
  
    let nextMonthString = nextYear + '-' + ('0' + (nextMonth + 1)).slice(-2);
  
    return nextMonthString;
}

function incrementYear(dateString) {
    let today = new Date(dateString);
    let currentYear = today.getFullYear();
    let nextYear = currentYear + 1;

    let nextYearString = nextYear.toString();

    return nextYearString;
}

function decrementYear(dateString) {
    let today = new Date(dateString);
    let currentYear = today.getFullYear();
    let nextYear = currentYear - 1;

    let nextYearString = nextYear.toString();

    return nextYearString;
}

function getSales(dateString,diviName) {
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
                <th>担当事業部</th>
                <th>費用</th>
                <th>売上</th>
                <th>利益</th>
            </tr>
            </thead>`;
            strhtml += '<tbody>';
            for(let i=0;i < data.length;i++){

                const date = data[i].date;
                const divisionName = data[i].divisionName;
                const cost = data[i].cost;
                const price = data[i].price;
                const returns = price - cost;
                sum += returns;

                strhtml += `<tr><td>${date}</td><td>${divisionName}</td><td>${cost}</td><td>${price}</td><td>${returns}</td></tr>`;
            }
            table.innerHTML = strhtml;
            document.getElementById('returns').textContent = sum;
          })
        }
    });
}

