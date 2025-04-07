export function CircularProgress({ progress, size = 60, strokeWidth = 4, className = "" }) {
    const radius = (size - strokeWidth) / 2.2
    const circumference = radius * 2 * Math.PI
    const offset = circumference - (progress / 100) * circumference
  
    return (
      <div className={`relative inline-flex items-center justify-center ${className}`}>
        <svg width={size} height={size} className="transform -rotate-90">
          <circle
            className="text-primary/20"
            strokeWidth={strokeWidth}
            stroke="currentColor"
            fill="transparent"
            r={radius}
            cx={size / 2}
            cy={size / 2}
          />
          <circle
            className="text-primary transition-all duration-300 ease-in-out"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            stroke="currentColor"
            fill="transparent"
            r={radius}
            cx={size / 2}
            cy={size / 2}
          />
        </svg>
        <span className="absolute text-sm font-medium">{Math.round(progress)}%</span>
      </div>
    )
  }
  
  