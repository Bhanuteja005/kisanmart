import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useStatusContext } from "../context/ContextProvider";
import { getProduct } from "../firebase/productService";

const ProductDetails = () => {
  const { activeMenu } = useStatusContext();
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        console.log('Loading product with ID:', id);
        setLoading(true);
        setError(null);
        
        const productData = await getProduct(id);
        console.log('Loaded product data:', productData);
        
        if (productData) {
          setProduct(productData);
        } else {
          setError('Product not found');
          setTimeout(() => navigate('/products'), 2000);
        }
      } catch (err) {
        console.error('Error loading product:', err);
        setError(err.message);
        setTimeout(() => navigate('/products'), 2000);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadProduct();
    }
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl font-semibold">Loading product details...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl font-semibold text-red-500">Error: {error}</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl font-semibold">Product not found</div>
      </div>
    );
  }

  return (
    <div className={`${activeMenu ? "ml-52" : "w-full"} mt-4 flex justify-center gap-1`}>
      <div className="w-full flex justify-center">
        <div className="w-[95%] p-8 rounded-xl bg-white border-gray-dark shadow-2xl">
          <h2 className="text-2xl border-b-2 border-b-gray-medium pb-4 font-extrabold text-black">
            Product Details
          </h2>
          <div className="flex w-full justify-between">
            {/* Image Section */}
            <div className="w-[50%] mb-1">
              <div className="w-full mt-4">
                {product.imageUrls && product.imageUrls.length > 0 && (
                  <img
                    className="rounded border w-full border-black object-cover max-h-[400px]"
                    src={product.imageUrls[0]}
                    alt={product.productName}
                  />
                )}
              </div>
              <div className="mt-2 flex w-[80%] justify-between gap-1 items-center">
                {product.imageUrls?.slice(1).map((url, index) => (
                  <div key={index} className="w-full">
                    <img
                      src={url}
                      alt={`${product.productName} ${index + 2}`}
                      className="w-full h-full object-cover rounded border border-gray-300"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Product Info Section */}
            <div className="flex flex-col w-full">
              <DetailRow label="Product Name" value={product.productName} />
              <DetailRow label="Category" value={product.category} />
              <DetailRow label="Sub Category" value={product.subcategory} />
              <DetailRow label="Product Type" value={product.productType} />
              <DetailRow label="Description" value={product.description} />
              <DetailRow label="Cost" value={`$${product.cost}`} />
              <DetailRow label="Stock Quantity" value={product.stockQuantity} />
              <DetailRow label="MOQ" value={product.moq} />
              <DetailRow label="GST" value={`${product.gst}%`} />
              <DetailRow label="Discount" value={`${product.discount}%`} />
              
              {/* Variants Section */}
              {product.productType === 'multi' && product.variants && (
                <div className="mt-6 border-t pt-4">
                  <h3 className="text-xl font-bold mb-4">Product Variants</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {product.variants.map((variant, index) => (
                      <div key={index} className="border rounded-lg p-4 bg-gray-50">
                        <h4 className="font-semibold mb-2">{variant.name}</h4>
                        <p>Color/Type: {variant.color}</p>
                        <p>Cost: ${variant.cost}</p>
                        <p>Stock: {variant.stock}</p>
                        <p>SKU: {variant.sku}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper component for consistent detail row formatting
const DetailRow = ({ label, value }) => (
  <div className="mb-4">
    <p className="text-xl font-semibold text-gray-500 p-2">
      <span className="mr-2 text-xl font-extrabold text-gray-medium">
        {label}:
      </span>
      <span className="text-gray-dark">{value}</span>
    </p>
  </div>
);

export default ProductDetails;
