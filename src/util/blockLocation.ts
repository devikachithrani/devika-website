import { useEffect } from "react";
import { useHistory } from "react-router-dom";

export default function useLocationBlocker() {
  const history = useHistory();
  useEffect(
    () => {
      if (history)
        history.block((location, action) => {
          if (
            action === "PUSH" ||
            getLocationId(location) === getLocationId(history.location)
          ) {
            return;
          }
          return false;
        });
    },
    [] // eslint-disable-line react-hooks/exhaustive-deps
  );
}

function getLocationId({
  pathname,
  search,
  hash,
}: {
  pathname: string;
  search: string;
  hash: string;
}) {
  return pathname + (search ? "?" + search : "") + (hash ? "#" + hash : "");
}
