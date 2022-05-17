function getGeo(){
  if (navigator.geolocation) {
    navigator.geolocation.watchPosition(successCallback, errorCallback);
  } else {
    //Geolocation APIを利用できない環境向けの処理
  }
}

function successCallback(position) {
  var dict = convParamToObj()
  var desti = palce[dict.palce]
  var nlan = position.coords.latitude;
  var nlng = position.coords.longitude;
  var accuracy = (position.coords.accuracy > 50 ? position.coords.accuracy : 50);
  var dist = distance(nlan,nlng,desti.lan,desti.lng);
  var gl_text = "緯度：" + nlan + "<br>";
    gl_text += "経度：" + nlng + "<br>";
    gl_text += "高度：" + position.coords.altitude + "<br>";
    gl_text += "緯度・経度の誤差：" + accuracy + "<br>";
    gl_text += "高度の誤差：" + position.coords.altitudeAccuracy + "<br>";
    gl_text += "方角：" + position.coords.heading + "<br>";
    gl_text += "速度：" + position.coords.speed + "<br>";
    gl_text += "目的地との誤差：" + dist + "<br>";
    gl_text += "圏内にいるか：" + (dist < accuracy) + "<br>";
  document.getElementById("show_result").innerHTML = gl_text;
  if(dist<accuracy){
    sendMessages("text")
  }
}

function convParamToObj() {
  var search = location.search.substring(1);
  if (search) {
    return JSON.parse('{"' + decodeURI(search.replace(/&/g, "\",\"").replace(/=/g, "\":\"")) + '"}')
  }
  return {};
}

const R = Math.PI / 180;

function distance(lat1, lng1, lat2, lng2) {
  lat1 *= R;
  lng1 *= R;
  lat2 *= R;
  lng2 *= R;
  return 6371 * Math.acos(Math.cos(lat1) * Math.cos(lat2) * Math.cos(lng2 - lng1) + Math.sin(lat1) * Math.sin(lat2))*1000;
}

/***** 位置情報が取得できない場合 *****/
function errorCallback(error) {
  var err_msg = "";
  switch(error.code)
  {
    case 1:
      err_msg = "位置情報の利用が許可されていません";
      break;
    case 2:
      err_msg = "デバイスの位置が判定できません";
      break;
    case 3:
      err_msg = "タイムアウトしました";
      break;
  }
  document.getElementById("show_result").innerHTML = err_msg;
  //デバッグ用→　document.getElementById("show_result").innerHTML = error.message;
}

const palce = {
  '1':{lan:32.73834987305667, lng:129.8728843611234},
  '2':{lan:32.73393839225796, lng:129.87036199308952},
  '3':{lan:32.72964239045388, lng:129.86909062534943},
  '4':{lan:32.74620641316701, lng:129.87078302241486}
}
