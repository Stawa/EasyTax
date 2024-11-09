import type { MetaFunction } from "@remix-run/node";
import { ComingSoon } from "~/components/ComingSoon";

export const meta: MetaFunction = () => {
  return [
    { title: "Status Pajak EasyTax - Pantau Status Pajak Anda" },
    {
      name: "description",
      content:
        "Pantau dan periksa status perpajakan Anda dengan mudah menggunakan EasyTax.",
    },
  ];
};

export default function Status() {
  return (
    <ComingSoon description="Kami sedang mempersiapkan layanan Status Pajak untuk membantu Anda memantau status perpajakan dengan lebih mudah. Nantikan kehadirannya!" />
  );
}
