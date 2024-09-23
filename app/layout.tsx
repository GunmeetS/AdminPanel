import '@/styles/globals.css';

export const metdata={
    title : "AdminPanel",
    description : "Manage Website Data"
}



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='eng'>
        <body>
          {children}
          </body>
    </html>
  )
}
