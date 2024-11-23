import FooterGame from "@/components/footerGame";

export default function GameLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      {children}
      <FooterGame />
    </div>
  );
}
