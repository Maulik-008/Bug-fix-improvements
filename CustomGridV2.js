import React from "react";
import PropTypes from "prop-types";
import { Grid } from "@material-ui/core";

const GridComponent = ({ containerProps, gridConfiguration, children }) => {
  // Flatten the grid configuration sizes into a single array
  const flattenedSizes = gridConfiguration.flatMap((config) => config.sizes);

  const getGridContainer = () => {
    return (
      <>
        {React.Children.map(children, (child, index) => {
          // Find the appropriate size configuration for the current child
          const size = flattenedSizes[index] || { xs: 12, md: 6 };
          return (
            <Grid container {...containerProps}>
              <Grid item xs={size.xs} md={size.md} key={index}>
                {child}
              </Grid>
            </Grid>
          );
        })}
      </>
    );
  };

  return children ? getGridContainer() : null;
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
