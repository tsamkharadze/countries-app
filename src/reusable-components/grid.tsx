import { useVirtualizer } from "@tanstack/react-virtual";
import React from "react";

export function GridVirtualizerVariable({
  rows,
  columns,
}: {
  rows: Array<number>;
  columns: Array<number>;
}) {
  const parentRef = React.useRef<HTMLDivElement>(null);

  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: (i) => rows[i],
    overscan: 5,
  });

  const columnVirtualizer = useVirtualizer({
    horizontal: true,
    count: columns.length,
    getScrollElement: () => parentRef.current,
    estimateSize: (i) => columns[i],
    overscan: 5,
  });

  return (
    <>
      <div
        ref={parentRef}
        className="List"
        style={{
          height: `400px`,
          width: `500px`,
          overflow: "auto",
        }}
      >
        <div
          style={{
            height: `${rowVirtualizer.getTotalSize()}px`,
            width: `${columnVirtualizer.getTotalSize()}px`,
            position: "relative",
          }}
        >
          {rowVirtualizer.getVirtualItems().map((virtualRow) => (
            <React.Fragment key={virtualRow.index}>
              {columnVirtualizer.getVirtualItems().map((virtualColumn) => (
                <div
                  key={virtualColumn.index}
                  className={
                    virtualColumn.index % 2
                      ? virtualRow.index % 2 === 0
                        ? "ListItemOdd"
                        : "ListItemEven"
                      : virtualRow.index % 2
                        ? "ListItemOdd"
                        : "ListItemEven"
                  }
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: `${columns[virtualColumn.index]}px`,
                    height: `${rows[virtualRow.index]}px`,
                    transform: `translateX(${virtualColumn.start}px) translateY(${virtualRow.start}px)`,
                  }}
                >
                  Cell {virtualRow.index}, {virtualColumn.index}
                </div>
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>
    </>
  );
}
