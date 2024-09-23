
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { checkToken } from '@/ProxyUrls';

const useAuth = () => {
  const router = useRouter();

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const token = localStorage.getItem("jwt-token");
        if (!token) {
          router.push("/auth/login");
          return;
        }

        const response = await axios.get(checkToken, {
          headers: {
            Authorization: `${token}`,
          },
        });

        if (!response.data) {
          router.push("/auth/login");
        } else {
          router.push("/admin/dashboard");
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    };

    checkAuthentication();
  }, [router]);
};

export default useAuth;
