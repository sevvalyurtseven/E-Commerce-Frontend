import manken1 from "../assets/best-seller-products/fixed-height-4.png";
import manken2 from "../assets/best-seller-products/fixed-height-5.png";
import manken3 from "../assets/best-seller-products/fixed-height-6.png";
import manken4 from "../assets/best-seller-products/fixed-height-3.png";
import manken5 from "../assets/best-seller-products/product-cover-5.png";
import manken6 from "../assets/best-seller-products/fixed-height.png";
import manken7 from "../assets/best-seller-products/fixed-height-5.png";
import manken8 from "../assets/best-seller-products/fixed-height-6.png";
import manken9 from "../assets/best-seller-products/product-cover-5-1.png";
import manken10 from "../assets/best-seller-products/fixed-height-7.png";
import ProductCard from "../components/ProductCard";

const products = [
  {
    id: 1,
    image: manken1,
    title: "Graphic Design",
    department: "English Department",
    originalPrice: 16.48,
    discountedPrice: 6.48,
  },
  {
    id: 2,
    image: manken2,
    title: "Graphic Design",
    department: "English Department",
    originalPrice: 18.99,
    discountedPrice: 8.99,
  },
  {
    id: 3,
    image: manken3,
    title: "Graphic Design",
    department: "English Department",
    originalPrice: 20.0,
    discountedPrice: 10.0,
  },
  {
    id: 4,
    image: manken4,
    title: "Graphic Design",
    department: "English Department",
    originalPrice: 20.0,
    discountedPrice: 10.0,
  },
  {
    id: 5,
    image: manken5,
    title: "Graphic Design",
    department: "English Department",
    originalPrice: 20.0,
    discountedPrice: 10.0,
  },
  {
    id: 6,
    image: manken6,
    title: "Graphic Design",
    department: "English Department",
    originalPrice: 20.0,
    discountedPrice: 10.0,
  },
  {
    id: 7,
    image: manken7,
    title: "Graphic Design",
    department: "English Department",
    originalPrice: 20.0,
    discountedPrice: 10.0,
  },
  {
    id: 8,
    image: manken8,
    title: "Graphic Design",
    department: "English Department",
    originalPrice: 20.0,
    discountedPrice: 10.0,
  },
  {
    id: 9,
    image: manken9,
    title: "Graphic Design",
    department: "English Department",
    originalPrice: 20.0,
    discountedPrice: 10.0,
  },
  {
    id: 10,
    image: manken10,
    title: "Graphic Design",
    department: "English Department",
    originalPrice: 20.0,
    discountedPrice: 10.0,
  },
];

const BestSellerProducts = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <h4 className=" text-neutral-500 text-xl font-normal leading-[30px] tracking-tight">
        Featured Products
      </h4>
      <h1 className=" text-slate-800 text-2xl font-bold leading-loose tracking-tight">
        BESTSELLER PRODUCTS{" "}
      </h1>
      <p className=" text-neutral-500 text-sm font-normal leading-tight tracking-tight">
        Problems trying to resolve the conflict between{" "}
      </p>
      <div className="flex flex-wrap justify-center gap-5 py-16 w-[85%] mx-auto">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            image={product.image}
            title={product.title}
            department={product.department}
            originalPrice={product.originalPrice}
            discountedPrice={product.discountedPrice}
          />
        ))}
      </div>
    </div>
  );
};

export default BestSellerProducts;
