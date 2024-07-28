"use"
import Link from "next/link"
import {
Home,
Settings,
CircleDollarSign,
File,
Building2
} from "lucide-react"
import {
Tooltip,
TooltipContent,
TooltipTrigger,
TooltipProvider
} from "@/components/ui/tooltip"
import { ReactNode } from "react";

interface DashboardLayoutProps {
    children: ReactNode;
}

export default function DashboardLayout({
    children
}: DashboardLayoutProps) {
return (
    <div className="flex min-h-screen w-full bg-muted/40 fixed">
    <aside className=" w-14 flex-col border-r bg-background flex">
        <TooltipProvider>
        <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
        <Link
            href="#"
            className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
        >
            <CircleDollarSign className="h-4 w-4 transition-all group-hover:scale-110" />
            <span className="sr-only">SkyFi</span>
        </Link>
        <Tooltip>
            <TooltipTrigger asChild>
            <Link
                href="/dashboard"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
            >
                <Home className="h-5 w-5" />
                <span className="sr-only">Dashboard</span>
            </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Dashboard</TooltipContent>
        </Tooltip>
        <Tooltip>
            <TooltipTrigger asChild>
            <Link
                href="/dashboard/facture"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
            >
                <File className="h-5 w-5" />
                <span className="sr-only">Factures</span>
            </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Factures</TooltipContent>
        </Tooltip>
        <Tooltip>
            <TooltipTrigger asChild>
            <Link
                href="/dashboard/compagnie"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
            >
                <Building2 className="h-5 w-5" />
                <span className="sr-only">Compagnie</span>
            </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Compagnie</TooltipContent>
        </Tooltip>
        </nav>
        <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
        <Tooltip>
            <TooltipTrigger asChild>
            <Link
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
            >
                <Settings className="h-5 w-5" />
                <span className="sr-only">Settings</span>
            </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Settings</TooltipContent>
        </Tooltip>
        </nav>
        </TooltipProvider>
    </aside>
    <div className=" flex flex-col sm:gap-4 sm:py-4  w-screen">
        <main className="flex flex-col flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 ">
        {children}
        </main>
    </div>
    </div>
)
}
