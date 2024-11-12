export default function HeroBackgroundSVG() {
  return (
    <svg
      className="absolute inset-0 w-full h-full"
      viewBox="0 0 1000 500"
      preserveAspectRatio="xMidYMid slice"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="rgba(245, 158, 11, 0.1)" />
          <stop offset="100%" stopColor="rgba(249, 115, 22, 0.1)" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#grad1)" />
      <circle cx="900" cy="50" r="250" fill="rgba(245, 158, 11, 0.05)" />
      <circle cx="950" cy="150" r="200" fill="rgba(249, 115, 22, 0.05)" />
      <circle cx="950" cy="150" r="150" fill="rgba(253, 186, 116, 0.05)" />
      <path
        d="M0 400 C 150 360, 300 440, 500 400 C 700 360, 850 440, 1000 400 L1000 500 L0 500 Z"
        fill="#fff"
      />
    </svg>
  );
}
