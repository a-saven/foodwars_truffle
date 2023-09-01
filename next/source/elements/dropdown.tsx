import { RestaurantDocument } from "@/source/types";

interface DropdownProps {
  suggestions: RestaurantDocument[];
  handleRestaurantChange: (id: string) => void;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}

export const DropdownComponent: React.FC<DropdownProps> = ({ suggestions, handleRestaurantChange, setSearchTerm }) => (
  <div className="absolute top-full left-0 z-10 border bg-white max-h-60 overflow-y-auto rounded w-full">
    {suggestions.map((suggestion) => (
      <div
        key={suggestion._id}
        className="cursor-pointer hover:bg-gray-200 p-2"
        onClick={() => {
          setSearchTerm(suggestion.title);
          handleRestaurantChange(suggestion._id);
        }}
      >
        {suggestion.title}
      </div>
    ))}
  </div>
);
