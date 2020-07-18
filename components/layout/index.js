import PropTypes from "prop-types";
import React from "react";

import Meta from "../meta";
import Wrapper from "../wrapper";

const Layout = ({ metaTags, children }) => {
  return (
    <>
      <Meta {...metaTags} />
      <Wrapper>{children}</Wrapper>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  metaTags: PropTypes.object.isRequired,
};

export default Layout;
