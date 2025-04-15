import { LanguageProvider } from './context/LanguageContext';

export const metadata = {
  title: 'Nacho Elzo',
  description: 'Portfolio Nacho Elzo',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
