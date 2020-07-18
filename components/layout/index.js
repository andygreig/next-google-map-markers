import PropTypes from "prop-types";
import React from "react";

import Meta from "../meta";
import Wrapper from "../wrapper";

const Layout = ({ meta, children }) => {
  return (
    <>
      <Meta {...meta} />
      <Wrapper>{children}</Wrapper>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  meta: PropTypes.object.isRequired,
};

export default Layout;
