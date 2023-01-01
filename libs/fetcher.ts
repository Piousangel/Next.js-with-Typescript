// import cookie from "js-cookie";
// import Router from "next/router";
// const API_ENDPOINT = process.env;

// const fetcher = (path: string, method = "GET", body = undefined) => {
//     const token = cookie.get("token");

//     const redirectWhenUnauthorized = () => {
//         const currentPath =
//             window.location.pathname + "/" + window.location.search;
//         Router.push({
//             pathname: "/login",
//             query: { redirect_url: currentPath },
//         });
//     };

//     const headers = {
//         Accept: "application/json",
//         Authorization: `Bearer ${token}`,
//     };

//     if (body) {
//         headers["Content-Type"] = "application/json";
//     }

//     return fetch(`${API_ENDPOINT}${path}`, {
//         method,
//         headers,
//         body: JSON.stringify(body),
//     }).then((res: Response) => {
//         if (res.status === 401) redirectWhenUnauthorized();
//         return res.json();
//     });
// };

// export default fetcher;
