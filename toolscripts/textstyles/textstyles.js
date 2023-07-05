const styles = {
    fancy: ['𝒜', '𝐵', '𝒞', '𝒟', '𝐸', '𝐹', '𝒢', '𝐻', '𝐼', '𝒥', '𝒦', '𝐿', '𝑀', '𝒩', '𝒪', '𝒫', '𝒬', '𝑅', '𝒮', '𝒯', '𝒰', '𝒱', '𝒲', '𝒳', '𝒴', '𝒵'],
    'fancy-bold': ['𝓐', '𝓑', '𝓒', '𝓓', '𝓔', '𝓕', '𝓖', '𝓗', '𝓘', '𝓙', '𝓚', '𝓛', '𝓜', '𝓝', '𝓞', '𝓟', '𝓠', '𝓡', '𝓢', '𝓣', '𝓤', '𝓥', '𝓦', '𝓧', '𝓨', '𝓩'],
    double: ['𝔸', '𝔹', 'ℂ', '𝔻', '𝔼', '𝔽', '𝔾', 'ℍ', '𝕀', '𝕁', '𝕂', '𝕃', '𝕄', 'ℕ', '𝕆', 'ℙ', 'ℚ', 'ℝ', '𝕊', '𝕋', '𝕌', '𝕍', '𝕎', '𝕏', '𝕐', 'ℤ'],
    smallcaps: ['ᴀ', 'ʙ', 'ᴄ', 'ᴅ', 'ᴇ', 'ꜰ', 'ɢ', 'ʜ', 'ɪ', 'ᴊ', 'ᴋ', 'ʟ', 'ᴍ', 'ɴ', 'ᴏ', 'ᴘ', 'ǫ', 'ʀ', 'ꜱ', 'ᴛ', 'ᴜ', 'ᴠ', 'ᴡ', 'x', 'ʏ', 'ᴢ']
  };
  
  const specialCharacters = [
    { char: '\t', replacement: '&nbsp;&nbsp;' },
    { char: '\n', replacement: '<br>' },
    { char: '<', replacement: '&lt;' },
    { char: '>', replacement: '&gt;' },
    { char: '&', replacement: '&amp;' },
    { char: '"', replacement: '&quot;' },
    { char: "'", replacement: '&#39;' }
  ];
  
  var selectedStyle = 'fancy';
  
  function selectStyle(style) {
    selectedStyle = style;
    updateStyleButtons();
    convertText();
  }
  
  function updateStyleButtons() {
    var buttons = document.getElementsByClassName('StyleButton');
  
    for (var i = 0; i < buttons.length; i++) {
      var button = buttons[i];
      if (button.id === 'style-' + selectedStyle) {
        button.classList.add('ActiveStyleButton');
      } else {
        button.classList.remove('ActiveStyleButton');
      }
    }
  }
  
  function convertText() {
    var inputText = document.getElementById('input-text').value;
    var convertedText = '';
  
    for (var i = 0; i < inputText.length; i++) {
      var char = inputText[i];
      var convertedChar = char;
  
      for (var j = 0; j < specialCharacters.length; j++) {
        var specialChar = specialCharacters[j];
        if (char === specialChar.char) {
          convertedChar = specialChar.replacement;
          break;
        }
      }
  
      if (char >= 'a' && char <= 'z') {
        var index = char.charCodeAt(0) - 97;
        convertedChar = styles[selectedStyle][index] || char;
      } else if (char >= 'A' && char <= 'Z') {
        var index = char.charCodeAt(0) - 65;
        convertedChar = styles[selectedStyle][index] || char;
      }
  
      convertedText += convertedChar;
    }
  
    document.getElementById('converted-text').innerHTML = convertedText;
  }
  
  // Set the default style to "fancy"
  updateStyleButtons();
  convertText();
  