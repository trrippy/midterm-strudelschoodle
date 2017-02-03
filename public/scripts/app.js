$(() => {
  let dates;



  function sendDates() {
    $.ajax({
      method: "post",
      url: "/test",
      dataType: 'json',
      contentType: 'application/json',
      data: JSON.stringify({dates: dates})
    }).then((result) => {
      console.log(result.url);
    });
  }

  flatpickr(".flatpickr", {
    inline: true,
    mode: "multiple",
    static: true,
    onChange: function(selectedDates, dateStr, instance) {
      dates = selectedDates;
      sendDates();
    }
  });


  $('a[data-toggle="tab"]').on('show.bs.tab', function(e) {
      var $target = $(e.target);
      if ($target.parent().hasClass('disabled')) {
        return false;
      }
      if($target.attr("id") == "lnk-step3") {
        console.log('done!')
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
