function checkTotalHarga(tipe_barang, quantity) {
  let result = 0;

  tipe_barang = tipe_barang.toUpperCase();

  if (tipe_barang === "A") {
    const hargaA = 4550;
    const potonganA = 231;

    if (quantity > 13) {
      result = hargaA * quantity - potonganA * quantity;
    } else {
      result = hargaA * quantity;
    }
  } else if (tipe_barang === "B") {
    const hargaB = 5330;
    const potonganB = 0.23;

    if (quantity > 7) {
      result = hargaB * quantity - hargaB * potonganB * quantity;
    } else {
      result = hargaB * quantity;
    }
  } else if (tipe_barang === "C") {
    const hargaC = 8653;

    result = hargaC * quantity;
  }

  return result;
}

console.log(checkTotalHarga("a", 10));
