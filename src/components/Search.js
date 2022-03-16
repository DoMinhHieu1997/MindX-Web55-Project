import { Button } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

const Search = () => {
    return <div className="container py-5">
        <div className="shadow p-3 mb-5 bg-body rounded w-75 mx-auto">
            <input className="w-75 d-inline-block align-middle me-4" placeholder="Nhập từ khóa..."/>
            <div className="d-inline-block align-middle">
                <Button variant="outlined" startIcon={<SearchIcon />}>
                Tìm kiếm
                </Button>
            </div>
            
        </div>
    </div>
}

export default Search;