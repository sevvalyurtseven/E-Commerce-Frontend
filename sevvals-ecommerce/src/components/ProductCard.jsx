function ProductCard({
  image,
  title,
  department,
  originalPrice,
  discountedPrice,
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-5 w-full max-w-56 py-4">
      <img src={image} alt={title} className="w-full object-cover" />
      <h5 className="text-slate-800 text-base font-bold leading-normal tracking-wider">
        {title}
      </h5>
      <p className="text-center text-neutral-500 text-sm font-bold leading-normal tracking-wider">
        {department}
      </p>
      <div className="flex justify-center items-center gap-2">
        <h5 className="text-center text-stone-300 text-base font-bold leading-normal tracking-wider">
          ${originalPrice}
        </h5>
        <h5 className="text-center text-teal-700 text-base font-bold leading-normal tracking-wider">
          ${discountedPrice}
        </h5>
      </div>
    </div>
  );
}

export default ProductCard;
