(function() {

  var config = {
    apiKey: "AIzaSyDF3s0P7gQzE5JZ7jQ9vDcyieLiV32WWVA",
    authDomain: "mixd-630f4.firebaseapp.com",
    databaseURL: "https://mixd-630f4.firebaseio.com"
  };
  firebase.initializeApp(config);

  var destDate = new Date(2018, 2, 8, 7);
  var now = new Date();

  var days = Math.floor((destDate - now) / (1000 * 60 * 60 * 24));
  var hoursLeft = Math.floor((((destDate - now) / (1000 * 60 * 60 * 24)) % 1) * 24);



  $(document).ready(function() {

    $(".front h2").text(days + " Days, " + hoursLeft + " hrs");

    $("#frontButton").on("click", function() {
      $(".mixd-card").addClass("flipped");

      setTimeout(function() {
        $(".mixd-card.flipped .front").hide();
      }, 300);
    });

    $(".exit").on("click", function() {
      $(".mixd-card").removeClass("flipped");

      $(".mixd-card .front").show();
    });

    $(".form .mixd-input").on("focus", function() {
      $(".form .mixd-input").css("borderBottom", "5px solid #000");
      if ($(".form .mixd-input").hasClass("error")) {
        $(".form .mixd-input.error").val("");
        $(".form .mixd-input").removeClass("error");
      }

    });
    $(".form form").on("submit", function(e) {
      e.preventDefault();

      var isNameValid = $(".form input._name").val().length > 0;
      var isEmailValid = isValidEmail($(".form input._email").val());

      var name = $(".form input._name").val();
      var email = $(".form input._email").val();

      if (isNameValid && isEmailValid) {
        writeUserData(name, email);
        $(".back .form").hide();
        $(".back .thanks").show();
      }
      else {
        if (!isNameValid) {
          $(".form input._name").css("borderBottom", "5px solid #FF3A3A");
          $(".form input._name").val("invalid");
          $(".form input._name").addClass("error");
        }

        if (!isEmailValid) {
          $(".form input._email").css("borderBottom", "5px solid #FF3A3A");
          $(".form input._email").val("invalid");
          $(".form input._email").addClass("error");

        }
      }




    });
  });

})();

function writeUserData(name, email) {
  firebase.database().ref("/").push().set({
    name: name,
    email: email
  });
}
function isValidEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}
