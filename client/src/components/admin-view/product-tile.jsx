import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Badge } from "../ui/badge";
import { Pencil, Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";

const AdminProductTile = ({
  product,
  setFormData,
  setOpenCreateProductsDialog,
  setCurrentEditedId,
  handleDelete,
}) => {
  const handleEdit = () => {
    setOpenCreateProductsDialog(true);
    setCurrentEditedId(product?._id);
    setFormData(product);
  };

  const handleConfirmDelete = () => {
    handleDelete(product?._id);
  };

  const isOnSale = product?.salePrice > 0;

  return (
    <Card className="w-full max-w-sm mx-auto overflow-hidden transition-shadow duration-300 hover:shadow-lg">
      <div className="relative overflow-hidden aspect-square">
        <img
          src={product?.image}
          alt={product?.title}
          className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
        />
        {isOnSale && (
          <Badge className="absolute px-2 py-1 text-xs font-semibold text-white bg-green-500 top-2 left-2">
            Sale
          </Badge>
        )}
      </div>
      <CardContent className="p-4">
        <h2 className="mb-2 text-lg font-semibold truncate">{product?.title}</h2>
        <div className="flex items-center mb-2 space-x-2">
          <span className={`text-lg font-bold ${isOnSale ? 'text-gray-400 line-through' : 'text-primary'}`}>
            ${product?.price.toFixed(2)}
          </span>
          {isOnSale && (
            <span className="text-lg font-bold text-green-600">
              ${product?.salePrice.toFixed(2)}
            </span>
          )}
        </div>
        <p className="text-sm text-gray-600 truncate">
          Stock: {product?.totalStock}
        </p>
      </CardContent>
      <CardFooter className="flex items-center justify-between p-4 pt-0">
        <Button
          onClick={handleEdit}
          variant="outline"
          size="sm"
          className="flex items-center gap-2"
        >
          <Pencil size={16} />
          Edit
        </Button>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant="destructive"
              size="sm"
              className="flex items-center gap-2"
            >
              <Trash2 size={16} />
              Delete
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the product
                "{product?.title}" from the database.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleConfirmDelete}>
                Yes, delete product
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  );
};

export default AdminProductTile;
