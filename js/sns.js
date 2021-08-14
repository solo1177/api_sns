var BASE_URL = "https://versatileapi.herokuapp.com/api/";

function displaytext(result) {
  if (result.status == 'success') {
      //textContent 属性
      var monitoringResults = document.getElementById("monitoring-result")
      //  status: API呼出結果（成功時は”success”、失敗時は”fail”）
      monitoringResults.textContent = String("success")
    
      //つぶやきの内容を一つずつ取得。pタグとdivタグで囲んで返す
      var resultdiv = document.getElementById("result");

      for (i=0; i<result.text.length; i++) { 
        var textdiv = document.createElement("div"); //divタグを作る
        textdiv.className ="text_all"

        //user_id
        var user_p = document.createElement("p"); //pタグを作る
        var user_id = document.createTextNode(result.user_id[i]) //user_idを文字情報として取得
        user_p.appendChild(user_id); //user_idをpタグの中に追加
        textdiv.appendChild(user_p); //pタグをdivに追加

        //posted_at
        var posted_p = document.createElement("p");
        var updated_at = document.createTextNode(result.updated_at[i])
        posted_p.appendChild(updated_at)
        textdiv.appendChild(posted_p);

        //text
        var text_p = document.createElement("p");        
        var text = document.createTextNode(result.text[i])
        text_p.appendChild(text);
        textdiv.appendChild(text_p);
        console.log(textdiv)

        resultdiv.appendChild(textdiv);
      }

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

