import { CircleUser } from 'lucide-react';
import Link from "next/dist/client/link";
import Image from 'next/image'


export default function Header() {
  return (
    <header className="flex justify-between items-center border-b border-foreground/10 sticky top-0 backdrop-blur-md backdrop-grayscale z-2">
      <div className="flex self-stretch items-center px-2 border-r py-1">
        <Image
          className="invert dark:invert-0 h-10 w-10"
          src="/logo.png"
          alt="Logo"
          width={500}
          height={500}
        />
      </div>
      <div className="self-stretch items-center flex">
        <nav className="flex items-center self-stretch">
          <div className="self-stretch bg-foreground/10 w-0.1"></div>
          <Link className="self-stretch items-center flex px-3 hover:bg-foreground hover:text-background duration-100 text-xs" href="/">Home</Link>
          <div className="self-stretch bg-foreground/10 w-0.1"></div>
          <Link className="self-stretch items-center flex px-3 hover:bg-foreground hover:text-background duration-100 text-xs" href="/about">About</Link>
          <div className="self-stretch bg-foreground/10 w-0.1"></div>
          <Link className="self-stretch items-center flex px-3 hover:bg-foreground hover:text-background duration-100 text-xs" href="/contact">Contact</Link>
        </nav>
        <div className="flex items-center self-stretch">
          <div className="self-stretch bg-foreground/10 w-0.1"></div>
            <Link className="self-stretch items-center flex px-3 hover:bg-foreground hover:text-background duration-100 text-xs" href="/contact">
              <CircleUser size={16} />
            </Link>
          </div>
      </div>
    </header>
  );
}