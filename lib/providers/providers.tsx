import TRPCProvider from "../trpc/client";
import UserProvider from "./user-provider";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <TRPCProvider>
      <UserProvider>{children}</UserProvider>
    </TRPCProvider>
  );
}
