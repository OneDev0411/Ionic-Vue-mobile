import { Capacitor } from "@capacitor/core";
import { Http } from "@capacitor-community/http";
import axios from "./axiosConfig";
import endpoints from "./endpoints";

async function getCSRFcookie() {
  const cookies = await Http.getCookies({
    url: endpoints.csrfToken,
  });
  console.log("getting cookies", cookies);
  if (cookies.cookies.length > 0) {
    console.log("got cookies", cookies.cookies);
    return cookies.cookies.find((c) => c.key == "csrftoken");
  }
}
export const requestManager = {
  get: async (endpoint) => {
    var response = {};
    if (Capacitor.isNativePlatform()) {
      // Platform is mobile
      const csrfCookie = await getCSRFcookie();
      response = await Http.get({
        url: endpoint,
        headers: {
          "X-CSRFToken": csrfCookie ? csrfCookie.value : "",
          "content-type": "application/json",
          Referer: window.location.toString().replace("capacitor", "https"),
        },
        webFetchExtra: {
          credentials: "include",
        },
      });
    } else {
      // Platform is not mobile
      response = await axios.get(endpoint);
    }
    return response;
  },
  post: async (endpoint, data) => {
    var response = {};
    if (Capacitor.isNativePlatform()) {
      // Platform is mobile
      const csrfCookie = await getCSRFcookie();
      response = await Http.post({
        url: endpoint,
        headers: {
          "X-CSRFToken": csrfCookie ? csrfCookie.value : "",
          "content-type": "application/json",
          Referer: window.location.toString().replace("capacitor", "https"),
        },
        data: data,
        webFetchExtra: {
          credentials: "include",
        },
      });
    } else {
      // Platform is not mobile
      response = await axios.post(endpoint, data);
    }
    return response;
  },
  put: async (endpoint, data) => {
    var response = {};
    if (Capacitor.isNativePlatform()) {
      // Platform is mobile
      const csrfCookie = await getCSRFcookie();
      response = await Http.put({
        url: endpoint,
        headers: {
          "X-CSRFToken": csrfCookie ? csrfCookie.value : "",
          "content-type": "application/json",
          Referer: window.location.toString().replace("capacitor", "https"),
        },
        data: data,
        webFetchExtra: {
          credentials: "include",
        },
      });
    } else {
      // Platform is not mobile
      response = await axios.put(endpoint, data);
    }
    return response;
  },
  patch: async (endpoint) => {
    var response = {};
    if (Capacitor.isNativePlatform()) {
      // Platform is mobile
      const csrfCookie = await getCSRFcookie();
      response = await Http.patch({
        url: endpoint,
        headers: {
          "X-CSRFToken": csrfCookie ? csrfCookie.value : "",
          "content-type": "application/json",
          Referer: window.location.toString().replace("capacitor", "https"),
        },
        webFetchExtra: {
          credentials: "include",
        },
      });
    } else {
      // Platform is not mobile
      response = await axios.patch(endpoint);
    }
    return response;
  },
  delete: async (endpoint) => {
    var response = {};
    if (Capacitor.isNativePlatform()) {
      // Platform is mobile
      const csrfCookie = await getCSRFcookie();
      response = await Http.delete({
        url: endpoint,
        headers: {
          "X-CSRFToken": csrfCookie ? csrfCookie.value : "",
          "content-type": "application/json",
          Referer: window.location.toString().replace("capacitor", "https"),
        },
        webFetchExtra: {
          credentials: "include",
        },
      });
    } else {
      // Platform is not mobile
      response = await axios.delete(endpoint);
    }
    return response;
  },
  setCSRFToken: async () => {
    var response = {};
    if (Capacitor.isNativePlatform()) {
      await axios.get(endpoints.csrfToken);
      await Http.get({
        url: endpoints.csrfToken,
      });
      const cookies = await Http.getCookies({
        url: endpoints.csrfToken,
      });
      console.log("cookies", cookies.cookies);
      const options = {
        url: endpoints.host.split(":")[0],
        key: "csrftoken",
        value: cookies.cookies.find((c) => c.key == "csrftoken").value,
      };
      await Http.setCookie(options);
      response.status = 200;
    } else {
      response = await axios.get(endpoints.csrfToken);
    }
    return response;
  },
  clearCSRFToken: async () => {
    if (Capacitor.isNativePlatform()) {
      await Http.deleteCookie({
        url: endpoints.host,
        key: "csrftoken",
      });
    }
  },
  clearCookies: async () => {
    if (Capacitor.isNativePlatform()) {
      await Http.clearAllCookies();
    }
  },
};
