import type { MetaFunction } from "@remix-run/node";
import { ComingSoon } from "~/components/ComingSoon";

export const meta: MetaFunction = () => {
  return [
    { title: "Dokumen Pajak EasyTax - Kelola Dokumen Pajak Anda" },
    {
      name: "description",
      content:
        "Kelola dan simpan dokumen perpajakan Anda dengan aman menggunakan EasyTax.",
    },
  ];
};

export default function Documents() {
  return (
    <ComingSoon description="Kami sedang mempersiapkan layanan Dokumen Pajak untuk membantu Anda mengelola dokumen perpajakan dengan lebih terorganisir. Nantikan kehadirannya!" />
  );
}
