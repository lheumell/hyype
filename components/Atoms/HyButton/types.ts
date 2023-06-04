import { ReactNode } from "react";

export type THyButton = {
  children: ReactNode;
  onClick: any;
  variant?: TVariantButton;
  isDisabled?: boolean;
  withIcon?: boolean;
};

export type TVariantButton = "secondary" | "error";
