"use client";
import React, { ReactNode } from "react";

import { CartContextProvider } from "~/contexts/cartContext";

const Providers = ({ children }: { children: ReactNode }) => {
  return <CartContextProvider>{children}</CartContextProvider>;
};

export default Providers;
