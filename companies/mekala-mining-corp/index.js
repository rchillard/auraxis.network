// $(function() {
//   $(document).scroll(function() {
//     var $nav = $("#mainNavbar");
//     $nav.toggleClass("scrolled", $(this).scrollTop() > $nav.height());
//   });
// });

// Does not work yet and not quite sure why
$(".nav-link").click(function() {
  var sectionTo = $(this).attr("href");
  $("html, body").animate(
    {
      scrollTop: $(sectionTo).offset().top
    },
    1500
  );
});

$(".carousel").carousel({
  interval: 15000
});
