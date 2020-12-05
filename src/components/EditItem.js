import React, { useState } from "react";
import styled from "styled-components";
import {
  Label,
  Input,
  Button,
} from "./StyledCSS";

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

const EditItem = (props) => {
    const [itemName, setItemName] = useState(props.item.itemName);
    const [category, setCategory] = useState(props.item.category);
    const [price, setPrice] = useState(props.item.price);
    const [quantity, setQuantity] = useState(props.item.quantity);
    const [isCrossedOff, setIsCrossedOff] = useState(props.item.isCrossedOff);
  
    const handleUpdate = (e) => {
      e.preventDefault();
      // console.log(`e`,e);
  
      const updatedItem = {
          itemName,
          category,
          price,
          quantity,
          isCrossedOff
      }
  
      //passing both objs back to update lists
      props.updateList(props.item, updatedItem);
      //last steps
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
          onChange={(e) => setPrice(e.target.value)}
          value={price}
        />
  
        <Label htmlFor="quantity"> Quantity:</Label>
        <Input
          id="quantity"
          name="quantity"
          type="number"
          onChange={(e) => setQuantity(e.target.value)}
          value={quantity}
        />
  
        <Button type="submit">Update</Button>
      </form>
    );
  };
  
  export default EditItem;