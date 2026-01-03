// Sticky Header Effect
const header = document.querySelector("header");
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    header.style.boxShadow = "0 2px 10px rgba(0,0,0,0.1)";
  } else {
    header.style.boxShadow = "none";
  }
});

// Add to Cart Interaction
const addToCartButtons = document.querySelectorAll(".add-to-cart");

addToCartButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    const card = e.target.closest(".product-card");
    const title = card.querySelector(".product-title").innerText;

    // Visual feedback
    const originalText = e.target.innerText;
    e.target.innerText = "Added";
    e.target.style.backgroundColor = "#3E3E3E";
    e.target.style.color = "#fff";

    setTimeout(() => {
      e.target.innerText = originalText;
      e.target.style.backgroundColor = "";
      e.target.style.color = "";
    }, 1500);

    console.log(`Added ${title} to cart`);
  });
});

// Mobile Menu Placeholder (Next Steps: Implement sidebar toggle)
console.log("Oak & Ochre script loaded.");
