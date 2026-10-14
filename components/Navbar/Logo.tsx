import Image from "next/image";
import Link from "next/link";
import logo from "@/public/assets/Layout/Navbar/logop.webp";

interface LogoProps {
  small?: boolean;
}

export default function Logo({ small = false }: LogoProps) {
  const size = small ? 80 : 180;
  return (
    <div
      className={`flex items-center ${small && "gap-2 relative -bottom-5"} ${!small && "absolute left-1/2 -translate-x-1/2 z-30"}`}
    >
      <Link href="/" aria-label="Monopolombiano - Inicio">
        <Image
          src={logo}
          alt="Logo Monopolombiano"
          width={size}
          height={size}
          sizes={`${size}px`}
          className="rounded-lg"
          loading="eager"
        />
      </Link>
    </div>
  );
}
