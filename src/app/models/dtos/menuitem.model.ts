export class MenuItemDto {
  text: string;
  icon: string; // glyphiicon class
  route: string;
  submenu: Array<MenuItemDto>;
  submenuLink?: string;
  submenuOpen?: boolean;
  rtglink?: string;
  href?: string;
}
