function makeBasicAuth(userid, userpw) {
  var token = userid + ':' + userpw;
  var hash = btoa(token);
  return "Basic " + hash;
}

function callLockerPositionAPI(url, method, userid, userpw, callback) {
  $.ajax({
	    type : method,
	    url : url,
	    dataType : 'json',
      beforeSend: function (xhr) {
        xhr.setRequestHeader('Authorization', makeBasicAuth(userid, userpw));
      },
	    success : function(data, status, xhr) {
        callback({
          status : 'success',
          description : 'Succeeded getting locker information',
          lockerAddress : data.name,
          lockerFloor : data.floor
        });
	    },
	    error : function(xhr, status, error) {
        var err = JSON.parse(xhr.responseText);
        var errorMsg = '[' + err.status + '] '  + err.description ;
        callback({
          status : 'fail',
          description : errorMsg,
          lockerAddress : null,
          lockerFloor : null
        });
	    }
	});
}

function callRegisteredIccardAPI(url, method, userid, userpw, callback) {
  $.ajax({
	    type : method,
	    url : url + '/1',
	    dataType : 'json',
      beforeSend: function (xhr) {
        xhr.setRequestHeader('Authorization', makeBasicAuth(userid, userpw));
      },
	    success : function(data, status, xhr) {
        callback({
          status : 'success',
          description : 'Succeeded getting IC card information',
          iccardID : data.uid,
          iccardComment : data.comment
        });
	    },
	    error : function(xhr, status, error) {
        var err = JSON.parse(xhr.responseText);
        var errorMsg = '[' + err.status + '] '  + err.description ;
        callback({
          status : 'fail',
          description : errorMsg,
          iccardID : null,
          iccardComment : null
        });
	    }
	});
}

function callRoomStatusAPI(url, method, userid, userpw, callback) {
  var requestSensorType = ['temperature', 'humidity', 'illuminance', 'airpressure'];
  var requestUrl = url + '?sensor_type=';
  for (i=0; i<requestSensorType.length; i++) {
    requestUrl += requestSensorType[i] + '+';
    if (i == requestSensorType.length - 1) {
      requestUrl += requestSensorType[i];
    }
  }
  $.ajax({
	    type : method,
	    url : requestUrl,
	    dataType : 'json',
      beforeSend: function (xhr) {
        xhr.setRequestHeader('Authorization', makeBasicAuth(userid, userpw));
      },
	    success : function(data, status, xhr) {
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
        callback({
          status : 'success',
          description : 'Succeeded getting room status',
          illuminance : results.illuminance,
          humidity : results.humidity,
          airpressure : results.airpressure,
          temperature : results.temperature
        });
	    },
	    error : function(xhr, status, error) {
        var err = JSON.parse(xhr.responseText);
        var errorMsg = '[' + err.status + '] '  + err.description ;
        callback({
          status : 'fail',
          description : errorMsg,
          illuminance : null,
          humidity : null,
          airpressure : null,
          temperature : null
        });
	    }
	});
}

function callIccardAPI(url, method, data, userid, userpw, callback) {
  var newUrl = url;
  var successMsg = 'Succeeded registering IC card';
  if (method == 'DELETE') {
    newUrl += '/1';
    successMsg = 'Succeeded deleting IC card';
  }
  $.ajax({
	    type : method,
	    url : newUrl,
      data : data,
	    dataType : 'json',
      beforeSend: function (xhr) {
        xhr.setRequestHeader('Authorization', makeBasicAuth(userid, userpw));
      },
	    success : function(data, status, xhr) {
        callback({
          status : 'success',
          description : successMsg,
        });
	    },
	    error : function(xhr, status, error) {
        var err = JSON.parse(xhr.responseText);
        var errorMsg = '[' + err.status + '] '  + err.description ;
        callback({
          status : 'fail',
          description : errorMsg,
        });
	    }
	});
}
