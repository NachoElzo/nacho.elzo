export const metadata = {
  title: 'José Ignacio Elzo - Contractor',
  description: 'Portfolio profesional de José Ignacio Elzo, especializado en soluciones informáticas y automatización.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
