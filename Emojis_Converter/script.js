function convertEmoji() {
  const input = document.getElementById("emojiInput").value;
  const resultsDiv = document.getElementById("results");
  resultsDiv.innerHTML = "";

  for (const char of input) {
    const codePoint = char.codePointAt(0);

    const hexCode = codePoint.toString(16).toUpperCase();
    const decimalCode = codePoint.toString();
    const binaryCode = codePoint.toString(2);

    const htmlDecimal = `&#${decimalCode};`;
    const htmlHex = `&#x${hexCode};`;
    const unicode = `U+${hexCode}`;
    const js = `\\u{${hexCode}}`;
    const css = `\\${hexCode}`;
    const urlEncoded = encodeURIComponent(char);

    console.log(`\u{1F50D} Emoji: ${char}`);
    console.log(`• Unicode: ${unicode}`);
    console.log(`• HTML Decimal: ${htmlDecimal}`);
    console.log(`• HTML Hex: ${htmlHex}`);
    console.log(`• JavaScript: ${js}`);
    console.log(`• CSS Content: ${css}`);
    console.log(`• URL Encoding: ${urlEncoded}`);
    console.log(`• Binary: ${binaryCode}`);
    console.log("———————————————");

    const block = `
      <div>
        <h3>${char}</h3>
        <p><strong>Unicode:</strong> ${unicode}</p>
        <p><strong>HTML Decimal:</strong> ${htmlDecimal}</p>
        <p><strong>HTML Hex:</strong> ${htmlHex}</p>
        <p><strong>JavaScript:</strong> ${js}</p>
        <p><strong>CSS Content:</strong> content: "${css}";</p>
        <p><strong>URL Encoding:</strong> ${urlEncoded}</p>
        <p><strong>Binary:</strong> ${binaryCode}</p>
      </div>
      <hr>
    `;
    resultsDiv.innerHTML += block;
  }
}

function toggleDarkMode() {
  document.body.classList.toggle("dark");
}