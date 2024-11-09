import type { MetaFunction } from "@remix-run/node";
import { ComingSoon } from "~/components/ComingSoon";

export const meta: MetaFunction = () => {
  return [
    { title: "Kalender Pajak EasyTax - Kelola Jadwal Pajak Anda" },
    {
      name: "description",
      content:
        "Kelola dan pantau jadwal pajak Anda dengan mudah menggunakan Kalender Pajak EasyTax.",
    },
  ];
};

export default function DueDate() {
  return (
    <ComingSoon description="Kami sedang mempersiapkan layanan Tanggal Jatuh Tempo untuk membantu Anda mengelola jadwal perpajakan dengan lebih efisien. Nantikan kehadirannya!" />
  );
}
