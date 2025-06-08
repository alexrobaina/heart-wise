// components/utils/VisibilityWrapper/index.tsx
import {FC} from 'react';

interface VisibilityWrapperProps {
  visible: boolean;
  children: React.ReactNode;
}

export const VisibilityWrapper: FC<VisibilityWrapperProps> = ({ visible, children }) => {
  return visible ? <>{children}</> : null;
};

