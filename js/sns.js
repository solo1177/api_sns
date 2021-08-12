var BASE_URL = "https://versatileapi.herokuapp.com/api";

function displaytext(result) {

  if (result.status == 'success') {
      //textContent 属性
      var monitoringResults = document.getElementById("monitoring-result")
      //  status: API呼出結果（成功時は”success”、失敗時は”fail”）
      monitoringResults.textContent = String("success")
      //   temperature: 気温
      var temperature = document.getElementById("room-temperature")
      //  description: API呼出結果の詳細
      temperature.textContent = result.temperature
  } 
  else {
    var monitoringResults = document.getElementById("monitoring-result")
    monitoringResults.textContent = String("none")
  
    // 失敗の場合： none
    var temperature = document.getElementById("room-temperature")

    temperature.textContent = String("none")
  }
}

function gettext() {
   //userid
   var u = document.getElementById("iniad-id");
   var userid = u.value
   //userpw 
   var up = document.getElementById("iniad-pw");
   var userpw = up.value

   //url
   var url = BASE_URL;  

  gettextAPI(url, 'GET', displaytext);
}
