import CMS from "decap-cms-app";

// Importa tu estilo para artículos
CMS.registerPreviewStyle("/css/pages/art.css", { raw: false });

// Plantilla básica para ver el artículo
CMS.registerPreviewTemplate("blog", ({ entry, widgetFor }) => {
  const title = entry.getIn(["data", "title"]);
  const desc = entry.getIn(["data", "desc"]);
  const image = entry.getIn(["data", "image"]);
  const date = entry.getIn(["data", "date"]);
  const body = widgetFor("body");

  return (
    <article class="article">
      <h1>{title}</h1>
      <p>{desc}</p>
      <img src={`/images/${image}`} alt="" />
      <p><strong>{date}</strong></p>
      <div>{body}</div>
    </article>
  );
});
