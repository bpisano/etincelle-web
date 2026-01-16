import { SearchBar } from "@/components/SearchBar";

export function NavBar() {
  return (
    <nav className="w-full p-4 vstack items-center">
      <SearchBar />
    </nav>
  );
}
