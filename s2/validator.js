function email(value) {
  const regex = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/;
  return regex.test(value);
}

function username(value) {
  const regex = /^[a-z0-9-._]+$/;
  return regex.test(value);
}

module.exports = {
  email,
  username,
}