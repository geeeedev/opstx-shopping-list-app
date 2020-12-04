import React, { useState } from "react";

const ShoppingList = () => {




  return (
    <>
    <form>
        <label htmlFor="addItem"> Please search or create an item:</label>
        <input
          id="addItem"
          type="text"
          name="add"
        />

        <button type="submit">Create</button>
      </form>


    </>
  )
};

export default ShoppingList;
