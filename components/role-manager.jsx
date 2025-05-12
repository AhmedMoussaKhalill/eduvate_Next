'use client';

import { useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { ROLES } from '@/lib/roles';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import toast from 'react-hot-toast';

export function RoleManager({ targetUser }) {
  const { user } = useUser();
  const [selectedRole, setSelectedRole] = useState(
    targetUser.publicMetadata.role || ROLES.STUDENT
  );
  const [isLoading, setIsLoading] = useState(false);

  const handleRoleUpdate = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/roles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          targetUserId: targetUser.id,
          role: selectedRole,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update role');
      }

      toast.success('Role updated successfully');
    } catch (error) {
      toast.error('Failed to update role');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  // Only show role manager to admins
  if (user?.publicMetadata?.role !== ROLES.ADMIN) {
    return null;
  }

  return (
    <div className="flex items-center gap-4">
      <Select
        value={selectedRole}
        onValueChange={setSelectedRole}
        disabled={isLoading}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select role" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={ROLES.STUDENT}>Student</SelectItem>
          <SelectItem value={ROLES.INSTRUCTOR}>Instructor</SelectItem>
          <SelectItem value={ROLES.ADMIN}>Admin</SelectItem>
        </SelectContent>
      </Select>
      <Button
        onClick={handleRoleUpdate}
        disabled={isLoading || selectedRole === targetUser.publicMetadata.role}
      >
        {isLoading ? 'Updating...' : 'Update Role'}
      </Button>
    </div>
  );
}
