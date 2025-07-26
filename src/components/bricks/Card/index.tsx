import { clsx } from "clsx";
import { forwardRef, type HTMLAttributes } from "react";

import {
  Card as ShadcnCard,
  CardContent as ShadcnCardContent,
  CardDescription as ShadcnCardDescription,
  CardFooter as ShadcnCardFooter,
  CardHeader as ShadcnCardHeader,
  CardTitle as ShadcnCardTitle,
} from "@/components/bricks/shadcn/ui/card";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "elevated" | "outlined";
}

const cardVariants: Record<NonNullable<CardProps["variant"]>, string> = {
  default: "border shadow-sm",
  elevated: "border shadow-lg",
  outlined: "border-2 shadow-none",
};

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = "default", ...props }, ref) => (
    <ShadcnCard
      ref={ref}
      className={clsx(cardVariants[variant], className)}
      {...props}
    />
  ),
);
Card.displayName = "Card";

const CardHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <ShadcnCardHeader
      ref={ref}
      className={clsx("pb-3", className)}
      {...props}
    />
  ),
);
CardHeader.displayName = "CardHeader";

const CardContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <ShadcnCardContent
      ref={ref}
      className={clsx("pt-0", className)}
      {...props}
    />
  ),
);
CardContent.displayName = "CardContent";

const CardFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <ShadcnCardFooter
      ref={ref}
      className={clsx("pt-3 pb-3", className)}
      {...props}
    />
  ),
);
CardFooter.displayName = "CardFooter";

const CardTitle = forwardRef<
  HTMLHeadingElement,
  HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <ShadcnCardTitle
    ref={ref}
    className={clsx(
      "text-lg font-semibold leading-none tracking-tight",
      className,
    )}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

const CardDescription = forwardRef<
  HTMLParagraphElement,
  HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <ShadcnCardDescription
    ref={ref}
    className={clsx("text-sm text-gray-600", className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

// Create compound component with proper typing
interface CardComponent
  extends React.ForwardRefExoticComponent<
    CardProps & React.RefAttributes<HTMLDivElement>
  > {
  Header: typeof CardHeader;
  Content: typeof CardContent;
  Footer: typeof CardFooter;
  Title: typeof CardTitle;
  Description: typeof CardDescription;
}

const CardWithCompound = Card as CardComponent;
CardWithCompound.Header = CardHeader;
CardWithCompound.Content = CardContent;
CardWithCompound.Footer = CardFooter;
CardWithCompound.Title = CardTitle;
CardWithCompound.Description = CardDescription;

export {
  CardWithCompound as Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
};
