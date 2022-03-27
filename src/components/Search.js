import { Button, Alert } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { TextField } from "@mui/material";
import SkeletonItem from "./shared/SkeletonItem";
import { useLocation } from "react-router-dom";
import { useState,useEffect} from "react";
import {COMMON} from "./Common";
import { useNavigate } from "react-router-dom";
import PostItem from "./shared/PostItem";
import NoResult from "../assets/no-result.png";
import FloatingAction from "./shared/FloatingAction";

const Search = () => {
    let navigate = useNavigate();
    const search = useLocation().search;
    const searchKey = new URLSearchParams(search).get('p');
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [searchValue, setSearchValue] = useState(searchKey.replace("-"," "));
    const [searchResponse, setSearchResponse] = useState([]);
    const [displayLoadMore, setDisplayLoadMore] = useState(true);
    const [page, setPage] = useState(1);

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
        setIsLoading(true);
        fetch(`${COMMON.DOMAIN}posts/search?k=${removeAccents(searchKey.replace("-"," "))}&s=8&p=${page}`)
        .then(res => res.json())
        .then(resJson => {
            if (resJson.message === "success") {
                if (resJson.data.length) {
                    if (resJson.data.length < 8) setDisplayLoadMore(false);
                    setSearchResponse(resJson.data);
                } else {
                    setDisplayLoadMore(false);
                    setSearchResponse("");
                }
                setIsLoading(false);
            } else {
                setDisplayLoadMore(false);
                setSearchResponse("");
            }
        });
    }

    const handleTextFieldChange = (event) => {
        setSearchValue(event.target.value);
    }

    const handleClick = () => {
        if (!searchValue) {
            setIsError(true);
        } else {
            navigate(`/tim-kiem?p=${searchValue.replace(" ","-")}`);
        }
    }

    const handleKeypress = (event) => {
        if(event.key === 'Enter'){
            if (!searchValue) {
                setIsError(true);
            } else {
                navigate(`/tim-kiem?p=${searchValue.replace(" ","-")}`);
            }
        }
    }

    const handleLoadMoreClick = () => {
        setPage(prev => prev + 1);
    }

    useEffect(() => {
        setSearchResponse([]);
        setSearchValue(searchKey.replace("-"," "));
        setIsLoading(true);
        getSearchValue();
        document.title=`Tìm kiếm: ${searchKey}`
    },[page,searchKey]);

    return <>
        <FloatingAction />
        <div className="container py-5 mb-5 position-relative">
            {
                isError && <Alert severity="error" className="d-inline-flex position-absolute top-0 end-0 mt-3">Mời nhập từ kháo để thực hiện tìm kiếm!</Alert>
            }
            <h3 className="text-center mb-4 text-uppercase fw-normal">Tìm kiếm</h3>
            <div className="p-3 mb-5 bg-body mx-auto text-center">
                <div className="col-lg-8 col-12 d-inline-block align-middle me-4">
                    <TextField id="filled-basic" variant="filled" fullWidth label="Nhập từ khóa..." className="rounded" onChange={handleTextFieldChange} onKeyPress={handleKeypress} value={searchValue}/>
                </div>
                <div className="d-inline-block align-middle mt-3 mt-lg-0">
                    <Button onClick={handleClick} variant="outlined" startIcon={<SearchIcon />}>
                    Tìm kiếm
                    </Button>
                </div>
            </div>
            <div>
                {
                    searchResponse 
                    ? (!isLoading && <div className="text-center fs-4">Kết quả tìm kiếm cho từ khóa: <strong>{searchKey.replace("-"," ")}</strong></div>)
                    : (!isLoading && <>
                        <div className="text-center fs-4">Không tìm thấy kết quả cho từ khóa: <strong>{searchKey.replace("-"," ")}</strong></div>
                        <div className="col-md-4 col-9 mx-auto mt-3">
                            <img className="w-100" src={NoResult}/>
                        </div>
                    </>)
                }
            </div>
            <div className="row mt-5">
                {
                    searchResponse && searchResponse.map((item) => {
                        return <div className="col-12 col-md-6 col-lg-3 mb-3"><PostItem data={item} isTopLikeItem={true}/></div>
                    })
                }
                {
                    isLoading &&  <>
                        {
                            Array(8).fill(0).map((item,index) => {
                                return <SkeletonItem key={index}/>
                            })
                        }
                    </>    
                }
            </div>
            {
                displayLoadMore &&
                <div className="text-center">
                    {
                        !isLoading && <Button variant="outlined" color="primary" onClick={handleLoadMoreClick}>
                            <div className="fw-bold">Hiển thị thêm kết quả</div>
                        </Button>
                    }
                </div>
            }
        </div>
    </>
    
}

export default Search;