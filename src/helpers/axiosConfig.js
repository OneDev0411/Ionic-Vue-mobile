import axios from "axios";

const validateStatus = function (status) {
  return status >= 200 && status < 500; // default
};

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.withCredentials = true;
axios.defaults.validateStatus = validateStatus;

export default axios;
