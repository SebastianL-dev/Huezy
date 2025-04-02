let apiUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(
  "https://colormagic.app/api/palette/search?q="
)}`;

const list = document.getElementById("palettes-list");
const form = document.getElementById("search-form");
const noPalettes = document.getElementById("no-palettes");
const foundPalettes = document.querySelector(".found-palettes");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const inputValue = document.getElementById("search-input").value.trim();
  if (!inputValue) return;

  const targetSection = document.getElementById("palettes-section");
  targetSection.scrollIntoView({ behavior: "smooth" });

  apiUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(
    `https://colormagic.app/api/palette/search?q=${inputValue}`
  )}`;

  getData();
});

function getContrastText(bgColor) {
  let r = parseInt(bgColor.substring(1, 3), 16);
  let g = parseInt(bgColor.substring(3, 5), 16);
  let b = parseInt(bgColor.substring(5, 7), 16);

  let luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

  return luminance > 0.5 ? "#181818" : "#f3f3f3";
}

async function getData() {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    const parsedData = JSON.parse(data.contents);

    if (parsedData.length === 0) {
      noPalettes.style.display = "flex";
      foundPalettes.style.display = "none";

      return;
    }

    noPalettes.style.display = "none";
    foundPalettes.style.display = "flex";

    list.innerHTML = parsedData
      .map((color) => {
        return `<li class="palette">
              <div class="palette-info">
                <span>${color.text}</span>
                <div>
                  <span>${color.likesCount}</span>
                  <img src="/src/resources/icons/mdi--cards-heart-outline.svg" alt="Heart icon"/>
                </div>
              </div>
              <div class="color" style="background-color: ${
                color.colors[0]
              };"><span id="color-code" style="color: ${getContrastText(
          color.colors[0]
        )}">${color.colors[0].toUpperCase()}</span></div>
              <div class="color" style="background-color: ${
                color.colors[1]
              };"><span id="color-code" style="color: ${getContrastText(
          color.colors[1]
        )}">${color.colors[1].toUpperCase()}</span></div>
              <div class="color" style="background-color: ${
                color.colors[2]
              };"><span id="color-code" style="color: ${getContrastText(
          color.colors[2]
        )}">${color.colors[2].toUpperCase()}</span></div>
              <div class="color" style="background-color: ${
                color.colors[3]
              };"><span id="color-code" style="color: ${getContrastText(
          color.colors[3]
        )}">${color.colors[3].toUpperCase()}</span></div>
              <div class="color" style="background-color: ${
                color.colors[4]
              };"><span id="color-code" style="color: ${getContrastText(
          color.colors[4]
        )}">${color.colors[4].toUpperCase()}</span></div>
            </li>`;
      })
      .join("");
  } catch (error) {
    console.error(error);
  }
}

getData();
