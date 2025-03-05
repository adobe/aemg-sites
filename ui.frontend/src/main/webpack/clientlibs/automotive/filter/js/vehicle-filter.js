// let vehicleFilterBtn = document.querySelector(".vehicle_search_btn");
// let vehiclesType = document.querySelector(".vehicles_type");

// vehicleFilterBtn.addEventListener('click', ()=> {
//     if (vehiclesType.style.display === 'block') {
//         vehiclesType.style.display = 'none';
//     } else {
//         vehiclesType.style.display = 'block';
//     }
// })


window.addEventListener("DOMContentLoaded", function () {
    let vehicleFilterBtn = document.querySelector(".vehicle_search_btn");
  
    document.querySelector("body").addEventListener("click", function (e) {
  
      if (e.target.closest("body:not(.vehicles_modal) .vehicle_search_btn")) {
        document.querySelector("body").classList.add("vehicles_modal");
        return;
      }
  
      if (!e.target.closest("vehicles_type")) {
        document.querySelector("body").classList.remove("vehicles_modal");
      }
    });
  
  });
