import { useEffect } from "react";
import { useRouter } from "next/navigation";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const router = useRouter();
  const token = typeof window !== "undefined" ? document.cookie : null;
  useEffect(() => {
    if (!token) {
      router.push("/login");
    }
  }, [token, router]);
  return token ? <>{children}</> : null;
};

export default ProtectedRoute;
