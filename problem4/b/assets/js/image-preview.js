document.getElementById("image").addEventListener("change", function (event) {
  const preview = document.getElementById("preview");
  const file = event.target.files[0];
  const postAdd = document.querySelector("main");

  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      preview.src = e.target.result;
      preview.classList.remove("d-none");
      postAdd.style.cssText += "padding-bottom: 150px";
    };
    reader.readAsDataURL(file);
  } else {
    preview.src = "#";
    preview.classList.add("d-none");
  }
});
