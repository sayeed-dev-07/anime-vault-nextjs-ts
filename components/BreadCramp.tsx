"use client";

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

export function BreadcrumbSync() {
  const pathname = usePathname();

  // Split into usable route parts
  const segments = pathname.split("/").filter(Boolean);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {/* Home always first */}
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link className="flex items-center text-lg justify-center gap-0.5" href="/"><Home size={16}/> Home</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>

        {segments.map((segment, index) => {
          const href = `/${segments.slice(0, index + 1).join("/")}`;
          const isLast = index === segments.length - 1;

          return (
            <div key={href} className="flex items-center gap-1 text-lg">
              <BreadcrumbSeparator/>

              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage className="capitalize">
                    {segment.replace(/-/g, " ")}
                  </BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link href={href} className="capitalize">
                      {segment.replace(/-/g, " ")}
                    </Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </div>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
