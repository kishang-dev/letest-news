import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";

export default function withAdminAuth(Page: any) {
  return function ProtectedPage(props: any) {
    const router = useRouter();
    const [checking, setChecking] = useState(true);

    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        const token = localStorage.getItem("adminToken");

        if (!user || !token) {
          router.replace("/admin/login");
        } else {
          setChecking(false);
        }
      });

      return () => unsubscribe();
    }, []);

    if (checking) {
      return (
        <div className="h-screen flex items-center justify-center text-xl">
          Checking authentication…
        </div>
      );
    }

    return <Page {...props} />;
  };
}
