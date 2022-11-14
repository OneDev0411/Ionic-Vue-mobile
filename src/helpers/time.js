export function getRelativePast(date) {
  var now = new Date();
  var localDate = new Date(date);
  var diff = now - localDate;
  var seconds = diff / 1000;
  var minutes = seconds / 60;
  var hours = minutes / 60;
  var days = hours / 24;
  var weeks = days / 7;
  var months = days / 30;
  var years = days / 365;
  if (seconds < 60) {
    return "just now";
  } else if (minutes < 60) {
    return Math.floor(minutes) + " minutes ago";
  } else if (hours < 24) {
    return Math.floor(hours) + " hours ago";
  } else if (days < 7) {
    return Math.floor(days) + " days ago";
  } else if (weeks < 5) {
    return Math.floor(weeks) + " weeks ago";
  } else if (months < 12) {
    return Math.floor(months) + " months ago";
  } else {
    return Math.floor(years) + " years ago";
  }
}

export function intervalToDate(interval) {
  if (interval.toLowerCase() === "now") {
    return new Date();
  } else if (interval.toLowerCase() === "1 day") {
    return new Date(Date.now() + 24 * 60 * 60 * 1000);
  } else if (interval.toLowerCase() === "1 week") {
    return new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  } else if (interval.toLowerCase() === "1 month") {
    return new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
  } else if (interval.toLowerCase() === "1 year") {
    return new Date(Date.now() + 365 * 24 * 60 * 60 * 1000);
  }
}
