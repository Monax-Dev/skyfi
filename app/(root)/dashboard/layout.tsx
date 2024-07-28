import Link from "next/link"
import {
Home,
Settings,
CircleDollarSign,
File
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
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
        <TooltipProvider>
    <aside className="fixed inset-y-0 left-0 z-10  w-14 flex-col border-r bg-background flex">
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
            <TooltipContent side="right">Files</TooltipContent>
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
    </aside>
        </TooltipProvider>
    <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
        {children}
        </main>
    </div>
    </div>
)
}
