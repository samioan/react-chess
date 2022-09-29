import React from "react";

import Grid from "@material-ui/core/Grid";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";

import links from "./constants/links";
import styles from "./styles";

const Footer = () => {
  const classes = styles();

  return (
    <Grid
      container
      alignItems="center"
      justify="space-between"
      className={classes.container}
    >
      <div>
        <Typography className={classes.title}>
          Ioannis Siampalias &copy; {new Date().getFullYear()}
        </Typography>
      </div>
      <div className={classes.linkContainer}>
        {links.map(({ link, title, img }) => (
          <Tooltip key={title} arrow title={title}>
            <IconButton href={link} target="_blank">
              {img}
            </IconButton>
          </Tooltip>
        ))}
      </div>
    </Grid>
  );
};

export { Footer };
export default Footer;
