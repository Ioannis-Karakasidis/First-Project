function opensearchbutton() {
  document.getElementById("input").style.display = "unset";
  document.getElementById("menu").style.display = "none";
  document.getElementById("input-area1").style.justifyContent = "unset";
  document.getElementById("image").src = "./img/input-arrow.png";
  document.getElementById("input").id = "input2";
  document
    .getElementById("search-btn")
    .setAttribute("onclick", "closearrowbutton()");
}

function closearrowbutton() {
  document.getElementById("input-area1").style.justifyContent = "flex-end";
  document.getElementById("input2").style.display = "none";
  document.getElementById("menu").style.display = "flex";
  document.getElementById("image").src = "./img/search icon.jpg";
  document.getElementById("input2").id = "input";
  document
    .getElementById("search-btn")
    .setAttribute("onclick", "opensearchbutton()");
}

function toggleClass() {
  document.getElementById("slider-menu").classList.toggle("expand");
}
