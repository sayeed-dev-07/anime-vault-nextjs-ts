"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Home } from "lucide-react";
import FormatSegment from "./Format";

export function BreadcrumbSync() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  return (
    <Breadcrumb className="mb-5 sm:mb-7 overflow-x-auto no-scrollbar pb-2">
      <BreadcrumbList className="w-max min-w-full text-xs font-extrabold sm:text-sm">

        {/* Home link */}
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link
              href="/"
              className="flex items-center gap-1.5 border-2 border-foreground dark:text-background bg-[#f9c846] px-2.5 py-1.5  shadow-[2px_2px_0_var(--foreground)] hover:translate-x-px hover:translate-y-px hover:shadow-none transition-all"
            >
              <Home size={16} className="mb-0.5" />
              <span>Home</span>
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>

        {/* Dynamic URL segments */}
        {segments.map((segment, index) => {
          const href = `/${segments.slice(0, index + 1).join("/")}`;
          const isLast = index === segments.length - 1;
          const label = FormatSegment(segment);

          return (
            // Using React.Fragment prevents breaking the BreadcrumbList flex layout
            <React.Fragment key={href}>
              <BreadcrumbSeparator className="text-[#e6392d] [&>svg]:size-4" />

              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage
                    // Truncates extra-long anime/manga titles on smaller screens
                    className="truncate max-w-[150px] sm:max-w-[300px] md:max-w-[400px] lg:max-w-[600px] border-2 border-foreground bg-card px-2.5 py-1.5 text-foreground font-extrabold shadow-[2px_2px_0_var(--foreground)]"
                    title={label}
                  >
                    {label}
                  </BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link
                      href={href}
                      className="border-2 border-foreground bg-secondary px-2.5 py-1.5 text-foreground font-extrabold shadow-[2px_2px_0_var(--foreground)] hover:translate-x-px hover:translate-y-px hover:shadow-none transition-all"
                    >
                      {label}
                    </Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </React.Fragment>
          );
        })}

      </BreadcrumbList>
    </Breadcrumb>
  );
}
