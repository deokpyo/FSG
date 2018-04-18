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
  },
  selected: "None"
};

// RUSH ORDER MODEL
var rushOrder = {
  noRush: true,
  oneDay: false,
  twoDays: false,
  tenDays: false,
  selected: "Standard Turnaround"
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
var COLOR_NOT_SURE = false;
var SHIRT_PRICE = null;

// Email validator
function validateEmail(email) {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    return true;
  }
  return false;
}

// Email API handler
function sendEmail(order, orderId) {
  $.post("email", { params: JSON.stringify(order) }, function(res) {
    if (res.confirmation === "success") {
      // on success, go to quote page
      window.location = "/quote/" + orderId;
      return;
    } else {
      // on failure, alert error message
      var message = JSON.parse(res.message);
      alert(message);
      return;
    }
  });
}

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
  COLOR_NOT_SURE = false;
});

function onBlankColorClick(event) {
  event.preventDefault();
  blankColor = event.target;
  blankColor.style.backgroundColor = "#eeeeee";
  COLOR = "1";
  COLOR_NOT_SURE = true;
  if (currentColor) {
    currentColor.style.backgroundColor = "#ffffff";
    currentColor = null;
  }
}

// Quantity handlers
function updateSliderTotalQuantity() {
  var totalQuantityValue =
    quantity.xs +
    quantity.s +
    quantity.m +
    quantity.l +
    quantity.xl +
    quantity.xxl +
    quantity.xxxl;
  $("#slider-quantity-total").val(totalQuantityValue);
  TOTAL_QUANTITY = totalQuantityValue;
}

function onChangeQuantitySlider(event) {
  var size = event.target.dataset.size;
  var value = event.value.newValue;
  quantity[size] = value;
  updateSliderTotalQuantity();
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
  var selectedAddon = "";
  for (i in addons) {
    if (addons[i].selected) {
      var item = addons[i];
      if (i === "secondPrint") {
        FINAL_PRICE += FINAL_PRICE_TEMP * item.price;
        selectedAddon += "2nd Print Location, ";
      } else if (i === "opaquePrint" || i === "neckTags") {
        var SUM = item.price * TOTAL_QUANTITY;
        FINAL_PRICE += SUM;
        UNIT_PRICE += item.price;
        if (i === "opaquePrint") {
          selectedAddon += "Opaque Prints, ";
        } else {
          selectedAddon += "Neck Tags";
        }
      } else {
        FINAL_PRICE += item.price;
        if (i === "inkCustom") {
          selectedAddon += "Custom Ink Color, ";
        } else {
          selectedAddon += "Ink Color Change, ";
        }
      }
    }
  }
  if(selectedAddon !== "") {
    addons.selected = selectedAddon;
  }

  for (i in rushOrder) {
    if (rushOrder[i]) {
      if (i === "oneDay") {
        FINAL_PRICE = FINAL_PRICE + FINAL_PRICE * 0.5;
        rushOrder.selected = "1 Business Day";
      }
      if (i === "twoDays") {
        FINAL_PRICE = FINAL_PRICE + FINAL_PRICE * 0.4;
        rushOrder.selected = "2 Business Days";
      }
      if (i === "tenDays") {
        FINAL_PRICE = FINAL_PRICE + FINAL_PRICE * 0.25;
        rushOrder.selected = "< 10 Business Days";
      }
    }
  }

  FINAL_PRICE = FINAL_PRICE.toFixed(2);

  if(COLOR_NOT_SURE) {
    COLOR = "I'm not sure / I need a design";
  }

  var order = {
    shirt: SHIRT,
    color: COLOR,
    quantityModel: quantity,
    quantityTotal: TOTAL_QUANTITY,
    addonModel: addons,
    rushModel: rushOrder,
    unitPrice: UNIT_PRICE,
    totalPrice: FINAL_PRICE,
    name: name,
    email: email,
    additional: $("#input-additional-info").val()
  };

  $.post("api/quote", { params: JSON.stringify(order) }, function(res) {
    if (res.confirmation === "success") {
      var orderId = res.result._id;
      sendEmail(order, orderId);
      // 
    } else {
      alert(res.message);
      return;
    }
  });
}
