import type { LucideIcon } from "lucide-react";

import { cn } from "@/components/bricks/shadcn/lib/utils";

const sizeMap: Record<IconSizeVariant, number> = {
  xs: 12,
  sm: 16,
  md: 20,
  lg: 24,
  xl: 32,
};

const colorMap: Record<IconColorVariant, string> = {
  grey: "text-neutral-600",
  white: "text-white",
  red: "text-red-600",
  blue: "text-blue-600",
  green: "text-green-600",
  orange: "text-orange-500",
  "grey-500": "text-neutral-500",
};

// CSS variable mapping for fill colors
const fillColorClassMap: Record<IconColorVariant, string> = {
  grey: "fill-neutral-600",
  white: "fill-neutral-600",
  red: "fill-red-600",
  blue: "fill-blue-600",
  green: "fill-green-600",
  orange: "fill-orange-500",
  "grey-500": "fill-neutral-500",
};

const wrapperSizeMap: Record<IconSizeVariant, string> = {
  xs: "w-5 h-5",
  sm: "w-8 h-8",
  md: "w-10 h-10",
  lg: "w-12 h-12",
  xl: "w-16 h-16",
};

const wrapperVariantMap: Record<IconWrapperVariant, string> = {
  circle: "rounded-full",
  "rounded-md": "rounded-md",
  "rounded-sm": "rounded-sm",
  none: "",
};

const wrapperColorMap: Record<IconColorVariant, string> = {
  grey: "bg-neutral-100",
  white: "bg-white border border-neutral-200",
  red: "bg-red-50",
  blue: "bg-blue-50",
  green: "bg-green-50",
  orange: "bg-orange-50",
  "grey-500": "bg-neutral-50",
};

export type IconSizeVariant = "xs" | "sm" | "md" | "lg" | "xl";
export type IconColorVariant =
  | "grey"
  | "white"
  | "red"
  | "blue"
  | "green"
  | "orange"
  | "grey-500";
export type IconType = "default" | "solid";
export type IconWrapperVariant =
  | "circle"
  | "rounded-md"
  | "rounded-sm"
  | "none";

export interface IconProps {
  icon: LucideIcon;
  size?: IconSizeVariant;
  color?: IconColorVariant;
  type?: IconType;
  className?: string;
  strokeWidth?: number;
  wrapper?: IconWrapperVariant;
  onClick?: React.MouseEventHandler<HTMLDivElement | SVGSVGElement>;
}

export const Icon = ({
  icon: IconComponent,
  size = "md",
  color = "grey",
  type = "default",
  className,
  strokeWidth = 2,
  wrapper = "none",
  onClick,
}: IconProps) => {
  const iconClasses = cn(
    type === "default" ? colorMap[color] : "text-white",
    type === "solid" && fillColorClassMap[color],
    onClick && "cursor-pointer",
    className,
  );

  const iconElement = (
    <IconComponent
      size={sizeMap[size]}
      className={iconClasses}
      fill={type === "solid" ? "currentColor" : "none"}
      strokeWidth={strokeWidth}
      aria-hidden="true"
      onClick={wrapper === "none" ? onClick : undefined}
    />
  );

  // If no wrapper is needed, return just the icon
  if (wrapper === "none") {
    return iconElement;
  }

  // Return the icon with a wrapper
  return (
    <div
      className={cn(
        "flex items-center justify-center",
        wrapperSizeMap[size],
        wrapperVariantMap[wrapper],
        wrapperColorMap[color],
        onClick && "cursor-pointer",
      )}
      onClick={onClick}
    >
      {iconElement}
    </div>
  );
};
