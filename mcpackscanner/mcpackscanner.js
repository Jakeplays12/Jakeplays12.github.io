function processFolder() {
  const inputElement = document.getElementById('folderInput');
  const file = inputElement.files[0];
  const outputElement = document.getElementById('output');
  const errorElement = document.getElementById('error');
  
  // Clear previous output and error message
  outputElement.innerHTML = '';
  errorElement.innerText = '';

  if (file) {
    const reader = new FileReader();

    reader.onload = function (e) {
      const zip = new JSZip();

      zip.loadAsync(e.target.result).then(function (zip) {
        let relevantFilesFound = false;

        zip.forEach(function (relativePath, zipEntry) {
          if (
            zipEntry.name.endsWith('.properties') &&
            !relativePath.includes('optifine/colormap/') &&
            !relativePath.includes('optifine/random/') &&
            !relativePath.includes('optifine/ctm/') &&
            !relativePath.includes('optifine/sky/') &&
            !relativePath.includes('optifine/cem/') &&
            !relativePath.includes('optifine/colormap/') &&
            !relativePath.includes('optifine/emissive.properties')
          ) {
            const pathAfterOptifine = relativePath.substring(relativePath.indexOf('optifine') + 9);
            zipEntry.async('string').then(function (fileData) {
              processPropertiesFile(fileData, pathAfterOptifine);
            });

            relevantFilesFound = true;
          }
        });

        if (!relevantFilesFound) {
          errorElement.innerText = 'No relevant files found.';
        }
      });
    };

    reader.readAsArrayBuffer(file);
  } else {
    const folderPath = inputElement.value;

    processFolderPath(folderPath);
  }
}

function processPropertiesFile(fileData, pathAfterOptifine) {
  const lines = fileData.split('\n');

  let currentItem = {};
  for (const line of lines) {
    if (line.includes('=')) {
      const [key, value] = line.split('=');
      currentItem[key] = value;
    }
  }

  const itemName = currentItem['matchItems'] || currentItem['items'];
  const itemNameOutput = itemName ? itemName.replace(/["']/g, '') : '';

  const itemNameRegex = currentItem['nbt.display.Name'];
  const itemNameRegexOutput = itemNameRegex ? itemNameRegex.replace(/["']/g, '') : '';

  let output = '';

  output += `<div class="box">
    <div class="file">${pathAfterOptifine}</div>
    <div class="item">Item: ${itemNameOutput}</div>
    <div class="name">Name: ${itemNameRegexOutput}</div>
    <div class="model">Model: ${currentItem['model'] || currentItem['texture'] ? 'true' : 'false'}</div>
  </div>`;

  const outputElement = document.getElementById('output');
  outputElement.innerHTML += output;
}

function processFolderPath(folderPath) {
  console.log(`Folder path: ${folderPath}`);
}
