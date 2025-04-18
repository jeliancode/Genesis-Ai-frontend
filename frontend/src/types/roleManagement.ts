export type Role = "ADMIN" | "USER";
export type DocumentType = "classification" | "inference";

export interface RoleMenuProps {
  onRoleChange: (role: Role) => void;
  initialRole?: Role;
  allowRoleChange?: boolean;
}
