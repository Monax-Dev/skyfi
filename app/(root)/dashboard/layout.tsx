"use client"
import Link from "next/link"
import {
Home,
Settings,
CircleDollarSign,
File,
Building2,
DoorOpen,
CircleUserRound
} from "lucide-react"
import {
Tooltip,
TooltipContent,
TooltipTrigger,
TooltipProvider
} from "@/components/ui/tooltip"
import { ReactNode } from "react";
import { useRouter } from "next/navigation";
import { toast, Toaster } from "react-hot-toast";
interface DashboardLayoutProps {
    children: ReactNode;
}

export default function DashboardLayout({
    children
}: DashboardLayoutProps) {
    const router = useRouter();
    const handleLogout = async () => {
        try {
            const response = await fetch("/api/auth/logout", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                
            });
        
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error);
            }
            router.push("/");
          } catch (error: any) {
              toast.error(error.message || "An error occurred while logging in");
              console.error("Login error:", error);
          }finally{
            router.push("/");
        }
    }
return (
    <div className="flex min-h-screen w-full bg-muted/40 ">
        <Toaster />
    <aside className=" w-14 flex-col border-r bg-background flex fixed h-screen">
        <TooltipProvider>
        <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
        <Link
            href="/racine"
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
            <TooltipTrigger >
            <div
                onClick={handleLogout}
                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
            >
                <DoorOpen className="h-5 w-5 text-red-500 hover:text-red-600" />
                <span className="sr-only">Déconnexion</span>
            </div>
            </TooltipTrigger>
            <TooltipContent side="right" className=" text-red-500 hover:text-red-600 bg-red-100">Déconnexion</TooltipContent>
        </Tooltip>
        <Tooltip>
            <TooltipTrigger asChild>
            <Link
                href="/dashboard/profil"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
            >
                <CircleUserRound className="h-5 w-5" />
                <span className="sr-only">Profil</span>
            </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Profil</TooltipContent>
        </Tooltip>
        </nav>
        </TooltipProvider>
    </aside>
    <div className=" flex flex-col sm:gap-4 sm:py-4  w-screen pl-12">
        <main className="flex flex-col flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 ">
        {children}
        </main>
    </div>
    </div>
)
}
