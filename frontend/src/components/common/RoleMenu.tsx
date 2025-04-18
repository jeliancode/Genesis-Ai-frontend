import { useState } from "react";
import { Role } from "../../types/roleManagement";

interface RoleMenuProps {
  onRoleChange: (role: Role) => void;
  initialRole?: Role;
  allowRoleChange?: boolean;
}

export const RoleMenu = ({
  onRoleChange,
  initialRole = "USER",
  allowRoleChange = true,
}: RoleMenuProps) => {
  const [selectedRole, setSelectedRole] = useState<Role>(initialRole);

  const handleRoleChange = (role: Role) => {
    if (!allowRoleChange) return;
    setSelectedRole(role);
    onRoleChange(role);
  };

  return (
    <div className="role-menu">
      <h4 className="menu-title">SELECT ROLE</h4>
      <div className="role-buttons">
        <button
          className={`role-button ${selectedRole === "ADMIN" ? "active" : ""}`}
          onClick={() => handleRoleChange("ADMIN")}
          disabled={!allowRoleChange}
        >
          ADMIN
        </button>
        <button
          className={`role-button ${selectedRole === "USER" ? "active" : ""}`}
          onClick={() => handleRoleChange("USER")}
          disabled={!allowRoleChange}
        >
          USER
        </button>
      </div>
      <p className="menu-footer">Gemini.Ai by jeltan.code</p>
    </div>
  );
};
