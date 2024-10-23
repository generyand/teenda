import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { brandOptionsMap, categoryOptionsMap } from "@/config";
import { Badge } from "../ui/badge";

const ShoppingProductTile = ({ product, handleGetProductDetails, handleAddtoCart }) => {
  const isOutOfStock = product?.totalStock === 0;
  const isLowStock = product?.totalStock < 10;
  const isOnSale = product?.salePrice > 0;

  const handleClick = () => handleGetProductDetails(product?._id);
  const handleKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      handleClick();
    }
  };

  return (
    <Card className="w-full max-w-sm mx-auto overflow-hidden transition-shadow duration-300 hover:shadow-lg">
      <div
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        tabIndex="0"
        role="button"
        aria-label={`View details for ${product?.title}`}
        className="cursor-pointer"
      >
        <div className="relative overflow-hidden aspect-square">
          <img
            src={product?.image}
            alt={product?.title}
            className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
          />
          {isOutOfStock && (
            <Badge className="absolute px-2 py-1 text-xs font-semibold text-white bg-red-500 top-2 right-2">
              Out Of Stock
            </Badge>
          )}
          {!isOutOfStock && isLowStock && (
            <Badge className="absolute px-2 py-1 text-xs font-semibold text-white bg-yellow-500 top-2 right-2">
              Only {product?.totalStock} left
            </Badge>
          )}
          {isOnSale && (
            <Badge className="absolute px-2 py-1 text-xs font-semibold text-white bg-green-500 top-2 left-2">
              Sale
            </Badge>
          )}
        </div>
        <CardContent className="p-4">
          <h2 className="mb-1 text-lg font-semibold truncate">{product?.title}</h2>
          <div className="flex items-center justify-between mb-2 text-sm text-gray-600">
            <span>{categoryOptionsMap[product?.category]}</span>
            <span>{brandOptionsMap[product?.brand]}</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className={`text-lg font-bold ${isOnSale ? 'text-gray-400 line-through' : 'text-primary'}`}>
              ${product?.price.toFixed(2)}
            </span>
            {isOnSale && (
              <span className="text-lg font-bold text-green-600">
                ${product?.salePrice.toFixed(2)}
              </span>
            )}
          </div>
        </CardContent>
      </div>
      <CardFooter className="p-4 pt-0">
        <Button
          onClick={() => handleAddtoCart(product?._id, product?.totalStock)}
          className={`w-full transition-colors ${
            isOutOfStock
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-primary hover:bg-primary-dark'
          }`}
          disabled={isOutOfStock}
        >
          {isOutOfStock ? 'Out Of Stock' : 'Add to Cart'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ShoppingProductTile;
