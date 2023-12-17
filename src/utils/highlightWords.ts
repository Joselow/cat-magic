export const highlightWords = ({ text, color = 'red', wordNumber = 1}:{ text: string, color: string, wordNumber: number}) => {  
  
  const words = text.split(' ')
  const highlightedWords = words?.slice(0, wordNumber).join(' ');  
  return `<span style="color:${color}">${highlightedWords}</span> ${words?.slice(wordNumber).join(' ')}`;
}