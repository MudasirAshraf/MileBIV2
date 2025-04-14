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
