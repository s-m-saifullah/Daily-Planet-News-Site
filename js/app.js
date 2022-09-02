const loadCategories = () => {
  fetch("https://openapi.programming-hero.com/api/news/categories")
    .then((res) => res.json())
    .then((data) => displayCategories(data.data.news_category));
};

const displayCategories = (categories) => {
  const categoriesContainer = document.getElementById("cateogry-nav");

  categories.forEach((category) => {
    const { category_id, category_name } = category;
    // console.log(category_name);
    const li = document.createElement("li");
    li.classList.add("nav-item");

    li.innerHTML = `
    <a class="nav-link" href="#" onclick="loadNews('${category_id}')">${category_name}</a>
    `;

    categoriesContainer.appendChild(li);
  });
};

loadCategories();
const loadNews = (category_id) => {
  const url = `https://openapi.programming-hero.com/api/news/category/${category_id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayNews(data.data));
};

const displayNews = (allNews) => {
  const newsConainer = document.getElementById("news-details-container");
  newsConainer.textContent = "";

  allNews.forEach((news) => {
    const { details, thumbnail_url, title, total_view, _id } = news;
    const singleNews = document.createElement("div");
    singleNews.classList.add("card");
    singleNews.classList.add("mb-3");
    singleNews.classList.add("border-0");

    singleNews.innerHTML = `
    <div class="row g-0">
            <div class="col-md-3">
              <img src="${thumbnail_url}" class="img-fluid rounded-start" alt="..." />
            </div>
            <div class="col-md-9">
              <div class="card-body">
                <h5 class="card-title">${title}</h5>
                <p class="card-text">
                  ${
                    details.length > 200
                      ? details.slice(0, 300) + "..."
                      : details
                  }
                </p>
                <p class="card-text">
                  <small class="text-muted">Last updated 3 mins ago</small>
                </p>
              </div>
            </div>
          </div>
    `;

    newsConainer.appendChild(singleNews);
  });
};

loadNews("05");
