import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
  <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#DBA349] to-[#501685]">
    <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
      <SignIn />
    </div>
  </main>
  );
}