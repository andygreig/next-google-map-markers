import React from "react";

import Layout from "../components/layout";
import LocationMap from '../components/location-map';

const Home = ({ data }) => {
  return (
    <Layout meta={data.meta}>
      <LocationMap />
    </Layout>
  );
};

export async function getStaticProps() {
  const data = {
    meta: {
      title: "Nextjs Demo - Google Maps with Markers",
      description: "Description",
      canonical: "http://url.com",
    },
  };
  return {
    props: { data },
  };
}

export default Home;
