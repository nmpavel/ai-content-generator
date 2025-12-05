import { Sidebar } from "@/components/layout/Sidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-10 bg-[#f5f7fb] min-h-screen">{children}</div>
    </div>
  );
}
