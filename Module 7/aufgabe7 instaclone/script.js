let posts = [
  {
    icon: "./img/1.png",
    image: "./img/1.png",
    user: "peter",
    comments: [],
    likes: 0,
    liked: false,
    bookmarked: false,
    time: "2 days ago",
  },
  {
    icon: "./img/2.png",
    image: "./img/2.png",
    user: "paige",
    comments: [],
    likes: 0,
    liked: false,
    bookmarked: false,
    time: "3 days ago",
  },
  {
    icon: "./img/3.png",
    image: "./img/3.png",
    user: "olaf",
    comments: [],
    likes: 0,
    liked: false,
    bookmarked: false,
    time: "1 days ago",
  },
  {
    icon: "./img/4.png",
    image: "./img/4.png",
    user: "julia",
    comments: [],
    likes: 0,
    liked: false,
    bookmarked: false,
    time: "13 days ago",
  },
  {
    icon: "./img/5.png",
    image: "./img/5.png",
    user: "juli",
    comments: [],
    likes: 0,
    liked: false,
    bookmarked: false,
    time: "14 days ago",
  },
  {
    icon: "./img/6.png",
    image: "./img/6.png",
    user: "george",
    comments: [],
    likes: 0,
    liked: false,
    bookmarked: false,
    time: "7 days ago",
  },
  {
    icon: "./img/7.png",
    image: "./img/7.png",
    user: "johan",
    comments: [],
    likes: 0,
    liked: false,
    bookmarked: false,
    time: "15 days ago",
  },
  {
    icon: "./img/8.png",
    image: "./img/8.png",
    user: "john",
    comments: [],
    likes: 0,
    liked: false,
    bookmarked: false,
    time: "20 days ago",
  },
  {
    icon: "./img/9.png",
    image: "./img/9.png",
    user: "travis",
    comments: [],
    likes: 0,
    liked: false,
    bookmarked: false,
    time: "25 days ago",
  },
  {
    icon: "./img/10.png",
    image: "./img/10.png",
    user: "josh",
    comments: [],
    likes: 0,
    liked: false,
    bookmarked: false,
    time: "3 months ago",
  },
  {
    icon: "./img/11.png",
    image: "./img/11.png",
    user: "irish",
    comments: [],
    likes: 0,
    liked: false,
    bookmarked: false,
    time: "3 years ago",
  },
  {
    icon: "./img/12.png",
    image: "./img/12.png",
    user: "jack",
    comments: [],
    likes: 0,
    liked: false,
    bookmarked: false,
    time: "30 days ago",
  },
  {
    icon: "./img/13.png",
    image: "./img/13.png",
    user: "riley",
    comments: [],
    likes: 0,
    liked: false,
    bookmarked: false,
    time: "31 days ago",
  },
  {
    icon: "./img/14.png",
    image: "./img/14.png",
    user: "elvis",
    comments: [],
    likes: 0,
    liked: false,
    bookmarked: false,
    time: "4 days ago",
  },
  {
    icon: "./img/15.png",
    image: "./img/15.png",
    user: "kate",
    comments: [],
    likes: 0,
    liked: false,
    bookmarked: false,
    time: "28 days ago",
  },
];

window.onload = function () {
  loading();
  includeHTML();
  loadPostsFromLocalStorage();
  render();
};

function render() {
  let content = document.getElementById("content");
  content.innerHTML = "";
  for (let i = 0; i < posts.length; i++) {
    const post = posts[i];
    content.innerHTML += posttemplate(i, post);

    let box = document.getElementById(`section${i}`);
    for (let j = 0; j < post["comments"].length; j++) {
      const comment = post["comments"][j];
      box.innerHTML += `<div>${comment}<button class="btn-delete" onclick="deleteComment(${i}, ${j})">X</button></div>`;
    }

    let bookmarkImg = document.getElementById(`img-save${i}`);
    if (post.bookmarked) {
      bookmarkImg.src = "./img/bookmark.png";
    } else {
      bookmarkImg.src = "./img/bookmark (1).png";
    }

    changeIcon(i);
  }
}

function showbutton(i) {
  document.getElementById(`mainbutton${i}`).style.display = "block";
}

function addComment(index) {
  let input = document.getElementById(`input${index}`);
  posts[index]["comments"].push(input.value);
  input.value = "";
  savePostsToLocalStorage();
  render();
}

function posttemplate(i, post) {
  return `<div class="postdesign" id="${i}">
    <div>
      <div class="alignment">
        <div class="line">
          <div class="icondesign">
            <img class="icon-size" src="${post["icon"]}" />
          </div>
          <b>${post["user"]}</b>
          <div>${post["time"]}</div>
        </div>
        <div class="dot-padding">
          <img class="dot-size" src="./img/dots.png" />
        </div>
      </div>
      <div><img class="image-post" src="${post["image"]}" /></div>
      <div class="lineup">
        <div class="lineup-space">
          <button class="btn-like" onclick="toggleLike(${i});">
            <img id="img-like${i}" class="like-button" src="./img/like.png" />
          </button>
          <button class="btn-like"><img src="./img/bubble-chat.png"></button>
        </div>
        <button class="btn-like" onclick="toggleBookmark(${i})">
          <img id="img-save${i}" src="./img/bookmark (1).png">
        </button>
      </div>
      <div id="likes${i}">${post["likes"]} likes</div>
      <div id="section${i}"></div>
      <div class="alignmentline">
        <textarea id="input${i}" oninput="showbutton(${i})" placeholder="Add a comment"></textarea>
        <button id="mainbutton${i}" class="textareainput" onclick="addComment(${i})">Posten</button>
      </div>
    </div>
  </div>`;
}

function toggleLike(index) {
  if (posts[index].liked) {
    posts[index].likes--;
    posts[index].liked = false;
  } else {
    posts[index].likes++;
    posts[index].liked = true;
  }
  savePostsToLocalStorage();
  render();
}

function changeIcon(index) {
  let img = document.getElementById(`img-like${index}`);
  if (posts[index].liked) {
    img.src = "./img/heart.png";
  } else {
    img.src = "./img/heart (1).png";
  }
}

function toggleBookmark(index) {
  let img = document.getElementById(`img-save${index}`);

  if (img.src.endsWith("bookmark.png")) {
    img.src = "./img/bookmark (1).png";
    posts[index].bookmarked = false;
  } else {
    img.src = "./img/bookmark.png";
    posts[index].bookmarked = true;
  }
  savePostsToLocalStorage();
}

function savePostsToLocalStorage() {
  localStorage.setItem("posts", JSON.stringify(posts));
}

function loadPostsFromLocalStorage() {
  let savedPosts = localStorage.getItem("posts");
  if (savedPosts) {
    posts = JSON.parse(savedPosts);
  }
}

function deleteComment(postIndex, commentIndex) {
  posts[postIndex].comments.splice(commentIndex, 1);
  savePostsToLocalStorage();
  render();
}

function includeHTML() {
  var z, i, elmnt, file, xhttp;
  /* Loop through a collection of all HTML elements: */
  z = document.getElementsByTagName("*");
  for (i = 0; i < z.length; i++) {
    elmnt = z[i];
    /*search for elements with a certain attribute:*/
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
