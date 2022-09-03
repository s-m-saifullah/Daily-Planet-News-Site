const loadCategories = () => {
  fetch("https://openapi.programming-hero.com/api/news/categories")
    .then((res) => res.json())
    .then((data) => displayCategories(data.data.news_category))
    .catch((error) => console.log(error));
};

const displayCategories = (categories) => {
  const categoriesContainer = document.getElementById("cateogry-nav");
  const topNav = document.getElementById("top-nav");
  categoriesContainer.classList.add("d-none");
  categoriesContainer.classList.add("d-lg-flex");

  categories.forEach((category) => {
    const { category_id, category_name } = category;
    // console.log(category_name);
    const li = document.createElement("li");
    li.classList.add("nav-item");

    li.innerHTML = `
    <a class="nav-link cat-nav" href="#" onclick="loadNews('${category_id}', '${category_name}')">${category_name}</a>
    `;
    categoriesContainer.appendChild(li);

    // categories nav for top nav

    const topNavLi = document.createElement("li");
    topNavLi.classList.add("d-lg-none");
    topNavLi.innerHTML = `
    <a class="nav-link" href="#" onclick="loadNews('${category_id}', '${category_name}')" data-bs-toggle="collapse" data-bs-target=".navbar-collapse.show">${category_name}</a>
    `;

    topNav.appendChild(topNavLi);
  });
};

loadCategories();

const loadNews = (category_id, catName) => {
  const url = `https://openapi.programming-hero.com/api/news/category/${category_id}`;
  loadSpinner(false);
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayNews(data, catName))
    .catch((error) => console.log(error));
};

const displayNews = (allNewsData, catName) => {
  const allNews = allNewsData.data;

  // Sorting News according to view count
  allNews.sort((a, b) => {
    return b.total_view - a.total_view;
  });

  const newsContainer = document.getElementById("news-details-container");
  newsContainer.innerHTML = "";
  const numberOfItem = document.getElementById("number-of-item");

  // Checking if category has any news
  const hasNews = allNewsData.status;

  if (hasNews) {
    allNews.forEach((news) => {
      const {
        author,
        details,
        image_url,
        thumbnail_url,
        title,
        total_view,
        _id,
      } = news;
      const { img, name, published_date } = author;
      const singleNews = document.createElement("div");
      singleNews.classList.add("card");
      singleNews.classList.add("mb-4");
      singleNews.classList.add("shadow-lg");
      singleNews.classList.add("border-0");

      singleNews.innerHTML = `
      <div class="row flex-column flex-sm-row g-0">
        <div class="col-12 col-sm-4 col-md-3 text-center">
          <img src="${thumbnail_url}" class="d-none d-sm-block img-fluid rounded-start" alt="..." />
          <img src="${image_url}" class="d-sm-none img-fluid rounded-start" alt="..." />
        </div>
        <div class="col-12 col-sm-8 col-md-9 d-flex flex-column justify-content-between">
          <div class="card-body">
            <h5 class="fw-bold card-title">${title}</h5>
            <p class="card-text d-none d-md-block">
              ${details.length > 200 ? details.slice(0, 600) + "..." : details}
            </p>
            <p class="card-text d-md-none">
              ${details.length > 200 ? details.slice(0, 150) + "..." : details}
            </p>
          </div>
          <div class="card-body d-flex align-items-end">
            <div class="d-flex flex-column flex-sm-row justify-content-between align-items-center">
              <div class="col-12 col-sm-4">
                <div class="author d-md-flex align-items-center gap-2">
                  <div class="col-md-2 text-center">
                    <img src="${
                      name ? img : "./images/img-placeholder.png"
                    }" class="author-img rounded-circle" alt="" />
                  </div>
                  <div class="col-md-10 text-center text-md-start my-2">
                    <p class="mb-0">${name ? name : "No data available"}</p>
                  </div>
                </div>
              </div>
            <div class="col-12 col-sm-4 text-center">
              <i class="fa-solid fa-eye"></i> <span>${
                total_view ? total_view + "M" : "No Data Available"
              }</span>
            </div>
            <div class="d-none d-md-block col-12 col-sm-4 text-center text-md-end">
                  <a href="#" onclick="loadNewsDetails('${_id}')" data-bs-toggle="modal"
                  data-bs-target="#newsDetailsModal"><i class="fa-solid fa-arrow-right"></i></a>
            </div>
              <button class="d-md-none btn btn-primary mt-2" onclick="loadNewsDetails('${_id}')" data-bs-toggle="modal"
              data-bs-target="#newsDetailsModal">Details</button>
            </div>
          </div>
        </div>
      </div>
    `;
      newsContainer.appendChild(singleNews);
    });

    // Displaying no of item

    numberOfItem.innerHTML = `
      <p>${allNews.length} is found for ${catName}</p>
    `;

    // Turning of Spinner
    loadSpinner(true);
  } else {
    numberOfItem.innerHTML = "";
    newsContainer.innerHTML = `
    <h3 class="text-center text-danger">No News Found</h3>
    `;
    loadSpinner(true);
  }
};

const loadNewsDetails = (newsId) => {
  const url = `https://openapi.programming-hero.com/api/news/${newsId}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayNewsDetails(data.data))
    .catch((error) => console.log(error));
};

const displayNewsDetails = (singleNews) => {
  const modalContent = document.getElementById("modal-content");

  const { author, details, image_url, title, total_view } = singleNews[0];
  const { img, name, published_date } = author;

  modalContent.innerHTML = `
 
            <div class="modal-header">
              <h5 class="modal-title fw-bold" id="newsDetailsModalLabel">
                ${title}
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <img src="${image_url}" class="img-fluid" alt="" />
              <div class="mt-4  d-flex justify-content-between align-items-center">
                <p class="fw-bold">Author: ${
                  name ? name : "No data Available"
                }</p> 
                <p><i class="fa-solid fa-eye"></i> <span>${
                  total_view ? total_view + "M" : "No data Available"
                }</span></p>
              </div>           
              <p>${details}</p>

            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
  `;
};

loadNews("05", "Entertainment");

// Spinner
function loadSpinner(isLoaded) {
  const spinner = document.getElementById("spinner");
  if (isLoaded === false) {
    spinner.classList.remove("d-none");
  } else {
    spinner.classList.add("d-none");
  }
}
