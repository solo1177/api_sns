function gettextAPI(url, method, callback) {
  var xhr = new XMLHttpRequest();
  //xhr.open(【どんな方法でデータを取得するか】, 【どのサーバーに対して】)
  //xhr.send();
  xhr.onreadystatechange = function() {
    //if(【いつデータを取得するか】) 
    if(xhr.readyState === 4 && xhr.status === 200) {  //データ取得後の処理内容 （通信が成功した時）
      print('Succeeded');
    }
  }

  $.ajax({
      url: url + "text/all", //アクセスするURLかディレクトリ
      type: method, //getかput
      cache: false, //cacheを使うかどうか
      dataType:'json', //data type scriptなどデータタイプの指定

      success : function(data) {//通信が成功したときのコールバックの処理を書く
        //取得したデータを入れる
        var results = "";
        for (i=0; i<data.length; i++) {
          results += data[i].text + "\n";
        }
        
        callback({//コールバックする内容を返す
          status : 'success',//ステータス
          text : results
        });
	    },

	    error : function(xhr) {  //通信が失敗したときのコールバックの処理を書く
        var err = JSON.parse(xhr.responseText);
        var errorMsg = '[' + err.status + '] '  + err.description ;
        callback({
          status : 'fail',
          description : errorMsg,
        }
      )}
    })
}
