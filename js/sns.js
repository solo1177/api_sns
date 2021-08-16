var BASE_URL = "https://versatileapi.herokuapp.com/api/";

function displaytext(result) { //つぶやきの表示
  if (result.status == 'success') {
      //textContent 属性
      var monitoringResults = document.getElementById("monitoring-result")
      //  status: API呼出結果（成功時は”success”、失敗時は”fail”）
      monitoringResults.textContent = String("success")
    
      //つぶやきの内容を一つずつ取得。pタグとdivタグで囲んで返す
      var resultdiv = document.getElementById("result");

      for (i=0; i<result.text.length; i++) { 

        var userdiv = document.createElement("div"); //divタグを作る
        userdiv.className ="text_all" //divのクラス名を指定

        //user_id
        var user_p = document.createElement("p"); //pタグを作る
        var user_id = document.createTextNode(result.user_id[i]) //user_idを文字情報として取得
        user_p.appendChild(user_id); //user_idをpタグの中に追加
        userdiv.appendChild(user_p); //pタグをdivに追加

        //updated_at
        var updated_p = document.createElement("p");
        var updated_at = document.createTextNode(result.updated_at[i])
        updated_p.appendChild(updated_at)
        userdiv.appendChild(updated_p);

        //text
        var description_p = document.createElement("p");        
        var text = document.createTextNode(result.text[i])
        description_p.appendChild(text);
        userdiv.appendChild(description_p);

        //resultdivにdivを追加
        resultdiv.appendChild(userdiv);
      }
  } 
  else {
    // 失敗の場合： none
    var monitoringResults = document.getElementById("monitoring-result")
    monitoringResults.textContent = String("error")
  }
}

function displayuser(result){ //ユーザー情報の表示
  if (result.status == 'success') {
    //textContent 属性
    var monitoringResults = document.getElementById("monitoring-result")
    //  status: API呼出結果（成功時は”success”、失敗時は”fail”）
    monitoringResults.textContent = String("success")
  
    //つぶやきの内容を一つずつ取得。pタグとdivタグで囲んで返す
    var resultdiv = document.getElementById("result");

    for (i=0; i<result.user_id.length; i++) { 

      var userdiv = document.createElement("div"); //divタグを作る
      userdiv.className ="text_all" //divのクラス名を指定

      //user_name
      var name_p = document.createElement("p");
      var user_name = document.createTextNode(result.user_name[i])
      name_p.appendChild(user_name)
      userdiv.appendChild(name_p);
      
      //user_id
      var user_p = document.createElement("p"); //pタグを作る
      var user_id = document.createTextNode(result.user_id[i]) //user_idを文字情報として取得
      user_p.appendChild(user_id); //user_idをpタグの中に追加
      userdiv.appendChild(user_p); //pタグをdivに追加

      //description
      var description_p = document.createElement("p");        
      var user_description = document.createTextNode(result.user_description[i])
      description_p.appendChild(user_description);
      userdiv.appendChild(description_p);

      //resultdivにdivを追加
      resultdiv.appendChild(userdiv);
    }
} 
else {
  // 失敗の場合： none
  var monitoringResults = document.getElementById("monitoring-result")
  monitoringResults.textContent = String("error")
}
}


function displaypostresult(result){
  if (result.status == 'success') {
    //textContent 属性
    var monitoringResults = document.getElementById("monitoring-result")
    //  status: API呼出結果（成功時は”success”、失敗時は”fail”）
    monitoringResults.textContent = String("post success")
} 
else {
  // 失敗の場合： none
  var monitoringResults = document.getElementById("monitoring-result")
  monitoringResults.textContent = String("post error")
}
}


function gettext() {
   //url
   var url = BASE_URL;  
  gettextAPI(url, 'GET', displaytext);
}

function getuser() {
  //url
  var url = BASE_URL;  
 getuserAPI(url, 'GET', displayuser);
}


function posttext() { //つぶやきの投稿
  var url = BASE_URL;  
  //つぶやきの内容
  var text = document.getElementById("posttext")
  var text_content = text.value
  var data = {
      "text": text_content
  }
 posttextAPI(url, 'POST', data, displaypostresult);
}

