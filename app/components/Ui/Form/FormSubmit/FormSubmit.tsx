import type { FC } from "react";
import React from "react";
import { useIsSubmitting } from "remix-validated-form";
import type { ButtonProps } from "~/components/Button/Button";
import { Button } from "~/components/Button/Button";

interface SubmitButtonProps extends ButtonProps {
  children: React.ReactNode;
}

export const SubmitButton: FC<SubmitButtonProps> = ({ children, ...props }) => {
  const isSubmitting = useIsSubmitting();
  return (
    <Button type="submit" disabled={isSubmitting} {...props}>
      {isSubmitting ? "Submitting..." : <>{children}</>}
    </Button>
  );
};
