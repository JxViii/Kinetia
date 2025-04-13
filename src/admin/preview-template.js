import CMS from "decap-cms-app";
import "/src/css/main.css";

const ArticlePreview = ({ entry }) => {
  const data = entry.get('data').toJS();

  return `
    <div class="art">
      <header class="header">
        <h1 class="beb">${data.title}</h1>
        <p class="pop">${data.desc}</p>
      </header>

      <main>
        <article>
          ${data.body}
        </article>
      </main>

      <footer class="footer">
        <p>© Kinetia - Todos los derechos reservados</p>
      </footer>
    </div>
  `;
};

CMS.registerPreviewStyle("/src/css/main.css");
CMS.registerPreviewTemplate("blog", ArticlePreview);