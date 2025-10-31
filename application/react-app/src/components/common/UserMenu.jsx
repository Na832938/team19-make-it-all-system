export function UserProfile({ 
  user, 
  onClick,
  className = "" 
}) {
  return (
    <button
      onClick={onClick}
      className={`
        bg-primary text-surface
        border border-primary rounded-lg
        px-md py-sm cursor-pointer
        flex items-center gap-sm
        font-semibold
        transition-all duration-200 ease-in-out
        hover:bg-primary-hover hover:shadow-lg
        sm:px-sm sm:py-xs
        ${className}
      `}
    >
      <span className="flex items-center gap-xs">
        {user.avatar && (
          <img 
            src={user.avatar} 
            alt={user.name}
            className="w-8 h-8 rounded-lg"
          />
        )}
        {user.name}
      </span>
    </button>
  );
}

export function DropdownUserInfo({ 
  user,
  className = "" 
}) {
  return (
    <div className={`
      flex items-center gap-sm
      pb-sm border-b border-border-neutral
      mb-sm
      font-medium text-text-primary
      ${className}
    `}>
      {user.avatar && (
        <img 
          src={user.avatar} 
          alt={user.name}
          className="w-8 h-8 rounded-lg"
        />
      )}
      <span>{user.name}</span>
    </div>
  );
}