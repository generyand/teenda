import ProductImageUpload from "@/components/admin-view/image-upload";
import { Button } from "@/components/ui/button";
import { addFeatureImage, getFeatureImages } from "@/store/common-slice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Loader2, X, Users, ShoppingCart, Package, Star } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const AdminDashboard = () => {
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const dispatch = useDispatch();
  const { featureImageList } = useSelector((state) => state.commonFeature);

  // Mock data (replace with actual data fetching in a real application)
  const [stats, setStats] = useState({
    totalUsers: 1250,
    totalOrders: 450,
    totalProducts: 75,
    totalReviews: 320
  });

  const [recentOrders, setRecentOrders] = useState([
    { id: '1', userId: 'user123', totalAmount: 150.99, orderStatus: 'Shipped' },
    { id: '2', userId: 'user456', totalAmount: 89.99, orderStatus: 'Processing' },
    { id: '3', userId: 'user789', totalAmount: 200.50, orderStatus: 'Delivered' },
  ]);

  const [topProducts, setTopProducts] = useState([
    { title: 'Product A', sales: 50 },
    { title: 'Product B', sales: 30 },
    { title: 'Product C', sales: 20 },
    { title: 'Product D', sales: 15 },
    { title: 'Product E', sales: 10 },
  ]);

  const [recentReviews, setRecentReviews] = useState([
    { userName: 'John D.', reviewMessage: 'Great product!', reviewValue: 5 },
    { userName: 'Jane S.', reviewMessage: 'Good quality.', reviewValue: 4 },
    { userName: 'Mike R.', reviewMessage: 'Decent, but could be better.', reviewValue: 3 },
  ]);

  const handleUploadFeatureImage = async () => {
    if (!uploadedImageUrl) return;

    setIsUploading(true);
    try {
      const result = await dispatch(addFeatureImage(uploadedImageUrl));
      if (result.payload.success) {
        dispatch(getFeatureImages());
        setImageFile(null);
        setUploadedImageUrl("");
      }
    } catch (error) {
      console.error("Failed to upload image:", error);
    } finally {
      setIsUploading(false);
    }
  };

  useEffect(() => {
    dispatch(getFeatureImages());
    // Fetch actual data here in a real application
  }, [dispatch]);

  const handleDeleteImage = (imageId) => {
    // Implement delete functionality here
    console.log("Delete image with ID:", imageId);
  };

  return (
    <div className="p-6 mx-auto space-y-8 max-w-7xl">
      <h1 className="mb-6 text-3xl font-bold text-gray-900">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={<Users />} title="Total Users" value={stats.totalUsers} />
        <StatCard icon={<ShoppingCart />} title="Total Orders" value={stats.totalOrders} />
        <StatCard icon={<Package />} title="Total Products" value={stats.totalProducts} />
        <StatCard icon={<Star />} title="Total Reviews" value={stats.totalReviews} />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h2 className="mb-4 text-xl font-semibold">Recent Orders</h2>
          <div className="space-y-4">
            {recentOrders.map((order) => (
              <div key={order.id} className="flex items-center justify-between pb-2 border-b">
                <div>
                  <p className="font-medium">Order #{order.id}</p>
                  <p className="text-sm text-gray-500">User: {order.userId}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">${order.totalAmount.toFixed(2)}</p>
                  <p className="text-sm text-gray-500">{order.orderStatus}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 bg-white rounded-lg shadow-md">
          <h2 className="mb-4 text-xl font-semibold">Top Products</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={topProducts}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="title" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="sales" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h2 className="mb-4 text-xl font-semibold">Recent Reviews</h2>
          <div className="space-y-4">
            {recentReviews.map((review, index) => (
              <div key={index} className="pb-2 border-b">
                <div className="flex items-center justify-between">
                  <p className="font-medium">{review.userName}</p>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={16} className={i < review.reviewValue ? "text-yellow-400" : "text-gray-300"} />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-gray-600">{review.reviewMessage}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 bg-white rounded-lg shadow-md">
          <h2 className="mb-4 text-xl font-semibold">Upload Feature Image</h2>
          <ProductImageUpload
            imageFile={imageFile}
            setImageFile={setImageFile}
            uploadedImageUrl={uploadedImageUrl}
            setUploadedImageUrl={setUploadedImageUrl}
            setImageLoadingState={setImageLoadingState}
            imageLoadingState={imageLoadingState}
            isCustomStyling={true}
          />
          <Button
            onClick={handleUploadFeatureImage}
            className="w-full mt-4"
            disabled={!uploadedImageUrl || isUploading}
          >
            {isUploading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Uploading...
              </>
            ) : (
              "Upload Image"
            )}
          </Button>
        </div>
      </div>

      <div className="p-6 bg-white rounded-lg shadow-md">
        <h2 className="mb-4 text-xl font-semibold">Feature Images</h2>
        {featureImageList && featureImageList.length > 0 ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {featureImageList.map((featureImgItem) => (
              <div key={featureImgItem.id} className="relative group">
                <img
                  src={featureImgItem.image}
                  alt={`Feature image ${featureImgItem.id}`}
                  className="object-cover w-full h-48 transition-transform duration-300 rounded-lg group-hover:scale-105"
                />
                <button
                  onClick={() => handleDeleteImage(featureImgItem.id)}
                  className="absolute p-1 text-white transition-opacity duration-300 bg-red-500 rounded-full opacity-0 top-2 right-2 group-hover:opacity-100"
                  aria-label={`Delete image ${featureImgItem.id}`}
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No feature images uploaded yet.</p>
        )}
      </div>
    </div>
  );
};

const StatCard = ({ icon, title, value }) => (
  <div className="flex items-center p-6 space-x-4 bg-white rounded-lg shadow-md">
    <div className="p-3 bg-blue-100 rounded-full">
      {icon}
    </div>
    <div>
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  </div>
);

export default AdminDashboard;
