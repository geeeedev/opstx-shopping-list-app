import React, { useState } from "react";

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
  const [displayList, setDisplayList] = useState(initList);

  return (
    <>
      <form>
        <label htmlFor="addItem"> Please search or create an item:</label>
        <input
          id="addItem"
          type="text"
          name="add"
          //   onChange={(e) => handleSearch(e)}
          value={itemName}
        />

        <button type="submit">Create</button>
      </form>

      <ul>
        {displayList
          .filter((item) => item.isCrossedOff === false)
          .map((item, idx) => {
            return (
              <>
                <li key={idx}>
                  <span>{item.itemName}</span>
                  <span>${item.price ? item.price : "0"}</span>
                  <span>({item.quantity ? item.quantity : "0"})</span>
                </li>
              </>
            );
          })}
      </ul>

      <ul>
        {displayList
          .filter((item) => item.isCrossedOff === true)
          .map((item, idx) => {
            return (
              <>
                <li key={idx}>
                  <span>{item.itemName}</span>
                  <span>${item.price ? item.price : "0"}</span>
                  <span>({item.quantity ? item.quantity : "0"})</span>
                </li>
              </>
            );
          })}
      </ul>
    </>
  );
};

export default ShoppingList;
