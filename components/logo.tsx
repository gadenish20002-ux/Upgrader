export function Logo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className} aria-hidden="true">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M29.1748 18.6166L16.0005 8.97244L2.82617 18.6166V9.64412L16.0005 0L29.1748 9.64412V18.6166Z"
        fill="url(#upgrader-logo-gradient)"
      />
      <path d="M26.6663 22.2646V29.3334L15.9997 21.7354L5.33301 29.3334V22.2646L15.9997 14.6667L26.6663 22.2646Z" fill="#826E01" />
      <defs>
        <linearGradient id="upgrader-logo-gradient" x1="3.08966" y1="0.831097" x2="30.266" y2="2.69351" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FBD506" />
          <stop offset="0.5" stopColor="#FFDD23" />
          <stop offset="1" stopColor="#FBD506" />
        </linearGradient>
      </defs>
    </svg>
  )
}
