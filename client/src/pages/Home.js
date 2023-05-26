import React from "react";
import DesignCard from "../components/DesignCard";
import { Card, CardContent, Typography } from "@mui/material";

const Home = () => {
  return (
    <div>
      <div style={{ height: "40vh" }}>
        <div className="home-head-pic"> </div>
        <div className="home-head-pic-two"> </div>
      </div>

      <h2 className="main-h2">The best Tier-set awaits you</h2>

      {/* Big pic  */}
      <div>
        <div className="home-cover-pic">
          <div className="home-cover-pic-card">
            <Card
              className="cover-card"
              sx={{
                maxWidth: 500,
                margin: "1rem",
                border: "solid 2px #ab8f5c",
                borderRadius: "0.5rem",
              }}
            >
              <CardContent sx={{ margin: "0.5rem", color: "#ffd384" }}>
                <Typography>
                  Join countless adventurers who have entrusted us with their
                  armor needs and embark on your journey to become a true
                  legend.
                </Typography>
              </CardContent>
            </Card>
          </div>
          <div className="home-cover-pic-card-two">
            {" "}
            <Card
              className="cover-card"
              sx={{
                maxWidth: 700,
                margin: "2rem",
                border: "solid 2px #ab8f5c",
                borderRadius: "0.5rem",
              }}
            >
              <CardContent
                sx={{
                  margin: "0.5rem",
                  color: "#ffd384",
                }}
              >
                <Typography>
                  Experience the thrill of browsing through our virtual armory,
                  where every set tells a story and exudes the essence of
                  Azeroth. Whether you seek the elegance of elven robes or the
                  rugged resilience of plate mail, our diverse range of sets
                  caters to all adventurers, ensuring that you look and feel
                  your best on every quest.
                </Typography>
              </CardContent>
            </Card>{" "}
          </div>
        </div>
      </div>
      <div>
        <h2 className="main-h2" style={{ fontSize: "2rem" }}>
          Unleash your inner hero with our premium selection of armor sets
        </h2>
        <DesignCard />
      </div>
      <h2
        className="main-h2"
        style={{
          fontSize: "1.7rem",
        }}
      >
        Prepare to make a statement on the battlefield, where style meets
        strength in Azeroth
      </h2>
      {/* video */}

      <div style={{ position: "relative" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {" "}
          <iframe
            title="cinematic"
            width="560"
            height="315"
            style={{
              border: "solid 3px #ab8f5c",
              margin: "2rem",
              marginTop: "10rem",
            }}
            src="https://www.youtube.com/embed/jSJr3dXZfcg"
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
          ></iframe>
        </div>
        <div className="footer-cover-pic"> </div>
      </div>
    </div>
  );
};

export default Home;
