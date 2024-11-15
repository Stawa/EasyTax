interface FooterProps {
  version: string | null;
}

export default function Footer({ version }: FooterProps) {
  return (
    <footer className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center">
          <p className="text-center text-white text-sm">
            © {new Date().getFullYear()} EasyTax. Platform ini dibuat untuk
            tujuan edukasi.
          </p>
          {version && (
            <p className="text-center text-white text-xs mt-1">v{version}</p>
          )}
        </div>
      </div>
    </footer>
  );
}
