'use client'
import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="px-3 cursor-pointer py-1.5 bg-black text-xl text-white rounded"
    >
      Back
    </button>
  );
}
