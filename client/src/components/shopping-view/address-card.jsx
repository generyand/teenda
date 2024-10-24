import { Pencil, Trash2 } from "lucide-react";
import { Button } from "../ui/button";

function AddressCard({
  selectedId,
  handleDeleteAddress,
  addressInfo,
  handleEditAddress,
  setCurrentSelectedAddress,
}) {
  const isSelected = selectedId === addressInfo._id;

  return (
    <div className={`p-4 rounded-lg border ${isSelected ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}>
      <div className="flex items-start justify-between mb-2">
        <h4 className="text-lg font-semibold">{addressInfo.address}</h4>
        <div className="flex space-x-2">
          <Button
            onClick={() => handleEditAddress(addressInfo)}
            variant="outline"
            size="sm"
            className="p-1"
            aria-label="Edit address"
          >
            <Pencil className="w-4 h-4 text-blue-500" />
          </Button>
          <Button
            onClick={() => handleDeleteAddress(addressInfo)}
            variant="outline"
            size="sm"
            className="p-1"
            aria-label="Delete address"
          >
            <Trash2 className="w-4 h-4 text-red-500" />
          </Button>
        </div>
      </div>
      <p className="text-gray-600">{addressInfo.city}</p>
      <p className="text-gray-600">{addressInfo.pincode}</p>
      <p className="text-gray-600">{addressInfo.phone}</p>
      {addressInfo.notes && (
        <p className="mt-2 text-sm italic text-gray-500">{addressInfo.notes}</p>
      )}
      {setCurrentSelectedAddress && (
        <Button
          onClick={() => setCurrentSelectedAddress(addressInfo)}
          variant={isSelected ? "default" : "outline"}
          size="sm"
          className="mt-3"
        >
          {isSelected ? "Selected" : "Select"}
        </Button>
      )}
    </div>
  );
}

export default AddressCard;
