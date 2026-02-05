export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gradient-to-br from-[#F4F7FB] to-[#E8F2F7]">
        {children}
      </body>
    </html>
  );
}