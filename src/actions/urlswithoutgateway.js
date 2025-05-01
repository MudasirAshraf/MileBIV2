// export default function urlswithoutgateway(key) {
//   let valx = "";
//   switch (key) {
//     case "connector":
//       valx = "http://143.110.181.105/mile_bi_connector/api/";
//       // valx = "https://localhost:44342/api/";
//       break;
//     case "dashboard":
//       valx = "http://143.110.181.105/mile_bi_arrowdt/";
//       // valx = "https://localhost:44336/";
//       break;
//     case "admin":
//       valx = "http://143.110.181.105/mile_bi_adminstration/api/";
//       // valx = "https://localhost:44381/api/";
//       break;

//     default:
//       break;
//   }

//   return valx;
// }


export default function urlswithoutgateway(key) {
  let valx = "";
  switch (key) {
    case "connector":
      valx = "https://localhost:44342/api/";
      break;
    case "dashboard":
      valx = "https://localhost:44336/";
      break;
    case "admin":
      valx = "https://localhost:44381/api/";
      break;

    default:
      break;
  }

  return valx;
}

