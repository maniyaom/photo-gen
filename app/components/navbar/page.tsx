// "use client";

// import { ImageIcon, MenuIcon } from "lucide-react";
// import Link from "next/link";
// import { Button } from "@/components/ui/button";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import {
//   SignedIn,
//   SignedOut,
//   SignInButton,
//   SignUpButton,
//   UserButton,
// } from "@clerk/nextjs";

// export default function Navbar() {
//   return (
//     <nav className="fixed top-0 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
//       <div className="container flex h-16 items-center justify-between">
//         <Link href="/" className="flex items-center space-x-2">
//           <ImageIcon className="h-6 w-6 ml-4 text-black" />
//           <span className="font-bold text-black">PhotoGen AI</span>
//         </Link>

//         {/* Desktop Navigation */}
//         <div className="hidden md:flex mr-5 md:items-center md:space-x-4 text-black">
//           <Button variant="ghost" asChild>
//             <Link href="/generate">Generate</Link>
//           </Button>
//           <Button variant="ghost" asChild>
//             <Link href="/gallery">Gallery</Link>
//           </Button>
//           <Button variant="ghost" asChild>
//             <Link href="/pricing">Pricing</Link>
//           </Button>
//           <Button>
//             <Link href="/dashboard">Dashboard</Link>
//           </Button>
//           <SignedOut>
//             <SignInButton mode="modal">
//               <Button className="cursor-pointer">Sign In</Button>
//               </SignInButton>
//           </SignedOut>
//           <SignedIn>
//             <UserButton />
//           </SignedIn>
//         </div>

//         {/* Mobile Navigation */}
//         <div className="md:hidden">
//           <DropdownMenu>
//             <DropdownMenuTrigger asChild>
//               <Button variant="ghost" size="icon">
//                 <MenuIcon className="h-5 w-5" />
//                 <span className="sr-only">Toggle menu</span>
//               </Button>
//             </DropdownMenuTrigger>
//             <DropdownMenuContent align="end">
//               <DropdownMenuItem asChild>
//                 <Link href="/generate">Generate</Link>
//               </DropdownMenuItem>
//               <DropdownMenuItem asChild>
//                 <Link href="/gallery">Gallery</Link>
//               </DropdownMenuItem>
//               <DropdownMenuItem asChild>
//                 <Link href="/pricing">Pricing</Link>
//               </DropdownMenuItem>
//               <DropdownMenuItem asChild>
//                 <Link href="/dashboard">Dashboard</Link>
//               </DropdownMenuItem>
//             </DropdownMenuContent>
//           </DropdownMenu>
//         </div>
//       </div>
//     </nav>
//   );
// }

"use client";
import { useState } from "react";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import {
  Moon,
  Sun,
  Sparkles,
  Camera,
  Zap,
  Clock,
  Crown,
  Star,
  Users,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
export default function Navbar() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const pathname = usePathname();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Generate Image", path: "/generate" },
    { name: "Gallery", path: "/gallery" },
    { name: "Features", path: "/#features" },
    { name: "Showcase", path: "/#showcase" },
    { name: "Testimonials", path: "/#testimonials" },
  ];

  return (
    <nav
      className={`fixed w-full p-6 ${
        isDarkMode ? "bg-gray-900/50" : "bg-white/50"
      } backdrop-blur-lg z-50`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Sparkles className="w-6 h-6 text-purple-500" />
          <span className="text-white text-xl font-bold">PhotoAI</span>
        </div>
        <div className="hidden md:flex items-center space-x-8">
        {navLinks.map((link) => (
            <Link
              href={link.path} key={link.path}
              className={`hover:text-purple-500 transition-colors ${
                pathname === link.path ? "text-purple-500" : "text-white"
              }`}
            >
              {link.name}
            </Link>
        ))}
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`p-2 rounded-full cursor-pointer ${
              isDarkMode
                ? "bg-gray-800 text-yellow-500"
                : "bg-gray-100 text-gray-600"
            } hover:scale-110 transition-transform`}
          >
            {isDarkMode ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </button>
          <SignedOut>
            <SignInButton mode="modal">
              <button className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-2 rounded-lg transition-colors cursor-pointer">
                Sign In
              </button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </div>
    </nav>
  );
}
