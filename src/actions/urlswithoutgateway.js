export default function urlswithoutgateway( key ) {
  let valx = "";
  
  switch (key) {
    case "connector":
      valx = "https://milebiconnectors.dig-x.co.in/api/";
      break;
    case "dashboard":
      valx = "https://milebidashboards.dig-x.co.in/";
      break;
    case "admin":
      valx = "https://milebiadmin.dig-x.co.in/api/";
      break;

    default:
      break;
  }
  
  return valx;
}
