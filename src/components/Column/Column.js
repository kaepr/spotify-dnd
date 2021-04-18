import { Draggable } from 'react-beautiful-dnd';
import Card from '../Card/Card';

const Column = ({ provided, data }) => {
  return (
    <div
      ref={provided.innerRef}
      {...provided.droppableProps}
      className="w-full p-2 pr-4 flex flex-col"
    >
      {data.items.map((carddata, index) => {
        return (
          <Draggable
            key={carddata.uuid}
            index={index}
            draggableId={carddata.uuid}
          >
            {(provided) => {
              return <Card provided={provided} data={carddata} />;
            }}
          </Draggable>
        );
      })}
      {provided.placeholder}
    </div>
  );
};

export default Column;
