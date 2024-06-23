let completemenu = [
  {
    category: "Hauptgericht",
    pic: "./img/dish-7279403_1280.jpg",
    items: [
      {
        menu: "Burger",
        price: "5.99€",
        description:
          "Ein klassischer Rindfleischburger mit Salat, Tomate und Gurken.",
        quantity: 1,
      },
      {
        menu: "Pizza",
        price: "9.99€",
        description: "Frisch gebackene Pizza mit einer Vielzahl von Belägen.",
        quantity: 1,
      },
      {
        menu: "Pasta",
        price: "8.79€",
        description: "Spaghetti in Marinara-Sauce mit Knoblauch und Kräutern.",
        quantity: 1,
      },
      {
        menu: "Sandwich",
        price: "6.29€",
        description: "Gegrilltes Sandwich mit geschmolzenem Käse und Schinken.",
        quantity: 1,
      },
      {
        menu: "Steak",
        price: "15.99€",
        description: "Zartes Rumpsteak serviert mit Kartoffelpüree und Sauce.",
        quantity: 1,
      },
      {
        menu: "Sushi",
        price: "12.49€",
        description: "Verschiedene Sushi-Rollen mit Sojasauce und Wasabi.",
        quantity: 1,
      },
      {
        menu: "Tacos",
        price: "7.99€",
        description:
          "Weiche Maistortillas gefüllt mit gewürztem Rindfleisch, Salat und Käse.",
        quantity: 1,
      },
      {
        menu: "Burrito",
        price: "8.99€",
        description:
          "Weizen-Tortilla gefüllt mit Reis, Bohnen und Ihrer Wahl an Fleisch.",
        quantity: 1,
      },
      {
        menu: "Fish and Chips",
        price: "10.99€",
        description:
          "Knusprig gebackenes Fischfilet mit gewürzten Kartoffelspalten.",
        quantity: 1,
      },
      {
        menu: "Hot Dog",
        price: "4.59€",
        description: "Gegrillte Wurst im Brötchen mit Senf und Ketchup.",
        quantity: 1,
      },
      {
        menu: "Ramen",
        price: "11.49€",
        description: "Japanische Nudelsuppe mit Schweinefleisch, Ei und Nori.",
        quantity: 1,
      },
      {
        menu: "Shrimp",
        price: "13.99€",
        description: "Gegrillte Garnelenspieße serviert mit Cocktailsauce.",
        quantity: 1,
      },
      {
        menu: "Calzone",
        price: "8.49€",
        description:
          "Gefalteter Pizzateig gefüllt mit Käse, Tomatensauce und Schinken.",
        quantity: 1,
      },
      {
        menu: "Cheeseburger",
        price: "6.79€",
        description: "Rindfleisch-Patty mit Cheddar-Käse, Salat und Tomate.",
        quantity: 1,
      },
      {
        menu: "Wrap",
        price: "5.49€",
        description:
          "Tortilla-Wrap gefüllt mit Hähnchen, Salat und Ranch-Dressing.",
        quantity: 1,
      },
      {
        menu: "Pho",
        price: "10.79€",
        description:
          "Vietnamesische Nudelsuppe mit Rindfleisch, Sojasprossen und Basilikum.",
        quantity: 1,
      },
      {
        menu: "Taco Salad",
        price: "8.29€",
        description:
          "Knackiger Salat mit gewürztem Rinderhackfleisch, Käse und Salsa.",
        quantity: 1,
      },
      {
        menu: "BBQ Ribs",
        price: "14.99€",
        description:
          "Langsam gekochte Schweinerippchen glasiert mit Barbecuesauce.",
        quantity: 1,
      },
      {
        menu: "Gyro",
        price: "9.49€",
        description:
          "Gegrilltes Pitabrot gefüllt mit geschnittenem Lamm, Tomaten und Tzatziki-Sauce.",
        quantity: 1,
      },
      {
        menu: "Stir Fry",
        price: "12.29€",
        description: "Gebratene Gemüse und Wahl an Fleisch in Sojasauce.",
        quantity: 1,
      },
      {
        menu: "Meatloaf",
        price: "11.79€",
        description:
          "Traditionelles Hackbraten serviert mit Kartoffelpüree und Sauce.",
        quantity: 1,
      },
      {
        menu: "Pad Thai",
        price: "9.89€",
        description:
          "Thailändische gebratene Nudeln mit Garnelen, Tofu und Erdnüssen.",
        quantity: 1,
      },
    ],
  },
  {
    category: "Vorspeise",
    pic: "./img/bruschetta-2131893_1280.jpg",
    items: [
      {
        menu: "Salat",
        price: "7.49€",
        description:
          "Gemischter Salat mit Kirschtomaten und Balsamico-Vinaigrette.",
        quantity: 1,
      },
      {
        menu: "Suppe",
        price: "4.99€",
        description: "Hausgemachte Suppe mit saisonalem Gemüse.",
        quantity: 1,
      },
      {
        menu: "Nachos",
        price: "6.79€",
        description: "Mais-Tortilla-Chips mit Käse, Jalapeños und Salsa.",
        quantity: 1,
      },
      {
        menu: "Wings",
        price: "6.99€",
        description: "Würzige Hühnerflügel mit Blauschimmelkäse-Dressing.",
        quantity: 1,
      },
      {
        menu: "Caesar Salad",
        price: "7.99€",
        description: "Römersalat mit Croûtons, Parmesan und Caesar-Dressing.",
        quantity: 1,
      },
      {
        menu: "Quesadilla",
        price: "7.19€",
        description:
          "Gegrillte Tortilla mit geschmolzenem Käse, serviert mit Salsa.",
        quantity: 1,
      },
      {
        menu: "Frühlingsrollen",
        price: "5.99€",
        description:
          "Zarte Frühlingsrollen gefüllt mit Gemüse, serviert mit Dip-Sauce.",
        quantity: 1,
      },
    ],
  },
  {
    category: "Beilage",
    pic: "./img/side-dish-7078451_1280.jpg",
    items: [
      {
        menu: "Pommes",
        price: "3.49€",
        description: "Knusprige Pommes frites gewürzt mit Meersalz.",
        quantity: 1,
      },
    ],
  },
];

let basket = [];

loadPostsFromLocalStorage();

function render() {
  let content = document.getElementById("food");
  content.innerHTML = "";

  for (let i = 0; i < completemenu.length; i++) {
    const menuitem = completemenu[i];
    content.innerHTML += menutemplate(i, menuitem);

    let foodContainer = document.getElementById(`foodnames${i}`);
    for (let j = 0; j < menuitem.items.length; j++) {
      const foods = menuitem.items[j];
      foodContainer.innerHTML += boxtemplate(foods, i, j);
    }
  }
}

function menutemplate(i, menuitem) {
  return /*html*/ `
    <h2>${menuitem.category}</h2>
    <img class="category-image" src="${menuitem.pic}">
    <div id="foodnames${i}" class="menu-items"></div>
  `;
}

function boxtemplate(foods, i, j) {
  return /*html*/ `
    <div class="menu-item">
      <div class="menu-itempadding">
        <div class="menu-space">
          <h2>${foods.menu}</h2>
          <div>${foods.price}</div>
          <div>${foods.description}</div>
        </div>
        <button onclick="toggleSection(${i},${j})"><img id="hidepic${i}" src="./img/add_4468379.png" alt=""></button>
      </div>
      <div class="hidden-section d-none" id="secondpart${i}_${j}">
        <div class="hidden-sectioninnerpart">
          <div class="hidden-sectionspace">
            <div class="hidden-sectionspacepart1">
            </div>
            <div class="hidden-sectionspacepart2">
              <div id="amount${i}_${j}" class="box-amount">
                <button class="btn1" onclick="reduce(${i},${j})"><img src="./img/icons8-minus-24.png" alt=""></button>
                <div id="quantity${i}_${j}">${foods.quantity}</div>
                <button class="btn1" onclick="add(${i},${j})"><img src="./img/icons8-plus-24.png"></button>
              </div>
              <button id="totalprice${i}_${j}" class="totalpricedesign" onclick="addtobasket(${i},${j})">${calculateorder(
    foods
  )}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

function calculateorder(foods) {
  let price = parseFloat(foods.price.replace("€", "").trim());
  let totalPrice = (price * foods.quantity).toFixed(2);
  return `${totalPrice}€`;
}

function updateTotalPrice(i, j) {
  let totalPriceElement = document.getElementById(`totalprice${i}_${j}`);
  totalPriceElement.textContent = calculateorder(completemenu[i].items[j]);
}

function reduce(i, j) {
  if (completemenu[i].items[j].quantity > 1) {
    completemenu[i].items[j].quantity--;
    updatequantity(i, j);
    updateTotalPrice(i, j);
    savePostsToLocalStorage();
  }
}

function add(i, j) {
  completemenu[i].items[j].quantity++;
  updatequantity(i, j);
  updateTotalPrice(i, j);
  savePostsToLocalStorage();
}

function updatequantity(i, j) {
  let numberofitems = document.getElementById(`quantity${i}_${j}`);
  numberofitems.textContent = completemenu[i].items[j].quantity;
}

function savePostsToLocalStorage() {
  localStorage.setItem("completemenu", JSON.stringify(completemenu));
  localStorage.setItem("basket", JSON.stringify(basket));
}

function loadPostsFromLocalStorage() {
  let menu = localStorage.getItem("completemenu");
  let box = localStorage.getItem("basket");
  if (menu) {
    completemenu = JSON.parse(menu);
  }
  if (box) {
    basket = JSON.parse(box);
  }
}

function toggleSection(i, j) {
  const currentElement = document.getElementById(`secondpart${i}_${j}`);
  const allSecondParts = document.querySelectorAll('[id^="secondpart"]');

  currentElement.classList.toggle("d-none");

  allSecondParts.forEach((element) => {
    if (element !== currentElement) {
      element.classList.add("d-none");
    }
  });
}

function load() {
  let basketbox = document.getElementById("saveditems");
  basketbox.innerHTML = "";

  for (let o = 0; o < basket.length; o++) {
    const items = basket[o];
    basketbox.innerHTML += baskettemplate(items, o);
  }
  showtotalpreis();
}

function baskettemplate(items, o) {
  return /*html*/ `<div class="line">
    <div>${items.quantity}</div>
    <div>${items.menu}</div>
    <button onclick="reducefrombasket(${o})" class="btn2">-</button>
    <button onclick="basketchange(${o})" class="btn2">+</button>
    <div id="totalprice${o}">${calculateorder(items)}</div>
    <button onclick="deleting(${o})">X</button>
  </div>`;
}

function deleting(index) {
  basket.splice(index, 1);
  savePostsToLocalStorage();
  load();
}

function reducefrombasket(index) {
  if (basket[index].quantity > 1) {
    basket[index].quantity--;
  } else if (basket[index].quantity === 1) {
    basket.splice(index, 1);
  }
  savePostsToLocalStorage();
  load();
}

function addtobasket(i, j) {
  let comment = document.getElementById("showmessage");

  if (basket.length >= 10) {
    comment.innerHTML += `Warenkorb Voll`;

    setTimeout(function () {
      comment.innerHTML = "";
    }, 1000);
  }

  let item = completemenu[i].items[j];

  let existingItem = basket.find((basketItem) => basketItem.menu === item.menu);

  if (existingItem) {
    existingItem.quantity += item.quantity;
  } else {
    basket.push({ ...item });
  }

  savePostsToLocalStorage();
  load();
}

function basketchange(index) {
  if (basket[index]) {
    basket[index].quantity++;
  }

  savePostsToLocalStorage();
  load();
}

function calculateorder(item) {
  let price1 = parseFloat(item.price.replace("€", "").trim());
  let totalPrice = (price1 * item.quantity).toFixed(2);
  return `${totalPrice}€`;
}

function updateTotalPriceinbasket(index) {
  let totalPriceElement = document.getElementById(`totalprice${index}`);
  totalPriceElement.textContent = calculateorder(basket[index]);
}

function showtotalpreis() {
  let content2 = document.getElementById("totalpreis");
  let description = document.getElementById("basketdescription");
  let total = 0;

  for (let i = 0; i < basket.length; i++) {
    let price1 = parseFloat(basket[i].price.replace("€", "").trim());
    total += price1 * basket[i].quantity;
  }

  let minimumOrder = 5.95;
  let missingAmount = (minimumOrder - total).toFixed(2);

  if (basket.length === 0) {
    content2.textContent =
      "Wähle leckere Gerichte aus der Karte und bestelle Dein Menü";
    description.textContent =
      "Leider kannst Du noch nicht bestellen. Blissful Bites Restaurant liefert erst ab einem Mindestbestellwert von 5,90 € (exkl. Lieferkosten)";
  } else if (missingAmount <= 0) {
    content2.textContent = `Gesamtpreis: ${total.toFixed(2)}€`;
    description.textContent = "Mindestbestellwert erreicht";
  } else {
    content2.textContent = `Gesamtpreis: ${total.toFixed(2)}€`;
    description.innerHTML = `Fehlt: ${missingAmount}€ den Mindestauftragswert zu erreichen`;
  }
}

function order() {
  let total = 0;
  for (let i = 0; i < basket.length; i++) {
    let price1 = parseFloat(basket[i].price.replace("€", "").trim());
    total += price1 * basket[i].quantity;
  }

  let minimumOrder = 5.95;
  let missingAmount = (minimumOrder - total).toFixed(2);

  if (missingAmount <= 0) {
    document.getElementById("showmessage").innerHTML =
      "Vielen Dank für Ihre Bestellung!";
    basket = [];
    savePostsToLocalStorage();
    load();
    document.getElementById("basketdescription").textContent = "";

    setTimeout(function () {
      document.getElementById("showmessage").textContent = "";
    }, 1000);
  } else {
    document.getElementById(
      "showmessage"
    ).innerHTML = `Bitte fügen Sie weitere ${missingAmount}€ hinzu, um eine Bestellung aufzugeben.`;

    setTimeout(function () {
      document.getElementById("showmessage").textContent = "";
    }, 1000);
  }
}

function showmenu() {
  const outside = document.getElementById("outside");
  const basketcontent = document.getElementById("basketcontent");
  const screenWidth = window.innerWidth;

  outside.classList.toggle("d-none");

  if (screenWidth >= 1025) {
    if (basketcontent.style.maxWidth !== "unset") {
      basketcontent.style.maxWidth = "unset";
    } else {
      basketcontent.style.maxWidth = "344px";
    }
  } else {
    if (
      basketcontent.style.display !== "flex" ||
      basketcontent.style.maxWidth !== "unset"
    ) {
      basketcontent.style.display = "flex";
      basketcontent.style.maxWidth = "unset";
    } else {
      basketcontent.style.display = "none";
    }
  }
}

function clearbasket() {
  basket = [];
  savePostsToLocalStorage();
  load();
}
