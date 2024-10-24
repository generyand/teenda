import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";
import AddressCard from "./address-card";
import { fetchAllAddresses, deleteAddress } from "@/store/shop/address-slice";
import { useConfirmDialog } from "../../hooks/useConfirmDialog";
import ConfirmDialog from "./ConfirmDialog";
import { Plus } from "lucide-react";
import AddressDialog from "./address-dialog";

function Address({ setCurrentSelectedAddress, selectedId }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { addressList, loading } = useSelector((state) => state.shopAddress);
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);

  const { isOpen, message, showConfirmDialog, handleConfirm, handleCancel } = useConfirmDialog();

  const handleDeleteAddress = (addressToDelete) => {
    showConfirmDialog(
      "Are you sure you want to delete this address?",
      () => {
        dispatch(deleteAddress({ userId: user?.id, addressId: addressToDelete._id }))
          .then((data) => {
            if (data?.payload?.success) {
              dispatch(fetchAllAddresses(user?.id));
              toast({ title: "Address deleted successfully" });
            }
          })
          .catch((error) => {
            toast({ title: "Failed to delete address", variant: "destructive" });
          });
      }
    );
  };

  const handleEditAddress = (addressToEdit) => {
    setEditingAddress(addressToEdit);
    setIsDialogOpen(true);
  };

  const handleAddNewAddress = () => {
    setEditingAddress(null);
    setIsDialogOpen(true);
  };

  useEffect(() => {
    dispatch(fetchAllAddresses(user?.id));
  }, [dispatch, user?.id]);

  return (
    <>
      <Card className="max-w-4xl mx-auto shadow-lg">
        <CardHeader className="flex items-center justify-between border-b bg-gray-50">
          <CardTitle className="text-2xl font-bold text-gray-800">
            Manage Addresses
          </CardTitle>
          <Button onClick={handleAddNewAddress} className="text-white bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            Add New Address
          </Button>
        </CardHeader>
        <CardContent className="p-6">
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="w-12 h-12 border-b-2 border-gray-900 rounded-full animate-spin"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {addressList && addressList.length > 0 ? (
                addressList.map((address) => (
                  <AddressCard
                    key={address._id}
                    selectedId={selectedId}
                    handleDeleteAddress={handleDeleteAddress}
                    addressInfo={address}
                    handleEditAddress={handleEditAddress}
                    setCurrentSelectedAddress={setCurrentSelectedAddress}
                  />
                ))
              ) : (
                <p className="col-span-2 py-8 text-center text-gray-500">No addresses found. Click 'Add New Address' to add one.</p>
              )}
            </div>
          )}
        </CardContent>
      </Card>
      <AddressDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        addressToEdit={editingAddress}
        userId={user?.id}
      />
      <ConfirmDialog 
        isOpen={isOpen}
        message={message}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    </>
  );
}

export default Address;
