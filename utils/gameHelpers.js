export function fetchWord() {
  return fetch('https://random-words-api.vercel.app/word').then((res) => res.json())
}
