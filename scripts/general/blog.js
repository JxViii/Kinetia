    const articles = [
    {
      title: '¿Puede un chatbot generar mas ingresos en cualquier negocio?',
      desc: 'En la era digital, los chatbots se han convertido en una herramienta indispensable para las empresas que buscan mejorar su atención al cliente y, al mismo tiempo, aumentar sus ingresos...',
      img: '01-article.jpg',
      redirect: 'art1.html'
    },
    {
      title: 'La Inteligencia Artificial: Novedades y Tendencias en 2025',
      desc: 'La inteligencia artificial (IA) sigue evolucionando a pasos agigantados y está impactando todos los sectores, y el mundo de la creación de contenido no es una excepción....',
      img: '02-article.jpg',
      redirect: 'art2.html'
    },
    {
      title: '¿Cómo las automatizaciones con IA han revolucionado las empresas?',
      desc: 'La inteligencia artificial (IA) sigue evolucionando a pasos agigantados y está impactando todos los sectores, y el mundo de la creación de contenido no es una excepción....',
      img: '03-article.jpg',
      redirect: 'art3.html'
    }
  ];

  const intro = articles[0];

  document.querySelector('.blog-head-photo').src = `images/${intro.img}`;
  document.querySelector('.blog-link').href = intro.redirect;
  document.querySelector('.blog-intro-header').textContent = intro.title;
  document.querySelector('.blog-intro-desc').textContent = intro.desc;
  document.querySelector('.blog-button').href = intro.redirect;

  document.getElementById('searchBar').addEventListener('keydown', function(e) {
    if(e.key === 'Enter'){
      const query = e.target.value.toLowerCase();
      const filtered = articles.filter(article =>
        article.title.toLowerCase().includes(query)
      );
      show(filtered);
    }
  });

  document.querySelector('.blog-reset').addEventListener('click', (event) => show(articles));

  const show = (list) => {
    const container = document.querySelector('.blog-articles-grid');
    container.innerHTML = '';
    list.forEach(article => {
      const artDiv = document.createElement('div');
      artDiv.classList.add('blog-articles-container');
      artDiv.innerHTML = `
          <img src="images/${article.img}" class="blog-photo">
          <div class="blog-container-header">
            <a href="${article.redirect}" class="blog-link">Blog</a>
            ${article.title}
          </div>
      `;
      artDiv.addEventListener('click', () => redirectContainer(artDiv));

      container.appendChild(artDiv);
    });
  }

  const redirectContainer = (item) => {
    const linkElement = item.querySelector('.blog-link');

    const link = linkElement.href;

    window.location.href = link;
  }

  appear('blog-head-photo');

  show(articles);

  appear('blog-intro-grid-text');

