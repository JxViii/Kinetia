const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");

module.exports = function (eleventyConfig) {
    eleventyConfig.addPassthroughCopy('src/css');
    eleventyConfig.addPassthroughCopy('src/images');
    eleventyConfig.addPassthroughCopy('src/scripts');

    eleventyConfig.addGlobalData("eleventyComputed", {
      permalink: data => {
        // Si ya hay un permalink, lo respetamos
        if (data.permalink) return data.permalink;
    
        // Si el archivo está en src/blog/
        if (data.page?.inputPath?.includes("/blog/") && data.page?.fileSlug) {
          return `blog/${data.page.fileSlug}.html`;
        }
    
        // Si está en raíz y no es admin
        if (
          data.page?.inputPath &&
          !data.page.inputPath.includes("/admin/") &&
          (data.page.inputPath.endsWith(".html") || data.page.inputPath.endsWith(".njk"))
        ) {
          const file = data.page.inputPath.split("/").pop().replace(/\.[^/.]+$/, "");
          return `${file}.html`;
        }
    
        return data.permalink;
      }
    });

    eleventyConfig.addPassthroughCopy({ "src/admin": "admin" });

    return {
      dir: {
        input: "src",
        output: "public",
      },
    };
};