import React, { useState } from "react";
import styled from "styled-components";

// could possibly break these out into their own components
// and import them to be used
const Label = styled.label``;

const Input = styled.input`
  padding: 0.5em;
  margin: 0.5em;
  background: lightgray;
  border: 1px solid gray;
  border-radius: 5px;
`;

const Button = styled.button`
  //background: ivory;
  color: darkblue;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid darkblue;
  border-radius: 5px;
`;

const DisplayContainer = styled.div`
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  width: 30vw;
  height: auto;
  //   display: flex;
  //   justify-content: center;
  display: inline-block;
  text-align: center;
  border-radius: 15px;
  background: lightgray;
`;

const DisplayPending = styled(DisplayContainer)`
  // display: inline-block;
  background: lightblue;
`;

const DisplayCrossedOff = styled(DisplayContainer)`
  // display: inline-block;
  background: lightgreen;
`;

const PendingLi = styled.li`
  list-style-type: none;
  margin-top: 15px;
`;

const CrossedOffLi = styled(PendingLi)`
  text-decoration: line-through;
`;

const ShoppingList = () => {
  const [itemName, setItemName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [isCrossedOff, setIsCrossedOff] = useState(false);

  const initList = [
    {
      itemName: "apple",
      category: "fruit",
      price: 0.79,
      quantity: 3,
      isCrossedOff: false,
    },
    {
      itemName: "milk",
      category: "dairy",
      price: null,
      quantity: 1,
      isCrossedOff: false,
    },
    {
      itemName: "cookies",
      category: "snacks",
      price: 5.0,
      quantity: 1,
      isCrossedOff: true,
    },
    {
      itemName: "orange",
      category: "fruit",
      price: 0.89,
      quantity: 4,
      isCrossedOff: false,
    },
    {
      itemName: "egg",
      category: "dairy",
      price: 1.79,
      quantity: 1,
      isCrossedOff: false,
    },
    {
      itemName: "ice-cream",
      category: "other",
      price: 2.99,
      quantity: null,
      isCrossedOff: false,
    },
    {
      itemName: "soap",
      category: "cleaning",
      price: 2.99,
      quantity: 1,
      isCrossedOff: true,
    },
  ];
  const [allItemsList, setAllItemsList] = useState(initList);
  const [displayList, setDisplayList] = useState(initList);

  const handleAddNew = (e) => {
    e.preventDefault();

    const newItem = {
      itemName: itemName,
      category,
      price,
      quantity,
      isCrossedOff,
    };

    const newList = allItemsList;
    newList.push(newItem);
    setDisplayList(newList);
    setAllItemsList(newList);

    setItemName("");
  };

  const handleSearch = (e) => {
    const searchedItems = allItemsList.filter((item) => {
      return item.itemName.toLowerCase().includes(e.target.value.toLowerCase());
      //On the job, I would ask for clarifications on whether the search logic
      //prefers "start-with" or "include" the searched substring
    });
    setDisplayList(searchedItems);
    setItemName(e.target.value);

    //Check for (and not allow) duplicate entry - Not listed in requirement, but I would add that if time permits
  };

  return (
    <>
      <form
        onSubmit={(e) => {
          handleAddNew(e);
        }}
      >
        <Label htmlFor="addItem"> Please search or create an item:</Label>
        <Input
          id="addItem"
          type="text"
          name="add"
          onChange={(e) => handleSearch(e)}
          value={itemName}
        />

        <Button type="submit">Create</Button>
      </form>

      <DisplayPending>
        <ul>
          {displayList
            .filter((item) => item.isCrossedOff === false)
            .map((item, idx) => {
              return (
                <>
                  <PendingLi key={idx}>
                    <span>{item.itemName}</span>
                    <span>${item.price ? item.price : "0"}</span>
                    <span>({item.quantity ? item.quantity : "0"})</span>
                  </PendingLi>
                </>
              );
            })}
        </ul>
      </DisplayPending>
      <DisplayCrossedOff>
        <ul>
          {displayList
            .filter((item) => item.isCrossedOff === true)
            .map((item, idx) => {
              return (
                <>
                  <CrossedOffLi key={idx}>
                    <span>{item.itemName}</span>
                    <span>${item.price ? item.price : "0"}</span>
                    <span>({item.quantity ? item.quantity : "0"})</span>
                  </CrossedOffLi>
                </>
              );
            })}
        </ul>
      </DisplayCrossedOff>
    </>
  );
};

export default ShoppingList;
