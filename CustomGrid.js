import React from "react";
import PropTypes from "prop-types";
import { Grid } from "@material-ui/core";

let childrenIndex = 0; // Track the index of children across all rows

const GridComponent = ({ containerProps, gridConfiguration, children }) => {
  const getGridItems = (sizesData) => {
    return sizesData.map((size, j) => {
      // Get the current child based on the childrenIndex
      const currentChild =
        children && Array.isArray(children)
          ? children[childrenIndex]
          : children;
      // Increment the childrenIndex for the next column
      childrenIndex++;

      return (
        <Grid item xs={size.xs || 12} md={size.md || 6} key={j}>
          {currentChild}
        </Grid>
      );
    });
  };

  const getGridContainer = (rowConfig, rowIndex) => (
    <Grid container key={rowIndex} {...containerProps}>
      {getGridItems(
        rowConfig?.sizes && Array.isArray(rowConfig?.sizes)
          ? rowConfig?.sizes
          : []
      )}
    </Grid>
  );

  return (
    <>
      {children ? (
        gridConfiguration.map((row, rowIndex) =>
          getGridContainer(row, rowIndex)
        )
      ) : (
        <></>
      )}
    </>
  );
};

GridComponent.propTypes = {
  containerProps: PropTypes.object,
  gridConfiguration: PropTypes.arrayOf(
    PropTypes.shape({
      columnCount: PropTypes.number.isRequired,
      sizes: PropTypes.arrayOf(
        PropTypes.shape({
          xs: PropTypes.number,
          md: PropTypes.number,
        })
      ).isRequired,
    })
  ).isRequired,
  children: PropTypes.node.isRequired,
};

export default GridComponent;
