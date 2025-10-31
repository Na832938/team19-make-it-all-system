import { useState, useEffect } from 'react';
import Select from '../common/Select';
import TextInput from '../common/TextInput';
import Label from '../common/Label';

export default function TaskControls({ filters, onChange }) {
  const [searchValue, setSearchValue] = useState(filters.q);
  const [localFilters, setLocalFilters] = useState(filters);

  // Debounce search input (300ms delay)
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchValue !== localFilters.q) {
        const newFilters = { ...localFilters, q: searchValue };
        setLocalFilters(newFilters);
        onChange(newFilters);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchValue, localFilters, onChange]); // ← Add missing dependencies here

  // Handle immediate filter changes (selects)
  const handleFilterChange = (key, value) => {
    const newFilters = { ...localFilters, [key]: value };
    setLocalFilters(newFilters);
    onChange(newFilters);
  };

  // Sync with parent filters when they change externally
  useEffect(() => {
    setLocalFilters(filters);
    setSearchValue(filters.q);
  }, [filters]);
}

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <Label text="Status:">
        <Select
          name="status"
          value={localFilters.status}
          onChange={e => handleFilterChange('status', e.target.value)}
          options={[
            { value: 'All', label: 'All' },
            { value: 'To Do', label: 'To Do' },
            { value: 'In Progress', label: 'In Progress' },
            { value: 'Done', label: 'Done' },
          ]}
        />
      </Label>

      <Label text="Priority:">
        <Select
          name="priority"
          value={localFilters.priority}
          onChange={e => handleFilterChange('priority', e.target.value)}
          options={[
            { value: 'All', label: 'All' },
            { value: 'Low', label: 'Low' },
            { value: 'Medium', label: 'Medium' },
            { value: 'High', label: 'High' },
          ]}
        />
      </Label>

      <Label text="Search:">
        <TextInput
          name="search"
          type="text"
          value={searchValue}
          onChange={e => setSearchValue(e.target.value)}
          placeholder="Search title..."
        />
      </Label>

      <Label text="Sort by:">
        <Select
          name="sort"
          value={localFilters.sort}
          onChange={e => handleFilterChange('sort', e.target.value)}
          options={[
            { value: 'none', label: 'None' },
            { value: 'dueAsc', label: 'Due date ↑' },
            { value: 'dueDesc', label: 'Due date ↓' },
            { value: 'prioAsc', label: 'Priority (Low→High)' },
            { value: 'prioDesc', label: 'Priority (High→Low)' },
          ]}
        />
      </Label>
    </div>
  );
