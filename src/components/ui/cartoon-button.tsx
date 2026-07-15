interface CartoonButtonProps {
  label: string | React.ReactNode;
  icon: React.ReactNode;
  color?: string;
  hasHighlight?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
}

export function CartoonButton({
  label,
  icon,
  color = 'bg-orange-400',
  hasHighlight = true,
  disabled = false,
  onClick,
  className = '',
}: CartoonButtonProps) {
  const handleClick = () => {
    if (disabled) return;
    onClick?.();
  };

  return (
    <div
      className={`inline-block ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'} ${className}`}
    >
      <button
        disabled={disabled}
        onClick={handleClick}
        className={`relative h-12 w-12 rounded-full hover:rounded-full md:hover:rounded-2xl px-3 text-xl font-bold text-neutral-800 border-2 border-neutral-800 transition-all duration-500 ease-in-out overflow-hidden group flex items-center justify-center
        ${color} hover:shadow-[0_4px_0_0_#2E3135] hover:scale-105 hover:-translate-y-1 active:scale-95 active:translate-y-0 active:shadow-none
        ${disabled ? 'opacity-50 pointer-events-none' : ''}`}
        style={{
          width: '48px',
          transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.width = 'auto';
          e.currentTarget.style.minWidth = '160px';
          e.currentTarget.style.paddingLeft = '20px';
          e.currentTarget.style.paddingRight = '20px';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.width = '48px';
          e.currentTarget.style.minWidth = '48px';
          e.currentTarget.style.paddingLeft = '12px';
          e.currentTarget.style.paddingRight = '12px';
        }}
      >
        {/* Animated shimmer effect */}
        <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
        
        {/* Ring pulse effect */}
        <span className="absolute inset-0 border-2 border-white/20 rounded-full scale-0 group-hover:scale-150 group-hover:opacity-100 opacity-0 transition-all duration-500" />

        {/* Icon - Always visible */}
        <span className="relative z-10 flex items-center justify-center transition-all duration-300 shrink-0">
          {icon}
        </span>

        {/* Text - Hidden by default, shows on hover */}
        <span className="relative z-10 whitespace-nowrap flex items-center justify-center overflow-hidden max-w-0 opacity-0 group-hover:opacity-100 group-hover:max-w-[200px] transition-all duration-500 ease-in-out">
          <span className="ml-2">{label}</span>
        </span>

        {hasHighlight && !disabled && (
          <div className="absolute top-1/2 left-[-100%] w-16 h-24 bg-white/50 -translate-y-1/2 rotate-12 transition-all duration-500 ease-in-out group-hover:left-[200%]"></div>
        )}
      </button>
    </div>
  );
}

