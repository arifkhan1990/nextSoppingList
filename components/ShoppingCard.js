import Link from "next/link";
import React,{useState, useEffect} from "react";
import {
  BsFillTrashFill,
  BsHeart,
  BsHeartFill,
  BsWrench,
} from "react-icons/bs";
import {
  Button,
  Card,
  CardBody,
  CardGroup,
  CardImg,
  CardSubtitle,
  CardText,
  CardTitle,
  Col,
  Row,
} from "reactstrap";
import useShoppingListHook from "../BusinessLogic/useShoppingListHook";

const ShoppingCard = () => {
  
  const { useGetItemsQuery, handleDelete, handleReaction, isLoading, logedEmail } =
    useShoppingListHook();

  const { data } = useGetItemsQuery();

  return (
    <div className="col-12">
      <CardGroup>
        <Row>
          {data?.items?.map((item, index) => (
            <Col className="col-sm-4 col-12" key={item._id}>
              <Card className="mb-3">
                <CardImg
                  alt={item.item_name}
                  src={item.item_image}
                  top
                  width="100%"
                  height="230px"
                />
                <CardBody>
                  <CardTitle tag="h5">{item.item_name}</CardTitle>
                  <CardSubtitle className="mb-2 text-muted" tag="h6">
                    {item.category}
                  </CardSubtitle>
                  <CardText>
                    Tk. <strong>{item.price}</strong>
                  </CardText>
                </CardBody>
                <div className="d-flex justify-content-between  m-3">
                  {logedEmail === item.owner && (
                    <div className="d-flex justify-content-between">
                      <Button
                        className="remove-btn"
                        color="danger"
                        size="md"
                        onClick={() => handleDelete(item._id)}
                      >
                        <BsFillTrashFill />
                      </Button>{" "}
                      <Link href={`/item/edit-item/${item._id}`}>
                        <Button
                          className="edit-btn ms-3"
                          color="info"
                          size="md"
                          style={{ height: "44px" }}
                        >
                          <BsWrench />
                        </Button>
                      </Link>
                    </div>
                  )}
                  <div className="d-flex justify-content-between">
                    
                    <Button
                      className="border-white bg-white transparent"
                      size="md"
                      onClick={() => !isLoading && handleReaction(item._id)}
                    >
                      {!item.likes.includes(logedEmail) ? (
                        <BsHeart
                          size={28}
                          color="pink"
                          className="cursor-pointer"
                        />
                      ) : (
                        <BsHeartFill
                          size={28}
                          color="pink"
                          className="cursor-pointer"
                        />
                      )}
                      <span className="fs-6 text-dark">
                        {item.likes.length}
                      </span>
                    </Button>
                  </div>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </CardGroup>
    </div>
  );
};

export default ShoppingCard;
