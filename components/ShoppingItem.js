import React from "react";
import { BsGrid, BsListTask, BsPlusSquareFill } from "react-icons/bs";
import {
  Button,
  Container
} from "reactstrap";
import ShoppingItemText from "../constaint/enum/shoppingItem";
import useShoppingListHook from "../BusinessLogic/useShoppingListHook";
import Link from "next/link";
import ShoppingList from "./ShoppingList";
import ShoppingCard from "./ShoppingCard";

const ShoppingItem = () => {
  const { useGetItemsQuery,
    listView, handleListView} = useShoppingListHook();
    const {
    isLoading,
    isError,
  } = useGetItemsQuery();
  return (
    <Container>
      <div className="col-12 d-flex mb-5">
        <div className="col-6">
        <Link href="/item/add-item"
          color="dark"
          style={{ marginBottom: "2rem", color: 'inherit', textDecoration: 'inherit', background: "#fff"}}
        >
          <BsPlusSquareFill size={30} />
          <span className="ms-2 fs-5 uppercase">{ShoppingItemText.ADD_ITEM}</span>
        </Link>
        </div>
        <div
          className="col-6 d-flex flex-row-right flex-row-reverse float-right">
            
          <Button
            className="edit-btn "
            color="warning"
            size="lg"
            onClick={handleListView}
          >
            {listView ? <BsGrid /> : <BsListTask />}
            
          </Button>
        </div>
      </div>
      { isError ? (
        <h4 className="text-center m-auto">{ShoppingItemText.Error_msg}</h4>
      ) : isLoading ? (
        <h1 className="text-center m-auto">{ShoppingItemText.Loading}</h1>
      ) : listView ? (<ShoppingList />) : (<ShoppingCard/>)}
    </Container>
  );
};

export default ShoppingItem;