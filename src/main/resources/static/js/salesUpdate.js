'use strict'

flatpickr("#dateText", {
    dateFormat: "Y-m-d" // 日付の表示形式
});

function confirmation(str,results){
    var result = window.prompt(`"${str}"と入力してください`);
    if (result === str) {
        const id = document.getElementById('id').textContent;
        const date = document.getElementById('dateText').value;
        const customer = document.getElementById('customerSelect').value;
        const product = document.getElementById('productText').value;
        const cost = document.getElementById('costText').value;
        const price = document.getElementById('priceText').value;

        console.log(`id:${id},date:${date},customer:${customer},product:${product},cost:${cost},price:${price}`);
        getUpdateSales();
        window.alert(`${results}しました!`);

    } else {
        
    }
}

async function getUpdateSales() {
    try {
        let data =new URLSearchParams();
        const id = document.getElementById('id').textContent;
        const date = document.getElementById('dateText').value;
        const customer = document.getElementById('customerSelect').value;
        const product = document.getElementById('productText').value;
        const cost = document.getElementById('costText').value;
        const price = document.getElementById('priceText').value;
        const division = document.getElementById('divisionName').textContent;
        data.append('id',id);
        data.append('divisionName',division)
        data.append('date',date);
        data.append('customerName',customer);
        data.append('product',product);
        data.append('cost',cost);
        data.append('price',price);
        const res = await fetch(`/api/salesUpdate`,{
            method:'PUT',
            body:data,
        });
        if (res.status === 400) {
            console.log('inputError');
			window.alert('入力値がエラーです');
        } else {
            const data = await res.json();
            console.log(data);
    
        }
    } catch (error) {
      console.log('エラーが発生しました', error);
    }
}