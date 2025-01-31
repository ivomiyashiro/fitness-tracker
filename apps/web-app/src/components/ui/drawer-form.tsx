import { UseFormReturn, FieldValues } from "react-hook-form";
import { cn } from "@/lib/utils";
import { Drawer, DrawerContent, DrawerDescription } from "./drawer";
import { Form } from "./form";

interface DrawerFormProps<TFormValues extends FieldValues>
  extends React.FormHTMLAttributes<HTMLFormElement> {
  form: UseFormReturn<TFormValues>;
  children: React.ReactNode;
  open?: boolean;
  onClose?: () => void;
  className?: string;
}

export const DrawerForm = <TFormValues extends FieldValues>({
  form,
  open,
  onClose,
  children,
  className,
  ...props
}: DrawerFormProps<TFormValues>) => {
  return (
    <Drawer open={open} onClose={() => onClose?.()}>
      <DrawerContent className="h-5/6">
        <DrawerDescription />
        <Form {...form}>
          <form {...props} className={cn("", className)}>
            {children}
          </form>
        </Form>
      </DrawerContent>
    </Drawer>
  );
};
