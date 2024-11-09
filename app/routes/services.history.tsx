import type { MetaFunction } from "@remix-run/node";
import { ComingSoon } from "~/components/ComingSoon";

export const meta: MetaFunction = () => {
  return [
    { title: "Riwayat Pajak EasyTax - Lihat Riwayat Pajak Anda" },
    {
      name: "description",
      content:
        "Lihat dan kelola riwayat perpajakan Anda dengan mudah menggunakan EasyTax.",
    },
  ];
};

export default function History() {
  return (
    <ComingSoon description="Kami sedang mempersiapkan layanan Riwayat Pajak untuk membantu Anda melacak dan mengelola riwayat perpajakan dengan lebih efektif. Nantikan kehadirannya!" />
  );
}
