import React, { useState } from "react";
import styled from "styled-components";
import {
  Label,
  Input,
  Button,
} from "./StyledCSS";

const EditItem = (props) => {
    const [itemName, setItemName] = useState(props.item.itemName);
    const [category, setCategory] = useState(props.item.category);
    const [price, setPrice] = useState(props.item.price);
    const [quantity, setQuantity] = useState(props.item.quantity);
    const [isCrossedOff, setIsCrossedOff] = useState(props.item.isCrossedOff);
  
    const toTitleCase = (str) => {
      str = str
        .toLowerCase()
        .split(" ")
        .map((eaWord) => eaWord[0].toUpperCase() + eaWord.slice(1))
        .join(" ");
  
      return str;
    };

    const handleUpdate = (e) => {
      e.preventDefault();
      // console.log(`e`,e);
  
      const updatedItem = {
          itemName: toTitleCase(itemName),
          category: toTitleCase(category),
          price,
          quantity,
          isCrossedOff
      }
  
      //passing both objs back to update lists
      props.updateList(props.item, updatedItem);
      //last steps hiding edit component when finished
      props.editActive(false);
    }

    const handleCancelUpdate = () => {
      props.editActive(false);
  }
  
    return (
      <form onSubmit={(e)=>handleUpdate(e)}>
        <Label htmlFor="itemName"> Item:</Label>
        <Input
          id="itemName"
          name="itemName"
          type="text"
          onChange={(e) => setItemName(e.target.value)}
          value={itemName}
        />
  
        <Label htmlFor="category"> Category:</Label>
        <Input
          id="category"
          name="category"
          type="text"
          onChange={(e) => setCategory(e.target.value)}
          value={category}
        />
  
        <Label htmlFor="price"> Price:</Label>
        <Input
          id="price"
          name="price"
          type="number"
          step="0.01"
          min="0.00"
          onChange={(e) => setPrice(e.target.value)}
          value={price}
        />
  
        <Label htmlFor="quantity"> Quantity:</Label>
        <Input
          id="quantity"
          name="quantity"
          type="number"
          min="0"
          onChange={(e) => setQuantity(e.target.value)}
          value={quantity}
        />
  
        <Button type="submit">Update</Button>
        <Button as="a" onClick={handleCancelUpdate}>Cancel</Button>
      </form>
    );
  };
  
  export default EditItem;