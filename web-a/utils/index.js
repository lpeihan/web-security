exports.getRandomString = () => {
  return Math.random().toString().slice(2);
};

exports.filterXSS = (str) => {
  if (!str) {
    return "";
  }

  str = str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quto;")
    .replace(/'/g, "&#39;")
    .replace(/`/g, "&#96;")
    .replace(/\//g, "&#x2F;");

  return str;
};
