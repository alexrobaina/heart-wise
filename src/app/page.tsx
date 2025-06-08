'use client';
import { Button } from "@/components/atoms/Button";
import { signIn } from "next-auth/react"; 
import { FcGoogle } from "react-icons/fc";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const { status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/dashboard");
    }
  }, [status, router]);

  if (status === "loading") {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (status === "authenticated") {
    return null;
  }

  const handleLogin = () => {
    signIn("google");
  };
  return (
    <main className="min-h-screen p-8 bg-gray-50 flex flex-col items-center justify-center">
hola mundo
    <Button
      variant="secondary"
      onClick={handleLogin}
      IconLeft={<FcGoogle size={20} />}
    >
      Iniciar sesión con Google
    </Button>
    </main>
  );
}
