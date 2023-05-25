import React from "react";
import { Link } from "react-router-dom";

const DesignCard = () => {
  return (
    <div className="main-card" style={{ height: "60vh" }}>
      <Link to="/view-product/646cba6d3b47076eb848aa22">
        {" "}
        <img
          className="home-card"
          src="https://i.postimg.cc/YqFXpR5y/Valorous-Deathbringer-Garb.png"
          alt="Valorous Deathbringer Garb"
        />
      </Link>

      <Link to="/view-product/646b33439b9f937e5e0d4179 ">
        <img
          className="home-card"
          src="https://i.postimg.cc/T1z5hdvB/The-Furnace-Seraph-s-Verdict-blue.png"
          alt="The-Furnace-Seraph-s-Verdict-blue"
        />
      </Link>
      <Link to="/view-product/646caefa3b47076eb848a812">
        {" "}
        <img
          className="home-card"
          src="https://i.postimg.cc/dtJBYF9D/Flamewalker-s-Battlegear.png"
          alt="Flamewalker-s-Battlegear"
        />
      </Link>
    </div>
  );
};

export default DesignCard;
