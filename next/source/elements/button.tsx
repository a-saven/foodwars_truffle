// AddRestaurantButton.tsx
interface AddRestaurantButtonProps {
  handleAddRestaurant: () => void;
}

export const AddRestaurantButton: React.FC<AddRestaurantButtonProps> = ({ handleAddRestaurant }) => (
  <button onClick={handleAddRestaurant} className="bg-blue-500 text-white p-2 rounded">
    Add Restaurant
  </button>
);
