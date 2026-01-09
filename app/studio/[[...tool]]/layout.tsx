export const metadata = {
  title: 'Sanity Studio | AI Analytics Blog',
  description: 'Content management for AI Analytics Blog',
}

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  )
}

