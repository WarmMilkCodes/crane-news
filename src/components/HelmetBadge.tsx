// components/HelmetBadge.tsx
import Helmet, { HelmetProps } from "./Helmet";

type Props = HelmetProps & {
  label?: string; // small label under the helmet
  size?: number;  // px width
};

export default function HelmetBadge({
  size = 36,
  label,
  ...rest
}: Props) {
  return (
    <div className="flex flex-col items-center gap-1">
      <Helmet width={size} {...rest} />
      {label && (
        <span className="text-[10px] uppercase tracking-wide text-gray-500">{label}</span>
      )}
    </div>
  );
}
