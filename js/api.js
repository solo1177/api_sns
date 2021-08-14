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

      //通信が成功したときのコールバックの処理を書く
      success : function(data) {
        //取得したデータを入れる
        var text = [];
        var user_id = [];
        var updated_at = [];
        for (i=0; i<data.length; i++) {
          text.push(data[i].text);
          user_id.push(data[i]._user_id);
          updated_at.push(data[i]._updated_at);
        }
      
        callback({//コールバックする内容を返す
          status : 'success',//ステータス
          text : text,
          user_id : user_id,
          updated_at : updated_at
        });
	    },
      
      //通信が失敗したときのコールバックの処理を書く
	    error : function(xhr) {  
        var err = JSON.parse(xhr.responseText);
        var errorMsg = '[' + err.status + '] '  + err.description ;
        callback({
          status : 'fail',
          description : errorMsg,
        }
      )}
      
    })
}
