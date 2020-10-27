import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";

// core components
import useStyles from "theme/jss/material-kit-react/components/parallaxStyle";

export default function Parallax(props: ParallaxProps) {
  let windowScrollTop;
  if (window.innerWidth >= 768) {
    windowScrollTop = window.pageYOffset / 3;
  } else {
    windowScrollTop = 0;
  }
  const [transform, setTransform] = React.useState(
    "translate3d(0," + windowScrollTop + "px,0)"
  );

  // An effect to check for scrolling according to the size of the image
  React.useEffect(() => {
    if (window.innerWidth >= 768) {
      window.addEventListener("scroll", resetTransform);
    }
    return function cleanup() {
      if (window.innerWidth >= 768) {
        window.removeEventListener("scroll", resetTransform);
      }
    };
  });

  const resetTransform = () => {
    var windowScrollTop = window.pageYOffset / 3;
    setTransform("translate3d(0," + windowScrollTop + "px,0)");
  };

  const { filter, children, style, image, small } = props;

  // Our classes for styling
  const classes = useStyles();

  // Set up classes names for our div
  const parallaxClasses = classNames({
    [classes.parallax]: true,
    [classes.filter]: filter,
    [classes.small]: small,
  });

  return (
    <div
      className={parallaxClasses}
      style={{
        ...style,
        backgroundImage: "url(" + image + ")",
        transform: transform,
      }}
    >
      {children}
    </div>
  );
}

type ParallaxProps = {
  className?: string;
  filter?: boolean;
  children: React.ReactNode;
  style?: Record<string, any>;
  image: string;
  small?: boolean;
};
