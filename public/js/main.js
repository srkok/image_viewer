let allCategories = {};
let activeCategories = new Set();
let currentOrder = "random"; // 現在の並び順
let shuffledCategories = [];

// 配列シャッフル関数
function shuffleArray(array) {
  return array
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
}

// 並び順に応じてカテゴリ順を更新し、UIを再描画
function updateCategoryOrder() {
  const keys = Object.keys(allCategories);
  if (currentOrder === "alphabet") {
    shuffledCategories = keys.sort((a, b) => a.localeCompare(b));
  } else {
    shuffledCategories = shuffleArray(keys);
  }
}

// カテゴリフィルターとチェックボックスの描画
function renderFilterControls() {
  const container = document.getElementById("categoryFilter");
  container.innerHTML = "";

  shuffledCategories.forEach((category) => {
    const shortName = category.replace(/^imgs\//, "");

    const label = document.createElement("label");
    label.style.marginRight = "10px";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.value = category;
    checkbox.checked = activeCategories.has(category);
    //activeCategories.add(category);

    checkbox.addEventListener("change", () => {
      if (checkbox.checked) {
        activeCategories.add(category);
      } else {
        activeCategories.delete(category);
      }
      renderGallery();
    });

    label.appendChild(checkbox);
    label.append(` ${shortName}`);
    container.appendChild(label);
  });
}

// ギャラリー描画
function renderGallery() {
  const galleryContainer = document.getElementById("galleries");
  const searchTerm = document.getElementById("searchInput").value.toLowerCase();
  const imageSize =
    parseInt(document.getElementById("imageSizeInput").value) || 200;

  galleryContainer.innerHTML = "";

  shuffledCategories.forEach((category) => {
    const shortName = category.replace(/^imgs\//, "");

    if (!activeCategories.has(category)) return;
    if (!shortName.toLowerCase().includes(searchTerm)) return;

    const section = document.createElement("section");
    section.className = "category-section active";

    const title = document.createElement("div");
    title.className = "category-title";
    title.textContent = shortName;
    section.appendChild(title);

    const gallery = document.createElement("div");
    gallery.className = "gallery";

    allCategories[category].forEach((imgPath) => {
      const img = document.createElement("img");
      img.src = imgPath;
      img.alt = imgPath;
      img.style.height = imageSize + "px"; // 高さを固定
      img.style.width = "auto"; // 幅は自動（縦横比保持）
      gallery.appendChild(img);
    });

    section.appendChild(gallery);
    galleryContainer.appendChild(section);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  // イベント登録と初期化
  document.getElementById("orderSelect").addEventListener("change", (e) => {
    currentOrder = e.target.value;
    updateCategoryOrder();
    renderFilterControls();
    renderGallery();
  });

  // イベント: 画像サイズ変更
  document
    .getElementById("imageSizeInput")
    .addEventListener("input", renderGallery);

  // イベント: 検索入力
  document
    .getElementById("searchInput")
    .addEventListener("input", renderGallery);

  // 画像データ取得と初期処理
  fetch("/api/images")
    .then((res) => res.json())
    .then((data) => {
      allCategories = data;

      // 初期はランダム順
      updateCategoryOrder();

      // チェックボックスはすべてONに初期化
      activeCategories = new Set(Object.keys(allCategories));

      renderFilterControls();
      renderGallery();
    });
});
