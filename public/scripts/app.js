
$(() => {
  let dates = [];
  let times = {};

  // Calendar on step 2
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

  //
  $('a[data-toggle="tab"]').on('show.bs.tab', function(e) {
    var $target = $(e.target);
    if ($target.parent().hasClass('disabled')) {
      return false;
    }

    if($target.attr("id") == "lnk-step3") {
      $('.time-options').empty();

      // TODO: sort the dates if that seems necessary
      dates.sort().forEach(function(date, index) {
        let formatDate = moment(date).format('MMMM Do YYYY');
        let count = 0;

        // returns array with times for current date
        const timesForDate = times[formatDate];

        const $timeForms = `
          <div class='time_for_date time_for_date${index}'>
              <span class="tweet-name">${formatDate}</span>
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
    var $target = $(e.target);
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
        // console.log('times object ', times);
      });
    }
  });


  $(".next").click(function(e) {
    e.preventDefault();

    var $active = $('.container .steps-list .active');
    $active.next().removeClass('disabled');
    nextTab($active);

    // console.log("1")

    // var $active = $('.container .steps-list .active');
    // prevTab($active);

    // console.log("2")
  });

  $(".back").click(function(e) {
    e.preventDefault();

    var $active = $('.container .steps-list .active');
    prevTab($active);
  });

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

});
