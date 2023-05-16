import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";

import { api } from "~/lib/api";
import { fontSans } from "~/lib/fonts";
import { cn } from "~/lib/utils";

import "~/styles/globals.css";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <div
        className={cn(
          "flex h-screen min-h-screen flex-col bg-background font-sans antialiased dark:text-white",
          fontSans.variable
        )}
      >
        <Component {...pageProps} />
      </div>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
