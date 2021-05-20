// Fisher-Yates Shuffling
export const Shuffle = (array: any[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const randomNum = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[randomNum];
    array[randomNum] = temp;
  }

  return array;
}