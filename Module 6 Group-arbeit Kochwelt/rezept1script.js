function includeHTML() {
  var z, i, elmnt, file, xhttp;
  /* Loop through a collection of all HTML elements: */
  z = document.getElementsByTagName("*");
  for (i = 0; i < z.length; i++) {
    elmnt = z[i];
    /*search for elements with a certain atrribute:*/
    file = elmnt.getAttribute("w3-include-html");
    if (file) {
      /* Make an HTTP request using the attribute value as the file name: */
      xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
          if (this.status == 200) {
            elmnt.innerHTML = this.responseText;
          }
          if (this.status == 404) {
            elmnt.innerHTML = "Page not found.";
          }
          /* Remove the attribute, and call this function once more: */
          elmnt.removeAttribute("w3-include-html");
          includeHTML();
        }
      };
      xhttp.open("GET", file, true);
      xhttp.send();
      /* Exit the function: */
      return;
    }
  }
}


function checkValue(input) {
  if (input.value < 1) {
    input.value = "";
  }
  if (input.value > 20) {
    input.value = 20;
  }
}

function checkInput(event) {
  const key = event.key;
  const input = event.target;
  const currentValue = input.value;

  // Prevent typing "-" or "0"
  if (key === "0" && currentValue === "") {
    event.preventDefault();
  }
  if (key === "-") {
    event.preventDefault();
  }
}


function calc() {
  let portions = document.getElementById("container3Input").value;

  if (portions == "" || portions < 1 || portions > 20) {
    alert("Please enter a number of portions between 1 and 20.");
    return;
  }

  document.getElementById("tomatoes").innerText = portions * 2;
  document.getElementById("cucumber").innerText = portions * 2;
  document.getElementById("onion").innerText = portions * 1 + " ";
  document.getElementById("cheddar").innerText = portions * 50 + "g";
  document.getElementById("meat").innerText = portions * 200 + "g";
  document.getElementById("buns").innerText = portions * 4 + " ";
}


