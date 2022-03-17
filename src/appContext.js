import { createContext } from "react";

const SearchCtx = createContext({
    searchkey:"",
    changeSearchKey: ()=>{}
});

export default SearchCtx;