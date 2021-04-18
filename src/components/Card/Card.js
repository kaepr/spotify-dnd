const Card = ({ data, provided, snapshot }) => {
  //   console.log('data inside card = ', data);

  return (
    <div
      className="text-lg bg-blue-600 mb-5"
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
    >
      {data.name}
    </div>
  );
};
export default Card;
