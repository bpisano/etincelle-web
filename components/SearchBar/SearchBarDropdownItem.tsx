import type { ReactNode } from "react";

interface SearchBarDropdownItemProps {
  isSelected?: boolean;
  onHover?: () => void;
  children: ReactNode;
}

export function SearchBarDropdownItem({ isSelected, onHover, children }: SearchBarDropdownItemProps) {
  return (
    <div className={`p-2 ${isSelected ? "bg-focused-primary" : ""}`} onMouseEnter={onHover}>
      {children}
    </div>
  );
}
