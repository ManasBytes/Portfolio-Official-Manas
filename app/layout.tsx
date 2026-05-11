import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Manas Ranjan Sahoo | Full Stack Developer",
  description: "Portfolio of Manas Ranjan Sahoo - Full Stack Developer, IIT Madras",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased" suppressHydrationWarning>
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: "#111827",
              border: "1px solid #1f2937",
              color: "#e5e7eb",
            },
          }}
        />
      </body>
    </html>
  );
}
