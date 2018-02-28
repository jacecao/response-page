$(document).ready(function(){
  $(".owl-carousel").owlCarousel({
    loop: true,
    items: 1,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true
  });
  // 显示浏览器所处的系统平台
  // alert(window.navigator.platform);
  // 浏览器的平台和版本信息
  // alert(window.navigator.appVersion);
});