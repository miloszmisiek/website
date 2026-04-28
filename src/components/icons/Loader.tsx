import { cn } from "../../styles/cn";

type IconProps = {
  className?: string;
};

export function Loader({ className }: IconProps) {
  return (
    <span
      aria-hidden="true"
      className={cn("inline-block aspect-square bg-current", className)}
      style={{ animation: "organicBlob 2s infinite linear" }}
    />
  );
}
