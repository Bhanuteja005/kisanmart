import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { db, storage } from './config';

// Add this function to generate order ID
const generateOrderId = () => {
  const timestamp = Date.now().toString();
  const random = Math.random().toString(36).substring(7);
  return `KM${timestamp.slice(-6)}${random.toUpperCase()}`;
};

export const addProduct = async (productData, images) => {
  try {
    const imageUrls = [];
    // Upload images to Firebase Storage
    for (const image of images) {
      const storageRef = ref(storage, `products/${Date.now()}-${image.name}`);
      await uploadBytes(storageRef, image);
      const url = await getDownloadURL(storageRef);
      imageUrls.push(url);
    }
    // Add main product document with order ID
    const productRef = await addDoc(collection(db, 'products'), {
      ...productData,
      orderId: generateOrderId(), // Add this line
      imageUrls,
      createdAt: new Date().toISOString()
    });
    // If product has variants, add them as a subcollection
    if (productData.productType === 'multi' && productData.variants?.length > 0) {
      const variantsCollectionRef = collection(doc(db, 'products', productRef.id), 'variants');
      
      // Add each variant as a document in the subcollection
      for (const variant of productData.variants) {
        await addDoc(variantsCollectionRef, {
          ...variant,
          createdAt: new Date().toISOString()
        });
      }
    }
    
    return productRef.id;
  } catch (error) {
    console.error('Error adding product:', error);
    throw error;
  }
};

export const getProducts = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'products'));
    const products = [];
    for (const doc of querySnapshot.docs) {
      const product = { id: doc.id, ...doc.data() };
      // If it's a multi-variant product, fetch its variants
      if (product.productType === 'multi') {
        const variantsSnapshot = await getDocs(collection(db, 'products', doc.id, 'variants'));
        product.variants = variantsSnapshot.docs.map(variantDoc => ({
          id: variantDoc.id,
          ...variantDoc.data()
        }));
      }
      products.push(product);
    }
    return products;
  } catch (error) {
    console.error('Error getting products:', error);
    throw error;
  }
};

export const deleteProduct = async (productId) => {
  try {
    await deleteDoc(doc(db, 'products', productId));
    // Also delete variants subcollection if exists
    const variantsSnapshot = await getDocs(collection(db, 'products', productId, 'variants'));
    for (const variantDoc of variantsSnapshot.docs) {
      await deleteDoc(doc(db, 'products', productId, 'variants', variantDoc.id));
    }
    return true;
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error;
  }
};

export const getProduct = async (productId) => {
  try {
    const productDoc = await getDoc(doc(db, 'products', productId));
    if (productDoc.exists()) {
      const product = { id: productDoc.id, ...productDoc.data() };
      if (product.productType === 'multi') {
        const variantsSnapshot = await getDocs(collection(db, 'products', productId, 'variants'));
        product.variants = variantsSnapshot.docs.map(variantDoc => ({
          id: variantDoc.id,
          ...variantDoc.data()
        }));
      }
      return product;
    }
    return null;
  } catch (error) {
    console.error('Error getting product:', error);
    throw error;
  }
};

export const updateProduct = async (productId, productData, images) => {
  try {
    const imageUrls = [];
    if (images.length > 0) {
      for (const image of images) {
        const storageRef = ref(storage, `products/${Date.now()}-${image.name}`);
        await uploadBytes(storageRef, image);
        const url = await getDownloadURL(storageRef);
        imageUrls.push(url);
      }
    }

    const updateData = {
      ...productData,
      ...(imageUrls.length > 0 && { imageUrls }),
      updatedAt: new Date().toISOString()
    };

    await updateDoc(doc(db, 'products', productId), updateData);

    if (productData.productType === 'multi' && productData.variants) {
      const variantsRef = collection(db, 'products', productId, 'variants');
      
      // Delete existing variants
      const existingVariants = await getDocs(variantsRef);
      for (const doc of existingVariants.docs) {
        await deleteDoc(doc.ref);
      }

      // Add updated variants
      for (const variant of productData.variants) {
        await addDoc(variantsRef, {
          ...variant,
          updatedAt: new Date().toISOString()
        });
      }
    }

    return true;
  } catch (error) {
    console.error('Error updating product:', error);
    throw error;
  }
};
