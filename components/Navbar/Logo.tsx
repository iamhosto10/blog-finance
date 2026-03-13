import Link from "next/link";

interface LogoProps {
  small?: boolean;
}

export default function Logo({ small = false }: LogoProps) {
  return (
    <div
      className={`flex items-center ${small && "gap-2 relative -bottom-5"} ${!small && "absolute left-1/2 -translate-x-1/2 z-30"}`}
    >
      <Link href="/">
        <img
          src="/assets/Layout/Navbar/logop.png"
          alt="Logo"
          width={small ? 80 : 180}
          height={small ? 80 : 180}
          className="rounded-lg"
          loading="eager"
        />
      </Link>
    </div>
  );
}
