const { Sequelize, QueryTypes } = require("sequelize");
const config = require("../config/config.json");
const sequelize = new Sequelize(config.development);
const fs = require("fs");

async function kabupatenPage(req, res) {}

async function kabupatenDetailPage(req, res) {
  const userSession = req.session.user ?? null;
  if (req.params.id == null) {
    req.flash("error", "Data not found!");
    return res.redirect("/");
  }

  const id = req.params.id;

  const query = `SELECT k.*, p.nama as provinsi, p.pulau FROM public."kabupaten_tb" k INNER JOIN public."provinsi_tb" p ON k.provinsi_id=p.id WHERE k.id = :id`;
  try {
    const dataResult = await sequelize.query(query, {
      replacements: { id: id },
      type: QueryTypes.SELECT,
    });

    return res.render("kabupaten/detail", {
      title: "Detail Kabupaten",
      data: dataResult[0],
      userSession: userSession,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error!");
  }
}

async function kabupatenAddPage(req, res) {
  const userSession = req.session.user ?? null;

  if (userSession == null) {
    req.flash("error", "Anda tidak memiliki akses");
    return res.redirect("/");
  }

  const query = `SELECT * FROM public."provinsi_tb"`;

  try {
    const provinsi = await sequelize.query(query, {
      type: QueryTypes.SELECT,
    });

    return res.render("kabupaten/create", {
      title: "Tambah Data Kabupaten",
      userSession: userSession,
      provinsiList: provinsi,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal server error!");
  }
}

async function kabupatenAdd(req, res) {
  const userSession = req.session.user ?? null;

  if (userSession == null) {
    req.flash("error", "Anda tidak memiliki akses");
    return res.redirect("/");
  }

  const nama = req.body.nama;
  const provinsi_id = req.body.provinsi_id;
  const diresmikan = req.body.diresmikan;

  const photo = req.file.filename;

  const query = `INSERT INTO public."kabupaten_tb"(nama, diresmikan, photo, provinsi_id) VALUES(:nama, :diresmikan, :photo, :provinsi_id)`;

  try {
    const provinsi = await sequelize.query(query, {
      replacements: {
        nama: nama,
        diresmikan: diresmikan,
        photo: photo,
        provinsi_id: provinsi_id,
      },
      type: QueryTypes.INSERT,
    });

    if (!provinsi) {
      req.flash("error", "Gagal menambahkan data!!");

      return res.redirect("/?data=kabupaten");
    }

    req.flash("success", "Berhasil menambahkan data");

    return res.redirect("/?data=kabupaten");
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error!");
  }
}

async function kabupatenEditPage(req, res) {
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
  const query = `SELECT * FROM public."kabupaten_tb" WHERE id = :id`;
  const query_provinsi = `SELECT * FROM public."provinsi_tb"`;

  try {
    const provinsi = await sequelize.query(query_provinsi, {
      type: QueryTypes.SELECT,
    });

    const kabupaten = await sequelize.query(query, {
      replacements: {
        id: id,
      },
      type: QueryTypes.SELECT,
    });

    console.log(provinsi);
    return res.render("kabupaten/edit", {
      title: "Edit Data Kabupaten",
      userSession: userSession,
      provinsi: provinsi,
      data: kabupaten[0],
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error!");
  }
}

async function kabupatenEdit(req, res) {
  const userSession = req.session.user ?? null;

  if (userSession == null) {
    req.flash("error", "Anda tidak memiliki akses");
    return res.redirect("/");
  }

  const nama = req.body.nama;
  const provinsi_id = req.body.provinsi_id;
  const diresmikan = req.body.diresmikan;
  const id = req.body.id;
  const photo = req.file?.filename ?? req.body.image_old;

  const query = `UPDATE public."kabupaten_tb" SET
                  nama = :nama, diresmikan = :diresmikan, photo = :photo, provinsi_id = :provinsi_id
                WHERE id = :id`;

  try {
    const provinsi = await sequelize.query(query, {
      replacements: {
        nama: nama,
        diresmikan: diresmikan,
        photo: photo,
        provinsi_id: provinsi_id,
        id: id,
      },
      type: QueryTypes.UPDATE,
    });

    if (!provinsi) {
      req.flash("error", "Gagal menambahkan data!!");

      return res.redirect("/?data=kabupaten");
    }

    req.flash("success", "Berhasil menambahkan data");

    return res.redirect("/?data=kabupaten");
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error!");
  }
}

async function kabupatenDelete(req, res) {
  const image = req.body.image ?? null;
  const userSession = req.session.user ?? null;

  if (userSession == null) {
    req.flash("error", "Anda tidak memiliki akses");
    return res.redirect("/");
  }

  if (image != "") {
    fs.unlinkSync("./assets/images/" + image);
  }

  const query = `DELETE FROM public."kabupaten_tb" WHERE id = :id`;
  try {
    const kabupaten = await sequelize.query(query, {
      replacements: {
        id: req.body.id,
      },
      type: QueryTypes.DELETE,
    });

    if (!kabupaten) {
      req.flash("error", `Gagal menghapus data! ${kabupaten}`);
      return res.redirect("/");
    }

    req.flash("success", `Berhasil menghapus data! ${kabupaten}`);
    return res.redirect("/");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
}

module.exports = {
  kabupatenAdd,
  kabupatenAddPage,
  kabupatenEdit,
  kabupatenEditPage,
  kabupatenDelete,
  kabupatenPage,
  kabupatenDetailPage,
};
