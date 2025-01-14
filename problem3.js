function polaPersegi(n) {
  if (n % 2 === 0) {
    return "Masukkan parameter bernilai ganjil.";
  }
  const mid = (n + 1) / 2;
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= n; j++) {
      if (i == 1 && j == 1) {
        process.stdout.write("*");
      } else if (i == n && j == n) {
        process.stdout.write("*");
      } else if ((i == 1 && j == n) || (j == 1 && i == n)) {
        process.stdout.write("*");
      } else if ((i == mid || j == mid) && i != j) {
        process.stdout.write("*");
      } else {
        process.stdout.write("#");
      }
    }
    console.log("");
  }
}

// polaPersegi(5);
// console.log("");
polaPersegi(7);
console.log("");
// console.log(polaPersegi(8));
