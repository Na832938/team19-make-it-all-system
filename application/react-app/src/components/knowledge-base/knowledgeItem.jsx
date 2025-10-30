import ListSection from "../common/ListSection";

export default function SubjectList({ subjects, onSelect }) {
return (
    <ListSection
        title="Available Subjects"
        items={subjects}
        iconUrl="https://cdn-icons-png.flaticon.com/512/1828/1828817.png"
        emptyMessage="No Subjects available."
        renderDetails={(subject) => {
            const descId = `subject-description-${subject.id ?? subject.Question.replace(/\s+/g, '-')}`;
            return (
                <dl className="topic-details">
                    <div>
                        <dt>{subject.Question}</dt>
                        <dd id={descId} style={{ display: 'none' }}>{subject.description}</dd>
                    </div>
                </dl>
            );
        }}
        renderActions={(subject) => {
            const descId = `subject-description-${subject.id ?? subject.Question.replace(/\s+/g, '-')}`;
            return (
                <div className="topic-action">
                    
                    <button
                        className="icon-button"
                        onClick={() => {
                            const el = document.getElementById(descId);
                            if (el) el.style.display = el.style.display === 'block' ? 'none' : 'block';
                        }}
                        title="Open Topic"
                    >More</button>
        
                </div>
            );
        }}
    />
);
}
