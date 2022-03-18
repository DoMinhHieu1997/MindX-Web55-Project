import { Button, Alert } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { TextField } from "@mui/material";
import SkeletonItem from "./shared/SkeletonItem";
import { useLocation } from "react-router-dom";
import { useState,useEffect } from "react";
import COMMON from "./Common";
import PostItem from "./shared/PostItem";

const Search = () => {
    const search = useLocation().search;
    const searchKey = new URLSearchParams(search).get('p');
    const [isError, setIsError] = useState(false);
    const [size, setSize] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const [searchValue, setSearchValue] = useState(searchKey);
    const [searchResponse, setSearchResponse] = useState("");

    function removeAccents(str) {
        str = str.replace("-"," ");
        const AccentsMap = [
          "aàảãáạăằẳẵắặâầẩẫấậ",
          "AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬ",
          "dđ", "DĐ",
          "eèẻẽéẹêềểễếệ",
          "EÈẺẼÉẸÊỀỂỄẾỆ",
          "iìỉĩíị",
          "IÌỈĨÍỊ",
          "oòỏõóọôồổỗốộơờởỡớợ",
          "OÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢ",
          "uùủũúụưừửữứự",
          "UÙỦŨÚỤƯỪỬỮỨỰ",
          "yỳỷỹýỵ",
          "YỲỶỸÝỴ"    
        ];
        for (var i=0; i<AccentsMap.length; i++) {
          var re = new RegExp('[' + AccentsMap[i].substr(1) + ']', 'g');
          var char = AccentsMap[i][0];
          str = str.replace(re, char);
        }
        return str;
    };

    const getSearchValue = () => {
        fetch(`${COMMON.DOMAIN}posts/search?k=${removeAccents(searchValue)}&s=8&p=${size}`)
        .then(res => res.json())
        .then(resJson => {
            setIsTyping(false);
            if (resJson.message === "success") {
                if (resJson.data.length) {
                    setSearchResponse(resJson.data);
                } else {
                    setSearchResponse("");
                }
                setIsLoading(false);
            } else {
                setSearchResponse("");
            }
        });
    }

    const handleTextFieldChange = (event) => {
        setIsTyping(true);
        setSearchValue(event.target.value);
    }

    const handleClick = () => {
        console.log(searchValue);
        if (!searchValue) {
            setIsError(true);
        } else {
            setIsError(false);
            getSearchValue();
        }
    }

    useEffect(() => {
        setIsLoading(true);
        getSearchValue();
    },[size || searchValue]);

    return <div className="container py-5 position-relative">
        {
            isError && <Alert severity="error" className="d-inline-flex position-absolute top-0 end-0 mt-3">Mời nhập từ kháo để thực hiện tìm kiếm!</Alert>
        }
        <h3 className="text-center mb-4 text-uppercase fw-normal">Tìm kiếm</h3>
        <div className="p-3 mb-5 bg-body mx-auto text-center">
            <div className="w-75 d-inline-block align-middle me-4">
                <TextField id="filled-basic" variant="filled" fullWidth label="Nhập từ khóa..." className="rounded" onChange={handleTextFieldChange} value={searchValue}/>
            </div>
            <div className="d-inline-block align-middle">
                <Button onClick={handleClick} variant="outlined" startIcon={<SearchIcon />}>
                Tìm kiếm
                </Button>
            </div>
        </div>
        {
            !isTyping && <div>
                {
                    searchResponse 
                    ? <div className="text-center fs-4">Kết quả tìm kiếm cho từ khóa: <strong>{searchValue.replace("-"," ")}</strong></div>
                    : <div className="text-center fs-4">Không tìm thấy kết quả cho từ khóa: <strong>{searchValue.replace("-"," ")}</strong></div>
                }
            </div>
        }
        <div className="row mt-5">
            {
                searchResponse && searchResponse.map((item) => {
                    return <div className="col-2 col-md-3 mb-3"><PostItem data={item} isTopLikeItem={true}/></div>
                })
            }
            {
                isLoading &&  <>
                    <div className="col-12 row">
                        <SkeletonItem />
                        <SkeletonItem />
                        <SkeletonItem />
                        <SkeletonItem />
                        <SkeletonItem />
                        <SkeletonItem />
                        <SkeletonItem />
                        <SkeletonItem />
                    </div>
                </>    
            }
        </div>
        <div></div>
    </div>
}

export default Search;