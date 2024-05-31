function ShopCard({ image, title, itemCount }) {
  return (
    <div className="flex flex-col items-center text-center relative">
      <img
        src={image}
        alt={title}
        className="w-full h-full object-cover filter brightness-75 grayscale-50"
      />
      <div className="absolute inset-7 flex flex-col items-center justify-center text-white font-bold text-base tracking-wider gap-3">
        <h2 className="text-2xl">{title}</h2>
        <p className="text-lg font-normal">{itemCount} Items</p>
      </div>
    </div>
  );
}

export default ShopCard;
