import { Actions } from "@/source/components/actions";

// list of not added restaurants
// select field
// add

export default async function Add() {
  return (
    <div>
      <h6>Add restaurant to rank</h6>
      <h6>
        First register on{" "}
        <a href="https://umenu.app" target="_blank" rel="noopener noreferrer">
          u-menu
        </a>
      </h6>
      <h6>Then select and add your restaurant to the rank with ETH</h6>
      <Actions />
    </div>
  );
}
