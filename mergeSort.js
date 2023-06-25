//Build a function mergeSort that takes in an array and
//returns a sorted array, using a recursive merge sort methodology.

const data = [5, 3, 6, 1, 2, 8, 4, 7, 9];

function mergeSort(data) {
  if (data.length <= 1) {
    return data;
  }

  let middle = Math.floor(data.length / 2);
  let left = data.slice(0, middle);
  let right = data.slice(middle);

  let leftSorted = mergeSort(left);
  let rightSorted = mergeSort(right);

  return merge(leftSorted, rightSorted);
}

function merge(left, right) {
  let result = [];
  let i = 0;
  let j = 0;

  while (i < left.length && j < right.length) {
    if (left[i] < right[j]) {
      result.push(left[i]);
      i++;
    } else {
      result.push(right[j]);
      j++;
    }
  }
  return result.concat(left.slice(i)).concat(right.slice(j));
}

console.log(mergeSort(data));
