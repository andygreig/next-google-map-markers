import React from "react";
import styled from "styled-components";
import Link from "next/link";

import Layout from "../components/layout";

const Home = ({ data }) => {
  return (
    <Layout meta={data.meta}>
      Test
    </Layout>
  );
};

export async function getStaticProps() {
  const data = {
    meta: {
      title: "Nextjs Demo - Google Maps with Markers ",
      description: "Description",
    },
  };
  return {
    props: { data },
  };
}

export default Home;
