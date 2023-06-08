'use strict'


flatpickr("#dateText", {
    dateFormat: "Y-m-d" // 日付の表示形式
});

function resetClick(){
    document.getElementById('dateText').value = "";
    document.getElementById('customerSelect').value = "";
    document.getElementById('productText').value = "";
    document.getElementById('costText').value = "";
    document.getElementById('priceText').value = "";
}


function confirmation(str,results){

	let result = window.prompt(`"${str}"と入力してください`);
	if (result === str) {
		const date = document.getElementById('dateText').value;
		const customer = document.getElementById('customerSelect').value;
		const product = document.getElementById('productText').value;
		const cost = document.getElementById('costText').value;
		const price = document.getElementById('priceText').value;

		console.log(`date:${date},customer:${customer},product:${product},cost:${cost},price:${price}`);

		getInsertSales();
		window.alert(`${results}しました!`);
	}
	
}

let isText = true;
console.log(document.getElementById('divisionName').textContent);
function toggleInput() {
  var inputContainer = document.getElementById("inputContainer");

  // 入力項目をクリア
  inputContainer.innerHTML = "";

  if (isText) {
    // テキストボックスを生成
    let textField = document.createElement("input");
    textField.type = "text";
    textField.id = "customerSelect";
    inputContainer.appendChild(textField);
  } else {
    // セレクトボックスを生成
     getCustomerSelect2("inputContainer");
  }

  // 切り替えフラグの反転
  isText = !isText;
}




function getCustomerSelect(id) {

    fetch(`/api/salesCustomer1`)
      .then(res => {
        if(res.status === 400) {
          console.log('error')
        } else {
            res.json()
          .then(data => {
            console.log(data);

            let selectField = document.createElement("select");
            selectField.name = "selectField";
            

            for(let i=0;i<data.length;i++){
                let option = document.createElement("option");
                option.value = data[i].cutomerName;
                option.text = data[i].cutomerName;
                selectField.appendChild(option);
            }
            const container = document.getElementById(id);
            container.innerHTML = "";
            container.appendChild(selectField);

          })
        }
    });
}

async function getCustomerSelect2(id) {
    try {
      const res = await fetch(`/api/salesCustomer`);
      if (res.status === 400) {
        console.log('error');
      } else {
        const data = await res.json();
        console.log(data);
  
        let selectField = document.createElement("select");
        selectField.name = "selectField";
        selectField.id = "customerSelect";

        let option = document.createElement("option");
        option.value = "";
        option.text = '選択してください';
        selectField.appendChild(option);

        for (let i = 0; i < data.length; i++) {
          let option = document.createElement("option");
          option.value = data[i].customerName;
          option.text = data[i].customerName;
          selectField.appendChild(option);
        }
  
        const container = document.getElementById(id);
        container.innerHTML = "";
        container.appendChild(selectField);
      }
    } catch (error) {
      console.log('エラーが発生しました', error);
    }
}

async function getInsertSales() {
    try {
        let data =new URLSearchParams();
        const id = '0';
        const date = document.getElementById('dateText').value;
        const customer = document.getElementById('customerSelect').value;
        const product = document.getElementById('productText').value;
        const cost = document.getElementById('costText').value;
        const price = document.getElementById('priceText').value;
        const division = document.getElementById('divisionName').textContent;

        data.append('id',id)
        data.append('divisionName',division)
        data.append('date',date);
        data.append('customerName',customer);
        data.append('product',product);
        data.append('cost',cost);
        data.append('price',price);
        const res = await fetch(`/api/salesInsert`,{
            method:'POST',
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