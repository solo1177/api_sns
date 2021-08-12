
function makeBasicAuth(userid, userpw) {
  var token = userid + ':' + userpw;
  var hash = btoa(token);
  return "Basic " + hash;
}

function getextAPI(url, method, callback) {
  var xhr = new XMLHttpRequest();
  //xhr.open(【どんな方法でデータを取得するか】, 【どのサーバーに対して】)
  xhr.send();
  xhr.onreadystatechange = function() {
    //if(【いつデータを取得するか】) 
    if(xhr.readyState === 4 && xhr.status === 200) {  //データ取得後の処理内容 （通信が成功した時）
      print('Succeeded');
    }
  }

  $.ajax({
      url: url, //アクセスするURLかディレクトリ
      type: method,
      cache: false, //cacheを使うかどうか
      dataType:'json', //data type scriptなどデータタイプの指定
      data:data, //アクセスするときに必要なデータを 記載

      beforeSend: function (xhr) {
        xhr.setRequestHeader('Authorization', makeBasicAuth(userid, userpw));
      },
	    
      success : function(data, status, xhr) {//通信が成功したときのコールバックの処理を書く
        var retrievedSensors = {};
        var results = {};
        for (i=0; i<data.length; i++) {
          retrievedSensors[data[i].sensor_type] = data[i].value;
        }
        requestSensorType.forEach(function(type){
          if (retrievedSensors[type] == null) {
            results[type] = 'none';
          } else {
            results[type] = retrievedSensors[type];
          }
      });

      callback({//コールバックする内容を返す
          status : 'success',
          description : 'Succeeded getting room status',
          illuminance : results.illuminance,
          });
	    },

	    error : function(xhr, status, error) {  //通信が失敗したときのコールバックの処理を書く
        var err = JSON.parse(xhr.responseText);
        var errorMsg = '[' + err.status + '] '  + err.description ;
        callback({
          status : 'fail',
          description : errorMsg,
        }
      )}
    })
}
