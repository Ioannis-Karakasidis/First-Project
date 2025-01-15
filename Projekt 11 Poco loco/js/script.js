/**
 * Includes an external HTML file into the current page based on the 'w3-include-html' attribute.
 * 
 * This function loops through all elements in the document, finds those with the 
 * 'w3-include-html' attribute, makes an HTTP request to fetch the HTML file, and 
 * inserts the content into the respective element.
 * 
 * @function includeHTML
 */
function includeHTML() {
  var z, i, elmnt, file, xhttp;
  z = document.getElementsByTagName("*");

  for (i = 0; i < z.length; i++) {
    elmnt = z[i];
    file = elmnt.getAttribute("w3-include-html");
    if (file) {
      xhttp = new XMLHttpRequest();

      xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
          if (this.status == 200) {
            elmnt.innerHTML = this.responseText;
          }
          if (this.status == 404) {
            elmnt.innerHTML = "Page not found.";
          }
          elmnt.removeAttribute("w3-include-html");
          includeHTML();
        }
      };
      xhttp.open("GET", file, true);
      xhttp.send();
      return;
    }
  }
}
