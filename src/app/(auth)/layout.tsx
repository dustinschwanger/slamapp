import Image from "next/image";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-bg-primary">
      <div className="mb-8 flex flex-col items-center">
        <Image
          src="/images/logo.png"
          alt="Senior Living Alliance Ministry"
          width={280}
          height={75}
          className="max-w-[280px] h-auto"
          priority
        />
        <p className="mt-3 text-text-secondary text-sm">
          Senior Living Alliance Ministry
        </p>
      </div>
      {children}
    </div>
  );
}
