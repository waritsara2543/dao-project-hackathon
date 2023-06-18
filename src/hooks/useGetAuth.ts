import { auth, db } from "@/utils/polybaseClient";
import React, { useEffect, useMemo } from "react";

export const useGetAuth = () => {
  const [authState, setAuthState] = React.useState<any>(null);

  useEffect(() => {
    auth?.onAuthUpdate((authState) => {
      if (authState) {
        // User is logged in, show button to dashboard
        setAuthState(authState);
        db.signer(async (data: string) => {
          return {
            h: "eth-personal-sign",
            sig: await auth!.ethPersonalSign(data),
          };
        });
      } else {
        // User is NOT logged in, show login button
      }
    });
  }, []);

  const authPoly = useMemo(() => {
    return authState;
  }, [authState]);

  return { authPoly };
};
