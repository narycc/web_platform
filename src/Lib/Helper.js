
function formateMoney (money, fixed, len) {
  var n = parseInt(fixed) || 2,
    len = parseInt(len) || 3,
    money = parseFloat((money + '').replace(/[^\d\.-]/g, '')).toFixed(n) + '',
    l = money.split('.')[0].split('').reverse(),
    r = money.split('.')[1],
    t = '';

  for (let i = 0; i < l.length; i++) {
    t += l[i] + ((i + 1) % len == 0 && (i + 1) != l.length ? ',' : '');
  }

  if (fixed == 0) {
    return t.split('').reverse().join('');
  } else {
    return t.split('').reverse().join('') + '.' + r;
  }
}

export const TimeStrGetDate = function (str) {
  return str.split('T')[0];
};

export const FormatMoneyByM = function (money, fixed, len){
  var money = parseInt(money) || 0;
  return formateMoney(parseFloat(money / 100).toFixed(2), fixed, len);
};

function formateTimeObject(time) {
  function _addZore(num) {
    if (num < 10) {
      num = '0' + num;
    }
    return num;
  }

  if (typeof time != 'object') {
    time = '' + time;
    if (time.length > 12) {
      time = new Date(parseInt(time));
    } else {
      time = new Date(parseInt(time) * 1000);
    }
  }

  var year = time.getFullYear();
  var month = _addZore(time.getMonth() + 1);
  var date = _addZore(time.getDate());
  var hours = _addZore(time.getHours());
  var minutes = _addZore(time.getMinutes());
  var seconds = _addZore(time.getSeconds());
  return {
    year: year,
    month: month,
    date: date,
    hours: hours,
    minutes: minutes,
    seconds: seconds,
    str: year + '-' + month + '-' + date + ' ' + hours + ':' + minutes + ':' + seconds
  };
};

export const FormateTime = function (time) {

  let obj = formateTimeObject(time);
  return obj.year + "-" + obj.month + "-" + obj.date + " " + obj.hours + ":" + obj.minutes + ":" + obj.seconds;

};


const accurateMultiplication = function (arg1, arg2) {
  var m = 0, s1 = arg1.toString(), s2 = arg2.toString();
  try {
    m += s1.split(".")[1].length
  } catch (e) {
  }
  try {
    m += s2.split(".")[1].length
  } catch (e) {
  }
  return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m)
};

export const FormatRate = function( float){
  if(!float){
    return '--';
  }
  if (float % 1 === 0) {
    return ((float * 100) + "%")
  } else {
    return (accurateMultiplication(float, 100) + "%")
  }

};

export const GetDaysDistance = function(firstDate, secondDate) {
  return parseInt(( (new Date(firstDate)).getTime() - (new Date(secondDate)).getTime() ) / (1000 * 24 * 3600), 10);
};
