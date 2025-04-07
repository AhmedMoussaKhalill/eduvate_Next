"use client";
import { Icons } from "@/components/icons";
import { Input } from "@/components/ui/input";

const SearchInput = ({ onSearching }) => {
  return (
    <div className="relative w-80">
      <Icons.search className="absolute left-3 top-1/2 size-[18px] -translate-y-1/2 transform text-muted-foreground" />
      <Input
        className="h-10 w-full rounded-full border-gray-800/10 pl-10"
        placeholder="Quick Search"
      />
    </div>
  );
};

export default SearchInput;
