import { useState } from "react";
import {
  ChevronRightIcon,
  PencilIcon,
  PlusIcon,
  TrashIcon,
} from "lucide-react";
import { useSwipeable } from "react-swipeable";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";

// Get nested value from object
const getNestedValue = (obj: Record<string, unknown>, path: string): string => {
  return path.split(".").reduce((acc: unknown, part: string) => {
    if (
      acc &&
      typeof acc === "object" &&
      part in (acc as Record<string, unknown>)
    ) {
      return (acc as Record<string, unknown>)[part];
    }
    return "";
  }, obj) as string;
};

const useListItem = ({
  data,
  displayExpr,
}: {
  data: Record<string, unknown>;
  displayExpr?: string;
}) => {
  const [isSwiped, setIsSwiped] = useState(false);

  const handlers = useSwipeable({
    onSwipedLeft: () => setIsSwiped(false),
    onSwipedRight: () => setIsSwiped(true),
    trackMouse: true,
  });

  const displayValue =
    typeof data === "string"
      ? data
      : displayExpr && typeof data === "object"
        ? getNestedValue(data, displayExpr)
        : "";

  const handlerSwiped = (value: boolean) => setIsSwiped(value);

  return {
    displayValue,
    handlers,
    handlerSwiped,
    isSwiped,
  };
};

type ItemProps<T> = {
  allowDeleting?: boolean;
  allowEditing?: boolean;
  data: T;
  displayExpr?: string;
  keyExpr?: string;
  itemIcon?: React.ElementType;
  onItemClick?: (data: T) => void;
  onEditClick?: (data: T) => void;
  onDeleteClick?: (data: T) => void;
};

export const ListItem = <T extends Record<string, unknown>>({
  allowDeleting = false,
  allowEditing = false,
  data,
  displayExpr,
  itemIcon: Icon,
  onItemClick,
  onEditClick,
  onDeleteClick,
}: ItemProps<T>) => {
  const { displayValue, handlers, handlerSwiped, isSwiped } = useListItem({
    data,
    displayExpr,
  });

  return (
    <li
      tabIndex={0}
      className={cn(
        "relative flex items-center border-b hover:bg-muted hover:text-muted-foreground",
      )}
      {...handlers}
    >
      <div
        className={cn("grid items-center transition-all last:border-none", {
          "-translate-x-12": !isSwiped && (allowDeleting || allowEditing),
          "-translate-x-24": !isSwiped && allowDeleting && allowEditing,
          "grid-cols-[3rem_55rem]": allowDeleting || allowEditing,
          "grid-cols-[3rem_3rem_55rem]": allowDeleting && allowEditing,
        })}
      >
        {allowDeleting && (
          <button
            className="flex w-12 justify-center bg-destructive py-4 text-destructive-foreground"
            onClick={() => {
              handlerSwiped(false);
              onDeleteClick?.(data);
            }}
          >
            <TrashIcon className="size-4" />
          </button>
        )}
        {allowEditing && (
          <button
            className="flex w-12 justify-center bg-blue-500 py-4 text-destructive-foreground"
            onClick={() => {
              handlerSwiped(false);
              onEditClick?.(data);
            }}
          >
            <PencilIcon className="size-4" />
          </button>
        )}
        <div
          className="flex items-center gap-2 px-4"
          onClick={() => onItemClick?.(data)}
        >
          {Icon && <Icon className="size-4 text-muted-foreground" />}
          <p>{displayValue}</p>
        </div>
      </div>
      <ChevronRightIcon className="absolute right-4 size-4" />
    </li>
  );
};

type ListProps = {
  allowAdding?: boolean;
  addingButtonText?: string;
  className?: string;
  onAddNew?: () => void;
} & React.HTMLAttributes<HTMLDivElement>;

export const List = ({
  allowAdding = false,
  addingButtonText = "Add new",
  className,
  children,
  onAddNew,
}: ListProps) => {
  return (
    <Card
      className={cn(
        "overflow-hidden border-none outline outline-1 outline-border",
        className,
      )}
    >
      <ul>
        {allowAdding && (
          <li
            className="flex cursor-pointer items-center gap-2 border-b px-4 py-3 text-primary last:border-none hover:bg-muted hover:text-muted-foreground"
            onClick={() => onAddNew?.()}
          >
            <PlusIcon className="size-4" />
            <span>{addingButtonText}</span>
          </li>
        )}
        {children}
      </ul>
    </Card>
  );
};
