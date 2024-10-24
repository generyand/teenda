import ProductDetailsDialog from "@/components/shopping-view/product-details";
import ShoppingProductTile from "@/components/shopping-view/product-tile";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { fetchProductDetails } from "@/store/shop/products-slice";
import {
  getSearchResults,
  resetSearchResults,
} from "@/store/shop/search-slice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { Search, ShoppingBag, Zap, Heart } from "lucide-react";

function SearchProducts() {
  const [keyword, setKeyword] = useState("");
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const { searchResults } = useSelector((state) => state.shopSearch);
  const { productDetails } = useSelector((state) => state.shopProducts);
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const { toast } = useToast();

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (keyword.trim().length > 2) {
        setSearchParams(new URLSearchParams(`?keyword=${keyword}`));
        dispatch(getSearchResults(keyword));
      } else {
        setSearchParams(new URLSearchParams());
        dispatch(resetSearchResults());
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [keyword, dispatch, setSearchParams]);

  const handleAddtoCart = (getCurrentProductId, getTotalStock) => {
    const getCartItems = cartItems.items || [];
    const existingItem = getCartItems.find(item => item.productId === getCurrentProductId);

    if (existingItem && existingItem.quantity + 1 > getTotalStock) {
      toast({
        title: `Only ${existingItem.quantity} quantity can be added for this item`,
        variant: "destructive",
      });
      return;
    }

    dispatch(addToCart({
      userId: user?.id,
      productId: getCurrentProductId,
      quantity: 1,
    })).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems(user?.id));
        toast({ title: "Product added to cart" });
      }
    });
  };

  const handleGetProductDetails = (getCurrentProductId) => {
    dispatch(fetchProductDetails(getCurrentProductId));
  };

  useEffect(() => {
    if (productDetails !== null) setOpenDetailsDialog(true);
  }, [productDetails]);

  const renderInitialContent = () => (
    <div className="py-12 text-center">
      <h2 className="mb-6 text-3xl font-bold text-gray-700">Discover Amazing Products</h2>
      <div className="flex justify-center mb-8 space-x-8">
        <div className="flex flex-col items-center">
          <div className="p-4 mb-2 bg-blue-100 rounded-full">
            <Search className="text-blue-500" size={32} />
          </div>
          <p className="text-gray-600">Search</p>
        </div>
        <div className="flex flex-col items-center">
          <div className="p-4 mb-2 bg-green-100 rounded-full">
            <ShoppingBag className="text-green-500" size={32} />
          </div>
          <p className="text-gray-600">Shop</p>
        </div>
        <div className="flex flex-col items-center">
          <div className="p-4 mb-2 bg-purple-100 rounded-full">
            <Heart className="text-purple-500" size={32} />
          </div>
          <p className="text-gray-600">Save</p>
        </div>
      </div>
      <p className="max-w-md mx-auto text-gray-500">
        Start your search above to find the perfect items for you. We have a wide range of products waiting to be discovered!
      </p>
    </div>
  );

  return (
    <div className="container px-4 py-8 mx-auto max-w-7xl">
      <div className="mb-8">
        <div className="relative">
          <Input
            value={keyword}
            name="keyword"
            onChange={(event) => setKeyword(event.target.value)}
            className="w-full py-6 pl-12 pr-4 text-lg transition-all duration-300 rounded-full shadow-md focus:ring-2 focus:ring-blue-300"
            placeholder="Search products..."
            aria-label="Search products"
          />
          <Search className="absolute text-gray-400 transform -translate-y-1/2 left-4 top-1/2" size={24} />
        </div>
      </div>
      
      {keyword.trim().length === 0 ? (
        renderInitialContent()
      ) : searchResults.length === 0 ? (
        <div className="py-12 text-center">
          <h1 className="text-3xl font-bold text-gray-700">No results found</h1>
          <p className="mt-2 text-gray-500">Try adjusting your search or filter to find what you're looking for.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {searchResults.map((item) => (
            <ShoppingProductTile
              key={item.id}
              handleAddtoCart={handleAddtoCart}
              product={item}
              handleGetProductDetails={handleGetProductDetails}
            />
          ))}
        </div>
      )}
      
      <ProductDetailsDialog
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        productDetails={productDetails}
      />
    </div>
  );
}

export default SearchProducts;
