import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface PageSectionProps {
  children: ReactNode;
  className?: string;
  containerized?: boolean;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  background?: 'default' | 'muted' | 'transparent';
  padding?: 'sm' | 'md' | 'lg' | 'xl';
}

const maxWidthClasses = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-7xl',
  xl: 'max-w-screen-xl',
  '2xl': 'max-w-screen-2xl',
  full: 'max-w-full',
};

const backgroundClasses = {
  default: 'bg-background',
  muted: 'bg-muted/50',
  transparent: 'bg-transparent',
};

const paddingClasses = {
  sm: 'py-8 px-4',
  md: 'py-12 px-4 sm:px-6 lg:px-8',
  lg: 'py-16 px-4 sm:px-6 lg:px-8',
  xl: 'py-20 px-4 sm:px-6 lg:px-8',
};

export function PageSection({
  children,
  className,
  containerized = true,
  maxWidth = 'lg',
  background = 'default',
  padding = 'md',
}: PageSectionProps) {
  return (
    <section
      className={cn(
        backgroundClasses[background],
        paddingClasses[padding],
        className
      )}
    >
      {containerized ? (
        <div className={cn('mx-auto', maxWidthClasses[maxWidth])}>
          {children}
        </div>
      ) : (
        children
      )}
    </section>
  );
}

export default PageSection;
