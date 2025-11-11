'use client';

import { ReactNode } from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface EmptyProps {
  /**
   * Icon to display
   */
  icon?: LucideIcon;
  /**
   * Title text
   */
  title: string;
  /**
   * Description text
   */
  description?: string;
  /**
   * Action button
   */
  action?: {
    label: string;
    onClick: () => void;
  };
  /**
   * Custom content to render instead of default layout
   */
  children?: ReactNode;
  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * Empty state component for displaying when there's no content
 */
export function Empty({
  icon: Icon,
  title,
  description,
  action,
  children,
  className,
}: EmptyProps) {
  if (children) {
    return (
      <div
        className={cn(
          'flex flex-col items-center justify-center p-8',
          className
        )}
      >
        {children}
      </div>
    );
  }

  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center p-8 text-center',
        className
      )}
    >
      {Icon && (
        <div className="bg-muted mb-4 rounded-full p-4">
          <Icon className="text-muted-foreground h-8 w-8" />
        </div>
      )}

      <h3 className="mb-2 text-lg font-semibold">{title}</h3>

      {description && (
        <p className="text-muted-foreground mb-4 max-w-md text-sm">
          {description}
        </p>
      )}

      {action && (
        <Button onClick={action.onClick} variant="outline">
          {action.label}
        </Button>
      )}
    </div>
  );
}
