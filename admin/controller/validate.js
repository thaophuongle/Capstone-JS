function checkEmpty(value, idErr, message) {
  if (value.trim() === "") {
    document.querySelector(idErr).innerHTML = message;
    document.querySelector(idErr).style.display = "block";
    return false;
  } else {
    document.querySelector(idErr).innerHTML = "";
    return true;
  }
}

function checkNumber(value, idErr, message) {
  const re = /^[0-9]+$/;

  var isString = re.test(value);
  if (isString) {
    document.querySelector(idErr).innerHTML = "";
    return true;
  } else {
    document.querySelector(idErr).style.display = "block";
    document.querySelector(idErr).innerHTML = message;
    return false;
  }
}
