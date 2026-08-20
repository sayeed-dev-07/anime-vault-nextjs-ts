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
    <Breadcrumb className="mb-4 sm:mb-6">
      <BreadcrumbList className="text-sm font-medium sm:text-base">
        
        {/* Home link */}
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link 
              href="/" 
              className="flex items-center gap-1.5 hover:text-[crimson] transition-colors duration-200"
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
              <BreadcrumbSeparator />

              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage 
                    // Truncates extra-long anime/manga titles on smaller screens
                    className="truncate max-w-[150px] sm:max-w-[300px] md:max-w-[400px] lg:max-w-[600px] text-foreground font-semibold"
                    title={label}
                  >
                    {label}
                  </BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link 
                      href={href} 
                      className="hover:text-[crimson] transition-colors duration-200"
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