export function fetchWord() {
  return fetch('https://random-word-api.herokuapp.com/word?number=1').then((res) => res.json())
}
