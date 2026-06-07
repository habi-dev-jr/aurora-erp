import { Theme } from "../constants";

export type ThemeType = `${Theme}`;
export type ThemeContextType = {
    theme: ThemeType;
    toggleTheme: () => void;
}

export type SideBarContextType = {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}