import styled from "styled-components";

// break out styled comp into its own 
export const Label = styled.label`
    color: darkblue;
`;

export const Input = styled.input`
  padding: 0.5em;
  margin: 0.5em;
  background: lightgray;
  border: 1px solid gray;
  border-radius: 5px;
`;

export const Button = styled.button`
  background: ivory;
  color: darkblue;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid darkblue;
  border-radius: 5px;
`;

export const DisplayContainer = styled.div`
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

export const DisplayPending = styled(DisplayContainer)`
  // display: inline-block;
  background: lightblue;
`;

export const DisplayCrossedOff = styled(DisplayContainer)`
  // display: inline-block;
  background: lightgreen;
`;

export const Subtotal = styled.p`
  margin-bottom: 0px;
  font-style: italic;
  font-weight: bold;
  
`;

export const PendingLi = styled.li`
  list-style-type: none;
  margin-top: 15px;
`;

export const CrossedOffLi = styled(PendingLi)`
  text-decoration: line-through;
`;

export const EachItem = styled.span`
padding: 8px;
  color: maroon;
`;

export const EachItemName = styled(EachItem)`
  font-weight: bold;
`;

export const A = styled.a`
  display: inline;
  font-size: smaller;
`;


// export default EachItem;
// export { EachItem, EachItemName };