$(() => {
  let dates;
  let times = {};
  // let templDates;

  function sendDates() {
    // $.ajax({
    //   method: "post",
    //   url: "/test",
    //   dataType: 'json',
    //   contentType: 'application/json',
    //   data: JSON.stringify({dates: dates})
    // }).then((result) => {
    //   console.log(result.url);
    // });
  }

  // Calendar on step 2
  flatpickr(".flatpickr1", {
    inline: true,
    mode: "multiple",
    static: true,
    // enableTime: true,
    onChange: function(selectedDates, dateStr, instance) {
      dates = selectedDates;
      sendDates();
    }
  });



  // Creation Form
  $('a[data-toggle="tab"]').on('show.bs.tab', function(e) {
    var $target = $(e.target);
    if ($target.parent().hasClass('disabled')) {
      return false;
    }

    if($target.attr("id") == "lnk-step3") {
      $('.time-options').empty();

      // TODO: sort the dates if that seems necessary
      dates.forEach(function(el) {

        let time_value = times[el];
        if(time_value === undefined) {
          time_value = '';
        }
        const $timeForms = `
          <div class='time_for_date'>
              <span class="tweet-name">${el}</span>
              <input type='text' name='time' value='${time_value}' class='flatpickr2'>
          </div>
        `;
        $('.time-options').append($timeForms);

         // Time on step 3
        flatpickr(".flatpickr2", {
          defaultDate: el,
          // noCalendar: true,
          enableTime: true,
          altFormat: "F j, Y h:i K"
        });

        console.log('el ', el);
      })
    }
  });

  $('a[data-toggle="tab"]').on('hide.bs.tab', function(e) {
    var $target = $(e.target);
    if ($target.parent().hasClass('disabled')) {
      return false;
    }
    if($target.attr("id") == "lnk-step3") {
      var time_divs = $('.time_for_date');
      time_divs.each((idx, element) => {
        var date_text = $(element).find('span').text();
        var time_choice = $(element).find('input').val();
        times[date_text] = time_choice;
      });
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
