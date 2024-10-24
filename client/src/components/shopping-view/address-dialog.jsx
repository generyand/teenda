import { useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import CommonForm from "../common/form";
import { addressFormControls } from "@/config";
import { useAddressForm } from "../../hooks/useAddressForm";
import { useDispatch } from "react-redux";
import { useToast } from "../ui/use-toast";

function AddressDialog({ isOpen, onClose, addressToEdit, userId }) {
  const dispatch = useDispatch();
  const { toast } = useToast();

  const {
    formData,
    setFormData,
    handleManageAddress,
    isFormValid,
    resetForm,
  } = useAddressForm(userId, dispatch, toast);

  useEffect(() => {
    if (addressToEdit) {
      setFormData({
        address: addressToEdit.address,
        city: addressToEdit.city,
        phone: addressToEdit.phone,
        pincode: addressToEdit.pincode,
        notes: addressToEdit.notes,
      });
    } else {
      resetForm();
    }
  }, [addressToEdit, setFormData, resetForm]);

  const handleSubmit = () => {
    handleManageAddress(addressToEdit?._id).then(() => {
      onClose();
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{addressToEdit ? "Edit Address" : "Add New Address"}</DialogTitle>
        </DialogHeader>
        <CommonForm
          formControls={addressFormControls}
          formData={formData}
          setFormData={setFormData}
          onSubmit={handleSubmit}
          isBtnDisabled={!isFormValid()}
        />
        <div className="flex justify-end mt-6 space-x-3">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={!isFormValid()}>
            {addressToEdit ? "Save Changes" : "Add Address"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default AddressDialog;
