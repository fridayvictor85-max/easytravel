// to get current year
function getYear() {
    var currentDate = new Date();
    var currentYear = currentDate.getFullYear();
    document.querySelector("#displayYear").innerHTML = currentYear;
}

getYear();


//  owl carousel script
$(".owl-carousel").owlCarousel({
    loop: true,
    margin: 20,
    nav: true,
    navText: [],
    autoplay: true,
    autoplayHoverPause: true,
    responsive: {
        0: {
            items: 1
        },
        1000: {
            items: 2
        }
    }
});

//    end owl carousel script 



/** google_map js **/

$('#addPhotosBtn').click(function() {
    $(this).parents().find('#addPhotosInput').click();
  });
  
  document.getElementById('addPhotosInput').onchange = e => {
    const file = e.target.files[0];
    const url = URL.createObjectURL(file);
    const li = ` <li> <img src=" ${url} ">
         <span><i class="fa fa-trash"></i></span>
     </li>`
    $('.photos-list ul').append(li);
  };