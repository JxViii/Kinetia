import CMS from "decap-cms-app";

CMS.registerPreviewStyle("/css/pages/art.css"); // o el CSS que usas para artículos

CMS.registerPreviewTemplate("blog", ({ entry }) => {
  const title = entry.getIn(["data", "title"]);
  const desc = entry.getIn(["data", "desc"]);
  const date = entry.getIn(["data", "date"]);
  const image = entry.getIn(["data", "image"]);
  const body = entry.getIn(["data", "body"]);

  return `
    <article class="article">
      <h1>${title}</h1>
      <p>${desc}</p>
      <img src="/images/${image}" alt="">
      <div>${body}</div>
    </article>
  `;
});
