import styled from "styled-components";

// break out styled comp into its own
export const Label = styled.label`
  //   color: darkblue;
  color: #434370;
  font-weight: bold;
`;

export const Input = styled.input`
  padding: 0.5em;
  margin: 0.5em;
  background: Gainsboro;
  border: 1px solid Gainsboro;
  border-radius: 5px;
`;

export const Button = styled.button`
  background: white;
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
  padding-bottom: 30px;
  width: 30vw;
  height: auto;
  display: inline-block;
  text-align: center;
  border-radius: 15px;
  background: lightgray;
`;

export const DisplayPending = styled(DisplayContainer)`
  // display: inline-block;
  // background: lightblue;
  background: #e5f5ff;
`;

export const DisplayCrossedOff = styled(DisplayContainer)`
  // display: inline-block;
  // background: lightgreen;
  background: #fff1e9;
`;

export const ListHeader = styled.h3`
  font-weight: 900;
  font-size: larger;
  color: #434370;
`;

export const CategoryHeader = styled.h3`
  color: #434370;
`;

export const Section = styled.section`
  // outline: 1px dotted red;
`;

export const ItemInCategory = styled.div`
  width: auto;
  width: 25vw;
  height: auto;
  text-align: center;
  padding: 0.25em 1em;
  padding-top: 10px;
  padding-bottom: 10px;
  // font-size: 1em;
  // margin: 1em;
  //   display: flex;
  //   justify-content: center;
  display: inline-block;
  text-align: center;
  border-radius: 15px;
  background: Gainsboro;
`;

export const PendingItem = styled.div`
  width: auto;
  height: 20px;
  text-align: center;
  margin-top: 5px;
  // outline: 1px dotted blue;
`;

export const CrossedOffItem = styled(PendingItem)`
  text-decoration: line-through;
`;

export const Subtotal = styled.p`
  margin-bottom: 0px;
  font-style: italic;
  font-weight: bold;
  color: #434370;
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
