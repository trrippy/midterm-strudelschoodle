
$(() => {
  let dates = [];
  let times = {};

  $('#step1 .alert').hide();
  $('#step2 .alert').hide();
  $('#step3 .alert').hide();
  // $('.form-block .alert').hide();

  function createFlatPickr(className, date) {
    flatpickr(className, {
      defaultDate: date,
      noCalendar: true,
      enableTime: true,
      altFormat: "F j, Y h:i K"
    });
  }

  function createFlatPickrElement(container, date, index, count) {
    $(container).before(`<input type="text" name="time${index}" value='' class='timepicker timepicker${index} timepicker-time added-time${count}'>`);

    createFlatPickr(".timepicker" + index + ".added-time" + count, date);
  }

  function nextTab(elem) {
      $(elem).next().find('a[data-toggle="tab"]').click();
  }
  function prevTab(elem) {
      $(elem).prev().find('a[data-toggle="tab"]').click();
  }

  // Calendar's invocation on step 2
  flatpickr(".flatpickr1", {
    inline: true,
    mode: "multiple",
    static: true,
    onChange: function(selectedDates, dateStr, instance) {
      dates = selectedDates;

      $("#flatpickr-dates").html("");
      dates.forEach(function(date) {
        $("#flatpickr-dates").append("<li>" + moment(date).format("MMMM Do YYYY") + "</li>")
      });
    }
  });

  $('a[data-toggle="tab"]').on('show.bs.tab', function(e) {
    var $target = $(e.target);
    if ($target.parent().hasClass('disabled')) {
      return false;
    }

    if($target.attr("id") == "lnk-step3") {
      $('.time-options').empty();

      dates.sort().forEach(function(date, index) {
        let formatDate = moment(date).format('MMMM Do YYYY');
        let count = 0;

        // returns array with times for current date
        const timesForDate = times[formatDate];

        const $timeForms = `
          <div class='time_for_date time_for_date${index}'>
              <span class="chosen-day">${formatDate}</span>
              <input type="hidden" name='date${index}' value='${date}'>
              <a href='#' class='add-time'>add time</a>
          </div>
        `;
        $('.time-options').append($timeForms);

        $(`.time_for_date${index} .add-time`).on('click', function() {
          createFlatPickrElement(this, date, index, count);
          count++;
        });

        if(!timesForDate || timesForDate.length == 0) {
          createFlatPickrElement(`.time_for_date${index} .add-time`, date, index, count);
          count++;
        } else {
          timesForDate.forEach(function(timeForDate) {
            // Example:
            // timeForDate 02:15
            // hoursAndMinutes = ["02", "15"]
            const hoursAndMinutes = timeForDate.split(":");

            const updatedDate = new Date(date.getTime());
            updatedDate.setHours(parseInt(hoursAndMinutes[0]));
            updatedDate.setMinutes(parseInt(hoursAndMinutes[1]));

            createFlatPickrElement(`.time_for_date${index} .add-time`, updatedDate, index, count);
            count++;
          });
        }
      })
    }
  });

  $('a[data-toggle="tab"]').on('hide.bs.tab', function(e) {
    let $target = $(e.target);
    if ($target.parent().hasClass('disabled')) {
      return false;
    }
    if($target.attr("id") == "lnk-step3") {
      let time_divs = $('.time_for_date');
      time_divs.each((idx, element) => {
        const date_text = $(element).find('span').text();
        const timesArr = [];

        $(element).find('.timepicker-time').each((index, el) => {
          timesArr.push($(el).val());
        });

        times[date_text] = timesArr;
      });
    }
  });


  $(".next").click(function(e) {
    e.preventDefault();

    let $active = $('.container .steps-list .active');
    $active.next().removeClass('disabled');
    nextTab($active);

    // Form Validation
    const $error = $('#step1 .alert');
    const $error1 = $('#step2 .alert');
    const $error2 = $('#step3 .alert');

      // Step 1 validation
    if($('.form-block.active').attr("id") == "step2" && $('.form-block #title').val() == '' || $('.form-block #description').val() == '' || $('.form-block #name').val() == '' || $('.form-block #email').val() == '') {
      $error.text('Please fill out the form');
      $error.show();

      let $active = $('.container .steps-list .active');
      prevTab($active);
    } else {$error.hide()}

      // Step 2 validation
    if($('.form-block.active').attr("id") == "step3" && $('.form-block .flatpickr1').val() == '') {
      $error1.text('Please choose dates');
      $error1.show();

      let $active = $('.container .steps-list .active');
      prevTab($active);
    } else {$error1.hide()}

  });

  $(".back").click(function(e) {
    e.preventDefault();

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
  $(".slide-down").hide(function() {
    $( 'input.event-name.form-control' ).focus(function () {
      console.log("select");
      $( ".slide-down" ).slideDown();
  // } else {
  //   $( "div" ).hide();
  // }
    });
  });


});
