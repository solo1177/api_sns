var BASE_URL = "https://versatileapi.herokuapp.com/api";

function displaytext(result) {

  if (result.status == 'success') {
  } else {
    // 失敗の場合： 
    none;
  }
}

function gettext() {
  gettextAPI(url, 'GET', userid, userpw, displayRoomStatus);
}
