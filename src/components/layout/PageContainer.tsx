
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface PageContainerProps {
  children: ReactNode;
  className?: string;
  fullHeight?: boolean;
  backgroundIntensity?: 'low' | 'medium' | 'high';
}

const PageContainer = ({ 
  children, 
  className = '', 
  fullHeight = true,
  backgroundIntensity = 'medium'
}: PageContainerProps) => {
  const intensityClasses = {
    low: 'from-mindnest-bg-start/70 via-mindnest-bg-mid/70 to-mindnest-bg-end/70',
    medium: 'from-mindnest-bg-start via-mindnest-bg-mid to-mindnest-bg-end',
    high: 'from-mindnest-bg-start/120 via-mindnest-bg-mid/120 to-mindnest-bg-end/120'
  };

  return (
    <div 
      className={cn(
        "bg-gradient-to-b px-6 py-8 pb-20 transition-all duration-700",
        intensityClasses[backgroundIntensity],
        fullHeight ? 'min-h-screen' : '',
        className
      )}
    >
      {children}
    </div>
  );
};

export default PageContainer;
