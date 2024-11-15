import { MetaFunction } from "@remix-run/node";
import { ComingSoon } from "~/components/ComingSoon";

export const meta: MetaFunction = () => {
  return [
    { title: "Pengaturan - EasyTax" },
    {
      name: "description",
      content:
        "Kelola preferensi dan pengaturan akun EasyTax Anda untuk pengalaman yang lebih personal.",
    },
  ];
};

export default function Settings() {
  return (
    <ComingSoon description="Halaman pengaturan sedang dalam pengembangan. Kami sedang bekerja keras untuk memberikan pengalaman terbaik dalam mengelola preferensi dan konfigurasi akun Anda." />
  );
}
