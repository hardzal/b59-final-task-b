const express = require("express");
const session = require("express-session");
const flash = require("express-flash");
const path = require("path");
const hbs = require("hbs");
const methodOverride = require("method-override");
const dotenv = require("dotenv");
const upload = require("./middlewares/upload-file.js");

const {
  homePage,
  authLogin,
  authLogout,
  authRegister,
  loginPage,
  registerPage,
} = require("./controllers/authControllers");

const {
  provinsiPage,
  provinsiAdd,
  provinsiAddPage,
  provinsiEdit,
  provinsiEditPage,
  provinsiDelete,
  provinsiDetailPage,
} = require("./controllers/provinsiControllers.js");

const {
  kabupatenPage,
  kabupatenAdd,
  kabupatenAddPage,
  kabupatenEdit,
  kabupatenEditPage,
  kabupatenDelete,
  kabupatenDetailPage,
} = require("./controllers/kabupatenControllers.js");

const app = express();
const PORT = 5005;

dotenv.config();

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.use(flash());
app.use(
  session({
    name: "my-session",
    secret: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: true,
    // cookie: { secure: true },
  })
);

app.use("/assets", express.static(path.join(__dirname, "./assets")));
app.use("/uploads", express.static(path.join(__dirname, "./uploads")));

hbs.registerPartials(path.join(__dirname, "./views/partials"), (err) => {
  if (err) console.error("Error registering partials:", err);
});

app.get("/", homePage);
app.get("/login", loginPage);
app.get("/register", registerPage);

app.post("/login", authLogin);
app.post("/register", authRegister);
app.post("/logout", authLogout);

app.get("/provinsi", provinsiPage);
app.get("/provinsi/add", provinsiAddPage);
app.post("/provinsi", upload.single("image"), provinsiAdd);
app.get("/provinsi/:id", provinsiDetailPage);
app.get("/provinsi/:id/edit", provinsiEditPage);
app.put("/provinsi/:id/edit", upload.single("image"), provinsiEdit);
app.delete("/provinsi/:id", provinsiDelete);

app.get("/kabupaten", kabupatenPage);
app.get("/kabupaten/:id", kabupatenDetailPage);
app.get("/kabupaten/add", kabupatenAddPage);
app.post("/addkabupaten", upload.single("image"), kabupatenAdd);
app.get("/kabupaten/:id/edit", kabupatenEditPage);
app.put("/kabupaten/:id", upload.single("image"), kabupatenEdit);
app.delete("/kabupaten/:id", kabupatenDelete);

app.listen(PORT, () => {
  console.log(`\nBerhasil menjalankan server pada http://localhost:${PORT}`);
  console.log(`Server berjalan pada port ${PORT}`);
});
