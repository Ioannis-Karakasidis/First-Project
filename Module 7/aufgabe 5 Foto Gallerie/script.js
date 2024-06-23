let images = [
  "./img/1.jpg",
  "./img/2.jpg",
  "./img/3.jpg",
  "./img/4.jpg",
  "./img/5.jpg",
  "./img/6.jpg",
  "./img/7.jpg",
  "./img/8.jpg",
  "./img/9.jpg",
  "./img/10.jpg",
  "./img/11.jpg",
  "./img/12.jpg",
  "./img/13.jpg",
  "./img/14.jpg",
  "./img/15.jpg",
  "./img/16.jpg",
  "./img/17.jpg",
  "./img/18.jpg",
  "./img/19.jpg",
  "./img/20.jpg",
  "./img/21.jpg",
  "./img/22.jpg",
  "./img/23.jpg",
];

function load() {
  let content = document.getElementById("content");
  content.innerHTML = "";
  for (let i = 0; i < images.length; i++) {
    content.innerHTML += `<div id="image${i}" class="imagecontainer" onclick="openImage(${i})"><img src="${images[i]}"></div>`;
  }
}

function openImage(i) {
  document.getElementById("content").classList.add("d-none");
  document.getElementById("content2").classList.remove("d-none");

  document.getElementById("content2").classList.add("secondarycontainer");
  document.getElementById("content2").innerHTML = generatehtml(images, i);

  if (i === 0) {
    document.getElementById("arrowl").style.display = "none";
  }
  if (i === images.length - 1) {
    document.getElementById("arrowr").style.display = "none";
  }
}

function exit() {
  document.getElementById("content2").classList.add("d-none");
  document.getElementById("content").classList.remove("d-none");
}

function back(index) {
  index = (index - 1 + images.length) % images.length;
  openImage(index);
}

function next(index) {
  index = (index + 1) % images.length;
  openImage(index);
}

function generatehtml(images, i) {
  return `<div class="box">
  <img class="main-image" src="${images[i]}">
  <div class="line">
  <button id="arrowl" onclick="back(${i})"><img src="./img/arrowleft.png" alt="Back"></button>
  <button onclick="exit()"><img src="./img/x.png" alt="Exit"></button>
  <button id="arrowr" onclick="next(${i})"><img src="./img/arrowright.png" alt="Next"></button>
  </div>
  </div>`;
}
