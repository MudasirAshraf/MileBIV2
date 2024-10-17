export default function urlswithoutgateway( key ) {
  let valx = "";
  
  switch (key) {
    case "connector":
      valx = "https://milebiconnectors20241017073632.azurewebsites.net/api/";
      break;
    case "dashboard":
      valx = "https://milebidashboardservice20241017075807.azurewebsites.net/";
      break;
    case "admin":
      valx = "https://milebidtadministrationservice20241016211919.azurewebsites.net/api/";
      break;

    default:
      break;
  }
  
  return valx;
}
