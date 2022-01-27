// Card Text slide
const El = document.querySelectorAll(".text-slide-container");
if (El.length) {
  for (var i = 0; i < El.length; i++) {
    El[i].parentElement.classList.add(`text-slide-wrapper-${i}`);

    new Swiper(`.text-slide-wrapper-${i} .text-slide-container`, {
      loop: false,
      grabCursor: false,
      resistanceRatio: 0.5,
      scrollbar: {
        el: `.text-slide-wrapper-${i} .slide-scrollbar`,
        hide: false,
      },
      on: {
        slideChange: function () {
          if (this.isBeginning) {
            this.$el[0].parentElement.classList.add('disable-scrollbar');
          } else {
            this.$el[0].parentElement.classList.remove('disable-scrollbar');
          }
        }
      }
    });

  }
}


function InitStoresSlide() {
  const delay = 5000;
  var StoresSlide = new Swiper(".stories-slide-container", {
    loop: true,
    speed: 600,
    disableOnInteraction: true,
    autoplay: {
      delay: delay,
    },
    pagination: {
      el: '.stories-slide-wrapper .pagination',
      clickable: false,
      type: 'bullets',
      renderBullet: function (index, className) {
        return '<span class="' + className + '"><span class="timer" style="--delay:' + delay + 'ms"></span></span>';
      }
    },
    on: {
      slideChange: function () {
        $(".stories-slide-wrapper .pagination .swiper-pagination-bullet").removeClass('start-progress');
        $(".stories-slide-wrapper .pagination .swiper-pagination-bullet-active").prevAll('.swiper-pagination-bullet').addClass('completed');
        $(".stories-slide-wrapper .pagination .swiper-pagination-bullet-active").nextAll('.swiper-pagination-bullet').removeClass('completed');
        $(".stories-slide-wrapper .pagination .swiper-pagination-bullet-active").removeClass('completed');
        setTimeout(function () {
          $(".stories-slide-wrapper .pagination .swiper-pagination-bullet-active").addClass('start-progress');
        }, 70);

      },
      init: function () {
        setTimeout(function () {
          $(".stories-slide-wrapper .pagination .swiper-pagination-bullet-active").addClass('start-progress');
        }, 70);
      },
      touchEnd: function (swiper, event) {
        setTimeout(() => {
          swiper.autoplay.start();
        }, 100);
      }
    }
  });

} InitStoresSlide();


// Card Text slide End

(function ($) {


  $(".box-nc-scroll").niceScroll({
    cursorcolor: "#E6E7EB"
  });



  // HEADER SCRIPTS START
  $('body').append('<div class="body-backdrop">');

  $(".toggle-sidenav").on('click', function () {
    $(".side-menu-wrapper").toggleClass('open');
    $(".body-backdrop").toggleClass('open');
    $('body').toggleClass('overflow-hidden');
    $(".child-nav-wrapper").removeClass("open");
  });

  $(".side-navbar-nav li .child-nav-wrapper").prev('a').addClass('has-child');

  $(".side-navbar-nav li a.has-child").on('click', function (event) {
    event.preventDefault();
    $(this).next('.child-nav-wrapper').addClass('open');
  });

  $(".side-navbar-nav li .btn-back-icon").on('click', function () {
    $(this).closest('.child-nav-wrapper').removeClass('open')
  });

  $(".body-backdrop").on('click', function () {
    if ($(".side-menu-wrapper").hasClass('open')) {
      $(".side-menu-wrapper").removeClass('open')
      $(".body-backdrop").removeClass('open');
      $('body').removeClass('overflow-hidden');
      $(".child-nav-wrapper").removeClass("open");
    }
    $(".body-backdrop").removeClass('open');
    $('body').removeClass('overflow-hidden')
    $('.all-filters-area').removeClass('open');

    $('.sort-fixd-wrap').removeClass('open');

  });
  // HEADER SCRIPTS END



  // Filter scrips
  $(".filter-content-item .title .angle-btn").on('click', function () {
    var ThisItem = $(this).closest('.filter-content-item').find('.filter-body');
    ThisItem.slideToggle(250, function () {
      if (ThisItem.find('.check-box-lists').hasClass('box-nc-scroll')) {
        $('.box-nc-scroll').getNiceScroll().resize();
      }

      $(this).closest('.filter-content-item').toggleClass('has-opened');

    });
    $(this).closest('.filter-content-item').find('.toggle-with-parent').slideToggle(250);
  });

  $(".check-box-lists li .check-box-lists").parent('li').append('<button class="plus-toggle">');

  $(".check-box-lists li .plus-toggle").on('click', function () {

    $(this).parent('li').find('.check-box-lists').slideToggle(250, function () {
      $('.box-nc-scroll').getNiceScroll().resize();
    });

    $(this).toggleClass('opened');

  });


  $(".open-filter-area").on('click', function (event) {
    event.preventDefault();
    $('.all-filters-area').addClass('open');
    $(".body-backdrop").addClass('open');
  });

  $(".filter-area-header .btn-back-icon").on('click', function (event) {
    event.preventDefault();
    $('.all-filters-area').removeClass('open');
    $(".body-backdrop").removeClass('open');
  });

  $(".open-sort-area").on('click', function (event) {
    event.preventDefault();
    $('.sort-fixd-wrap').addClass('open');
    $(".body-backdrop").addClass('open');
  });

  $(".sort-fixd-wrap .btn-back-icon").on('click', function (event) {
    event.preventDefault();
    $('.sort-fixd-wrap').removeClass('open');
    $(".body-backdrop").removeClass('open');
  });



  // Inputs scripts
  $(".has-nc-select").niceSelect();
  $(".has-nc-select").each(function () {
    var placeholder = $(this).attr('placeholder');
    var prefix = $(this).attr('prefix');
    if (placeholder != "") {
      $(this).next('.nice-select').find('.current').text(placeholder);
    }
    if (prefix != "") {
      $(this).next('.nice-select').find('.current').attr('prefix', prefix);
    }
  });
  $(".input-style2 input").focus(function () {
    $(this).parent('.input-style2').addClass('focused');
  });
  $(".input-style2 input").blur(function () {
    checkInputsValue();
  });

  checkInputsValue();

  function checkInputsValue() {
    $(".input-style2 input").each(function () {
      if ($(this).val() != "") {
        $(this).parent('.input-style2').addClass('focused');
      } else {
        $(this).parent('.input-style2').removeClass('focused');
      }
    });
  }



  // FOOTER SCRIPTS
  $('.footer-accourdion-wrap .footer-title').click(function (j) {
    if ($(window).innerWidth() < 991) {
      console.log("Right");
      var dropDown = $(this).closest('.accourdion-item').find('.ac-body');

      $(this).closest('.footer-accourdion-wrap').find('.ac-body').not(dropDown).slideUp(250);

      if ($(this).hasClass('active')) {
        $(this).removeClass('active');
      } else {
        $(this).closest('.footer-accourdion-wrap').find('.footer-title.active').removeClass('active');
        $(this).addClass('active');
      }

      dropDown.stop(false, true).slideToggle(250);

      j.preventDefault();
    }
  });
  $(window).on('resize', function () {
    if ($(window).innerWidth() > 991) {
      $('.footer-accourdion-wrap').find('.ac-body').css('display', '');
    }
  });



  // Tab Scripts
  $(".custom-tab-wrapper").each(function () {

    var __this = $(this);
    $(this).find('.custom-tab-nav a').on('click', function (event) {

      event.preventDefault();
      __this.find('.custom-tab-content .tab-item').removeClass('active');
      __this.find('.custom-tab-nav a').removeClass('active');

      var getID = $(this).attr('href');

      $(this).addClass('active');
      $(getID).addClass('active');

    });


  });



  $(".nav-tabs").each(function () {
    $(this).append('<span class="tab-slide">');
    var slideIndicator = $(this).find('.tab-slide');
    var Position = $(this).children(".nav-item").position();
    var Width = $(this).children().width();
    var height = $(this).children().height();
    slideIndicator.css({ 'left': Position.left, 'top': Position.top, 'width': Width, 'height': height });

    let NavLink = $(this).find('.nav-item .nav-link');
    NavLink.click(function () {
      var Position = $(this).parent().position();
      var Width = $(this).parent().width();
      var height = $(this).parent().height();
      slideIndicator.css({ 'left': Position.left, 'top': Position.top, 'width': Width, 'height': height });
    });
  });

  $(window).on('resize', function () {
    $('.nav-tabs .nav-item .nav-link').each(function () {
      var Position = $(this).parent().position();
      var Width = $(this).parent().width();
      var height = $(this).parent().height();
      $(this).parent().parent().find('.tab-slide').css({ 'left': Position.left, 'top': Position.top, 'width': Width, 'height': height });
    });
  });

  $(".chip .btn-times").hover(function () {
    if (!$(this).parent(".chip").hasClass('chip-bg') && !$(this).parent(".chip").hasClass('chip-light')) {
      $(this).parent(".chip").addClass('hover-x');
    }
  }, function () {
    $(this).parent(".chip").removeClass('hover-x');
  });


  $('[data-get-num]').click(function (event) {
    event.preventDefault();
    var num = $(this).attr('data-get-num');
    $(this).text(num);
    $(this).addClass('btn-change-to-gray');
  });



  $('[data-expandedlist]').click(function (event) {
    event.preventDefault();
    var getEl = $(this).attr('data-expandedlist');
    var show = $(getEl).attr('data-each-show');
    $(getEl).find('.list-item:hidden').slice(0, show).removeClass('d-none');
    if ($(getEl).find('.list-item:last-child:hidden').length == 0) {
      $(this).addClass('d-none');
    }
  });





  $(".all-sort-fixd-wrap .option").on('click', function (event) {
    event.preventDefault();
    var getText = $(this).text();
    $('.sort-filter-show .current-text').text(getText);
    $('.sort-fixd-wrap').removeClass('open');
    $(".body-backdrop").removeClass('open');
    $(".all-sort-fixd-wrap .option").removeClass('selected focus');
    $(this).addClass('selected focus');
  });

  // start jihad
  var swiper = new Swiper(".swiper-slider", {
    slidesPerView: 1,
    spaceBetween: 8,
    loop: true,

    // autoplay: {
    //   delay: 7000,
    //   disableOnInteraction: false
    // },

    breakpoints: {
      0: {
        slidesPerView: 1.2
      },
      991: {
        slidesPerView: 2.5
      },
      700: {
        slidesPerView: 1.5
      }
    }
  });

  // light box

  const $gallery1 = document.getElementById("gallery-1");
  const gallery1 = window.lightGallery($gallery1, {
    dynamic: true,
    plugins: [lgZoom, lgVideo, lgThumbnail],
    dynamicEl: [
      {
        src:
          "assets/img/slider/slider1.jpg",
        thumb: "assets/img/slider/slider1.jpg",
      },
      {
        src:
          "assets/img/slider/popup1.jpg",
        thumb: "assets/img/slider/popup1.jpg",
      },
      {
        src:
          "assets/img/slider/popup2.jpg",
        thumb: "assets/img/slider/popup2.jpg",
      },
      {
        src:
          "assets/img/slider/popup3.jpg",
        thumb: "assets/img/slider/popup3.jpg",
      },
      {
        src:
          "assets/img/slider/popup4.jpg",
        thumb: "assets/img/slider/popup4.jpg",
      },
      {
        src:
          "assets/img/slider/popup5.jpg",
        thumb: "assets/img/slider/popup5.jpg",
      },
    ]
  });
  $gallery1.addEventListener("click", () => {
    gallery1.openGallery(0);
  });
  // end gallery1

  const $gallery2 = document.getElementById("gallery-2");
  const gallery2 = window.lightGallery($gallery2, {
    dynamic: true,
    plugins: [lgZoom, lgVideo, lgThumbnail],
    dynamicEl: [
      {
        src:
          "assets/img/slider/slider2.jpg",
        thumb: "assets/img/slider/slider2.jpg",
      },
      {
        src:
          "assets/img/slider/popup5.jpg",
        thumb: "assets/img/slider/popup5.jpg",
      },
      {
        src:
          "assets/img/slider/popup6.jpg",
        thumb: "assets/img/slider/popup6.jpg",
      },
      {
        src:
          "assets/img/slider/popup7.jpg",
        thumb: "assets/img/slider/popup7.jpg",
      },
      {
        src:
          "assets/img/slider/popup8.jpg",
        thumb: "assets/img/slider/popup8.jpg",
      },
      {
        src:
          "assets/img/slider/popup5.jpg",
        thumb: "assets/img/slider/popup5.jpg",
      },
    ]
  });
  $gallery2.addEventListener("click", () => {
    gallery2.openGallery(0);
  });
  // end gallery2

  const $gallery3 = document.getElementById("gallery-3");
  const gallery3 = window.lightGallery($gallery3, {
    dynamic: true,
    plugins: [lgZoom, lgVideo, lgThumbnail],
    dynamicEl: [
      {
        src:
          "assets/img/slider/slider3.jpg",
        thumb: "assets/img/slider/slider3.jpg",
      },
      {
        src:
          "assets/img/slider/popup8.jpg",
        thumb: "assets/img/slider/popup8.jpg",
      },
      {
        src:
          "assets/img/slider/popup7.jpg",
        thumb: "assets/img/slider/popup7.jpg",
      },
      {
        src:
          "assets/img/slider/popup5.jpg",
        thumb: "assets/img/slider/popup5.jpg",
      },
      {
        src:
          "assets/img/slider/popup2.jpg",
        thumb: "assets/img/slider/popup2.jpg",
      },
      {
        src:
          "assets/img/slider/popup1.jpg",
        thumb: "assets/img/slider/popup.jpg",
      },
    ]
  });
  $gallery3.addEventListener("click", () => {
    gallery3.openGallery(0);
  });

  // end gallery3

  const $gallery4 = document.getElementById("gallery-4");
  const gallery4 = window.lightGallery($gallery4, {
    dynamic: true,
    plugins: [lgZoom, lgVideo, lgThumbnail],
    dynamicEl: [
      {
        src:
          "assets/img/slider/slider1.jpg",
        thumb: "assets/img/slider/slider1.jpg",
      },
      {
        src:
          "assets/img/slider/popup1.jpg",
        thumb: "assets/img/slider/popup1.jpg",
      },
      {
        src:
          "assets/img/slider/popup2.jpg",
        thumb: "assets/img/slider/popup2.jpg",
      },
      {
        src:
          "assets/img/slider/popup3.jpg",
        thumb: "assets/img/slider/popup3.jpg",
      },
      {
        src:
          "assets/img/slider/popup4.jpg",
        thumb: "assets/img/slider/popup4.jpg",
      },
      {
        src:
          "assets/img/slider/popup5.jpg",
        thumb: "assets/img/slider/popup5.jpg",
      },
    ]
  });
  $gallery4.addEventListener("click", () => {
    gallery4.openGallery(0);
  });
  // end gallery4

  const $gallery5 = document.getElementById("gallery-5");
  const gallery5 = window.lightGallery($gallery5, {
    dynamic: true,
    plugins: [lgZoom, lgVideo, lgThumbnail],
    dynamicEl: [
      {
        src:
          "assets/img/slider/slider2.jpg",
        thumb: "assets/img/slider/slider2.jpg",
      },
      {
        src:
          "assets/img/slider/popup5.jpg",
        thumb: "assets/img/slider/popup5.jpg",
      },
      {
        src:
          "assets/img/slider/popup6.jpg",
        thumb: "assets/img/slider/popup6.jpg",
      },
      {
        src:
          "assets/img/slider/popup7.jpg",
        thumb: "assets/img/slider/popup7.jpg",
      },
      {
        src:
          "assets/img/slider/popup8.jpg",
        thumb: "assets/img/slider/popup8.jpg",
      },
      {
        src:
          "assets/img/slider/popup5.jpg",
        thumb: "assets/img/slider/popup5.jpg",
      },
    ]
  });
  $gallery5.addEventListener("click", () => {
    gallery5.openGallery(0);
  });
  // end gallery5

  const $gallery6 = document.getElementById("gallery-6");
  const gallery6 = window.lightGallery($gallery6, {
    dynamic: true,
    plugins: [lgZoom, lgVideo, lgThumbnail],
    dynamicEl: [
      {
        src:
          "assets/img/slider/slider3.jpg",
        thumb: "assets/img/slider/slider3.jpg",
      },
      {
        src:
          "assets/img/slider/popup8.jpg",
        thumb: "assets/img/slider/popup8.jpg",
      },
      {
        src:
          "assets/img/slider/popup7.jpg",
        thumb: "assets/img/slider/popup7.jpg",
      },
      {
        src:
          "assets/img/slider/popup5.jpg",
        thumb: "assets/img/slider/popup5.jpg",
      },
      {
        src:
          "assets/img/slider/popup2.jpg",
        thumb: "assets/img/slider/popup2.jpg",
      },
      {
        src:
          "assets/img/slider/popup1.jpg",
        thumb: "assets/img/slider/popup3.jpg",
      },
    ]
  });
  $gallery6.addEventListener("click", () => {
    gallery6.openGallery(0);
  });

  // end gallery6



})(jQuery); 