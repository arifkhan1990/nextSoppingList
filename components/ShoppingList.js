import React from "react";
import { Button, Table } from "reactstrap";

import Image from "next/image";
import { BsFillTrashFill, BsWrench, BsGrid } from "react-icons/bs";

import useShoppingListHook from "../BusinessLogic/useShoppingListHook";
import Link from "next/link";
import ShoppingListText from "../constaint/enum/shoppingList";

const ShoppingList = () => {
  const { useGetItemsQuery, handleDelete, logedEmail } = useShoppingListHook();
  const { data } = useGetItemsQuery();
  return (
    <div className="col-12">
      <Table striped>
        <thead>
          <tr>
            <th>#</th>
            <th>{ShoppingListText.Image}</th>
            <th>{ShoppingListText.Name}</th>
            <th>{ShoppingListText.Category}</th>
            <th>{ShoppingListText.Price}</th>
            <th>{ShoppingListText.Action}</th>
          </tr>
        </thead>
        <tbody>
          {data?.items?.map((item, index) => (
            <tr key={index}>
              <th scope="row">{index + 1}</th>
              <td>
                <Image src={item.item_image} alt="" width={40} height={40} />
              </td>
              <td>{item.item_name}</td>
              <td>{item.category}</td>
              <td>{item.price}</td>
              <td>
                {logedEmail === item.owner && (
                  <>
                    <Button
                      className="remove-btn"
                      color="danger"
                      size="md"
                      onClick={() => handleDelete(item._id)}
                    >
                      <BsFillTrashFill />
                    </Button>{" "}
                    <Link href={`/item/edit-item/${item._id}`}>
                      <Button className="edit-btn ms-3" color="info" size="md">
                        <BsWrench />
                      </Button>
                    </Link>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ShoppingList;
