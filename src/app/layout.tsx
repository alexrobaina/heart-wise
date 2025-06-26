interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  // Perform any global setup or checks here
  return (
    <html>
      <body>{children}</body>
    </html>
  )
}
