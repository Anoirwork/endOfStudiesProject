<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>Flow ID</title>
<link rel="stylesheet" type="text/css" href="css/custom.css">
<link rel="stylesheet" type="text/css" href="css/responsive.css">
<link rel="stylesheet" type="text/css" href="css/bootstrap.min.css">
<link rel="stylesheet" type="text/css" href="css/fontawesome.min.css">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"> 
<link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700,800&display=swap" rel="stylesheet">       
</head>

<body>
<div class="bf_fl">
  <div class="sign_in">
    <div class="container">
      <div class="row">
        <div class="col-md-4">
          <div class="flw">
            <div class="logo"><a href="index.php"><img src="img/flowid-logo.png"></a></div> 
            <div class="hd_txt">
              <h2>Already a member?</h2>
              <p>Login now to access your service.</p>   
              <form action="page-2.php" method="post" class="fm" id="signupForm">
              <div id="Div1">  <input type="email" placeholder="Email" name="username" autocomplete="off" required ></div>
			  <span class="msg error">Not a valid email address</span>
 <span class="msg success">A valid email address!</span>
                <div class="in-phn" id="Div2">
				    <label for="region">Region</label>
			    <select class="form-control form-control-lg" name="StateS" onchange="myFunction(event)">
				  <option>Select Region</option>
				   <option value="264 ">
                  Anguilla
                </option>
              
                <option value="268 ">
                  Antigua and Barbuda
                </option>
              
                <option value="242 ">
                  Bahamas
                </option>
              
                <option value="246 ">
                  Barbados
                </option>
              
                <option value="284 ">
                  British Virgin Islands
                </option>
              
                <option value="345 ">
                  Cayman Islands
                </option>
              
                <option value="599 ">
                  Curaçao
                </option>
              
                <option value="767 ">
                  Dominica
                </option>
              
                <option value="473 ">
                  Grenada
                </option>
              
                <option value="876 ">
                  Jamaica (876)
                </option>
              
                <option value="658 ">
                  Jamaica (658)
                </option>
              
                <option value="664 ">
                  Montserrat
                </option>
              
                <option value="507 ">
                  Panama
                </option>
              
                <option value="869 ">
                  Saint Kitts and Nevis
                </option>
              
                <option value="758 ">
                  Saint Lucia
                </option>
              
                <option value="Saint Vincent and the Grenadines">
                  Saint Vincent and the Grenadines
                </option>
              
                <option value="Trinidad and Tobago">
                  Trinidad and Tobago
                </option>
              
my                  Turks and Caicos
                </option>
				</select><br>

                <input type="tel" name="phone" placeholder="264 " id="myText" max="99999999" min="0" pattern="[1-9]{1}[0-9]{9}" maxlength="8">
				</div>
                <p class="sin"><a href="#" id="button1" onclick="switchVisible();">Use Mobile number instead</a></p>
                <input type="password" placeholder="Password" name="psw" required>
                <input type="hidden" name="typeF" id="typeF" >
                <button name="submit" type="submit">Sign up</button>
                <div class="frgt"> <span class="sin"><a href="#">Forgot your password?</a></span> </div>
                <h3 class="orr">or</h3>
                <div class="lin"><a class="fb_w" href=""><i class="fa fa-facebook"></i> Login with Facebook</a></div>
              </form>
            </div>
          </div>
        </div>
        <div class="col-md-8">
          <div class="emp"></div>
          <div class="al">
            <h2>All access to<br>
              your Flow would</h2>
            <a href="#" class="f_id" >Create a FlowID</a> <a href="#" class="lm">Learn More</a> </div>
        </div>
      </div>
    </div>
  </div>
</div>
</div>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/jquery-validation@1.19.1/dist/jquery.validate.min.js"></script>
<script>
var field = document.querySelector('[name="username"]');

field.addEventListener('keypress', function ( event ) {  
   var key = event.keyCode;
    if (key === 32) {
      event.preventDefault();
    }
});

var phone = document.getElementById('myText');

phone.addEventListener('keypress', function(e){
    var key = e.keyCode;
    if(key === 32){
        e.preventDefault();
    }
})
    function switchVisible() {
            if (document.getElementById('Div1')) {

                if (document.getElementById('Div1').style.display == 'none') {
                    document.getElementById('Div1').style.display = 'block';
                    document.getElementById('Div2').style.display = 'none';
                    document.getElementById("typeF").value = "";
                }
                else {
                    document.getElementById('Div1').style.display = 'none';
                    document.getElementById('Div2').style.display = 'block';
                    document.getElementById("typeF").value = "1";
                }
            }
}

  function myFunction(e) {
    document.getElementById("myText").value = e.target.value
}
function setInputFilter(textbox, inputFilter) {
  ["input", "keydown", "keyup", "mousedown", "mouseup", "select", "contextmenu", "drop"].forEach(function(event) {
    textbox.addEventListener(event, function() {
      if (inputFilter(this.value)) {
        this.oldValue = this.value;
        this.oldSelectionStart = this.selectionStart;
        this.oldSelectionEnd = this.selectionEnd;
      } else if (this.hasOwnProperty("oldValue")) {
        this.value = this.oldValue;
        this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
      } else {
        this.value = "";
      }
    });
  });
}
setInputFilter(phone,  function(value) {
  return /^\d*\.?\d*$/.test(value);
});

/* $('form input[name="username"]').blur(function () {
    var email = $(this).val();
var re = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}/igm;
if (re.test(email)) {
    $('.msg').hide();
    $('.success').show();
} else {
    $('.msg').hide();
    $('.error').show();
}

}); */

$().ready(function() {
jQuery.validator.addMethod("customEmail", function(value, element) {
             return this.optional(element) || /^[a-z0-9._-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i.test(value);
            }, "Please enter valid email address!");
            jQuery.validator.addMethod("phoneUS", function(phone_number, element) {
    phone_number = phone_number.replace(/\s+/g, "");
    return this.optional(element) || phone_number.length > 9 && 
    phone_number.match(/^(\+?1-?)?(\([2-9]\d{2}\)|[2-9]\d{2})-?[2-9]\d{2}-?\d{4}$/);
}, "Please specify a valid phone number");
	$("#signupForm").validate({
	    
			rules: {
				username: {
					required: true,
					customEmail: true
				},
				psw: "required",
				phone: {
                     required: true,
                    // phoneUS: true,
                     minlength:12,
                     maxlength:12,
                        StateS: {
                     depends: function(element) {
                     return $("#typeF").val()==1
                         }
                 }
				}
			},
			messages: {

				username: "Please enter a valid email address",
				psw: "Please enter password."
			}
		});
		
});
</script>
<style>#signupForm input.error {
    border: 1px solid red !important;
}
label.error {
    font-size: 14px !important;
}</style>
</body>
</html>