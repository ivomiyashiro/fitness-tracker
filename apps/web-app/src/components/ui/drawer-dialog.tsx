import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "./drawer";
import { Button } from "./button";

export const DrawerDialog = ({
  description,
  onClose,
  onConfirm,
  onCancel,
  open,
  primaryButtonText = "Delete",
  secondaryButtonText = "Cancel",
  showPrimaryButton = true,
  showSecondaryButton = true,
  title,
}: {
  description?: string;
  onClose: () => void;
  onConfirm?: () => void;
  onCancel?: () => void;
  open: boolean;
  primaryButtonText?: string;
  secondaryButtonText?: string;
  showPrimaryButton?: boolean;
  showSecondaryButton?: boolean;
  title: string;
}) => {
  const handlePrimaryButtonClick = () => {
    onConfirm?.();
    onClose();
  };

  const handleSeconaryButtonClick = () => {
    onCancel?.();
    onClose();
  };

  return (
    <Drawer open={open} onClose={onClose}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>{title}</DrawerTitle>
        </DrawerHeader>
        <DrawerDescription>{description}</DrawerDescription>
        <DrawerFooter>
          {showPrimaryButton && (
            <Button variant="destructive" onClick={handlePrimaryButtonClick}>
              {primaryButtonText}
            </Button>
          )}
          {showSecondaryButton && (
            <Button variant="secondary" onClick={handleSeconaryButtonClick}>
              {secondaryButtonText}
            </Button>
          )}
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
