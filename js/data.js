VocabularyList = [
  { id: 1, word: "Loafer", meaning: "Giày lười", category: "Thời trang" },
  { id: 2, word: "Coat", meaning: "Áo khoác", category: "Thời trang" },
  { id: 3, word: "jeans", meaning: "Quần bò", category: "Thời trang" },
  { id: 4, word: "Jumper", meaning: "Áo len", category: "Thời trang" },
  { id: 5, word: "Uncle", meaning: "Cậu", category: "Gia đình" },
  { id: 6, word: "Father", meaning: "Bố", category: "Gia đình" },
  { id: 7, word: "Mother", meaning: "Mẹ", category: "Gia đình" },
  { id: 8, word: "drawing", meaning: "Vẽ", category: "Nghệ thuật" },
  { id: 9, word: "design", meaning: "Thiết kế", category: "Nghệ thuật" },
  { id: 10, word: "architecture", meaning: "Kiến trúc", category: "Nghệ thuật" },
  { id: 11, word: "novels", meaning: "Tiểu thuyết", category: "Nghệ thuật" },
  { id: 12, word: "Cabin", meaning: "Buồng", category: "Nhà cửa" },
  { id: 13, word: "Palace", meaning: "Cung điện", category: "Nhà cửa" },
  { id: 14, word: "House", meaning: "Nhà", category: "Nhà cửa" },
  { id: 15, word: "Cat", meaning: "Mèo", category: "Con vật" },
  { id: 16, word: "Fish", meaning: "Cá", category: "Con vật" },
  { id: 17, word: "rose", meaning: "Huấn hoa hồng", category: "Thực vật" },
  { id: 18, word: "Excited", meaning: "Phấn kích", category: "Cảm xúc" },
  { id: 19, word: "Surprised", meaning: "Ngạc nhiên", category: "Cảm xúc" },
  { id: 20, word: "Happy", meaning: "Hạnh phúc", category: "Cảm xúc" },
];

if (!localStorage.getItem("VocabularyList")) {
  localStorage.setItem("VocabularyList", JSON.stringify(VocabularyList));
}
