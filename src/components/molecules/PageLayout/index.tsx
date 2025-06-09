// components/molecules/PageLayout.tsx
import React from 'react'

interface PageLayoutProps {
  children: React.ReactNode
  header?: React.ReactNode
  footer?: React.ReactNode
}

export const PageLayout: React.FC<PageLayoutProps> = ({
  children,
  header,
  footer,
}) => {
  return (
    <div className="min-h-screen flex flex-col">
      {header && <header className="p-4 border-b">{header}</header>}

      <main className="flex-grow p-4 max-w-xl w-full mx-auto space-y-6">
        {children}
      </main>

      {footer && <footer className="p-4 border-t">{footer}</footer>}
    </div>
  )
}
