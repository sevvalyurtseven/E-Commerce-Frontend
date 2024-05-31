import product1 from "../../assets/product-detail/product1.png";
import product2 from "../../assets/product-detail/product2.png";
import product3 from "../../assets/product-detail/product3.png";
import product4 from "../../assets/product-detail/product4.png";
import product5 from "../../assets/product-detail/product5.png";
import product6 from "../../assets/product-detail/product6.png";
import product7 from "../../assets/product-detail/product7.png";
import product8 from "../../assets/product-detail/product8.png";
import ProductCard from "../../components/ProductCard";

const products = [
  {
    id: 1,
    image: product1,
    title: "Graphic Design",
    department: "English Department",
    originalPrice: 16.48,
    discountedPrice: 6.48,
  },
  {
    id: 2,
    image: product2,
    title: "Graphic Design",
    department: "English Department",
    originalPrice: 18.99,
    discountedPrice: 8.99,
  },
  {
    id: 3,
    image: product3,
    title: "Graphic Design",
    department: "English Department",
    originalPrice: 20.0,
    discountedPrice: 10.0,
  },
  {
    id: 4,
    image: product4,
    title: "Graphic Design",
    department: "English Department",
    originalPrice: 20.0,
    discountedPrice: 10.0,
  },
  {
    id: 5,
    image: product5,
    title: "Graphic Design",
    department: "English Department",
    originalPrice: 20.0,
    discountedPrice: 10.0,
  },
  {
    id: 6,
    image: product6,
    title: "Graphic Design",
    department: "English Department",
    originalPrice: 20.0,
    discountedPrice: 10.0,
  },
  {
    id: 7,
    image: product7,
    title: "Graphic Design",
    department: "English Department",
    originalPrice: 20.0,
    discountedPrice: 10.0,
  },
  {
    id: 8,
    image: product8,
    title: "Graphic Design",
    department: "English Department",
    originalPrice: 20.0,
    discountedPrice: 10.0,
  },
];

function BestSellerProducts() {
  return (
    <div className="bg-[#FAFAFA] py-10">
      <div className=" w-[80%] mx-auto">
        <h1 className="text-slate-800 text-2xl font-bold leading-loose tracking-wider text-center sm:text-start">
          BESTSELLER PRODUCTS
        </h1>
        <hr />
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 py-10">
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
    </div>
  );
}

export default BestSellerProducts;
