const apiUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(
  "https://colormagic.app/api/palette/search?q=blue"
)}`;

const list = document.getElementById("palettes-list");

function getContrastText(bgColor) {
  let r = parseInt(bgColor.substring(1, 3), 16);
  let g = parseInt(bgColor.substring(3, 5), 16);
  let b = parseInt(bgColor.substring(5, 7), 16);

  let luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

  return luminance > 0.5 ? "#181818" : "#f3f3f3";
}

async function getData() {
  const response = await fetch(apiUrl);
  const data = await response.json();
  const parsedData = JSON.parse(data.contents);

  list.innerHTML = parsedData
    .map((color) => {
      const color1 = getContrastText(color.colors[0]);
      const color2 = getContrastText(color.colors[1]);
      const color3 = getContrastText(color.colors[2]);
      const color4 = getContrastText(color.colors[3]);
      const color5 = getContrastText(color.colors[4]);

      return `<li class="palette">
            <div class="color" style="background-color: ${color.colors[0]};"><span style="color: ${color1}">${color.colors[0]}</span></div>
            <div class="color" style="background-color: ${color.colors[1]};"><span style="color: ${color2}">${color.colors[1]}</span></div>
            <div class="color" style="background-color: ${color.colors[2]};"><span style="color: ${color3}">${color.colors[2]}</span></div>
            <div class="color" style="background-color: ${color.colors[3]};"><span style="color: ${color4}">${color.colors[3]}</span></div>
            <div class="color" style="background-color: ${color.colors[4]};"><span style="color: ${color5}">${color.colors[4]}</span></div>
          </li>`;
    })
    .join("");

  console.log(parsedData);
}

getData();
