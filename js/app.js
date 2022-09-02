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
