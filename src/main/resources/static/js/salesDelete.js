'use strict'
function confirmation(str,results){
    



    var result = window.prompt(`"${str}"と入力してください`);
    if (result === str) {
        getDeleteSales();
        window.alert(`${results}しました!`);

    } else {
        
    }
}

async function getDeleteSales() {
    try {
        let path = window.location.pathname;
        let regex = /\/(\d+)$/;
        let match = path.match(regex);
        let number = match[1];

        const res = await fetch(`/api/salesDelete/${number}`,{
            method:'DELETE',
        });
        if (res.status === 400) {
            console.log('error');
        } else {
            const data = await res.json();
            console.log(data);
    
        }
    } catch (error) {
      console.log('エラーが発生しました', error);
    }
}