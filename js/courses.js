const _courses = document.querySelector("#course_section");
const _course_name = ["Udemy", "Youtube", "Coursera"];
_append_courses(_course_name);   // Will exceute all the code written bellow

//////////////////////////////////////////////////////////////////////
//////////////        Function Tree                           ////////
//////////////////////////////////////////////////////////////////////
/*                                                                  //
  _append_courses( array[] )                            ~Level_1    //
    get_platform_identifer(int)                         ~Level_2    //
        _appened_platform(String,String)                ~Level_3    //
              get_platform_template(String,String);     ~Level_4    //
              add_platform_template(String);                        //
        _appened_platform_cards(String,String)                      //
              get_platform_template(String,String);                 //
              add_platform_template(String);                        //
              appened(JSON,String)                                  //
                  get_card_template(JSON);              ~Level_5    //
                      -get_platform(message.platform);  ~Level_6    //
                      -get_image(message.image);                    //
                      -get_type(message.type);                      //
                      -get_rating(message.rating);                  //
                      -get_price(message);                          //
                      -get_link_button(message.link);               //
                  add_card_template(JSON, String);                  //
*/
//////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////
///////////// Function For Courses are given bellow //////////
//////////////////////////////////////////////////////////////


/////////////////////////////////////////////
// This Function will get list of courses  //
// Apply a function on all the values      //
/////////////////////////////////////////////
function _append_courses(courses_list) {
  var count = 0;
  // For Each element in _course_name it will create a grey box;
  courses_list.forEach((platform_name) => {
    count++;
    platform_identifer = get_platform_identifier(count);
    _append_platform(platform_name, platform_identifer);
    _append_platform_cards(platform_name, platform_identifer);
  });
}


////////////////////////////////////////////////////////
////////////////////////////////////////////////////////
// PlatForm Functions - Start
////////////////////////////////////////////////////////
////////////////////////////////////////////////////////

// Will return a Unique Identifer          
function get_platform_identifier(index) {
  return `card_section_${index}`;
}
/////////////////////////////////////////////
// Add a Grey Bar with Name - HTML         //
/////////////////////////////////////////////
function _append_platform(name, index) {
  if (index < 0) {
    alert("check this " + index);
  } else {
    // Grey-Bar Html-Code
    _message = get_platform_template(name,index);
    // Grey-Bar Html-Adding
    add_platform_template(_message);
    }
}

// A) Get platform Template
function get_platform_template(value,index) {
  const message = `<button class="collapsible" >${value} Click to view</button>
  <div class="content ">
  <div class="container px-4 px-lg-5 mt-5">
  <div class="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center ${index}" >
      </div>
      </div>`;
  return message;
}
// b) Add platform Template
function add_platform_template(message) {
  const messageElement = document.createElement("div"); // <div></div>
  messageElement.classList.add(`course_section_class`); // <div class="course_section_class" ></div>;
  messageElement.innerHTML = message; // <div class="course_section_class" > Above Grey-Bar Html code will be inserted here  </div>;
  _courses.append(messageElement);
}
////////////////////////////////////////////////////////
/*    In Selected Platform will add a Card            */
////////////////////////////////////////////////////////
function _append_platform_cards(value, index) {
  // will get a selected Platform
  const _temp_card_section = document.querySelector(`.${index}`);
  // Read File
  fetch(`.\\js\\courses.json`)
    // Convert String to Json
    .then((response) => response.json())
    // Apply function on JSON
    .then((rsp) => {
      // rsp is a list. and for each element of rsp we will apply a function
      rsp.forEach((element) => {
        // Will Add a Card in Selected Platform if it matches
        if (value == element.platform) {
          appened(element, _temp_card_section);
        }
      });
    });
}

////////////////////////////////////////////////////////
////////////////////////////////////////////////////////
// Cards Functions - Start
////////////////////////////////////////////////////////
////////////////////////////////////////////////////////

////////////////////////////////////////////////////////
/*    Will Append Card in a Specific Platform Section */
////////////////////////////////////////////////////////
const appened = (message, platform) => {
  const _message = get_card_template(message);
  add_card_template(_message, platform);
};

/*////////////////////////////////////////////////////////
  ////////    Getter Functions of Cards   ////////////////
  //////////////////////////////////////////////////////*/
// A) Get Card Template
function get_card_template(message) {
  // Right now this code is for Youtube ...
  const _platform = get_platform(message.platform);
  const _image = get_image(message.image);
  const _type = get_type(message.type);
  const _rating = get_rating(message.rating);
  const _price = get_price(message);
  const _link_button = get_link_button(message.link);

  // Creating Item of Product
  const _message = `
              <div class="col mb-5">
              <div class="card h-100">
              ${_platform}
                  ${_image}
                  <!-- Product details-->
                  <div class="card-body p-4">
                  <div class="text-center">
                          ${_type}
                          ${_rating}
                          ${_price}
                      </div>
                      </div>
                      ${_link_button}
              </div>
              </div>
          `;
  return _message;
}
// b) Add Card Template
function add_card_template(message, platform) {
  const messageElement = document.createElement("div"); // <div></div>
  messageElement.classList.add("info_items");
  messageElement.innerHTML = message;
  platform.append(messageElement);
}

//  1. Black Box Shown on Top Right
function get_platform(val) {
  var item = `<div class="badge bg-dark text-white position-absolute" style="top: 0.5rem; right: 0.5rem">${val}</div>`;
  return item;
}
//  2. Image Show on Card 450x300
function get_image(val) {
  var item = `<img class="card-img-top" src="${val}" alt="Image not found" onerror="this.src='https://dummyimage.com/450x300/dee2e6/6c757d.jpg'" />`;
  return item;
}
//  3. Type shown as Tilt  - i.e App Development
function get_type(val) {
  var item = `<h5 class="fw-bolder">${val}</h5>`;
  return item;
}
//  4. To Return Start.. Concating String giving error so i add this
function get_rating(val) {
  var item = "";
  if (val >= 5) {
    item =
      '<div class="bi-star-fill"></div><div class="bi-star-fill"></div><div class="bi-star-fill"></div><div class="bi-star-fill"></div><div class="bi-star-fill"></div>';
  } else if (val >= 4 && val < 5) {
    item =
      '<div class="bi-star-fill"></div><div class="bi-star-fill"></div><div class="bi-star-fill"></div><div class="bi-star-fill"></div>';
  } else if (val >= 3 && val < 4) {
    item =
      '<div class="bi-star-fill"></div><div class="bi-star-fill"></div><div class="bi-star-fill"></div>';
  } else if (val >= 2 && val < 3) {
    item = '<div class="bi-star-fill"></div><div class="bi-star-fill"></div>';
  } else if (val >= 1 && val < 2) {
    item = '<div class="bi-star-fill"></div>';
  } else {
    item = '<div class="bi-star-half"></div>';
  }

  return `<div class="d-flex justify-content-center small text-warning mb-2 stars">
        ${item}
        </div>`;
}
//  5. Will Return Price if avalaible otherwise return Free
function get_price(element) {
  var price = `<h6>Free</h6><h6><h6>`;
  if (element.price) {
    if (element.valid) {
      price = `<h6>RS-${element.price}</h6><h6>Valid Till: ${element.valid}</h6>`;
    } else {
      price = `<h6>RS-${element.price}</h6>`;
    }
  }
  return price;
}
//  6. Link Button that will move you to that Link
function get_link_button(val) {
  var item = `<div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
        <div class="text-center"><a class="btn btn-outline-dark mt-auto" href="${
          val ? val : "#"
        }">Check Now</a></div>
        </div>`;
  return item;
}
////////////////////////////////////////////////////////
////////////////////////////////////////////////////////
// Cards Functions - End
////////////////////////////////////////////////////////
////////////////////////////////////////////////////////

//
