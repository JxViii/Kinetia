const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");

const sourceDir = path.join(__dirname, "..", "blog");
const outputFile = path.join(__dirname, "..", "..", "public", "blog", "blog.json");

// AHORA buscamos archivos .md
const files = fs.readdirSync(sourceDir).filter(f => f.endsWith(".md"));

const data = files.map(file => {
  const filePath = path.join(sourceDir, file);
  const content = fs.readFileSync(filePath, "utf-8");
  const { data } = matter(content);

  const filename = file.replace(".md", ".html");

  return {
    id: file.replace(".md", ""),
    title: data.title,
    desc: data.desc,
    img: data.img,
    redirect: `/blog/${filename}`,
    date: data.date
  };
}).sort((a, b) => new Date(b.date) - new Date(a.date));

// Asegúrate de que exista el directorio public/blog
fs.mkdirSync(path.dirname(outputFile), { recursive: true });
fs.writeFileSync(outputFile, JSON.stringify(data, null, 2));

console.log("✅ blog.json generado correctamente");
