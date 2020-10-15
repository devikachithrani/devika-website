import React, { useState, useEffect } from "react";
// nodejs library that concatenates classes
import classNames from "classnames";

// @material-ui/core components
import Button from "@material-ui/core/Button";

import useStyles from "theme/jss/material-kit-react/components/paginationStyle";
import setDefaultProps from "util/setDefaultProps";

import { fetchPageNumbers, LEFT_PAGE, RIGHT_PAGE } from "./Pagination";

export default function Pagination(props: PaginationProps) {
  //Setting default props
  const defProps = setDefaultProps(props, {
    color: "primary",
    pageLimit: 5,
    pageNeighbours:
      typeof props.pageNeighbours === "number"
        ? Math.max(0, Math.min(props.pageNeighbours, 2))
        : 0,
    totalRecords: 0,
  });

  const {
    color,
    totalRecords,
    pageLimit,
    pageNeighbours,
    onPageChanged,
    scroll
  } = defProps;

  // Set up pagination
  const totalPages = Math.ceil(totalRecords / pageLimit);
  const [currentPage, setCurrentPage] = useState(1);

  /* Handling Functions */

  const gotoPage = (page: number) => {
    const currentPage = Math.max(0, Math.min(page, totalPages));
    setCurrentPage(currentPage);
  };

  const handleClick = (page: number) => (
    evt: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    evt.preventDefault();
    gotoPage(page);
    window.scrollTo(0, scroll)
  };

  const handleMoveLeft = (
    evt: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    evt.preventDefault();
    gotoPage(currentPage - pageNeighbours * 2 - 1);
    window.scrollTo(0, scroll)
  };

  const handleMoveRight = (
    evt: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    evt.preventDefault();
    gotoPage(currentPage + pageNeighbours * 2 + 1);
    window.scrollTo(0, scroll)
  };

  useEffect(() => {
    setCurrentPage(1);
  }, []);

  useEffect(() => {
    onPageChanged({ currentPage, pageLimit });
  }, [currentPage]); // eslint-disable-line react-hooks/exhaustive-deps

  const allPages = fetchPageNumbers(totalPages, currentPage, pageNeighbours);

  // For styling
  const classes = useStyles();

  return (
    <ul className={classes.pagination}>
      {allPages.map((page, key) => {
        const paginationLink = classNames({
          [classes.paginationLink]: true,
          [classes[color]]: currentPage === page,
        });

        if (page === LEFT_PAGE) {
          return (
            <li className={classes.paginationItem} key={key}>
              <Button onClick={handleMoveLeft} className={paginationLink}>
                PREV
              </Button>
            </li>
          );
        }

        if (page === RIGHT_PAGE) {
          return (
            <li className={classes.paginationItem} key={key}>
              <Button onClick={handleMoveRight} className={paginationLink}>
                NEXT
              </Button>
            </li>
          );
        }

        return (
          <li className={classes.paginationItem} key={key}>
            <Button
              onClick={handleClick(page as number)}
              className={paginationLink}
            >
              {page}
            </Button>
          </li>
        );
      })}
    </ul>
  );
}

type PaginationProps = {
  color?: "primary" | "info" | "success" | "warning" | "danger";
  totalRecords: number;
  pageLimit?: number;
  pageNeighbours?: number;
  onPageChanged?: (data: { currentPage: number; pageLimit: number }) => any;
  scroll: number;
};
