import { Button } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { TextField } from "@mui/material";
import SkeletonItem from "./shared/SkeletonItem";
import { useContext } from "react";
import SearchCtx from "../appContext";

const Search = () => {
    const searchkey = useContext(SearchCtx);

    console.log(searchkey);

    return <div className="container py-5">
        <h3 className="text-center mb-4 text-uppercase fw-normal">Tìm kiếm</h3>
        <div className="p-3 mb-5 bg-body mx-auto text-center">
            <div className="w-75 d-inline-block align-middle me-4">
                <TextField id="filled-basic" variant="filled" fullWidth label="Nhập từ khóa..." className="rounded"/>
            </div>
            <div className="d-inline-block align-middle">
                <Button variant="outlined" startIcon={<SearchIcon />}>
                Tìm kiếm
                </Button>
            </div>
        </div>
        <div className="row mt-5">
            <SkeletonItem />
            <SkeletonItem />
            <SkeletonItem />
            <SkeletonItem />
            <SkeletonItem />
            <SkeletonItem />
            <SkeletonItem />
            <SkeletonItem />
        </div>
    </div>
}

export default Search;