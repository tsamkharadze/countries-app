import { Country } from "@/types";
import { useVirtualizer } from "@tanstack/react-virtual";
import React, { PropsWithChildren } from "react";
import styles from "./virtualizedList.module.css";

interface VirtualizeComponentProps {
  country: Country[];
}

export const VirtualizeComponent: React.FC<
  PropsWithChildren<VirtualizeComponentProps>
> = ({ children, country }) => {
  const parentRef = React.useRef(null);

  const rowVirtualizer = useVirtualizer({
    count: country.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 35,
    overscan: 0,
  });
  return (
    <div
      ref={parentRef}
      className={styles.list}
      style={{
        height: `400px`,
        width: `100%`,
        overflow: "auto",
      }}
    >
      <div
        style={{
          height: `${rowVirtualizer.getTotalSize()}px`,
          width: "100%",
          position: "relative",
        }}
      >
        {rowVirtualizer.getVirtualItems().map((virtualRow) => {
          return (
            <div
              key={virtualRow.index}
              className={
                virtualRow.index % 2 ? styles.ListItemOdd : styles.ListItemEven
              }
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: `${virtualRow.size}px`,
                transform: `translateY(${virtualRow.start}px)`,
              }}
            >
              {children}
            </div>
          );
        })}
      </div>
    </div>
  );
};
