import { CircleUser } from 'lucide-react';
import Link from "next/link";
import Image from 'next/image'
import AvatarHeader from '../secondary/buttons/AvatarHeader';
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { Button } from '@/components/ui/button';

export default async function Header() {

  const session = await auth.api.getSession({
      headers: await headers()
  })

  return (
    <header className="flex-none flex justify-between items-center border-b border-foreground/10 sticky top-0 backdrop-blur-md backdrop-grayscale z-10">
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
          <Link className="self-stretch items-center flex px-3 hover:bg-foreground hover:text-background duration-100 text-xs" href="/">Accueil</Link>
          <div className="self-stretch bg-foreground/10 w-0.1"></div>
          <Link className="self-stretch items-center flex px-3 hover:bg-foreground hover:text-background duration-100 text-xs" href="/quotes">Citations</Link>
          <div className="self-stretch bg-foreground/10 w-0.1"></div>
          <Link className="self-stretch items-center flex px-3 hover:bg-foreground hover:text-background duration-100 text-xs" href="/community">Communauté</Link>
          <div className="self-stretch bg-foreground/10 w-0.1"></div>
          <Link className="self-stretch items-center flex px-3 hover:bg-foreground hover:text-background duration-100 text-xs" href="/news">Nouveautées</Link>
        </nav>
        <div className="flex items-center self-stretch">
          {/* <AvatarHeader /> */}
          <div className="self-stretch bg-foreground/10 w-0.1"></div>
          <Link href="/account" className="px-2">
            <AvatarHeader img={session?.user?.image} />
          </Link>
            {/* <Link className="self-stretch items-center flex px-3 hover:bg-foreground hover:text-background duration-100 text-xs" href="/account">
              <CircleUser size={16} />
            </Link> */}
          </div>
      </div>
    </header>
  );
}