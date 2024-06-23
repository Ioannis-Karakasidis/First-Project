function loading() {
  let navbar = document.getElementById("lineicon");
  navbar.innerHTML = "";
  for (let i = 0; i < posts.length; i++) {
    const post = posts[i];
    navbar.innerHTML += `<div id="iconnav${i}"><img class="icon-sizes" src="${post["icon"]}"</div>`;
  }
}
