function getRandomCharacter(charactersList, triedCharacters = []) {
  const charactersLeftToGuess = charactersList.filter(
    (character) => !triedCharacters.includes(character)
  );
  const characterCount = charactersLeftToGuess.length;
  const randomIndex = Math.floor(Math.random() * characterCount);
  const randomCharacter = charactersLeftToGuess[randomIndex];

  return randomCharacter;
}

function applyCryptoEffect(element) {
  const initialText = element.textContent;
  const initialCharacterArray = initialText.split('');

  const charactersInText = [];

  initialCharacterArray.forEach((character) => {
    if (!charactersInText.includes(character)) {
      charactersInText.push(character);
    }
  });

  let encryptedArray = initialCharacterArray.map(() => {
    return getRandomCharacter(charactersInText);
  });

  element.textContent = encryptedArray.join('');

  let characterIndex = 0;
  let triedCharacters = [];

  const interval = setInterval(() => {
    const guessedCharacter = getRandomCharacter(initialCharacterArray, triedCharacters);

    if (guessedCharacter === initialCharacterArray[characterIndex]) {
      encryptedArray[characterIndex] = guessedCharacter;

      characterIndex += 1;
      triedCharacters = [];
    } else {
      triedCharacters.push(guessedCharacter);
    }

    element.textContent = encryptedArray.join('');

    if (characterIndex >= initialCharacterArray.length) {
      clearInterval(interval);

      element.classList.add('DecryptEffect__Word--Solved');
    }
  }, 50);
}

function splitTextElementIntoParts(element) {
  const text = element.textContent;
  const words = text.split(' ');

  const splitWordsMarkup = words
    .map((word) => {
      return `
        <span class="DecryptEffect__Word">${word}</span>
      `;
    })
    .join(' ');

  element.innerHTML = splitWordsMarkup;
}

const textElements = document.querySelectorAll('.DecryptEffect');

textElements.forEach((textElement) => {
  splitTextElementIntoParts(textElement);

  const parts = textElement.querySelectorAll('.DecryptEffect__Word');

  parts.forEach((part) => {
    applyCryptoEffect(part);
  });
});
