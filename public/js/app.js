// bootstrap javascript init
$(function() {
  $('[data-toggle="tooltip"]').tooltip();
});

// bootstrap-slider init
$(".quantity-slider").slider({
  min: 0,
  max: 100,
  value: 0,
  step: 1,
  focus: true,
  tooltip_position: "top",
  tooltip: "always"
});

// SHIRT MODEL
var shirt = {
  standard: {
    name: "shirt-standard",
    selected: false
  },
  premium: {
    name: "shirt-premium",
    selected: false
  },
  triblend: {
    name: "shirt-triblend",
    selected: false
  }
};

// QUANTITY MODEL
var quantity = {
  xs: 0,
  s: 0,
  m: 0,
  l: 0,
  xl: 0,
  xxl: 0,
  xxxl: 0
};

// CUSTOMIZATION MODEL
var addons = {
  inkCustom: {
    selected: false,
    isUnit: false,
    price: 20,
    text: "Custom Ink Color"
  },
  inkChange: {
    selected: false,
    isUnit: false,
    price: 10,
    text: "Ink Color Change"
  },
  secondPrint: {
    selected: false,
    isUnit: false,
    price: 0.5,
    text: "2nd Print Location"
  },
  opaquePrint: {
    selected: false,
    isUnit: true,
    price: 0.25,
    text: "Opaque Prints"
  },
  neckTags: {
    selected: false,
    isUnit: true,
    price: 0.5,
    text: "Printed Neck Tags"
  }
};

// RUSH ORDER MODEL
var rushOrder = {
  noRush: true,
  oneDay: false,
  twoDays: false,
  tenDays: false
};

// PRICE CHART MODEL
var PRICE = {
  1: [8, 3, 2.25, 2, 1.75],
  2: [11, 4, 3.25, 3, 2.85],
  3: [11, 5, 4.25, 4, 3.85],
  4: [11, 6, 5.25, 5, 4.85],
  5: [11, 6, 6.15, 6, 5.6],
  6: [11, 6, 7.15, 7, 6.75]
};

// OTHER CONSTANTS & VARIABLES
var SCREEN_PRICE = 20;
var TOTAL_QUANTITY = 0;
var SHIRT = null;
var COLOR = null;
var SHIRT_PRICE = null;

// Shirt handlers
$("#shirt-standard").click(function(event) {
  event.preventDefault();
  shirt.standard.selected = true;
  shirt.premium.selected = false;
  shirt.triblend.selected = false;
  SHIRT = "Standard";
  SHIRT_PRICE = 3;
  applyShirtBorderStyle();
});

$("#shirt-premium").click(function(event) {
  event.preventDefault();
  shirt.premium.selected = true;
  shirt.triblend.selected = false;
  shirt.standard.selected = false;
  SHIRT = "Premium";
  SHIRT_PRICE = 5;
  applyShirtBorderStyle();
});

$("#shirt-triblend").click(function(event) {
  event.preventDefault();
  shirt.triblend.selected = true;
  shirt.standard.selected = false;
  shirt.premium.selected = false;
  SHIRT = "Triblend";
  SHIRT_PRICE = 7;
  applyShirtBorderStyle();
});

function applyShirtBorderStyle() {
  for (i in shirt) {
    if (shirt[i].selected) {
      $("#" + shirt[i].name).css({
        border: "3px solid #f44336",
        transform: "scale(1.1)"
      });
    } else {
      $("#" + shirt[i].name).css({
        border: "none",
        transform: "scale(1)"
      });
    }
  }
}

// Color handlers
var currentColor = null;
var blankColor = null;
$("#color-select li a").click(function(event) {
  event.preventDefault();
  if (blankColor) {
    blankColor.style.backgroundColor = "#ffffff";
  }
  if (currentColor) {
    currentColor.style.backgroundColor = "#ffffff";
  }
  currentColor = event.currentTarget;
  currentColor.style.backgroundColor = "#eeeeee";
  COLOR = parseInt(currentColor.text);
});

function onBlankColorClick(event) {
  event.preventDefault();
  blankColor = event.target;
  blankColor.style.backgroundColor = "#eeeeee";
  COLOR = "0";
  if (currentColor) {
    currentColor.style.backgroundColor = "#ffffff";
    currentColor = null;
  }
}

// Quantity handlers
var totalQuantityValue = 0;
var quantityXS = 0;
var quantityS = 0;
var quantityM = 0;
var quantityL = 0;
var quantityXL = 0;
var quantityXXL = 0;
var quantityXXXL = 0;

function updateSliderTotalQuantity() {
  totalQuantityValue =
    quantityXS +
    quantityS +
    quantityM +
    quantityL +
    quantityXL +
    quantityXXL +
    quantityXXXL;
  $("#slider-quantity-total").val(totalQuantityValue);
  TOTAL_QUANTITY = parseInt(totalQuantityValue);
}

$("#slider-xs").on("slide", function(event) {
  quantityXS = parseInt(event.value);
  quantity.xs = quantityXS;
  updateSliderTotalQuantity();
});
$("#slider-s").on("slide", function(event) {
  quantityS = parseInt(event.value);
  quantity.s = quantityS;
  updateSliderTotalQuantity();
});
$("#slider-m").on("slide", function(event) {
  quantityM = parseInt(event.value);
  quantity.m = quantityM;
  updateSliderTotalQuantity();
});
$("#slider-l").on("slide", function(event) {
  quantityL = parseInt(event.value);
  quantity.l = quantityL;
  updateSliderTotalQuantity();
});
$("#slider-xl").on("slide", function(event) {
  quantityXL = parseInt(event.value);
  quantity.xl = quantityXL;
  updateSliderTotalQuantity();
});
$("#slider-xxl").on("slide", function(event) {
  quantityXXL = parseInt(event.value);
  quantity.xxl = quantityXXL;
  updateSliderTotalQuantity();
});
$("#slider-xxxl").on("slide", function(event) {
  quantityXXXL = parseInt(event.value);
  quantity.xxxl = quantityXXXL;
  updateSliderTotalQuantity();
});

function updateQuantity(event) {
  event.preventDefault();
  var key = event.target.attributes.data.value;
  var value = parseInt(event.target.value);
  console.log("updateQuantity", key, value);
  quantity[key] = value;
  updateTotalQuantity();
}

function updateTotalQuantity() {
  var total = 0;
  for (i in quantity) {
    total += quantity[i];
  }
  $("#quantity-total").val(total);
  TOTAL_QUANTITY = total;
}

// Add-on handler
function updateAddOns(event) {
  event.preventDefault();
  var key = event.target.attributes.data.value;
  var value = event.target.checked;
  addons[key].selected = value;
}

// Rush order handler
function updateRushOrder(event) {
  event.preventDefault();
  var key = event.target.attributes.data.value;
  var value = event.target.checked;
  var temp = {
    noRush: false,
    oneDay: false,
    twoDays: false,
    tenDays: false
  };
  temp[key] = value;
  rushOrder = Object.assign({}, temp);
}

// Submit Button Hanlder
function submitQuote(event) {
  event.preventDefault();
  // validate quote info
  if (SHIRT === null) {
    alert("Please select a shirt");
    return;
  }
  if (COLOR === null) {
    alert("Please select a color option");
    return;
  }
  if (TOTAL_QUANTITY <= 0) {
    alert("Please enter a quantity");
    return;
  }

  // validate customer info
  var name = $("#customer-name").val();
  var email = $("#customer-email").val();
  if (name.length === 0) {
    alert("Please enter your name.");
    return;
  }
  if (email.length === 0) {
    alert("Please enter your email address.");
    return;
  }
  if (!validateEmail(email)) {
    alert("Please enter a valid email address.");
    return;
  }

  // shirt price index
  var INDEX = 0;
  if (TOTAL_QUANTITY > 23) {
    INDEX++;
  }
  if (TOTAL_QUANTITY > 49) {
    INDEX++;
  }
  if (TOTAL_QUANTITY > 99) {
    INDEX++;
  }
  if (TOTAL_QUANTITY > 249) {
    INDEX++;
  }

  var COLOR_PRICE;

  if (COLOR === "0") {
    COLOR_PRICE = 0;
  } else {
    COLOR_PRICE = PRICE[COLOR][INDEX];
  }

  var UNIT_PRICE = COLOR_PRICE + SHIRT_PRICE;
  var FINAL_PRICE = UNIT_PRICE * TOTAL_QUANTITY;
  var FINAL_PRICE_TEMP = FINAL_PRICE;
  var ADD_ONS = "";

  // addon price
  for (i in addons) {
    if (addons[i].selected) {
      var item = addons[i];
      if (i === "secondPrint") {
        FINAL_PRICE += FINAL_PRICE_TEMP * item.price;
      } else if (i === "opaquePrint" || i === "neckTags") {
        var SUM = item.price * TOTAL_QUANTITY;
        FINAL_PRICE += SUM;
        UNIT_PRICE += item.price;
      } else {
        FINAL_PRICE += item.price;
      }
    }
  }

  for (i in rushOrder) {
    if (rushOrder[i]) {
      if (i === "oneDay") {
        FINAL_PRICE = FINAL_PRICE + FINAL_PRICE * 0.5;
      }
      if (i === "twoDays") {
        FINAL_PRICE = FINAL_PRICE + FINAL_PRICE * 0.4;
      }
      if (i === "tenDays") {
        FINAL_PRICE = FINAL_PRICE + FINAL_PRICE * 0.25;
      }
    }
  }

  FINAL_PRICE = FINAL_PRICE.toFixed(2);

  var order = {
    shirtType: SHIRT,
    shirtColor: COLOR,
    unitPrice: UNIT_PRICE,
    totalPrice: FINAL_PRICE,
    quantityTotal: TOTAL_QUANTITY,
    quantityModel: quantity,
    addonModel: addons,
    rushModel: rushOrder,
    name: name,
    email: email
  };

  sendEmail(order);

  // $.post("api/quote", {
  //   params: JSON.stringify(order)
  // }, function (res) {
  //   if (res.confirmation === "success") {
  //     var id = res.result.id;
  //     sendEmail(order);
  //     // window.location = "/quote/" + id;
  //   } else {
  //     alert(res.message);
  //     return;
  //   }
  // });
}

function sendEmail(order) {
  var turbo = Turbo({
    site_id: "5a2dd7e6a9a5810014749555"
  });

  var emailParams = {
    fromemail: "deokpyo.hong@utexas.edu",
    fromname: "FSG Customer",
    recipient: ["dp.jimmy.hong@gmail.com"],
    subject: "FSG Quote Request",
    content: "<p>FSG Quote Request Email Testing</p>"
  };

  turbo.sendEmail(emailParams, function(err, data) {
    if (err) {
      console.log("Error:" + err.message);
      return;
    }
    console.log("Emails Sent: ", data);
  });

  // $.post("api/email", { params: JSON.stringify(order) }, function(res) {
  //   if (res.confirmation === "success") {
  //     console.log(res.data);
  //     return;
  //   } else {
  //     var message = JSON.parse(res.message);
  //     alert(message);
  //     return;
  //   }
  // });
}

function validateEmail(email) {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    return true;
  }
  return false;
}

// from previous quote result page

// function onModalSubmit() {
//   var name = $("#customer-name").val();
//   var email = $("#customer-email").val();
//   var phone = $("#customer-phone").val();
//   var company = $("#customer-company").val();

//   if (name.length === 0) {
//     alert("Please enter your name.");
//     return;
//   }

//   if (email.length === 0) {
//     alert("Please enter your email address.");
//     return;
//   }

//   var path = window.location.pathname;
//   var pathArray = path.split("/");
//   var quote = pathArray[2];

//   var invoice = {
//     name: name,
//     email: email,
//     phone: phone,
//     company: company,
//     quote: quote
//   };

//   var params = JSON.stringify(invoice);

//   $.post("../api/invoice", { params: params }, function(res) {
//     if (res.confirmation === "success") {
//       alert(
//         "Your invoice request was successful. We will reach back to you soon. Thank you!"
//       );
//       $("#modalCustomerInfo").modal("hide");
//       return;
//     } else if (res.confirmation === "exists") {
//       alert(
//         "Your invoice request for this quote has already been made. We will get back to you as soon as possible. Thank you!"
//       );
//       $("#modalCustomerInfo").modal("hide");
//       return;
//     } else {
//       alert(res.message);
//       return;
//     }
//   });
// }
