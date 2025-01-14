const { Sequelize, QueryTypes } = require("sequelize");
const config = require("../config/config.json");
const sequelize = new Sequelize(config.development);
const fs = require("fs");

async function kabupatenPage(req, res) {}

async function kabupatenDetailPage(req, res) {}

async function kabupatenAddPage(req, res) {}

async function kabupatenAdd(req, res) {}

async function kabupatenEditPage(req, res) {}

async function kabupatenEdit(req, res) {}

async function kabupatenDelete(req, res) {}

module.exports = {
  kabupatenAdd,
  kabupatenAddPage,
  kabupatenEdit,
  kabupatenEditPage,
  kabupatenDelete,
  kabupatenPage,
  kabupatenDetailPage,
};
