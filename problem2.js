function bubbleSortArray(arr) {
  let temp, swapped, i, j;
  for (i = 0; i < arr.length - 1; i++) {
    swapped = false;
    for (j = 0; j < arr.length - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        temp = arr[j + 1];
        arr[j + 1] = arr[j];
        arr[j] = temp;
        swapped = true;
      }
    }

    if (swapped == false) break;
  }

  return arr;
}

let arr = [20, 12, 35, 11, 17, 9, 58, 23, 69, 21];

console.log(bubbleSortArray(arr).join(" "));
