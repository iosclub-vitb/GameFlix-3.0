teamInfo = {
  "iosclub@vitbhopal.ac.in":"BestClub",
  "prakharswarnkar2022@vitbhopal.ac.in": "Chill Guy",
  "harshita2022@vitvhopal.ac.in":"Cool Dude 69",
  "aryanshgupta2022@vitbhopal":"Gay Sex Forever",
  "harshitabaghel2005@gmail.com":"testing"
 };
 
 function getCookie(cookieName) {
   var cookiesArray = document.cookie.split("; ");
   for (var i = 0; i < cookiesArray.length; i++) {
     var cookie = cookiesArray[i];
     var cookieParts = cookie.split("=");
     if (cookieParts[0] === cookieName) {
       return cookieParts[1];
     }
   }
   return null;
 }
 
 function setCookie(name, value, hours = 5) {
   const now = new Date();
   now.setTime(now.getTime() + hours * 60 * 60 * 1000); // Add hours to the current time
   const expires = "expires=" + now.toUTCString();
 
   document.cookie = name + "=" + value + "; " + expires + "; path=/";
 }
 
 
 if (getCookie("loggedIn")) {
   window.location.href = "./index.html";
 }
 
 if (getCookie("savedScore") && !getCookie("submittedScore")) {
   alert("Score Already Saved, Score Not Submitted\nSUBMITTING SCORE");
   submitScore(getCookie("savedScore"));
 } else if (getCookie("submittedScore")) {
   window.location.href = "./thanks.html";
 }
 
 function handleLogin() {
   document.getElementById("signInButton").disabled = true;
   google.accounts.id.prompt((notification) => {
     if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
       console.log("SKIPPED :  " + notification.getSkippedReason());
       console.log("NOT DISPLAYED :  " + notification.getNotDisplayedReason());
       google.accounts.id.cancel();
       document.getElementById("signInButton").disabled = false;
     }
   });
 }
 
 function initializeGSI() {
   google.accounts.id.initialize({
     client_id:
       "1075460061116-906ug4tbv17eehdg0pl5msnog2sgqnmu.apps.googleusercontent.com",
     callback: handleGoogleSignIn,
     response_type: "token",
   });
 }
 
 function handleGoogleSignIn(googleUser) {
   const tokenData = JSON.parse(
     atob(
       googleUser.credential.split(".")[1].replace(/-/g, "+").replace(/_/g, "/")
     )
   );
   const email = tokenData.email;
   if (teamInfo[email]) {
     setCookie("loggedIn", "loggedIn");
     setCookie("loggedTeamName", teamInfo[email]);
     document.location.href = "../roundsPage/Home.html";
   } else {
     alert(
       "No Team Associated With This E-Mail, Please Log-in With Your Team Laeder's Email"
     );
     google.accounts.id.cancel();
     document.location.reload();
   }
 }
 
