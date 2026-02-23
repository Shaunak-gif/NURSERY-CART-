# 🌿 Paradise Nursery — Online Plant Shop

A dynamic, fully functional e-commerce shopping cart application built with **React**. Browse a curated collection of houseplants, add them to your cart, manage quantities, and see live totals — all in a single-page experience.

---

## 📋 Project Overview

Paradise Nursery is a front-end capstone project that demonstrates core React skills including component state management, dynamic rendering, and interactive UI design. Users can explore plants by category, add items to a cart, adjust quantities, and view a running order summary with shipping calculations.

---

## ✨ Features

- **Plant Catalog** — 9 plants displayed across 4 categories with name, description, price, and visual illustration
- **Category Filtering** — Filter plants by All, Tropical, Flowering, Succulent, or Vine
- **Add to Cart** — Add any plant to the cart with a single click; shows in-cart badge if already added
- **Cart Management** — Increase or decrease item quantities, or remove items entirely
- **Live Order Summary** — Real-time subtotal, shipping cost, and grand total calculation
- **Free Shipping Threshold** — Orders over $50 qualify for free shipping, with a helpful nudge for orders just below
- **Toast Notifications** — Brief confirmation message shown when an item is added to the cart
- **Sticky Navigation Bar** — Always-visible nav with dynamic cart item count badge
- **Responsive Layout** — Grid-based product layout adapts to different screen sizes

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| React (Hooks) | UI rendering and state management |
| CSS-in-JS (style tag) | Scoped component styling |
| Google Fonts | Typography (Playfair Display + Lato) |
| JSX | Component templating |

---

## 📁 Project Structure

```
paradise-nursery/
│
├── paradise-nursery.jsx   # Main application component (self-contained)
└── README.md              # Project documentation
```

> The entire application lives in a single `.jsx` file for simplicity. All styles, data, and logic are co-located.

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Create a new React app** (if you don't have one):

```bash
npx create-react-app paradise-nursery
cd paradise-nursery
```

2. **Replace `src/App.js`** with the contents of `paradise-nursery.jsx`, or import it directly:

```jsx
// src/App.js
import ParadiseNursery from './paradise-nursery';

export default function App() {
  return <ParadiseNursery />;
}
```

3. **Start the development server:**

```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🧠 Key Concepts Demonstrated

### State Management with `useState`

```jsx
const [cart, setCart] = useState({});       // Cart: { plantId: quantity }
const [view, setView] = useState("shop");   // Current view: "shop" | "cart"
const [activeCategory, setActiveCategory] = useState("All");
const [notification, setNotification] = useState(null);
```

### Dynamic Cart Operations

```jsx
// Add item
const addToCart = (plant) => {
  setCart((prev) => ({ ...prev, [plant.id]: (prev[plant.id] || 0) + 1 }));
};

// Update quantity (handles removal when qty reaches 0)
const updateQty = (id, delta) => {
  setCart((prev) => {
    const newQty = (prev[id] || 0) + delta;
    if (newQty <= 0) {
      const updated = { ...prev };
      delete updated[id];
      return updated;
    }
    return { ...prev, [id]: newQty };
  });
};
```

### Derived Values (no extra state needed)

```jsx
const cartCount = Object.values(cart).reduce((a, b) => a + b, 0);
const cartTotal = Object.entries(cart).reduce((total, [id, qty]) => {
  const plant = plants.find((p) => p.id === Number(id));
  return total + plant.price * qty;
}, 0);
```

---

## 🗂️ Plant Data Structure

Each plant in the catalog follows this shape:

```js
{
  id: 1,
  name: "Monstera Deliciosa",
  category: "Tropical",
  price: 34.99,
  description: "The iconic split-leaf philodendron. Easy care, dramatic presence.",
  emoji: "🌿",
  color: "#2d6a4f",   // Used for card background tint
}
```

---

## 📦 Available Plants

| Plant | Category | Price |
|---|---|---|
| Monstera Deliciosa | Tropical | $34.99 |
| Peace Lily | Flowering | $22.99 |
| Snake Plant | Succulent | $19.99 |
| Fiddle Leaf Fig | Tropical | $54.99 |
| Golden Pothos | Vine | $14.99 |
| Rubber Plant | Tropical | $29.99 |
| Bird of Paradise | Tropical | $74.99 |
| ZZ Plant | Succulent | $24.99 |
| String of Pearls | Vine | $18.99 |

---

## 🎨 Design Decisions

- **Color palette** — Deep forest greens (`#1b3a2d`, `#2d6a4f`) with warm parchment background (`#f4f0e8`) and golden accent (`#e8a95c`)
- **Typography** — *Playfair Display* for headings (editorial, botanical feel) paired with *Lato* for body text (clean readability)
- **Layout** — CSS Grid for the product catalog, adapting from 1 to 3+ columns based on viewport width
- **UX** — Toast notification on add-to-cart, badge counter on nav, and in-cart indicator on product cards provide clear feedback without disrupting the browsing flow

---

## 🔮 Possible Extensions

- Integrate a backend or Firebase for persistent cart data
- Add a checkout form with validation
- Implement plant detail/modal view
- Add search functionality
- Support user accounts and order history
- Animate page transitions between shop and cart views

---

## 📄 License

This project was created as an educational capstone project. Free to use and modify for learning purposes.

---

*Made with 🌱 for Paradise Nursery*
