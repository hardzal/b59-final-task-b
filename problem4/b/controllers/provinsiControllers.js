const { Sequelize, QueryTypes } = require("sequelize");
const config = require("../config/config.json");
const sequelize = new Sequelize(config.development);
const fs = require("fs");

async function provinsiPage(req, res) {}

async function provinsiDetailPage(req, res) {
  const userSession = req.session.user ?? null;
  if (req.params.id == null) {
    req.flash("error", "Data not found!");
    return res.redirect("/");
  }

  const id = req.params.id;

  const query = `SELECT * FROM public."provinsi_tb" WHERE id = :id`;
  try {
    const dataResult = await sequelize.query(query, {
      replacements: { id: id },
      type: QueryTypes.SELECT,
    });

    return res.render("provinsi/detail", {
      title: "Detail Provinsi",
      data: dataResult[0],
      userSession: userSession,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error!");
  }
}

async function provinsiAddPage(req, res) {
  const userSession = req.session.user ?? null;

  if (userSession == null) {
    req.flash("error", "Anda tidak memiliki akses");
    return res.redirect("/");
  }

  res.render("provinsi/create", {
    title: "Tambah Data Provinsi",
    userSession: userSession,
  });
}

async function provinsiAdd(req, res) {
  const userSession = req.session.user ?? null;

  if (userSession == null) {
    req.flash("error", "Anda tidak memiliki akses");
    return res.redirect("/");
  }

  const nama = req.body.nama;
  const diresmikan = req.body.diresmikan;
  const user_id = req.body.user_id;
  const pulau = req.body.pulau;
  const photo = req.file.filename;

  const query = `INSERT INTO public."provinsi_tb"(user_id, nama, diresmikan, photo, pulau) VALUES(:user_id, :nama, :diresmikan, :photo, :pulau)`;

  try {
    const provinsi = await sequelize.query(query, {
      replacements: {
        user_id: user_id,
        nama: nama,
        diresmikan: diresmikan,
        photo: photo,
        pulau: pulau,
      },
      type: QueryTypes.INSERT,
    });

    if (!provinsi) {
      req.flash("error", "Gagal menambahkan data!!");

      return res.redirect("/");
    }

    req.flash("success", "Berhasil menambahkan data");

    return res.redirect("/");
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error!");
  }
}

async function provinsiEditPage(req, res) {
  const userSession = req.session.user ?? null;

  if (userSession == null) {
    req.flash("error", "Anda tidak memiliki akses");
    return res.redirect("/");
  }

  if (req.params.id === null) {
    req.flash("error", "Data tidak ditemukan!");
    return res.redirect("/");
  }
  const id = req.params.id;
  const query = `SELECT * FROM public."provinsi_tb" WHERE id = :id`;
  try {
    const provinsi = await sequelize.query(query, {
      replacements: {
        id: id,
      },
      type: QueryTypes.SELECT,
    });

    return res.render("provinsi/edit", {
      title: "Edit Data Provinsi",
      userSession: userSession,
      data: provinsi[0],
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error!");
  }
}

async function provinsiEdit(req, res) {
  const userSession = req.session.user ?? null;
  if (userSession == null) {
    req.flash("error", "Anda tidak memiliki akses");
    return res.redirect("/");
  }
  const id = req.body.id;
  const nama = req.body.nama;
  const diresmikan = req.body.diresmikan;
  const user_id = req.body.user_id;
  const pulau = req.body.pulau;

  const photo = req.file?.filename ?? req.body.image_old;

  const query = `UPDATE public."provinsi_tb"
            SET user_id = :user_id, nama = :nama, diresmikan = :diresmikan, photo = :photo, pulau = :pulau 
            WHERE id = :id`;

  try {
    const provinsi = await sequelize.query(query, {
      replacements: {
        user_id: user_id,
        nama: nama,
        diresmikan: diresmikan,
        photo: photo,
        pulau: pulau,
        id: id,
      },
      type: QueryTypes.UPDATE,
    });

    if (!provinsi) {
      req.flash("error", "Gagal memperbaharui!");

      return res.redirect("/");
    }

    req.flash("success", "Berhasil memperbaharui data");

    return res.redirect("/");
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error!");
  }
}

async function provinsiDelete(req, res) {
  const image = req.body.image ?? null;
  const userSession = req.session.user ?? null;

  if (userSession == null) {
    req.flash("error", "Anda tidak memiliki akses");
    return res.redirect("/");
  }

  if (image != "") {
    fs.unlinkSync("./assets/images/" + image);
  }

  const query = `DELETE FROM public."provinsi_tb" WHERE id = :id`;
  try {
    const provinsi = await sequelize.query(query, {
      replacements: {
        id: req.body.id,
      },
      type: QueryTypes.DELETE,
    });

    if (!provinsi) {
      req.flash("error", `Gagal menghapus data! ${project}`);
      return res.redirect("/");
    }

    req.flash("success", `Berhasil menghapus data! ${project}`);
    return res.redirect("/");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
}

module.exports = {
  provinsiAdd,
  provinsiAddPage,
  provinsiEdit,
  provinsiEditPage,
  provinsiDelete,
  provinsiPage,
  provinsiDetailPage,
};
