function switchTokens() {
  let euro = document.getElementById("input-container").innerHTML;
  let usd = document.getElementById("input-container2").innerHTML;

  document.getElementById("input-container").innerHTML = usd;
  document.getElementById("input-container2").innerHTML = euro;
}

const exchangeRate = 1.1; // Beispielhafter Umrechnungskurs EUR zu USD

function calc() {
  // Elemente referenzieren
  const euroField = document.getElementById("euroField");
  const usdField = document.getElementById("usd");

  // Prüfen, ob Euro-Feld nicht leer ist und Umrechnung von Euro zu USD durchführen
  if (euroField.value !== "") {
    const euroAmount = parseFloat(euroField.value);
    const usdAmount = euroAmount * exchangeRate;
    usdField.value = usdAmount.toFixed(2);
  }
  // Prüfen, ob USD-Feld nicht leer ist und Umrechnung von USD zu Euro durchführen
  else if (usdField.value !== "") {
    const usdAmount = parseFloat(usdField.value);
    const euroAmount = usdAmount / exchangeRate;
    euroField.value = euroAmount.toFixed(2);
  }
}
