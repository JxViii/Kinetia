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

    eleventyConfig.on("afterBuild", () => {
    const blogDir = path.join(__dirname, "src", "blog");
    const outputFile = path.join(__dirname, "public", "blog", "blog.json");

    if (!fs.existsSync(blogDir)) {
      console.warn("❌ No se encontró la carpeta src/blog");
      return;
    }

    const files = fs.readdirSync(blogDir).filter(f => f.endsWith(".njk"));

    const posts = files.map(file => {
      const filePath = path.join(blogDir, file);
      const content = fs.readFileSync(filePath, "utf-8");
      const { data } = matter(content);

      return {
        id: file.replace(".njk", ""),
        title: data.title,
        desc: data.desc,
        img: data.img,
        redirect: data.redirect,
        date: data.date
      };
    });

    fs.mkdirSync(path.dirname(outputFile), { recursive: true });
    fs.writeFileSync(outputFile, JSON.stringify(posts, null, 2));
    console.log("Looking in:", blogDir);
    console.log("Files:", files);

    console.log("✅ blog.json generado correctamente");
  });

  eleventyConfig.addPassthroughCopy({ "src/admin": "admin" });


    return {
      dir: {
        input: "src",
        output: "public",
      },
    };
};