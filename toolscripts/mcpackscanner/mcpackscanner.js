function processFolder() {
  const inputElement = document.getElementById('folderInput');
  const file = inputElement.files[0];
  const outputElement = document.getElementById('output');
  const errorElement = document.getElementById('error');
  const counterElement = document.getElementById('counter'); // Add this line

  // Clear previous output and error message
  outputElement.innerHTML = '';
  errorElement.innerText = '';
  let itemcounter = 0;

  // Starts the scan
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
            // All these are not included
          ) {
            const pathAfterOptifine = relativePath.substring(relativePath.indexOf('optifine') + 9);
            zipEntry.async('string').then(function (fileData) {
              processPropertiesFile(fileData, pathAfterOptifine);
              itemcounter++;
              counterElement.innerText = `Items:  ${itemcounter}`; // Add this line
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


function exportData() {
  const outputElement = document.getElementById('output');
  const boxes = outputElement.getElementsByClassName('box');

  // Prepare data for export
  const exportData = [];
  for (const box of boxes) {
    const fileElement = box.getElementsByClassName('file')[0];
    const itemElement = box.getElementsByClassName('item')[0];
    const nameElement = box.getElementsByClassName('name')[0];
    const modelElement = box.getElementsByClassName('model')[0];

    const data = {
      file: fileElement.textContent.trim(), // Remove leading/trailing spaces
      item: itemElement.textContent.replace(/[\r\n]/g, ''), // Remove newline characters
      name: nameElement.textContent.replace(/[\r\n]/g, ''), // Remove newline characters
      model: modelElement.textContent.trim() // Remove leading/trailing spaces
    };

    exportData.push(data);
  }

  // Convert data to JSON string
  const json = JSON.stringify(exportData, null, 2);

  // Create a new Blob object with the JSON data
  const blob = new Blob([json], { type: 'application/json' });

  // Generate a temporary download link
  const downloadLink = document.createElement('a');
  downloadLink.href = URL.createObjectURL(blob);
  downloadLink.download = 'data.json';

  // Simulate a click on the download link
  downloadLink.click();
}

