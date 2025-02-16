// Function to get a cookie value
function getCookie(cookieName) {
    var cookiesArray = document.cookie.split("; ");
    for (var i = 0; i < cookiesArray.length; i++) {
      var cookie = cookiesArray[i].split("=");
      if (cookie[0] === cookieName) {
        return decodeURIComponent(cookie[1]); // Decode value for special characters
      }
    }
    return null;
}

// Function to set a cookie
function setCookie(name, value, hours = 5) {
    const now = new Date();
    now.setTime(now.getTime() + hours * 60 * 60 * 1000);
    document.cookie = name + "=" + encodeURIComponent(value) + "; expires=" + now.toUTCString() + "; path=/";
}

// Redirect to login page if not logged in
if (!getCookie("loggedIn")) {
    window.location.href = "./login.html";
}

// Display team name on the webpage
document.addEventListener("DOMContentLoaded", function () {
    const teamName = getCookie("loggedTeamName");
    if (teamName) {
      document.getElementById("teamNameDisplay").innerText = "Team: " + teamName;
    }

    // Fix: Attach event listener to form
    document.getElementById("codeForm").addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent page reload
        submitScoreProcess(); // Call score submission function
    });
});

// Check and handle score submission
if (getCookie("round1Score") && !getCookie("playedRound1")) {
    alert("Score Already Saved, Score Not Submitted\nSUBMITTING SCORE");
    submitScore(getCookie("round1Score"));
} else if (getCookie("playedRound1")) {
    window.location.href = "./thanks.html";
}

// Function to handle decryption of answers
function decryptAnswer(encAns, ind) {
    return encAns * 10 - encoders[ind];
}

// Function to process score submission
async function submitScoreProcess() {
    var userSubmit = document.querySelector("input[name='codeInput']").value;
    if (userSubmit === "852417") {
        var teamName = getCookie("loggedTeamName");
        var rawScore = parseInt(800 - (new Date().getTime() - parseInt(getCookie("startTime"))) / 12500);
        var hintsUsedPenalty = getCookie("hintsUsed") * 25;
        var Score = rawScore - hintsUsedPenalty;
        Score = Score > 0 ? Score : 1;
        
        setCookie("savedScore", Score);
        
        try {
            await fetch(`https://api.counterapi.dev/v1/ios_unlocked/${teamName}/set?count=${Score}`, {
                method: "GET",
            });
            setCookie("submittedScore", Score);
            window.location.href = "./thanks.html";
        } catch (error) {
            console.log("ERROR : " + error);
            alert("ERROR SUBMITTING, Refresh Page To Submit Automatically");
        }
    } else {
        alert("Wrong Code");
    }
}

// Function to show Morse Code chart popup
function showPopup() {
    document.getElementById("popup").style.display = "block";
    document.getElementById("overlay").style.display = "block";
}

// Function to hide Morse Code chart popup
function hidePopup() {
    document.getElementById("popup").style.display = "none";
    document.getElementById("overlay").style.display = "none";
}
