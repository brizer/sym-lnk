const fs = require("fs");
const path = require("path");
const pify = require("pify");
const del = require("del");
const inquirer = require("inquirer");

/**
 * confirm
 *
 * @param msg
 * @param dft
 * @return {*}
 */
const confirm = function(msg, dft) {
  return inquirer.prompt([
    {
      type: "confirm",
      name: "confirm",
      default: dft || true,
      message: msg || "please input commit message (ex：@dev fix some problem)"
    }
  ]);
};

/**
 * merge default options
 */
const mergeDefaultOptions = options =>
  Object.assign(
    {
      force: false,
      configs: []
    },
    options
  );

/**
 * make some fs method promisify
 */
const fsp = {
  symlink: pify(fs.symlink),
  lstat: pify(fs.lstat)
};

/**
 * add symlink from options
 * @param {object} options 
 */
const addSymlink = async (options = {}) => {
  try {
    let cfm = await confirm("Are you sure add symlink in current path？");
    if (!cfm.confirm) {
      process.exit(1);
    }
    const opts = mergeDefaultOptions(options);
    const configs = opts.configs || [];

    const addSymlinkOne = async item => {
      if (!fs.existsSync(item.path)) {
        throw new Error(`path ${item.path} does not exists`);
      }
      const dest = path.resolve("./", item.alias);
      if (!opts.force) {
        if (fs.existsSync(dest)) {
          throw new Error(
            `${
              item.alias
            } symlink is already exists, please use force to update`
          );
        }
      }
      if (fs.lstatSync(dest).isSymbolicLink()) {
        await del(dest);
      }
      await fsp.symlink(item.path, item.alias);
      console.log(
        `create symlink from ${item.alias} -> ${item.path} successful`
      );
    };

    Promise.all(configs.map(v => addSymlinkOne(v))).catch(error =>
      console.error(error)
    );
  } catch (err) {
    console.error(err);
  }
};

/**
 * remove symlink from config
 * @param {object} options 
 */
const rmSymlink = async (options = {}) => {
  let cfm = await confirm("Are you sure rm symlink in current path？");
  if (!cfm.confirm) {
    process.exit(1);
  }
  const opts = mergeDefaultOptions(options);

  const configs = opts.configs || [];

  const rmSymlinkOne = async item => {
    if (!fs.existsSync(item.path)) {
      throw new Error(`path ${item.path} does not exists`);
    }
    const dest = path.resolve("./", item.alias);
    if (fs.lstatSync(dest).isSymbolicLink()) {
      await del(dest);
    }
    console.log(`remove symlink from ${item.alias} -> ${item.path} successful`);
  };

  Promise.all(configs.map(v => rmSymlinkOne(v))).catch(error =>
    console.error(error)
  );
};

module.exports = {
  addSymlink,
  rmSymlink
};
