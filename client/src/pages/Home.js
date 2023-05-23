import React from "react";
import DesignCard from "../components/DesignCard";
import Footer from "../layout/Footer";
import { Card, CardContent, Typography } from "@mui/material";

const Home = () => {
  return (
    <div>
      <div>
        <DesignCard></DesignCard>
      </div>
      <h2 className="main-h2">The best Tier-set awaits you</h2>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Card
          sx={{
            maxWidth: 700,
            margin: "2rem",
            backgroundColor: "rgb(182, 180, 184)",
          }}
        >
          <CardContent sx={{ margin: "1rem" }}>
            <Typography>
              Experience the thrill of browsing through our virtual armory,
              where every set tells a story and exudes the essence of Azeroth.
              Whether you seek the elegance of elven robes or the rugged
              resilience of plate mail, our diverse range of sets caters to all
              adventurers, ensuring that you look and feel your best on every
              quest.
            </Typography>
          </CardContent>
        </Card>

        <Card
          sx={{
            maxWidth: 700,
            margin: "2rem",

            backgroundColor: "rgb(182, 180, 184)",
          }}
        >
          <CardContent sx={{ margin: "1rem" }}>
            <Typography>
              Shop with confidence as we prioritize quality and authenticity,
              sourcing our sets from reputable craftsmen and reputable sources
              within the World of Warcraft community. Join countless adventurers
              who have entrusted us with their armor needs and embark on your
              journey to become a true legend.
            </Typography>
          </CardContent>
        </Card>
      </div>
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
          style={{ border: "solid 3px #ab8f5c", margin: "2rem" }}
          src="https://www.youtube.com/embed/jSJr3dXZfcg"
          frameborder="0"
          allow="autoplay; encrypted-media"
          allowfullscreen
        ></iframe>
      </div>

      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Home;
