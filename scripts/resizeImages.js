const jimp = require("jimp");
const path = require("path");
const fsp = require("fs").promises;
const colors = require("colors");

const galleryData = require("../src/_data/gallery.json");

const pictures = galleryData.pictures.map((item) =>
  path.resolve(`../src/${item.url}`)
);

async function resize(filePath, i) {
  const image = await jimp.read(filePath);
  image.scaleToFit(310, 350);
  galleryData.pictures[i] = {
    ...galleryData.pictures[i],
    height: image.getHeight(),
    width: image.getWidth(),
  };
  const { name: filename, ext: extension } = path.parse(filePath);
  await image.writeAsync(
    path.resolve(`../src/__gallery__/assets/images/${filename}${extension}`)
  );
}

async function main() {
  console.log(`Found ${pictures.length} images to process.`.cyan);
  const promises = pictures.map((p, i) => {
    return resize(p, i);
  });
  console.log("Resizing images...".yellow);
  try {
    await Promise.all(promises);
    console.log("Resizing complete".green);
    console.log("Updating gallery data file...".yellow);
    await fsp.writeFile(path.resolve("../src/_data/gallery.json"), JSON.stringify(galleryData));
    console.log("Gallery data updated".green)
  } catch (e) {
    console.log("Error: ".red, e);
  }
}

main();
