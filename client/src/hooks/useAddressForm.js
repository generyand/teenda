import { useState } from 'react';
import { addNewAddress, editaAddress } from "@/store/shop/address-slice";

export const useAddressForm = (user, dispatch, toast) => {
  const [formData, setFormData] = useState({
    address: '',
    city: '',
    phone: '',
    pincode: '',
    notes: '',
  });
  const [currentEditedId, setCurrentEditedId] = useState(null);

  const resetForm = () => {
    setFormData({
      address: '',
      city: '',
      phone: '',
      pincode: '',
      notes: '',
    });
    setCurrentEditedId(null);
  };

  const isFormValid = () => {
    return formData.address && formData.city && formData.phone && formData.pincode;
  };

  const handleManageAddress = () => {
    if (!isFormValid()) return;

    const action = currentEditedId ? editaAddress : addNewAddress;
    const payload = currentEditedId
      ? { userId: user?.id, addressId: currentEditedId, addressData: formData }
      : { userId: user?.id, addressData: formData };

    dispatch(action(payload))
      .then((data) => {
        if (data?.payload?.success) {
          toast({ title: `Address ${currentEditedId ? 'updated' : 'added'} successfully` });
          resetForm();
        }
      })
      .catch((error) => {
        toast({ title: `Failed to ${currentEditedId ? 'update' : 'add'} address`, variant: "destructive" });
      });
  };

  return {
    formData,
    setFormData,
    currentEditedId,
    setCurrentEditedId,
    handleManageAddress,
    isFormValid,
    resetForm,
  };
};
