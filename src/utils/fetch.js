// import STORAGE from "./local.storage";
import axios from "axios";
import ROUTES from "../config/routes";
import Base64 from "./base64";

const get = async ({ url, id = null, auth = true, history }) => {
  try {
    console.log("id in get", id);

    let headers = {};
    if (auth) {
      // const token = STORAGE.getToken();
      const token = localStorage.getItem("userLoginToken");

      headers["Authorization"] = `Bearer ${token}`;
    }

    let newurl = url;
    if (id) newurl = newurl + "/" + id;
    let promise = await fetch(
      // `${ROUTES.BASE_URL}/${newurl}?client=1&pageNum=1&limit=50`,
      `${ROUTES.BASE_URL}/${newurl}`,
      {
        method: "GET",
        mode: "cors",
        headers,
      }
    );
    let res = await promise.json();

    if (promise.status === 200 || promise.status === 400) {
      console.log("");

      console.log("******** HTTP REQUEST RESPONSE START ********");
      console.log("");
      console.log(" log request here", res);
      console.log("");
      console.log("******** HTTP RESPONSE END ********");
      return res;
    } else if (promise.status === 401) {
      console.log("token expired");
      console.log("");

      console.log("******** HTTP REQUEST RESPONSE START ********");
      console.log("");
      console.log(" log request here", res);
      console.log("");
      console.log("******** HTTP RESPONSE END ********");
      localStorage.removeItem("userLoginToken");
      history.push("/login");
    } else return null;
  } catch (error) {
    console.log("");

    console.log("******** HTTP ERROR RESPONSE START ********");
    console.log("");
    console.log(" log request here : ", error.message);
    console.log("");
    console.log("******** HTTP ERROR END ********");
    return null;
  }
};
const post = async ({
  url,
  id = null,
  body,
  isFormData = false,
  auth = true,
}) => {
  try {
    let headers = {
      // Accept: "application/json, text/plain, */*",
      // "Content-Type": "application/json",
    };
    if (auth) {
      // const token = STORAGE.getToken();
      const token = localStorage.getItem("userLoginToken");

      headers["Authorization"] = `Bearer ${token}`;
    }
    let newurl = url;
    if (id) newurl = newurl + "/" + id;

    console.log("IS FORM DATA ", isFormData);
    let promise = await fetch(`${ROUTES.BASE_URL}/${newurl}`, {
      method: "POST",
      mode: "cors",
      headers,
      body: isFormData ? body : JSON.stringify(body),
    });
    if (promise.status === 200 || promise.status === 400 || promise.status === 201) {
      let res = await promise.json();
      return res;
    } else return null
  } catch (error) {
    console.log("error occured ", error);
    return null;
  }
};

const put = async ({ url, id, body = {}, auth = true }) => {
  try {
    let headers = {};
    if (auth) {
      // const token = STORAGE.getToken();
      const token = localStorage.getItem("userLoginToken");

      headers["Authorization"] = `Bearer ${token}`;
    }
    let promise = await fetch(`${ROUTES.BASE_URL}/${url}?id=${id}`, {
      method: "PUT",
      headers,
      mode: "cors",
      body: JSON.stringify(body),
    });
    if (promise.status === 200 || promise.status === 400 || promise.status === 201) {
      let res = await promise.json();
      return res;
    } else return null;
  } catch (error) {
    console.log("GET ", error);
    return null;
  }
};
const put1 = async ({ url, id, body = {}, header }) => {
  try {
    // let headers = {};
    // if (auth) {
    //   // const token = STORAGE.getToken();
    //   const token = localStorage.getItem("userLoginToken");

    //   // headers["Authorization"] = `Bearer ${token}`;
    // }
    let promise = await axios.put(url, {
      data: body,

    }, { headers: { "Content-Type": header } });
    if (promise.status === 200 || promise.status === 400 || promise.status === 201) {
      let res = await promise.json();
      return res;
    } else return null;
  } catch (error) {
    console.log("GET ", error);
    return null;
  }
};
const put2 = async ({ url, body = {}, auth = true }) => {
  try {
    let headers = {};
    if (auth) {
      // const token = STORAGE.getToken();
      const token = localStorage.getItem("userLoginToken");

      headers["Authorization"] = `Bearer ${token}`;
    }
    let promise = await fetch(`${ROUTES.BASE_URL}/${url}`, {
      method: "PUT",
      headers,
      mode: "cors",
      body: JSON.stringify(body),
    });
    if (promise.status === 200) {
      let res = await promise.json();
      return res;
    } else return null;
  } catch (error) {
    console.log("GET ", error);
    return null;
  }
};

const deletee = async ({ url, id, body = {}, auth = true }) => {
  try {
    let headers = {};
    if (auth) {
      // const token = STORAGE.getToken();
      const token = localStorage.getItem("userLoginToken");
      headers["Authorization"] = `Bearer ${token}`;
    }
    let promise = await fetch(`${ROUTES.BASE_URL}/${url}${id ? `?id=${id}` : ''}`, {
      method: "DELETE",
      headers,
      mode: "cors",
      body: JSON.stringify(body),
    });
    if (promise.status === 200) {
      let res = await promise.json();
      return res;
    } else return null;
  } catch (error) {
    console.log("GET ", error);
    return null;
  }
};

const FETCH = { get, post, put, put2, put1, deletee };
export default FETCH;
