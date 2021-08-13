var BASE_URL = "https://versatileapi.herokuapp.com/api/";

function displaytext(result) {
  if (result.status == 'success') {
      //textContent 属性
      var monitoringResults = document.getElementById("monitoring-result")
      //  status: API呼出結果（成功時は”success”、失敗時は”fail”）
      monitoringResults.textContent = String("success")
      
      //つぶやきの内容
      var text = document.getElementById("return-text")
      text.textContent = result.text
  } 
  else {
    // 失敗の場合： none
    var monitoringResults = document.getElementById("monitoring-result")
    monitoringResults.textContent = String("error")
  }
}

function gettext() {
   //url
   var url = BASE_URL;  
  gettextAPI(url, 'GET', displaytext);
}

