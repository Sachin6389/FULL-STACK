import React from "react";
import LatestCollation from "../components/LatestCollation";
import Collection from "./Collection";

function Home() {
  return (
    <main>

      {/* Main SEO Heading */}
      <section>
        <h1>
          Professional Website Development & IT Solutions
        </h1>
        <p>
          Himanshu Computer Services helps businesses grow online with modern,
          fast, and responsive websites, SEO services, and digital solutions.
        </p>
      </section>

      <Collection />
      <LatestCollation />

    </main>
  );
}

export default Home;
