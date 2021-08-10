var BASE_URL = "https://versatileapi.herokuapp.com/api";

function displayRoomStatus(result) {
  // サーバから返す結果
  // {  
  //  status: API呼出結果（成功時は”success”、失敗時は”fail”）,  
  //  description: API呼出結果の詳細, 
  //  illuminance: 照度,  
  //   humidity: 湿度,  
  //   airpressure: 気圧,  
  //   temperature: 気温
  // }

  //var monitoringResults = 
  //var temperature = 
  //var humidity = 
  //var airpressure = 
  //var illuminance = 
  //monitoringResults.textContent = 
  if (result.status == 'success') {
    //textContent 属性
    //temperature.textContent = 
    //humidity.textContent = 
    //airpressure.textContent = 
    //illuminance.textContent = 
  } else {
    // 失敗の場合： none
  }
}

function getRoomStatus() {
  // var userid =
  // var userpw =
  // var roomNum =
  // var url =
  callRoomStatusAPI(url, 'GET', userid, userpw, displayRoomStatus);
}
