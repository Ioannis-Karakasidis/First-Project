let names = [];
let phonenumbers = [];

function add() {
  let name1 = document.getElementById("name1").value;
  let phone = document.getElementById("telephone").value;
  names.push(name1);
  phonenumbers.push(phone);
  showslog();
}

function showslog() {
  document.getElementById("name1").value = "";
  document.getElementById("telephone").value = "";
  document.getElementById("log").innerHTML = "";
  for (let i = 0; i < names.length && i < phonenumbers.length; i++) {
    document.getElementById(
      "log"
    ).innerHTML += `<br><b>Name:</b> ${names[i]} <br> <b>Phone:</b> ${phonenumbers[i]} <br><button onclick="deleteContact(${i})">Loschen</button>
    <button onclick="save()">Speichern</button`;
  }
}

function deleteContact(i) {
  names.splice(i, 1);
  phonenumbers.splice(i, 1);
  showslog();
}

function save() {
  let nameastext = JSON.stringify(names);
  localStorage.setItem("name", nameastext);
  let phoneastext = JSON.stringify(phonenumbers);
  localStorage.setItem("phone", phoneastext);
}

function render() {
  let content = document.getElementById("content");
  content.innerHTML = "";
  content.innerHTML = `<h1>My Contacts</h1> 
    <div>
    <input id="name1" type="text" required placeholder="Name">
    <input id="telephone" type ="text" required placeholder="Phonenumber">
    <button onclick="add()">Hinzufugen</button>
    </div>
    <div id="log"></div>`;
}
