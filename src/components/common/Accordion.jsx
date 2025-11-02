import { useState } from "react";

export default function Accordion({
  items,
  className = "",
  allowMultiple = false,
  defaultExpanded = []
}) {
  const [expandedIds, setExpandedIds] = useState(
    defaultExpanded.reduce((acc, id) => ({ ...acc, [id]: true }), {})
  );

  const toggleItem = (id) => {
    setExpandedIds(prev => {
      if (allowMultiple) {
        return { ...prev, [id]: !prev[id] };
      } else {
        return { [id]: !prev[id] };
      }
    });
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {items.map((item, index) => {
        const itemId = item.id || index;
        const isExpanded = expandedIds[itemId];
        
        return (
          <div 
            key={itemId} 
            className="border border-borderNeutral rounded-md overflow-hidden bg-surface dark:bg-surface transition-colors duration-200 hover:shadow-sm"
          >
            {/* Accordion Header */}
            <button
              onClick={() => toggleItem(itemId)}
              className="w-full p-4 text-left flex items-center justify-between bg-surface dark:bg-surface hover:bg-secondaryHover dark:hover:bg-secondaryHover transition-colors duration-200"
              aria-expanded={isExpanded}
            >
              <div className="flex-1 text-textPrimary dark:text-textPrimary">
                {typeof item.header === 'function' 
                  ? item.header(isExpanded)
                  : item.header
                }
              </div>
              
              {/* Chevron Icon */}
              <div className={`flex-shrink-0 ml-4 transform transition-transform duration-200 ${
                isExpanded ? 'rotate-180' : 'rotate-0'
              }`}>
                <svg className="w-5 h-5 text-textSecondary dark:text-textSecondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </button>

            {/* Accordion Content */}
            <div className={`transition-all duration-300 ease-in-out overflow-hidden ${
              isExpanded 
                ? 'max-h-96 opacity-100 border-t border-borderNeutral dark:border-borderNeutral' 
                : 'max-h-0 opacity-0'
            }`}>
              <div className="p-4 bg-secondary dark:bg-secondary text-textPrimary dark:text-textPrimary">
                {typeof item.content === 'function'
                  ? item.content(isExpanded)
                  : item.content
                }
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
