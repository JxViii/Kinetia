const button = document.querySelector('.articles-bar .show');
const pagination = document.querySelector('.pagination');
const prevButton = document.querySelector('.prev-page');
const nextButton = document.querySelector('.next-page');
let currentPage = 1;
const articlesPerPage = 9;

fetch('blog/blog.json')
  .then(res => res.json())
  .then(articles => {

    function introDisplay(intro) {
      document.querySelector('.blog-head-photo').src = `images/${intro.img}`;
      document.querySelector('.blog-link').href = intro.redirect;
      document.querySelector('.blog-intro-header').textContent = intro.title;
      document.querySelector('.blog-intro-desc').textContent = intro.desc;
      document.querySelector('.blog-button').href = intro.redirect;
    }
    
    function redirectContainer(item) {
      const linkElement = item.querySelector('.blog-link');
      const link = linkElement.href;
      window.location.href = link;
    }
    
    function showNum(list, num = 1) {
      pagination.classList.add('hidden');
      prevButton.classList.add('hidden');
      nextButton.classList.add('hidden');
    
      const container = document.querySelector('.blog-articles-grid');
      container.innerHTML = '';
      const N = list.length - 1;
    
      for (let i = N; i > N - num; --i) {
        const article = list[i];
        if (!article) continue;
    
        const img = article.img || 'default.jpg';
        const redirect = article.redirect || '#';
    
        const artDiv = document.createElement('div');
        artDiv.classList.add('blog-articles-container');
        artDiv.innerHTML = `
          <img src="images/${img}" class="blog-photo">
          <div class="blog-container-header">
            <a href="${redirect}" class="blog-link">Blog</a>
            ${article.title}
          </div>
        `;
        artDiv.addEventListener('click', () => redirectContainer(artDiv));
        container.appendChild(artDiv);
      }
    }
    
    function show(articles, page = 1) {
      pagination.classList.remove('hidden');
      prevButton.classList.remove('hidden');
      nextButton.classList.remove('hidden');
    
      const start = (page - 1) * articlesPerPage;
      const end = page * articlesPerPage;
      const list = articles.slice(start, end).reverse();
    
      const container = document.querySelector('.blog-articles-grid');
      container.innerHTML = '';
      list.forEach(article => {
        if (!article) return;
    
        const img = article.img || 'default.jpg';
        const redirect = article.redirect || '#';
    
        const artDiv = document.createElement('div');
        artDiv.classList.add('blog-articles-container');
        artDiv.innerHTML = `
          <img src="images/${img}" class="blog-photo">
          <div class="blog-container-header">
            <a href="${redirect}" class="blog-link">Blog</a>
            ${article.title}
          </div>
        `;
        artDiv.addEventListener('click', () => redirectContainer(artDiv));
        container.appendChild(artDiv);
      });
    
      updatePaginationControls(page, articles);
    }
    
    
    function updatePaginationControls(page, articles) {
      const totalPages = Math.ceil(articles.length / articlesPerPage);
    
      pagination.innerHTML = `Página ${page} de ${totalPages}`;
    
      // Habilitar/deshabilitar los botones según la página actual
    
      prevButton.disabled = page === 1;
      nextButton.disabled = page === totalPages;
    }
    
    function nextPage() {
      if (currentPage < Math.ceil(articles.length / articlesPerPage)) {
        currentPage++;
        show(articles, currentPage);
      }
    }
    
    function prevPage() {
      if (currentPage > 1) {
        currentPage--;
        show(articles, currentPage);
      }
    }

    // main()
    const intro = articles[articles.length - 1];
    introDisplay(intro);
    showNum(articles, 3);

    // Event Listeners
    document.getElementById('searchBar').addEventListener('keydown', function(e) {
      if(e.key === 'Enter'){
        const query = e.target.value.toLowerCase();
        const filtered = articles.filter(article =>
          article.title.toLowerCase().includes(query)
        );
        show(filtered);
        button.innerText = 'Mostrar menos';
        button.classList.add('clicked');
      }
    });
    document.querySelector('.blog-reset').addEventListener('click', () => {
      showNum(articles, 3);
      if(button.classList.contains('clicked')){
        button.innerText = 'Mostrar todos';
        button.classList.remove('clicked');
      }
    });
    button.addEventListener('click', () => {
      if(button.classList.contains('clicked')){
        showNum(articles, 3);
        button.innerText = 'Mostrar todos';
        button.classList.remove('clicked');
      }
      else{
        show(articles);
        button.innerText = 'Mostrar menos';
        button.classList.add('clicked');
      }
    });
    document.querySelector('.next-page').addEventListener('click', nextPage);
    document.querySelector('.prev-page').addEventListener('click', prevPage);

  });

  setupScrollAnimations('scroll-animate-base');
  buttonAgendar();