import { useState } from "react";

const plants = [
  {
    id: 1,
    name: "Monstera Deliciosa",
    category: "Tropical",
    price: 34.99,
    description: "The iconic split-leaf philodendron. Easy care, dramatic presence.",
    emoji: "🌿",
    color: "#2d6a4f",
  },
  {
    id: 2,
    name: "Peace Lily",
    category: "Flowering",
    price: 22.99,
    description: "Elegant white blooms, thrives in low light. Air-purifying champion.",
    emoji: "🌸",
    color: "#6b4226",
  },
  {
    id: 3,
    name: "Snake Plant",
    category: "Succulent",
    price: 19.99,
    description: "Nearly indestructible. Converts CO₂ to oxygen even at night.",
    emoji: "🪴",
    color: "#40916c",
  },
  {
    id: 4,
    name: "Fiddle Leaf Fig",
    category: "Tropical",
    price: 54.99,
    description: "The designer's darling. Bold, sculptural leaves for bright rooms.",
    emoji: "🌳",
    color: "#1b4332",
  },
  {
    id: 5,
    name: "Golden Pothos",
    category: "Vine",
    price: 14.99,
    description: "The perfect beginner plant. Trails beautifully, grows anywhere.",
    emoji: "🍃",
    color: "#52b788",
  },
  {
    id: 6,
    name: "Rubber Plant",
    category: "Tropical",
    price: 29.99,
    description: "Glossy burgundy leaves. Sculptural form, surprisingly tough.",
    emoji: "🌱",
    color: "#6d4c41",
  },
  {
    id: 7,
    name: "Bird of Paradise",
    category: "Tropical",
    price: 74.99,
    description: "Striking tropical foliage. Makes any room feel like a resort.",
    emoji: "🦜",
    color: "#d4a017",
  },
  {
    id: 8,
    name: "ZZ Plant",
    category: "Succulent",
    price: 24.99,
    description: "Glossy, waxy leaves. Thrives on neglect — the busy person's plant.",
    emoji: "✨",
    color: "#386641",
  },
  {
    id: 9,
    name: "String of Pearls",
    category: "Vine",
    price: 18.99,
    description: "Cascading bead-like foliage. A living sculpture for your shelf.",
    emoji: "💚",
    color: "#74c69d",
  },
];

const categories = ["All", "Tropical", "Flowering", "Succulent", "Vine"];

export default function ParadiseNursery() {
  const [cart, setCart] = useState({});
  const [view, setView] = useState("shop"); // shop | cart
  const [activeCategory, setActiveCategory] = useState("All");
  const [notification, setNotification] = useState(null);

  const cartCount = Object.values(cart).reduce((a, b) => a + b, 0);
  const cartTotal = Object.entries(cart).reduce((total, [id, qty]) => {
    const plant = plants.find((p) => p.id === Number(id));
    return total + plant.price * qty;
  }, 0);

  const showNotif = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 2000);
  };

  const addToCart = (plant) => {
    setCart((prev) => ({ ...prev, [plant.id]: (prev[plant.id] || 0) + 1 }));
    showNotif(`${plant.name} added to cart!`);
  };

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

  const removeItem = (id) => {
    setCart((prev) => {
      const updated = { ...prev };
      delete updated[id];
      return updated;
    });
  };

  const cartItems = Object.entries(cart).map(([id, qty]) => ({
    plant: plants.find((p) => p.id === Number(id)),
    qty,
  }));

  const filteredPlants =
    activeCategory === "All"
      ? plants
      : plants.filter((p) => p.category === activeCategory);

  return (
    <div style={{ fontFamily: "'Georgia', serif", minHeight: "100vh", background: "#f4f0e8", color: "#1a1a1a" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Lato:wght@300;400;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #f4f0e8; }
        .nav { background: #1b3a2d; padding: 0 2rem; display: flex; align-items: center; justify-content: space-between; height: 70px; position: sticky; top: 0; z-index: 100; box-shadow: 0 2px 20px rgba(0,0,0,0.3); }
        .logo { font-family: 'Playfair Display', serif; font-size: 1.6rem; color: #a8d5b5; letter-spacing: 1px; cursor: pointer; }
        .logo span { color: #f4f0e8; font-style: italic; }
        .cart-btn { background: none; border: 2px solid #a8d5b5; color: #a8d5b5; padding: 0.5rem 1.2rem; border-radius: 30px; cursor: pointer; font-family: 'Lato', sans-serif; font-size: 0.95rem; letter-spacing: 0.5px; display: flex; align-items: center; gap: 0.5rem; transition: all 0.2s; }
        .cart-btn:hover { background: #a8d5b5; color: #1b3a2d; }
        .badge { background: #e8a95c; color: #1a1a1a; border-radius: 50%; width: 22px; height: 22px; display: flex; align-items: center; justify-content: center; font-size: 0.75rem; font-weight: 700; font-family: 'Lato', sans-serif; }
        .hero { background: linear-gradient(135deg, #1b3a2d 0%, #2d6a4f 50%, #40916c 100%); padding: 4rem 2rem; text-align: center; position: relative; overflow: hidden; }
        .hero::before { content: '🌿🌱🍃🌿🌱'; font-size: 5rem; position: absolute; top: -20px; left: -20px; opacity: 0.07; letter-spacing: 10px; }
        .hero h1 { font-family: 'Playfair Display', serif; font-size: clamp(2rem, 5vw, 3.5rem); color: #f4f0e8; margin-bottom: 0.5rem; }
        .hero h1 em { color: #a8d5b5; }
        .hero p { color: #b7d5c4; font-family: 'Lato', sans-serif; font-weight: 300; font-size: 1.1rem; letter-spacing: 0.5px; }
        .filters { display: flex; gap: 0.75rem; padding: 1.5rem 2rem; justify-content: center; flex-wrap: wrap; }
        .filter-btn { padding: 0.4rem 1.2rem; border-radius: 20px; border: 1.5px solid #2d6a4f; background: transparent; color: #2d6a4f; cursor: pointer; font-family: 'Lato', sans-serif; font-size: 0.9rem; transition: all 0.2s; }
        .filter-btn.active, .filter-btn:hover { background: #2d6a4f; color: #f4f0e8; }
        .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(270px, 1fr)); gap: 1.5rem; padding: 1rem 2rem 3rem; max-width: 1200px; margin: 0 auto; }
        .card { background: #fff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.08); transition: transform 0.25s, box-shadow 0.25s; display: flex; flex-direction: column; }
        .card:hover { transform: translateY(-5px); box-shadow: 0 12px 35px rgba(0,0,0,0.14); }
        .card-img { height: 180px; display: flex; align-items: center; justify-content: center; font-size: 5rem; position: relative; }
        .category-tag { position: absolute; top: 12px; right: 12px; background: rgba(255,255,255,0.9); padding: 2px 10px; border-radius: 12px; font-family: 'Lato', sans-serif; font-size: 0.72rem; letter-spacing: 1px; text-transform: uppercase; color: #555; }
        .card-body { padding: 1.2rem; flex: 1; display: flex; flex-direction: column; }
        .card-name { font-family: 'Playfair Display', serif; font-size: 1.2rem; margin-bottom: 0.3rem; color: #1b3a2d; }
        .card-desc { font-family: 'Lato', sans-serif; font-size: 0.88rem; color: #666; line-height: 1.5; flex: 1; }
        .card-footer { display: flex; align-items: center; justify-content: space-between; margin-top: 1rem; padding-top: 1rem; border-top: 1px solid #f0ebe0; }
        .price { font-family: 'Playfair Display', serif; font-size: 1.3rem; color: #2d6a4f; font-weight: 700; }
        .add-btn { background: #1b3a2d; color: #f4f0e8; border: none; padding: 0.5rem 1.1rem; border-radius: 20px; cursor: pointer; font-family: 'Lato', sans-serif; font-size: 0.88rem; letter-spacing: 0.5px; transition: background 0.2s; }
        .add-btn:hover { background: #2d6a4f; }
        .in-cart { background: #e8f5ee; color: #2d6a4f; padding: 0.4rem 0.8rem; border-radius: 20px; font-family: 'Lato', sans-serif; font-size: 0.8rem; }
        .notif { position: fixed; bottom: 2rem; left: 50%; transform: translateX(-50%); background: #1b3a2d; color: #a8d5b5; padding: 0.75rem 1.5rem; border-radius: 30px; font-family: 'Lato', sans-serif; font-size: 0.95rem; z-index: 999; box-shadow: 0 4px 20px rgba(0,0,0,0.3); animation: fadeIn 0.3s ease; }
        @keyframes fadeIn { from { opacity: 0; transform: translateX(-50%) translateY(20px); } to { opacity: 1; transform: translateX(-50%) translateY(0); } }
        .cart-page { max-width: 900px; margin: 2rem auto; padding: 0 1.5rem 3rem; }
        .cart-page h2 { font-family: 'Playfair Display', serif; font-size: 2rem; color: #1b3a2d; margin-bottom: 1.5rem; }
        .cart-item { background: #fff; border-radius: 12px; padding: 1.2rem; display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem; box-shadow: 0 2px 10px rgba(0,0,0,0.07); }
        .ci-emoji { font-size: 2.5rem; width: 60px; text-align: center; }
        .ci-info { flex: 1; }
        .ci-name { font-family: 'Playfair Display', serif; font-size: 1.1rem; color: #1b3a2d; }
        .ci-unit { font-family: 'Lato', sans-serif; font-size: 0.85rem; color: #888; }
        .qty-ctrl { display: flex; align-items: center; gap: 0.6rem; }
        .qty-btn { width: 30px; height: 30px; border-radius: 50%; border: 1.5px solid #2d6a4f; background: none; color: #2d6a4f; cursor: pointer; font-size: 1.1rem; display: flex; align-items: center; justify-content: center; transition: all 0.15s; }
        .qty-btn:hover { background: #2d6a4f; color: #fff; }
        .qty-num { font-family: 'Lato', sans-serif; font-size: 1rem; min-width: 24px; text-align: center; }
        .ci-price { font-family: 'Playfair Display', serif; font-size: 1.15rem; color: #2d6a4f; font-weight: 700; min-width: 70px; text-align: right; }
        .remove-btn { background: none; border: none; color: #cc6666; cursor: pointer; font-size: 1.2rem; padding: 0.2rem; }
        .cart-summary { background: #1b3a2d; border-radius: 16px; padding: 1.5rem; color: #f4f0e8; }
        .summary-row { display: flex; justify-content: space-between; font-family: 'Lato', sans-serif; margin-bottom: 0.75rem; font-size: 0.95rem; color: #b7d5c4; }
        .summary-total { display: flex; justify-content: space-between; font-family: 'Playfair Display', serif; font-size: 1.4rem; color: #f4f0e8; border-top: 1px solid #2d6a4f; padding-top: 1rem; margin-top: 0.5rem; }
        .checkout-btn { width: 100%; background: #e8a95c; color: #1a1a1a; border: none; padding: 1rem; border-radius: 30px; font-family: 'Lato', sans-serif; font-size: 1rem; font-weight: 700; letter-spacing: 1px; cursor: pointer; margin-top: 1.2rem; text-transform: uppercase; transition: background 0.2s; }
        .checkout-btn:hover { background: #f0bc7a; }
        .back-btn { background: none; border: none; color: #2d6a4f; cursor: pointer; font-family: 'Lato', sans-serif; font-size: 0.95rem; display: flex; align-items: center; gap: 0.3rem; margin-bottom: 1.5rem; padding: 0; }
        .empty-cart { text-align: center; padding: 4rem 1rem; }
        .empty-cart p { font-family: 'Lato', sans-serif; color: #888; margin-top: 1rem; }
        .shop-btn { background: #2d6a4f; color: #fff; border: none; padding: 0.75rem 2rem; border-radius: 30px; cursor: pointer; font-family: 'Lato', sans-serif; margin-top: 1.5rem; font-size: 0.95rem; }
      `}</style>

      {/* Nav */}
      <nav className="nav">
        <div className="logo" onClick={() => setView("shop")}>
          Paradise <span>Nursery</span>
        </div>
        <button className="cart-btn" onClick={() => setView("cart")}>
          🛒 Cart
          {cartCount > 0 && <span className="badge">{cartCount}</span>}
        </button>
      </nav>

      {/* Notification */}
      {notification && <div className="notif">✓ {notification}</div>}

      {/* Shop View */}
      {view === "shop" && (
        <>
          <div className="hero">
            <h1>
              Bring Nature <em>Indoors</em>
            </h1>
            <p>Curated houseplants, delivered with care</p>
          </div>

          <div className="filters">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`filter-btn${activeCategory === cat ? " active" : ""}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid">
            {filteredPlants.map((plant) => (
              <div className="card" key={plant.id}>
                <div className="card-img" style={{ background: `${plant.color}18` }}>
                  <span style={{ fontSize: "5rem" }}>{plant.emoji}</span>
                  <span className="category-tag">{plant.category}</span>
                </div>
                <div className="card-body">
                  <div className="card-name">{plant.name}</div>
                  <div className="card-desc">{plant.description}</div>
                  <div className="card-footer">
                    <span className="price">${plant.price.toFixed(2)}</span>
                    {cart[plant.id] ? (
                      <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                        <span className="in-cart">✓ {cart[plant.id]} in cart</span>
                        <button className="add-btn" onClick={() => addToCart(plant)}>+</button>
                      </div>
                    ) : (
                      <button className="add-btn" onClick={() => addToCart(plant)}>
                        Add to Cart
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Cart View */}
      {view === "cart" && (
        <div className="cart-page">
          <button className="back-btn" onClick={() => setView("shop")}>
            ← Continue Shopping
          </button>
          <h2>Your Cart</h2>

          {cartItems.length === 0 ? (
            <div className="empty-cart">
              <div style={{ fontSize: "4rem" }}>🪴</div>
              <p>Your cart is empty — the plants are waiting!</p>
              <button className="shop-btn" onClick={() => setView("shop")}>
                Browse Plants
              </button>
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "1fr minmax(250px, 320px)", gap: "1.5rem", alignItems: "start" }}>
              <div>
                {cartItems.map(({ plant, qty }) => (
                  <div className="cart-item" key={plant.id}>
                    <div className="ci-emoji">{plant.emoji}</div>
                    <div className="ci-info">
                      <div className="ci-name">{plant.name}</div>
                      <div className="ci-unit">${plant.price.toFixed(2)} each</div>
                    </div>
                    <div className="qty-ctrl">
                      <button className="qty-btn" onClick={() => updateQty(plant.id, -1)}>−</button>
                      <span className="qty-num">{qty}</span>
                      <button className="qty-btn" onClick={() => updateQty(plant.id, 1)}>+</button>
                    </div>
                    <div className="ci-price">${(plant.price * qty).toFixed(2)}</div>
                    <button className="remove-btn" onClick={() => removeItem(plant.id)} title="Remove">✕</button>
                  </div>
                ))}
              </div>

              <div className="cart-summary">
                <div className="summary-row">
                  <span>Items ({cartCount})</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                <div className="summary-row">
                  <span>Shipping</span>
                  <span>{cartTotal >= 50 ? "Free 🎉" : "$6.99"}</span>
                </div>
                {cartTotal < 50 && (
                  <div style={{ fontFamily: "Lato, sans-serif", fontSize: "0.8rem", color: "#a8d5b5", marginTop: "-0.4rem", marginBottom: "0.5rem" }}>
                    Add ${(50 - cartTotal).toFixed(2)} more for free shipping!
                  </div>
                )}
                <div className="summary-total">
                  <span>Total</span>
                  <span>${(cartTotal + (cartTotal >= 50 ? 0 : 6.99)).toFixed(2)}</span>
                </div>
                <button className="checkout-btn">Proceed to Checkout</button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
