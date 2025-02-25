import React, { useEffect, useState } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { FiCamera } from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";
import { useStatusContext } from "../context/ContextProvider";
import { getProduct, updateProduct } from "../firebase/productService";

const EditProduct = () => {
  const { activeMenu } = useStatusContext();
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [product, setProduct] = useState(null);
  const [productImageUpload, setProductImageUpload] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);
  const [variants, setVariants] = useState([]);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        setIsLoading(true);
        const productData = await getProduct(id);
        if (productData) {
          setProduct(productData);
          setImageUrls(productData.imageUrls || []);
          if (productData.variants) {
            setVariants(productData.variants);
          }
        } else {
          alert('Product not found');
          navigate('/products');
        }
      } catch (error) {
        console.error('Error loading product:', error);
        alert('Error loading product: ' + error.message);
        navigate('/products');
      } finally {
        setIsLoading(false);
      }
    };
    
    if (id) {
      loadProduct();
    }
  }, [id, navigate]);

  const handleProductImages = (e) => {
    setProductImageUpload([...productImageUpload, ...e.target.files]);
  };

  const removeSelectedImage = (imgSrc) => {
    const filterImageUrls = imageUrls.filter((item) => item !== imgSrc);
    const filterProductImageUpload = productImageUpload.filter((item) => {
      return URL.createObjectURL(item) === imgSrc;
    });
    setProductImageUpload(filterProductImageUpload);
    setImageUrls(filterImageUrls);
  };

  const addVariant = () => {
    setVariants([...variants, { name: '', color: '', cost: '', stock: '', sku: '' }]);
  };

  const removeVariant = (index) => {
    setVariants(variants.filter((_, i) => i !== index));
  };

  const handleVariantChange = (index, field, value) => {
    const newVariants = [...variants];
    newVariants[index][field] = value;
    setVariants(newVariants);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const formData = {
        productName: e.target.productName.value,
        category: e.target.category.value,
        productType: product.productType,
        description: e.target.description.value,
        cost: Number(e.target.cost.value),
        stockQuantity: Number(e.target.stockQuantity.value),
        bestSeller: e.target.bestSeller.checked, 
        variants: product.productType === 'multi' ? variants : null,
      };

      await updateProduct(id, formData, productImageUpload);
      alert('Product updated successfully!');
      navigate('/products');
    } catch (error) {
      alert('Error updating product: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (!product) {
    return <div className="flex justify-center items-center h-screen">Product not found</div>;
  }

  return (
    <div className={`${activeMenu ? "ml-72" : "w-full"} mt-4 flex justify-center gap-1`}>
      <form onSubmit={handleSubmit} className="w-full max-w-4xl mx-4">
        <div className="mb-4">
          <label
            htmlFor="imgUpload"
            className="text-xl font-semibold text-gray-medium cursor-pointer"
          >
            <div className="rounded-full w-[3.5rem] flex justify-center items-center bg-gray p-4 hover:bg-gray-medium text-white ">
              <FiCamera />
            </div>
          </label>
          <input
            className="invisible"
            multiple
            accept="image/png, image/jpg, image/gif, image/jpeg"
            name="img1"
            id="imgUpload"
            type="file"
            onChange={handleProductImages}
          />
          <div className="w-[50%] flex gap-1">
            {imageUrls.map((imageSrc) => (
              <img
                onClick={() => removeSelectedImage(imageSrc)}
                key={imageSrc}
                className="w-[6rem] cursor-pointer object-cover border border-black rounded h-[4rem]"
                src={imageSrc}
                alt="product"
              />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="productName"
            defaultValue={product.productName}
            required
            className="border outline-none w-full text-xl font-semibold text-gray-dark rounded-lg p-2"
          />
          <select
            name="category"
            defaultValue={product.category}
            className="border outline-none w-full text-xl font-semibold text-gray-dark rounded-lg p-2"
          >
            <option value="Fish and Meat">Fish and Meat</option>
            <option value="Drinks">Drinks</option>
          </select>
          <select
            name="productType"
            defaultValue={product.productType}
            className="border outline-none w-full text-xl font-semibold text-gray-dark rounded-lg p-2"
          >
            <option value="Grocery">Grocery</option>
            <option value="Foods">Foods</option>
          </select>
          <textarea
            name="description"
            defaultValue={product.description}
            className="border outline-none w-full text-xl font-semibold text-gray-dark rounded-lg p-2"
            cols="20"
            rows="2"
          ></textarea>
          <input
            type="text"
            name="cost"
            defaultValue={product.cost}
            className="border outline-none w-full text-xl font-semibold text-gray-dark rounded-lg p-2"
          />
          <input
            type="text"
            name="stockQuantity"
            defaultValue={product.stockQuantity}
            className="border outline-none w-full text-xl font-semibold text-gray-dark rounded-lg p-2"
          />
        </div>
        <div className="flex items-center mt-2">
            <input type="checkbox" name="bestSeller" defaultChecked={product.bestSeller || false} className="w-5 h-5 accent-blue-500" />
            <label htmlFor="bestSeller" className="ml-2 text-xl font-semibold text-gray-dark">Best Seller</label>
          </div>
          
        {product.productType === 'multi' && (
          <div className="border-t mt-4 pt-4">
            <div className="flex justify-between items-center mb-4">
              <h3>Variants</h3>
              <button type="button" onClick={addVariant}>
                <AiOutlinePlusCircle />
                Add Variant
              </button>
            </div>
            
            {variants.map((variant, index) => (
              <div key={index} className="border p-4 mb-4">
                <input
                  type="text"
                  name={`variantName-${index}`}
                  value={variant.name}
                  onChange={(e) => handleVariantChange(index, 'name', e.target.value)}
                  className="border outline-none w-full text-xl font-semibold text-gray-dark rounded-lg p-2"
                />
                <input
                  type="text"
                  name={`variantColor-${index}`}
                  value={variant.color}
                  onChange={(e) => handleVariantChange(index, 'color', e.target.value)}
                  className="border outline-none w-full text-xl font-semibold text-gray-dark rounded-lg p-2"
                />
                <input
                  type="text"
                  name={`variantCost-${index}`}
                  value={variant.cost}
                  onChange={(e) => handleVariantChange(index, 'cost', e.target.value)}
                  className="border outline-none w-full text-xl font-semibold text-gray-dark rounded-lg p-2"
                />
                <input
                  type="text"
                  name={`variantStock-${index}`}
                  value={variant.stock}
                  onChange={(e) => handleVariantChange(index, 'stock', e.target.value)}
                  className="border outline-none w-full text-xl font-semibold text-gray-dark rounded-lg p-2"
                />
                <input
                  type="text"
                  name={`variantSku-${index}`}
                  value={variant.sku}
                  onChange={(e) => handleVariantChange(index, 'sku', e.target.value)}
                  className="border outline-none w-full text-xl font-semibold text-gray-dark rounded-lg p-2"
                />
                <button type="button" onClick={() => removeVariant(index)}>
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}

        <button 
          type="submit" 
          disabled={isLoading}
          className="rounded-lg py-4 px-8 bg-sky-400 bg-blue-light text-white hover:bg-blue text-xl"
        >
          {isLoading ? 'Updating...' : 'Update Product'}
        </button>
      </form>
    </div>
  );
};

export default EditProduct;
