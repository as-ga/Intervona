export function BrandMark({
  size = 22,
  className,
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 140 140"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <defs>
        <linearGradient id="intervona-mark" x1="20" y1="10" x2="126" y2="132">
          <stop stopColor="#7657FF" />
          <stop offset="1" stopColor="#E85E88" />
        </linearGradient>
      </defs>
      <rect x="6" y="6" width="128" height="128" rx="42" fill="url(#intervona-mark)" />
      <rect
        x="6.75"
        y="6.75"
        width="126.5"
        height="126.5"
        rx="41.25"
        fill="none"
        stroke="rgba(255,255,255,0.34)"
        strokeWidth="1.5"
      />
      <path d="M70 55V98" stroke="white" strokeWidth="12" strokeLinecap="round" />
      <circle cx="70" cy="35" r="7" fill="white" />
      <path d="M48 66C41 73 41 82 48 89M92 66C99 73 99 82 92 89" stroke="white" strokeOpacity=".7" strokeWidth="5" strokeLinecap="round" />
    </svg>
  );
}
