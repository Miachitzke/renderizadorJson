const inputJson = document.getElementById("json-input");
const visualizationContainer = document.getElementById(
  "visualization-container");

inputJson.addEventListener("input", function () {
  const jsonString = inputJson.value.trim();

  try {
    const jsonObject = JSON.parse(jsonString);
    renderObject(jsonObject, visualizationContainer);
  } catch (error) {
    visualizationContainer.innerHTML = '<p class="error">JSON inválido</p>';
  }
});

function renderObject(obj, container) {
  container.innerHTML = ""; 

  const rootBox = document.createElement("div");
  rootBox.classList.add("box");
  rootBox.innerHTML = "<strong>Objeto Raiz:</strong><br/>";
  container.appendChild(rootBox);

  renderProperties(obj, rootBox);
}

function renderProperties(obj, container) {
  for (const key in obj) {
    let adjustedKey = key;
    const value = obj[key];

    if (/^\d+$/.test(key)) {
      adjustedKey = String(parseInt(key, 10) + 1);
    }

    const propertyBox = document.createElement("div");
    propertyBox.classList.add("box");
    propertyBox.innerText = `<strong>${adjustedKey}: `;

    if (typeof value === "object" && value !== null) {
      // Se o valor é um objeto, renderiza suas propriedades recursivamente
      propertyBox.classList.add("box-objeto");

      const numMembers = Object.keys(value).length;

      if (numMembers > 0) {
        propertyBox.innerHTML =
          propertyBox.innerText.replace(":", "") + `(${numMembers}): </strong>`;
      } 
      
      renderProperties(value, propertyBox);
    } else {
      propertyBox.innerText = propertyBox.innerText.replace("<strong>", "");
      propertyBox.classList.add("box-valor", "editable");
      propertyBox.contentEditable = "true";
      propertyBox.innerText += value;
    }

    container.appendChild(propertyBox);
  }
}
