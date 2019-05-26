function setCookie(key, value){
  key = escape(key);
  value = escape(value)
  var cookie = key + '=' + value + ';path=/';
  document.cookie = cookie;
}

function getCookies(){
  var cookies = document.cookie.split(';');
  var result = {};
  for(c of cookies){
    c = c.split('=');
    var key = c[0].trim();
    var value = c[1].trim();
    result[key] = value;
  }
  return result;
}

function getCookieValue(key){
  var cookies = getCookies();
  return cookies[key];
}
