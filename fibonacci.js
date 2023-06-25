/* Using iteration, write a function fibs which takes a number and 
returns an array containing that many numbers from the fibonacci 
sequence. Using an example input of 8, this function should return 
the array [0, 1, 1, 2, 3, 5, 8, 13].*/

function fibs(number) {
  let fibsArray = [];
  for (let i = 0; i < number; i++) {
    if (i === 0 || i === 1) {
      fibsArray.push(i);
    } else {
      fibsArray.push(fibsArray[i - 1] + fibsArray[i - 2]);
    }
  }
  return fibsArray;
}

/* Write another function fibsRec which solves the same problem recursively. 
This can be done in just a couple of lines (or 1 if you’re crazy, but don’t consider 
either of these lengths a requirement… just get it done).*/

function fibsRec(number) {
  if (number === 1) return [0];
  if (number === 2) return [0, 1];

  return [
    ...fibsRec(number - 1),
    fibsRec(number - 1)[number - 2] + fibsRec(number - 1)[number - 3],
  ];
}

//console.log(fibs(8)); = [0, 1, 1, 2, 3, 5, 8, 13]

//console.log(fibsRec(8)); = [0, 1, 1, 2, 3, 5, 8, 13]
