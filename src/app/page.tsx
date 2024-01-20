"use client"
import Image from "next/image";
import { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

export default function Home() {
  const [dataArray, setDataArray] = useState([])


  const reorder = (list: any[], startIndex: number, endIndex: number) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1)
    result.splice(endIndex, 0, removed)
    return result
  }


  const onDragEnd = (result: any) => {
    if (!result.destination) {
      return
    }
    let updateTheArray: any = reorder(
      dataArray,
      result.source.index,
      result.destination.index
    )
    setDataArray(updateTheArray)
  }



  const callData = async () => {
    let response = await fetch('https://jsonplaceholder.typicode.com/users')
    let resdata = await response.json()
    setDataArray(resdata)
  }

  useEffect(() => {
    callData()
  }, [])

  return (
    <>
      <div className="container mx-auto">
        <div className="grid grid-cols-1">
          <table>
            <thead className="bg-blue-400">
              <tr>
                <th className="py-3">Sl</th>
                <th className="py-3">Name</th>
                <th className="py-3">Username</th>
                <th className="py-3">Email</th>
              </tr>
            </thead>
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId="droppable">
                {
                  (provided) => (
                    <tbody
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                    >
                      {
                        dataArray?.length > 0 && dataArray?.map((data: any, index) => {
                          return (
                            <Draggable
                              key={index}
                              draggableId={data?.username}
                              index={index}
                            >
                              {(provided, snapshot) => (
                                <tr

                                  {...provided.dragHandleProps}
                                  {...provided.draggableProps}
                                  ref={provided.innerRef}

                                  className="py-5 border-b border-blue-600"> <td>{index + 1}</td>
                                  <td>{data?.name}</td>
                                  <td>{data?.username}</td>
                                  <td>{data?.email}</td>
                                </tr>
                              )}
                            </Draggable>
                          )
                        })
                      }
                    </tbody>
                  )
                }
              </Droppable>
            </DragDropContext>

          </table>
        </div>
      </div>
    </>
  );
}
