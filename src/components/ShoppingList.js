import React, { useState } from "react";
// import styled from "styled-components";
import {
  Label,
  Input,
  Button,
  WarningLabel,
  DisplayContainer,
  DisplayPending,
  DisplayCrossedOff,
  Section,
  AppHeader,
  ListHeader,
  CategoryHeader,
  PendingItem,
  CrossedOffItem,
  Subtotal,
  EachItem,
  EachItemName,
  ItemInCategory,
  EditButton,
} from "./StyledCSS";
import EditItem from "./EditItem";

const ShoppingList = () => {
  const [itemName, setItemName] = useState("");
  const [category, setCategory] = useState("Uncategorized");
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(1);
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
  const [warning, setWarning] = useState("");

  const toTitleCase = (str) => {
    str = str
      .toLowerCase()
      .split(" ")
      .map((eaWord) => eaWord[0].toUpperCase() + eaWord.slice(1))
      .join(" ");

    return str;
  };

  const handleAddNew = (e) => {
    e.preventDefault();

    if (itemName) {
      const newItem = {
        itemName: toTitleCase(itemName),
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
    } else {
      clearScreen();
      setWarning("Create Unsuccessful: No Item is Provided!");
    }
  };

  const clearScreen = () => {
    setWarning("");
    setEditActive(false);
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
    clearScreen();

    item.isCrossedOff = !item.isCrossedOff;
    setDisplayList([...displayList]);
  };

  const handleEditing = (e, selectedItem) => {
    e.preventDefault();
    clearScreen();

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

  const calcSubtotal = displayList
    .filter((item) => item.isCrossedOff === false)
    .map((item) => item.price * item.quantity)
    .reduce((a, b) => a + b, 0)
    .toFixed(2);

  /**
   * creating a categorized display list
   *  {
   *  "Fruit": [apple, ...]
   *  "Dairy": [milk, ...]
   *   ...
   * }
   */
  const categoriedDisplayList = displayList
    .filter((item) => item.isCrossedOff === false)
    .reduce((catObj, item) => {
      if (!catObj.hasOwnProperty(toTitleCase(item.category))) {
        catObj[toTitleCase(item.category)] = [];
      }
      catObj[toTitleCase(item.category)].push(item);
      return catObj;
    }, {});

  /**
   * sorted the categorized list into its own array list
   * ["Dairy", "Fruit", "Others"]
   */
  const sortedCategory = Object.keys(categoriedDisplayList).sort();

  return (
    <>
      <AppHeader>OpenStax Shopping List</AppHeader>
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
          onFocus={clearScreen}
          value={itemName}
        />

        <Button type="submit">Create</Button>
      </form>
      <WarningLabel>{warning}</WarningLabel>

      <DisplayPending>
        <ListHeader> Pending Items </ListHeader>
        {/* [dairy, fruit, other, snacks] */}
        {/* {dairy:[item, item],
            fruit:[]
        */}
        {sortedCategory.map((cat, catIdx) => {
          return (
            <Section key={catIdx}>
              <CategoryHeader>{cat}</CategoryHeader>
              <ItemInCategory>
                {categoriedDisplayList[cat].map((item, itemIdx) => {
                  return (
                    <>
                      <PendingItem
                        key={itemIdx}
                        onClick={(e) => handleCrossOff(e, item)}
                      >
                        <EachItemName>{item.itemName}</EachItemName>

                        <EachItem>
                          Qty: {item.quantity ? item.quantity : "0"}
                        </EachItem>
                        <EachItem>
                          ${item.price ? item.price : "0"}/per
                        </EachItem>
                      </PendingItem>
                      <EditButton onClick={(e) => handleEditing(e, item)}>
                        Edit {item.itemName}
                      </EditButton>
                    </>
                  );
                })}
              </ItemInCategory>
            </Section>
          );
        })}
        {calcSubtotal > 0 && <Subtotal>Subtotal: ${calcSubtotal}</Subtotal>}
      </DisplayPending>
      <DisplayCrossedOff>
        <ListHeader> Crossed-Off Items </ListHeader>
        {displayList
          .filter((item) => item.isCrossedOff === true)
          // .sort((a, b) =>
          //   a.category > b.category
          //     ? 1
          //     : a.category === b.category
          //     ? a.itemName > b.itemName
          //       ? 1
          //       : -1
          //     : -1
          // )
          .sort((a, b) => (a.itemName > b.itemName ? 1 : -1))
          // sorted by itemName only (took out category sorting)
          // Credit: researched and found above sorting solution from:
          // https://flaviocopes.com/how-to-sort-array-of-objects-by-property-javascript/
          .map((item, idx) => {
            return (
              <CrossedOffItem
                key={idx}
                onClick={(e) => handleCrossOff(e, item)}
              >
                <EachItemName>{item.itemName}</EachItemName>
                <EachItem>${item.price ? item.price : "0"}</EachItem>
                <EachItem>({item.quantity ? item.quantity : "0"})</EachItem>
              </CrossedOffItem>
            );
          })}
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
