import { cn } from "~/lib/utils";

export default function Loader({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={cn("h-12 w-12 text-gray-500", className)}
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle fill="currentColor" cx="12" cy="12" r="0">
        <animate
          attributeName="r"
          calcMode="spline"
          dur="1.2s"
          values="0;11"
          keySplines=".52,.6,.25,.99"
          repeatCount="indefinite"
        />
        <animate
          attributeName="opacity"
          calcMode="spline"
          dur="1.2s"
          values="1;0"
          keySplines=".52,.6,.25,.99"
          repeatCount="indefinite"
        />
      </circle>
    </svg>
  );
}
