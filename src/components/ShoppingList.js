import React, { useState } from "react";
// import styled from "styled-components";
import {
    Label,
    Input,
    Button,
    DisplayContainer,
    DisplayPending,
    DisplayCrossedOff,
    ListHeader,
    PendingLi,
    CrossedOffLi,
    Subtotal,
    EachItem,
    EachItemName,
    A,
  } from "./StyledCSS";
import EditItem from "./EditItem";


// // could possibly break these out into their own components
// // and import them to be used
// const Label = styled.label`
//     color: darkblue;
// `;

// const Input = styled.input`
//   padding: 0.5em;
//   margin: 0.5em;
//   background: lightgray;
//   border: 1px solid gray;
//   border-radius: 5px;
// `;

// const Button = styled.button`
//   background: ivory;
//   color: darkblue;
//   font-size: 1em;
//   margin: 1em;
//   padding: 0.25em 1em;
//   border: 2px solid darkblue;
//   border-radius: 5px;
// `;

// const DisplayContainer = styled.div`
//   font-size: 1em;
//   margin: 1em;
//   padding: 0.25em 1em;
//   width: 30vw;
//   height: auto;
//   //   display: flex;
//   //   justify-content: center;
//   display: inline-block;
//   text-align: center;
//   border-radius: 15px;
//   background: lightgray;
// `;

// const DisplayPending = styled(DisplayContainer)`
//   // display: inline-block;
//   background: lightblue;
// `;

// const DisplayCrossedOff = styled(DisplayContainer)`
//   // display: inline-block;
//   background: lightgreen;
// `;

// const PendingLi = styled.li`
//   list-style-type: none;
//   margin-top: 15px;
// `;

// const CrossedOffLi = styled(PendingLi)`
//   text-decoration: line-through;
// `;

// const EachItem = styled.span`
// padding: 8px;
//   color: maroon;
// `;

// const EachItemName = styled(EachItem)`
//   font-weight: bold;
// `;

// const A = styled.a`
//   display: inline;
//   font-size: smaller;
// `;

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
  const [editActive, setEditActive] = useState(false);
  const [itemToEdit, setItemToEdit] = useState(null);


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

  const handleCrossOff = (e, item) => {
    e.preventDefault();
    item.isCrossedOff = !item.isCrossedOff;

    setDisplayList([...displayList]);
  };

  const handleEditing = (e, selectedItem) => {
    e.preventDefault();
    setEditActive(true);
    setItemToEdit(selectedItem);
  };

  const handleUpdate = (origItem, updatedItem) => {
    //this adds the updatedItem as new item, NO - I want update-existing //////////////
    // setDisplayList((PrevList) => [...PrevList, updatedItem]);
    // setAllItemsList((PrevList) => [...PrevList, updatedItem]);
    const updatedList = allItemsList.map((item) =>
      item === origItem ? updatedItem : item
    );
    setAllItemsList(updatedList);
    setDisplayList(updatedList);
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
      <ListHeader> Pending Items </ListHeader>
        <ul>
          {displayList
            .filter((item) => item.isCrossedOff === false)
            .sort((a, b) =>
              a.category > b.category
                ? 1
                : a.category === b.category
                ? a.itemName > b.itemName
                  ? 1
                  : -1
                : -1
            )
            // sorted by category and then itemName; not ideal clean up later
            // Credit: researched and found above sorting solution from:
            // https://flaviocopes.com/how-to-sort-array-of-objects-by-property-javascript/
            .map((item, idx) => {
              return (
                <>
                  <PendingLi key={idx} onClick={(e) => handleCrossOff(e, item)}>
                    <EachItemName>{item.itemName}</EachItemName>
                    <EachItem>${item.price ? item.price : "0"}</EachItem>
                    <EachItem>({item.quantity ? item.quantity : "0"})</EachItem>
                  </PendingLi>
                  <A href="#" onClick={(e) => handleEditing(e, item)}>
                    Edit 
                  </A>
                </>
              );
            })}
        </ul>
        <Subtotal>Subtotal: ${displayList
    .filter((item) => item.isCrossedOff === false)
    .map((item) => item.price * item.quantity)
    .reduce((a, b) => a + b, 0)
    .toFixed(2)}</Subtotal>
      </DisplayPending>
      <DisplayCrossedOff>
      <ListHeader> Crossed-Off Items </ListHeader>
        <ul>
          {displayList
            .filter((item) => item.isCrossedOff === true)
            .sort((a, b) =>
              a.category > b.category
                ? 1
                : a.category === b.category
                ? a.itemName > b.itemName
                  ? 1
                  : -1
                : -1
            )
            // sorted by category and then itemName
            // Credit: researched and found above sorting solution from:
            // https://flaviocopes.com/how-to-sort-array-of-objects-by-property-javascript/
            .map((item, idx) => {
              return (
                <>
                  <CrossedOffLi
                    key={idx}
                    onClick={(e) => handleCrossOff(e, item)}
                  >
                    <EachItemName>{item.itemName}</EachItemName>
                    <EachItem>${item.price ? item.price : "0"}</EachItem>
                    <EachItem>({item.quantity ? item.quantity : "0"})</EachItem>
                  </CrossedOffLi>
                </>
              );
            })}
        </ul>
      </DisplayCrossedOff>
      {editActive && (
        <EditItem
          item={itemToEdit}
          editActive={setEditActive}
          updateList={handleUpdate}
        />
      )}

      {/* /////////////////////////////////// For Testing Only /////////////////////////////////// */}
      <DisplayContainer>
        Testing:
        <p>Adding: {itemName}</p>
        {allItemsList.map((item, idx) => {
          return (
            <>
              <h3 key={idx}>{item.itemName} </h3>
              <EachItem>{item.category}</EachItem>
              <EachItem>${item.price}</EachItem>
              <EachItem>({item.quantity})</EachItem>
              <EachItem>{item.isCrossedOff ? "CrossedOff" : ""}</EachItem>
            </>
          );
        })}
      </DisplayContainer>
    </>
  );
};

export default ShoppingList;
