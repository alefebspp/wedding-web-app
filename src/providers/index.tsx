"use client";
import React, { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { CartContextProvider } from "~/contexts/cartContext";

const Providers = ({ children }: { children: ReactNode }) => {
  const [queryClient] = React.useState(() => new QueryClient());

  return (
    <CartContextProvider>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </CartContextProvider>
  );
};

export default Providers;
