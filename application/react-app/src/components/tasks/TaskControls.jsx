import Select from '../common/Select';
import TextInput from '../common/TextInput';
import Label from '../common/Label';

export default function TaskControls({ filters, onChange }) {
  return (
    <section className="horizontal-center" style={{ gap: 'var(--space-md)', flexWrap: 'nowrap', alignItems: 'center' }}>
      <Label text="Status:">
        <Select
          value={filters.status}
          onChange={e => onChange({ ...filters, status: e.target.value })}
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
          value={filters.priority}
          onChange={e => onChange({ ...filters, priority: e.target.value })}
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
          type="text"
          value={filters.q}
          onChange={e => onChange({ ...filters, q: e.target.value })}
          placeholder="Search title..."
        />
      </Label>

      <Label text="Sort by:">
        <Select
          value={filters.sort}
          onChange={e => onChange({ ...filters, sort: e.target.value })}
          options={[
            { value: 'none', label: 'None' },
            { value: 'dueAsc', label: 'Due date ↑' },
            { value: 'dueDesc', label: 'Due date ↓' },
            { value: 'prioAsc', label: 'Priority (Low→High)' },
            { value: 'prioDesc', label: 'Priority (High→Low)' },
          ]}
        />
      </Label>
    </section>
  );
}
