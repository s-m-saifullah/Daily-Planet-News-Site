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
    .then((data) => displayNews(data));
};

const displayNews = (allNewsData) => {
  const allNews = allNewsData.data;
  const newsContainer = document.getElementById("news-details-container");
  newsContainer.innerHTML = "";

  const hasNews = allNewsData.status;

  if (hasNews) {
    allNews.forEach((news) => {
      const { author, details, thumbnail_url, title, total_view, _id } = news;
      const { img, name, published_date } = author;
      const singleNews = document.createElement("div");
      singleNews.classList.add("card");
      singleNews.classList.add("mb-3");
      singleNews.classList.add("border-0");

      singleNews.innerHTML = `
      <div class="row g-0">
        <div class="col-md-3">
          <img src="${thumbnail_url}" class="img-fluid rounded-start" alt="..." />
        </div>
        <div class="col-md-9 ">
          <div class="card-body">
            <h5 class="fw-bold card-title">${title}</h5>
            <p class="card-text">
              ${details.length > 200 ? details.slice(0, 400) + "..." : details}
            </p>
            <div class="d-flex justify-content-between align-items-center">
              <div class="col-md-4">
                <div class="author d-flex align-items-center gap-2">
                  <div class="col-md-3">
                    <img src="${
                      name ? img : "./images/img-placeholder.png"
                    }" class="img-fluid rounded-circle" alt="" />
                  </div>
                  <div class="col-md-9">
                    <p class="mb-0">${name ? name : "No Info"}</p>
                  </div>
                </div>
              </div>
              <div class="col-md-4 text-center">
                <i class="fa-solid fa-eye"></i> <span>${total_view + "M"}</span>
              </div>
              <div class="col-md-4 text-end">
                    <a href="#"><i class="fa-solid fa-arrow-right"></i></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
      newsContainer.appendChild(singleNews);
    });
  } else {
    newsContainer.innerHTML = `
    <h3 class="text-center text-danger">No News Found</h3>
    `;
  }
};

loadNews("05");
