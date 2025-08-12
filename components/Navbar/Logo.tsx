import Image from "next/image";
import Link from "next/link";

interface LogoProps {
  small?: boolean;
}

export default function Logo({ small = false }: LogoProps) {
  return (
    <div className={`flex items-center ${small && "gap-2 relative -bottom-5"}`}>
      <Link href="/">
        <Image
          src="/assets/Layout/Navbar/logo.jpeg"
          alt="Logo"
          width={small ? 80 : 180}
          height={small ? 80 : 180}
          className="rounded-lg"
        />
      </Link>
    </div>
  );
}
