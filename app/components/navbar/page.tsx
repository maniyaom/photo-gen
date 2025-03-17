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
import { useState } from 'react';
import { Menu, X, Github, Image } from 'lucide-react';
import { ImageIcon, MenuIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white/10 backdrop-blur-lg border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Image className="w-8 h-8 text-yellow-300" />
            <span className="ml-2 text-xl font-bold text-white">PhotoMagic AI</span>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href={"/generate"} className="text-gray-300 hover:text-white transition-colors">Generate</Link>
            <Link href={"/gallery"} className="text-gray-300 hover:text-white transition-colors">Gallery</Link>
            <a href="#" className="text-gray-300 hover:text-white transition-colors">Gallery</a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors">Styles</a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors">Pricing</a>
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
            >
              <Github className="w-5 h-5" />
              GitHub
            </a>
            <SignedOut>
              <SignInButton mode="modal">
                <Button className="cursor-pointer">Sign In</Button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-300 hover:text-white focus:outline-none"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white/5 backdrop-blur-lg">
            <a href="#" className="block px-3 py-2 text-gray-300 hover:text-white transition-colors">Gallery</a>
            <a href="#" className="block px-3 py-2 text-gray-300 hover:text-white transition-colors">Styles</a>
            <a href="#" className="block px-3 py-2 text-gray-300 hover:text-white transition-colors">Pricing</a>
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center gap-2 px-3 py-2 text-gray-300 hover:text-white transition-colors"
            >
              <Github className="w-5 h-5" />
              GitHub
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}