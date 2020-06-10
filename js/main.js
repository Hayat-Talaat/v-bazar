(function($) {
  // Loading
  function onReady(callback) {
    var intervalId = window.setInterval(function() {
      if (document.getElementsByTagName("body")[0] !== undefined) {
        window.clearInterval(intervalId);
        callback.call(this);
      }
    }, 500);
  }

  function setVisible(selector, visible) {
    document.querySelector(selector).style.display = visible ? "block" : "none";
  }

  onReady(function() {
    setVisible(".page", true);
    setVisible("#loading", false);
  });

  // Sidebar
  $("#sidebar").mCustomScrollbar({
    theme: "minimal"
  });

  $("#dismiss, .overlay").on("click", function() {
    // hide sidebar
    $("#sidebar").removeClass("active");
    // hide overlay
    $(".overlay").removeClass("active");
  });

  $("#sidebarCollapse").on("click", function() {
    console.log("tessssst");

    // open sidebar
    $("#sidebar").addClass("active");
    // fade in the overlay
    $(".overlay").addClass("active");
    $(".collapse.in").toggleClass("in");
    $("a[aria-expanded=true]").attr("aria-expanded", "false");
  });

  // Rate
  $.fn.rating = function(callback) {
    callback = callback || function() {};

    // each for all item
    this.each(function(i, v) {
      $(v)
        .data("rating", { callback: callback })
        .bind("init.rating", $.fn.rating.init)
        .bind("set.rating", $.fn.rating.set)
        .bind("hover.rating", $.fn.rating.hover)
        .trigger("init.rating");
    });
  };

  $.extend($.fn.rating, {
    init: function(e) {
      var el = $(this),
        list = "",
        isChecked = 2,
        childs = el.children(),
        i = 0,
        l = childs.length;

      for (; i < l; i++) {
        list = list + '<a class="star" title="' + $(childs[i]).val() + '" />';
        if ($(childs[i]).is(":checked")) {
          isChecked = $(childs[i]).val();
        }
      }

      childs.hide();

      el.append('<div class="stars">' + list + "</div>").trigger(
        "set.rating",
        isChecked
      );

      $("a", el).bind("click", $.fn.rating.click);
      el.trigger("hover.rating");
    },
    set: function(e, val) {
      var el = $(this),
        item = $("a", el),
        input = undefined;

      if (val) {
        item.removeClass("fullStar");

        input = item.filter(function(i) {
          if ($(this).attr("title") == val) return $(this);
          else return false;
        });

        input
          .addClass("fullStar")
          .prevAll()
          .addClass("fullStar");
      }

      return;
    },
    hover: function(e) {
      var el = $(this),
        stars = $("a", el);

      stars.bind("mouseenter", function(e) {
        // add tmp class when mouse enter
        $(this)
          .addClass("tmp_fs")
          .prevAll()
          .addClass("tmp_fs");

        $(this)
          .nextAll()
          .addClass("tmp_es");
      });

      stars.bind("mouseleave", function(e) {
        // remove all tmp class when mouse leave
        $(this)
          .removeClass("tmp_fs")
          .prevAll()
          .removeClass("tmp_fs");

        $(this)
          .nextAll()
          .removeClass("tmp_es");
      });
    },
    click: function(e) {
      e.preventDefault();
      var el = $(e.target),
        container = el.parent().parent(),
        inputs = container.children("input"),
        rate = el.attr("title");

      matchInput = inputs.filter(function(i) {
        if ($(this).val() == rate) return true;
        else return false;
      });

      matchInput
        .prop("checked", true)
        .siblings("input")
        .prop("checked", false);

      container
        .trigger("set.rating", matchInput.val())
        .data("rating")
        .callback(rate, e);
    }
  });
})(jQuery);

$(function() {
  $(".star-container").rating();
});

$(function() {
  // $('.star-container').rating(function(vote, event){
  // write your ajax code here
  // For example;
  // $.get(document.URL, {vote: vote});
});

// var x = 1;

// var element = document.getElementById("value");
// element.innerHTML = x;

// function button1() {
//   element.innerHTML = ++x;
// }
// function button2() {
//   element.innerHTML = --x;
// }
// if (x <= 1)
// {
//    console.log("test")
// } else if (x => 1)
// {
//     console.log("test 2");

// }

var incrementPlus;
var incrementMinus;

var buttonPlus = $(".increment");
var buttonMinus = $(".decrement");

var incrementPlus = buttonPlus.click(function() {
  $("#value").text(Number($("#value").text()) + 1);
});

var incrementMinus = buttonMinus.click(function() {
  var amount = Number($("#value").text());
  if (amount > 1) {
    $("#value").text(amount - 1);
  }
});

$(document).ready(function() {
  // Sidebar
  $("#sidebar").mCustomScrollbar({
    theme: "minimal"
  });

  $("#dismiss, .overlay").on("click", function() {
    $("#sidebar").removeClass("active");
    $(".overlay").removeClass("active");
  });

  $("#sidebarCollapse").on("click", function() {
    $("#sidebar").addClass("active");
    $(".overlay").addClass("active");
    $(".collapse.in").toggleClass("in");
    $("a[aria-expanded=true]").attr("aria-expanded", "false");
  });

  /////// Next previous //////
  let productName = [
    "Flower Shops",
    "Coffee Shops",
    "Beauty Salons",
    "Clinics"
  ];
  let headerBgColor = ["#0449b1", "#D99E29", "#D955A3", "#0FCAD9"];
  let footerImg = [
    "url(img/home/bg-flowers.png)",
    "url(img/home/bg-coffee.png)",
    "url(img/home/bg-beauty.png)",
    "url(img/home/bg-clinics.png)"
  ];
  let productCardImg = [
    "img/home/flower.jpg",
    "img/home/coffe.png",
    "img/home/beauty-salons.png",
    "img/home/Clinics.png"
  ];
  let productPage = [
    "pages/shops.html",
    "pages/shops.html",
    "pages/shops.html",
    "pages/shops.html"
  ];

  // Flower
  $(".flower-shop-btn").click(function() {
    $(".home .header").css("background-color", headerBgColor[0]);
    $(".home .footer-img").css("background", footerImg[0]);
    $(".home .product-card img").attr("src", productCardImg[0]);
    $(".home .product-card img").css("border-color", headerBgColor[0]);
    $(".product-info-btn .info-name").text(productName[0]);
    $(".product-info-btn .info-btn").attr("href", productPage[0]);
  });

  // Coffee
  $(".coffee-shop-btn").click(function() {
    $(".home .header").css("background-color", headerBgColor[1]);
    $(".home .footer-img").css("background", footerImg[1]);
    $(".home .product-card img").attr("src", productCardImg[1]);
    $(".home .product-card img").css("border-color", headerBgColor[1]);
    $(".product-info-btn .info-name").text(productName[1]);
    $(".product-info-btn .info-btn").attr("href", productPage[1]);
  });

  // Beauty
  $(".beauty-shop-btn").click(function() {
    $(".home .header").css("background-color", headerBgColor[2]);
    $(".home .footer-img").css("background", footerImg[2]);
    $(".home .product-card img").attr("src", productCardImg[2]);
    $(".home .product-card img").css("border-color", headerBgColor[2]);
    $(".product-info-btn .info-name").text(productName[2]);
    $(".product-info-btn .info-btn").attr("href", productPage[2]);
  });

  // Clinics
  $(".clinics-shop-btn").click(function() {
    $(".home .header").css("background-color", headerBgColor[3]);
    $(".home .footer-img").css("background", footerImg[3]);
    $(".home .product-card img").attr("src", productCardImg[3]);
    $(".home .product-card img").css("border-color", headerBgColor[3]);
    $(".product-info-btn .info-name").text(productName[3]);
    $(".product-info-btn .info-btn").attr("href", productPage[3]);
  });
});
