let titles = [];
let comments = [];
let mulleimerTitles = [];
let mulleimerComments = [];

load();

function expand() {
  document.getElementById("box-hidden").classList.remove("hidden");
  document.getElementById("box-border").style.border = "1px solid #ccc";
}

function expand2() {
  document.getElementById("box-hidden").classList.add("hidden");
  document.getElementById("box-border").style.border = "none";
}

function post() {
  let title = document.getElementById("title").value;
  let text = document.getElementById("text").value;
  titles.push(title);
  comments.push(text);
  render();
  save();
  showSavedItems();
}

function deleteContact(i) {
  mulleimerTitles.push(titles[i]);
  mulleimerComments.push(comments[i]);
  titles.splice(i, 1);
  comments.splice(i, 1);

  save();
  showSavedItems();
}

function returnPost(i) {
  if (i >= 0 && i < mulleimerTitles.length) {
    titles.push(mulleimerTitles[i]);
    comments.push(mulleimerComments[i]);
    mulleimerTitles.splice(i, 1);
    mulleimerComments.splice(i, 1);

    save();
    showDeletedItems();
  }
}

function permanentDelete(i) {
  if (i >= 0 && i < mulleimerTitles.length) {
    mulleimerTitles.splice(i, 1);
    mulleimerComments.splice(i, 1);

    save();
    showDeletedItems();
    render();
  }
}

function save() {
  let titlesAsText = JSON.stringify(titles);
  let commentsAsText = JSON.stringify(comments);
  let mulleimerTitlesAsText = JSON.stringify(mulleimerTitles);
  let mulleimerCommentsAsText = JSON.stringify(mulleimerComments);
  localStorage.setItem("titles", titlesAsText);
  localStorage.setItem("comments", commentsAsText);
  localStorage.setItem("mulleimerTitles", mulleimerTitlesAsText);
  localStorage.setItem("mulleimerComments", mulleimerCommentsAsText);
}

function render() {
  let contents = document.getElementById("content");
  contents.innerHTML = "";

  for (let i = 0; i < titles.length; i++) {
    const title = titles[i];
    const comment = comments[i];
    contents.innerHTML += createPostTemplate(i, title, comment);
  }
  document.getElementById("title").value = "";
  document.getElementById("text").value = "";
}

function load() {
  let titlesAsText = localStorage.getItem("titles");
  let commentsAsText = localStorage.getItem("comments");
  let mulleimerTitlesAsText = localStorage.getItem("mulleimerTitles");
  let mulleimerCommentsAsText = localStorage.getItem("mulleimerComments");
  if (titlesAsText && commentsAsText) {
    titles = JSON.parse(titlesAsText);
    comments = JSON.parse(commentsAsText);
  }
  if (mulleimerTitlesAsText && mulleimerCommentsAsText) {
    mulleimerTitles = JSON.parse(mulleimerTitlesAsText);
    mulleimerComments = JSON.parse(mulleimerCommentsAsText);
  }

  render();
  showDeletedItems();
}

function showSavedItems() {
  let container =
    document.getElementById("content") || document.getElementById("savedItems");
  container.innerHTML = "";

  for (let i = 0; i < titles.length; i++) {
    container.innerHTML += createPostTemplate(i, titles[i], comments[i]);
  }
}

function showDeletedItems() {
  let container = document.getElementById("deletedItems");
  container.innerHTML = "";
  for (let i = 0; i < mulleimerTitles.length; i++) {
    container.innerHTML += createDeletedPostTemplate(
      i,
      mulleimerTitles[i],
      mulleimerComments[i]
    );
  }
}

function createPostTemplate(i, title, comment) {
  return `
    <div class="post" id="post${i}">
      <div class="title-input" contenteditable="true">${title}</div>
      <br>
      <div class="comment-text" contenteditable="true">${comment}</div>
      <br>
      <div class="box1">
        <div class="deletingdiv">
          <button class="deleting" onclick="deleteContact(${i})">
            <img class="images1" src="./img/mulleimer.png" alt="Delete">
          </button>
        </div>
      </div>
    </div>`;
}

function createDeletedPostTemplate(i, title, comment) {
  return `
    <div class="post" id="post${i}">
      <div class="title-input" contenteditable="true">${title}</div>
      <br>
      <div class="comment-text" contenteditable="true">${comment}</div>
      <br>
      <div class="box1">
        <div class="deletingdiv">
          <button class="deleting" onclick="returnPost(${i})">
            <img class="images1" src="./img/return.png" alt="Return">
          </button>
          <button class="deleting" onclick="permanentDelete(${i})">
            <img class="images1" src="./img/mulleimer.png" alt="Delete">
          </button>
        </div>
      </div>
    </div>`;
}
