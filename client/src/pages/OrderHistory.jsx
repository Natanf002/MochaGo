import React from "react";
import latteSandwich from "../assets/latte-sandwich.png";
import americano from "../assets/americano.png";
import latte from "../assets/latte.png";
import icedmatcha from "../assets/icedmatcha.png";

export default function OrderHistoryPage() {
  return (
    <div style={{ display: "flex", minHeight: "100vh", width: "100vw" }}>
      {/* LEFT SIDE – Order History */}
      <div style={{ flex: 2, backgroundColor: "#000", color: "white", padding: "3rem" }}>
        <h1 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "2rem" }}>Order History</h1>

        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          {[
            {
              date: "3/11/2025 6:22P.M.",
              items: ["1x Latte Macchiato", "1x Grilled Cheese Sandwich"],
              image: latteSandwich,
            },
            {
              date: "3/10/2025 8:10A.M.",
              items: ["1x Americano"],
              image: americano,
            },
            {
              date: "3/7/2025 5:35P.M.",
              items: ["1x Latte Macchiato"],
              image: latte,
            },
            {
              date: "3/6/2025 7:44A.M.",
              items: ["1x Iced Matcha"],
              image: icedmatcha,
            },
          ].map((order, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: "#2a2623",
                borderRadius: "1rem",
                padding: "1rem",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <p style={{ fontSize: "0.9rem", marginBottom: "0.5rem" }}>Ordered on {order.date}</p>
                {order.items.map((item, i) => (
                  <p key={i}>{item}</p>
                ))}
              </div>
              <img
                src={order.image}
                alt="Order item"
                style={{ height: "8rem", width: "auto", objectFit: "contain" }}
              />
            </div>
          ))}
        </div>

        <div style={{ marginTop: "2rem" }}>
          <button
            style={{
              backgroundColor: "#5a5653",
              padding: "0.5rem 1rem",
              borderRadius: "0.5rem",
              color: "white",
              border: "none",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            ↓ View More
          </button>
        </div>
      </div>

      {/* RIGHT SIDE – Profile Summary */}
      <div
        style={{
          flex: 1,
          backgroundColor: "#6A7D4F",
          color: "white",
          padding: "3rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: "140px",
            height: "140px",
            borderRadius: "50%",
            backgroundColor: "#d9d9d9",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: "1.5rem",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            style={{ height: "4rem", width: "4rem", color: "#000" }}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5.121 17.804A9.003 9.003 0 0112 15c2.136 0 4.093.747 5.621 1.996M15 10a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </div>
        <h2 style={{ fontSize: "1.5rem", fontWeight: "bold" }}>John Doe</h2>
        <p style={{ color: "#eee", marginBottom: "2rem" }}>johndoe@gmail.com</p>

        <div style={{ display: "flex", flexDirection: "column", width: "100%", textAlign: "center", gap: "1rem" }}>
          <hr style={dividerStyle} />
          <p style={navLinkStyle}>Settings</p>
          <hr style={dividerStyle} />
          <p style={navLinkStyle}>Order History</p>
          <hr style={dividerStyle} />
          <p style={navLinkStyle}>Reset Password</p>
        </div>
      </div>
    </div>
  );
}

const navLinkStyle = {
  color: "#EAEAEA",
  textDecoration: "none",
  fontSize: "1rem",
  fontWeight: "500",
};

const dividerStyle = {
  width: "60%",
  border: "none",
  borderBottom: "1px solid #ccc",
};
