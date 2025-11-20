import { useState } from "react";
import PropTypes from 'prop-types';
import { logger } from '../../lib/logger';

/**
 * An accordion component that allows users to show and hide sections of content.
 *
 * @param {object} props - The component's props.
 * @param {Array<object>} props.items - An array of items to display in the accordion.
 * @param {boolean} [props.allowMultiple=false] - Whether multiple items can be expanded at once.
 * @param {Array<string|number>} [props.defaultExpanded=[]] - An array of item IDs that should be expanded by default.
 * @returns {JSX.Element} The accordion component.
 */
export default function Accordion({ items, allowMultiple = false, defaultExpanded = [] }) {
  const [expandedIds, setExpandedIds] = useState(
    defaultExpanded.reduce((acc, id) => ({ ...acc, [id]: true }), {})
  );

  const toggleItem = (id) => {
    logger.action(`Toggling accordion item: ${id}`);
    setExpandedIds(prev => {
      if (allowMultiple) return { ...prev, [id]: !prev[id] };
      return { [id]: !prev[id] };
    });
  };

  return (
    <div className="space-y-4">
      {items.map((item, index) => {
        const itemId = item.id || index;
        const isExpanded = expandedIds[itemId];

        return (
          <div
            key={itemId}
            className={`
              bg-[var(--surface-colour)] dark:bg-[var(--surface-colour)]
              border border-[var(--border-neutral)] dark:border-[var(--border-neutral)]
              rounded-md shadow-sm dark:shadow-sm
              overflow-hidden transition-shadow duration-200
            `}
          >
            <button
              onClick={() => toggleItem(itemId)}
              className={`
                w-full text-left flex items-center justify-between
                p-4
                text-[var(--text-primary)] dark:text-[var(--text-primary)]
                hover:bg-[var(--secondary-hover)] dark:hover:bg-[var(--secondary-hover)]
                transition-colors duration-200
              `}
              aria-expanded={isExpanded}
            >
              <div className="flex-1">
                {typeof item.header === "function" ? item.header(isExpanded) : item.header}
              </div>
              <div
                className={`flex-shrink-0 ml-4 transform transition-transform duration-200 ${
                  isExpanded ? "rotate-180" : "rotate-0"
                }`}
              >
                <svg
                  className="w-5 h-5 text-[var(--text-secondary)] dark:text-[var(--text-secondary)]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </button>

            {isExpanded && (
              <div className="p-4 border-t border-[var(--border-neutral)] dark:border-[var(--border-neutral)] text-[var(--text-primary)] dark:text-[var(--text-primary)]">
                {typeof item.content === "function" ? item.content(isExpanded) : item.content}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

Accordion.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    header: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
    content: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
  })).isRequired,
  allowMultiple: PropTypes.bool,
  defaultExpanded: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
};
