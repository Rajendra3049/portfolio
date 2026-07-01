import Link from "next/link";
import { SectionShell } from "@/shared/ui/section-shell";

export default function NotFound() {
  return (
    <SectionShell className="flex min-h-[60vh] flex-col items-center justify-center border-t-0 bg-zinc-950 pt-16 text-center sm:pt-20">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-zinc-500">404</p>
      <h1 className="mt-4 text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl">
        This page doesn&apos;t exist.
      </h1>
      <p className="mt-4 max-w-md text-sm leading-7 text-zinc-400 sm:text-base">
        The work you&apos;re looking for might be on the homepage — or the URL may have moved.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center justify-center rounded-full bg-emerald-500 px-6 py-2.5 text-sm font-semibold text-zinc-950 transition hover:bg-emerald-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400"
      >
        Back home
      </Link>
    </SectionShell>
  );
}
