/* Author: Hedyeh Ghesmati Kalourazi */

// Cars data
var cars = [
  { brand: "Audi", country: "Germany", sold: 1614231 },
  { brand: "BMW", country: "Germany", sold: 2400000 },
  { brand: "Ferrari", country: "Italy", sold: 13221 },
  { brand: "Fiat", country: "Italy", sold: 1170000 },
  { brand: "Ford", country: "USA", sold: 4200000 },
  { brand: "General Motors", country: "USA", sold: 5900000 },
  { brand: "Honda", country: "Japan", sold: 21100000 },
  { brand: "Lamborghini", country: "Italy", sold: 9233 },
  { brand: "Maserati", country: "Italy", sold: 25900 },
  { brand: "Mazda", country: "Japan", sold: 1100000 },
  { brand: "Mercedes", country: "Germany", sold: 2043900 },
  { brand: "Nissan", country: "Japan", sold: 3310000 },
  { brand: "Porsche", country: "Germany", sold: 309884 },
  { brand: "Suburu", country: "Japan", sold: 850000 },
  { brand: "Tesla", country: "USA", sold: 1313581 },
  { brand: "Toyota", country: "Japan", sold: 10480000 },
  { brand: "Volkswagen", country: "Germany", sold: 8262776 },
];

// Select container
var container = document.getElementById("container");

// Build list
var countries = [];
for (var i = 0; i < cars.length; i++) {
  var c = cars[i].country;
  var found = false;
  for (var j = 0; j < countries.length; j++) {
    if (countries[j] === c) {
      found = true;
      break;
    }
  }
  if (!found) {
    countries.push(c);
  }
}

// Sort countries
for (var i = 0; i < countries.length - 1; i++) {
  for (var j = i + 1; j < countries.length; j++) {
    if (countries[i] < countries[j]) {
      var temp = countries[i];
      countries[i] = countries[j];
      countries[j] = temp;
    }
  }
}

// radio buttons
var countryDiv = document.createElement("div");

for (var i = 0; i < countries.length; i++) {
  var label = document.createElement("label");

  var radio = document.createElement("input");
  radio.type = "radio";
  radio.name = "country";
  radio.value = countries[i];

  label.appendChild(radio);
  label.appendChild(document.createTextNode(countries[i]));

  countryDiv.appendChild(label);
  countryDiv.appendChild(document.createElement("hr"));
}
container.appendChild(countryDiv);

//  submit button
var button = document.createElement("button");
button.textContent = "Submit";
button.disabled = true;
container.appendChild(button);

// Enable button
container.addEventListener("change", function (e) {
  if (e.target.name === "country") {
    button.disabled = false;
  }
});

//  click
button.addEventListener("click", function () {
  var radios = document.getElementsByName("country");
  var selectedCountry = "";
  for (var i = 0; i < radios.length; i++) {
    if (radios[i].checked) {
      selectedCountry = radios[i].value;
      break;
    }
  }

  var oldResult = document.getElementById("result");
  if (oldResult) {
    oldResult.remove();
  }

  var filtered = [];
  for (var i = 0; i < cars.length; i++) {
    if (cars[i].country === selectedCountry) {
      filtered.push(cars[i]);
    }
  }

  // Sort brands
  for (var i = 0; i < filtered.length - 1; i++) {
    for (var j = i + 1; j < filtered.length; j++) {
      if (filtered[i].sold < filtered[j].sold) {
        var temp = filtered[i];
        filtered[i] = filtered[j];
        filtered[j] = temp;
      }
    }
  }

  //result
  var result = document.createElement("div");
  result.id = "result";

  var title = document.createElement("h2");
  title.textContent = selectedCountry;
  result.appendChild(title);
  result.appendChild(document.createElement("hr"));

  var total = 0;

  for (var i = 0; i < filtered.length; i++) {
    var row = document.createElement("div");
    row.className = "row";

    var brand = document.createElement("div");
    brand.textContent = filtered[i].brand;

    var sold = document.createElement("div");
    sold.textContent = filtered[i].sold;

    row.appendChild(brand);
    row.appendChild(sold);
    result.appendChild(row);
    result.appendChild(document.createElement("hr"));

    total += filtered[i].sold;
  }

  var totalText = document.createElement("div");
  totalText.className = "total";
  totalText.textContent = "Total cars sold: " + total;

  result.appendChild(totalText);
  container.appendChild(result);
});
