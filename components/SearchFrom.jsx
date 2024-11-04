import React from "react";
import Form from "next/form";
import SearchFormReset from "./SearchFormReset";
import { Search } from "lucide-react";

const SearchFrom = ({ query }) => {
//   const query = "Test";

  return (
    <>
      <Form action="/" scroll={false} className="search-form">
        <input
          name="query"
          defaultValue={query}
          placeholder="Search Blogs"
          className="flex-1 outline-none"
        />
        <div className="flex gap-2">
          {query && <SearchFormReset />}
          <button type="submit" className="search-btn text-white">
            <Search className="size-5"/>
          </button>
        </div>
      </Form>
    </>
  );
};

export default SearchFrom;
