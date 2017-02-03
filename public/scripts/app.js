$(() => {
  $.ajax({
    method: "GET",
    url: "/api/users"
  }).done((users) => {
    for(user of users) {
      $("<div>").text(user.name).appendTo($("body"));
    }
  });

  flatpickr(".flatpickr", {
    inline: true,
    mode: "multiple",
    static: true
  });


  $('a[data-toggle="tab"]').on('show.bs.tab', function(e) {
      var $target = $(e.target);
      if ($target.parent().hasClass('disabled')) {
        return false;
      }
  });

  $(".next").click(function(e) {
      var $active = $('.container .steps-list .active');
      $active.next().removeClass('disabled');
      nextTab($active);
  });

  $(".back").click(function(e) {
      var $active = $('.container .steps-list .active');
      prevTab($active);
  });


  function nextTab(elem) {
      $(elem).next().find('a[data-toggle="tab"]').click();
  }
  function prevTab(elem) {
      $(elem).prev().find('a[data-toggle="tab"]').click();
  }

});
