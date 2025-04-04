"use client";

import React from "react";
import { useEffect } from "react";
import { initAOS } from "@/utils/aos";

const Provider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  useEffect(() => {
    initAOS();
  }, []);
  return children;
};

export default Provider;
