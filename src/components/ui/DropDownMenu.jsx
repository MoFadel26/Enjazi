import React from "react"
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu"
import { Check, ChevronRight, Circle } from "lucide-react"
import { cn } from "lib/utils"

export function DropdownMenu({ children }) {
    return <DropdownMenuPrimitive.Root>{children}</DropdownMenuPrimitive.Root>
}

export function DropdownMenuTrigger({ children, ...props }) {
    return <DropdownMenuPrimitive.Trigger {...props}>{children}</DropdownMenuPrimitive.Trigger>
}

export function DropdownMenuContent({ className, sideOffset = 4, children, ...props }) {
    return (
        <DropdownMenuPrimitive.Portal>
            <DropdownMenuPrimitive.Content
                sideOffset={sideOffset}
                className={cn(
                    "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md " +
                    "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 " +
                    "data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 " +
                    "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 " +
                    "data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
                    className
                )}
                {...props}
            >
                {children}
            </DropdownMenuPrimitive.Content>
        </DropdownMenuPrimitive.Portal>
    )
}

export function DropdownMenuItem({ className, inset, children, ...props }) {
    return (
        <DropdownMenuPrimitive.Item
            className={cn(
                "relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none " +
                "transition-colors focus:bg-accent focus:text-accent-foreground " +
                "data-[disabled]:pointer-events-none data-[disabled]:opacity-50 " +
                "[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
                inset && "pl-8",
                className
            )}
            {...props}
        >
            {children}
        </DropdownMenuPrimitive.Item>
    )
}

export function DropdownMenuCheckboxItem({ className, checked, children, ...props }) {
    return (
        <DropdownMenuPrimitive.CheckboxItem
            className={cn(
                "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none " +
                "transition-colors focus:bg-accent focus:text-accent-foreground " +
                "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
                className
            )}
            checked={checked}
            {...props}
        >
      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        <DropdownMenuPrimitive.ItemIndicator>
          <Check className="h-4 w-4" />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
            {children}
        </DropdownMenuPrimitive.CheckboxItem>
    )
}

export function DropdownMenuRadioItem({ className, children, ...props }) {
    return (
        <DropdownMenuPrimitive.RadioItem
            className={cn(
                "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none " +
                "transition-colors focus:bg-accent focus:text-accent-foreground " +
                "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
                className
            )}
            {...props}
        >
      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        <DropdownMenuPrimitive.ItemIndicator>
          <Circle className="h-2 w-2 fill-current" />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
            {children}
        </DropdownMenuPrimitive.RadioItem>
    )
}

export function DropdownMenuLabel({ className, inset, children, ...props }) {
    return (
        <DropdownMenuPrimitive.Label
            className={cn("px-2 py-1.5 text-sm font-semibold", inset && "pl-8", className)}
            {...props}
        >
            {children}
        </DropdownMenuPrimitive.Label>
    )
}

export function DropdownMenuSeparator({ className, ...props }) {
    return <DropdownMenuPrimitive.Separator className={cn("-mx-1 my-1 h-px bg-muted", className)} {...props} />
}

export function DropdownMenuShortcut({ className, ...props }) {
    return <span className={cn("ml-auto text-xs tracking-widest opacity-60", className)} {...props} />
}

export function DropdownMenuGroup({ children, ...props }) {
    return <DropdownMenuPrimitive.Group {...props}>{children}</DropdownMenuPrimitive.Group>
}

export function DropdownMenuPortal({ children }) {
    return <DropdownMenuPrimitive.Portal>{children}</DropdownMenuPrimitive.Portal>
}

export function DropdownMenuSub({ children }) {
    return <DropdownMenuPrimitive.Sub>{children}</DropdownMenuPrimitive.Sub>
}

export function DropdownMenuSubTrigger({ className, inset, children, ...props }) {
    return (
        <DropdownMenuPrimitive.SubTrigger
            className={cn(
                "flex cursor-default gap-2 select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none " +
                "focus:bg-accent data-[state=open]:bg-accent [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
                inset && "pl-8",
                className
            )}
            {...props}
        >
            {children}
            <ChevronRight className="ml-auto" />
        </DropdownMenuPrimitive.SubTrigger>
    )
}

export function DropdownMenuSubContent({ className, children, ...props }) {
    return (
        <DropdownMenuPrimitive.SubContent
            className={cn(
                "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg " +
                "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 " +
                "data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 " +
                "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 " +
                "data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
                className
            )}
            {...props}
        >
            {children}
        </DropdownMenuPrimitive.SubContent>
    )
}

export function DropdownMenuRadioGroup({ children, ...props }) {
    return <DropdownMenuPrimitive.RadioGroup {...props}>{children}</DropdownMenuPrimitive.RadioGroup>
}
