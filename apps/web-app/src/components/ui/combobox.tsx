"use client";

import { useState } from "react";
import { Check, ChevronsUpDown, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";

export type ComboboxProps<T> = {
  data: T[];
  valueKey: keyof T;
  labelKey: keyof T;
  mode?: "single" | "multiple";
  placeholder?: string;
  selected: T[];
  onSelect: (selected: T[]) => void;
};

export function Combobox<T>({
  data,
  valueKey,
  labelKey,
  mode = "multiple",
  placeholder = "Select...",
  selected,
  onSelect,
}: ComboboxProps<T>) {
  const [open, setOpen] = useState(false);

  const handleSelect = (item: T) => {
    const isSelected = selected.some(
      (selectedItem) => selectedItem[valueKey] === item[valueKey],
    );

    if (mode === "multiple") {
      if (isSelected) {
        onSelect(
          selected.filter(
            (selectedItem) => selectedItem[valueKey] !== item[valueKey],
          ),
        );

        return;
      }

      onSelect([...selected, item]);
    } else {
      if (isSelected) {
        onSelect([]);
      } else {
        onSelect([item]);
      }
      setOpen(false);
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild className="w-full">
        <Button
          aria-expanded={open}
          disabled={data.length === 0}
          role="combobox"
          variant="outline"
          className="h-auto justify-between"
        >
          <div className="flex flex-wrap gap-1">
            {selected.length > 0 ? (
              selected.map((item) => (
                <Badge
                  key={String(item[valueKey])}
                  variant="secondary"
                  className="flex items-center gap-1"
                >
                  {String(item[labelKey])}
                  <X
                    className="h-3 w-3 cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelect(item);
                    }}
                  />
                </Badge>
              ))
            ) : (
              <span>{placeholder}</span>
            )}
          </div>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="!pointer-events-auto p-0">
        <Command>
          <CommandInput placeholder={placeholder} />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {data.map((item) => {
                const isSelected = selected.some(
                  (selectedItem) => selectedItem[valueKey] === item[valueKey],
                );
                return (
                  <CommandItem
                    key={String(item[valueKey])}
                    value={String(item[valueKey])}
                    onSelect={() => handleSelect(item)}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        isSelected ? "opacity-100" : "opacity-0",
                      )}
                    />
                    {String(item[labelKey])}
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
