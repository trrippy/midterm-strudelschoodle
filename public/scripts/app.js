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
      dates.forEach(function(el, index) {
        let formatDate = moment(el).format('MMMM Do YYYY');
        console.log('format', formatDate);
        let time_value = times[el];
        if(time_value === undefined) {
          time_value = '';
        }
        const $timeForms = `
          <div class='time_for_date time_for_date${index}'>
              <span class="tweet-name">${formatDate}</span>
              <input type="hidden" name='date${index}' value='${el}'>
              <input type='text' name='time${index}' value='${time_value}' class='timepicker timepicker${index}'>
              <a href='#' class='add-time'>add time</a>
          </div>
        `;
        $('.time-options').append($timeForms);

        let count = 0;

        $(`.time_for_date${index} .add-time`).on('click', function() {
          $(this).before(`<input type="text" name="time${index}" value='${time_value}' class='timepicker timepicker${index} added-time${count}'>`);

            createFlatPickr(".timepicker" + index + ".added-time" + count, el);

            count++;
        });

        // Time on step 3
        createFlatPickr(".timepicker" + index, el);

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
        const date_text = $(element).find('span').text();
        const timesArr =[];

        $(element).find('input').each((index, el) => {
          timesArr.push($(el).val());
        });

        times[date_text] = timesArr;
        console.log('times ', times)
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

  function createFlatPickr(className, el) {
    flatpickr(className, {
      defaultDate: el,
      noCalendar: true,
      enableTime: true,
      altFormat: "F j, Y h:i K"
    });
  }


  function nextTab(elem) {
      $(elem).next().find('a[data-toggle="tab"]').click();
  }
  function prevTab(elem) {
      $(elem).prev().find('a[data-toggle="tab"]').click();
  }

});

