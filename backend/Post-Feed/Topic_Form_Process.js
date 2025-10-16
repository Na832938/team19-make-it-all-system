$( "topic-form" ).on( "submit", function(e) {
    var dataString = $(this).serialize();
    
    // alert(dataString); return false; 
    $.ajax({
      type: "POST",
      url: "Topic_form.php",
      data: dataString,
      success: function () {
        $("Topic-PopUp-Content").html("");
        $("Topic-PopUp-Content").html("<div id='message'></div>");
        $("#message")
          .html("<h2>Topic Created!</h2>")
          .append("<button onclick='closeTopicPopUp()'>Close</button>")
          .hide()
          .fadeIn(1500);
      }
    });
    e.preventDefault();
  });
;