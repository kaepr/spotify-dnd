const Card = ({ data, provided }) => {
  return (
    <div
      className=" bg-gray-500 text-lg p-8 mb-4 flex rounded-3xl overflow-hidden"
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
    >
      <div className="mr-2 w-1/3 ">
        <img
          src={data.images[0].url}
          className="object-center object-cover h-full w-full"
          alt="Playlist Pic"
        />
      </div>
      <div className="text-left flex-grow flex-col flex justify-center p-2">
        <div className="pb-1 text-xl font-semibold">{data.name}</div>
        <div className="">{data.description}</div>
      </div>
    </div>
  );
};

export default Card;
