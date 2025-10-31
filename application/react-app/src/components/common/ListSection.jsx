import React from "react";

export default function ListSection({
  title,
  items = [],
  iconUrl,
  renderDetails,
  renderActions,
  emptyMessage = "No items available.",
}) {
  return (
    <section className="flex flex-col gap-lg w-full">
      <header className="flex flex-col gap-sm sm:flex-row sm:justify-between sm:items-center">
        <h2 className="text-heading-md font-semibold text-text-primary m-0">{title}</h2>
        <p className="text-body text-text-secondary">{items.length} items</p>
      </header>

      {items.length === 0 ? (
        <div className="text-center p-md text-text-secondary text-body">{emptyMessage}</div>
      ) : (
        <ul className="flex flex-col">
          {items.map((item) => (
            <li key={item.id} className="
              flex flex-wrap items-center gap-md
              py-sm border-b border-border-neutral
              transition-colors duration-150 ease-in-out
              hover:bg-secondary-hover
              last:border-b-0
              xs:flex-nowrap
            ">
              {iconUrl && (
                <img 
                  className="w-5 h-5 rounded-sm object-cover flex-shrink-0 opacity-85" 
                  src={iconUrl} 
                  alt="" 
                />
              )}
              <div className="flex-1 min-w-[200px] flex flex-col gap-xs xs:flex-basis-auto">
                {renderDetails(item)}
              </div>
              <div className="flex gap-xs flex-shrink-0 xs:w-full xs:justify-start xs:gap-sm">
                {renderActions ? (
                  renderActions(item)
                ) : (
                  <>
                    <button className="icon-button" title="View">
                      <i className="ph-eye"></i>
                    </button>
                    <button className="icon-button" title="Edit">
                      <i className="ph-pencil"></i>
                    </button>
                    <button className="icon-button" title="Delete">
                      <i className="ph-trash"></i>
                    </button>
                  </>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}