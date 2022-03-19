import { Skeleton } from "@mui/material";

const CommentList = () => {
  return <div className="mt-4">
    <div className="mb-3 w-75">
      <div className="d-flex align-items-top">
        <Skeleton variant="circular" className="me-3" width={40} height={40} />
        <Skeleton width="30%"/>
      </div>
      <Skeleton />
      <Skeleton />
    </div>
    <div className="mb-3 w-75">
      <Skeleton variant="circular" width={40} height={40} />
      <Skeleton />
      <Skeleton />
    </div>
    <div className="mb-3 w-75">
      <Skeleton variant="circular" width={40} height={40} />
      <Skeleton />
      <Skeleton />
    </div>
    <div className="mb-3 w-75">
      <Skeleton variant="circular" width={40} height={40} />
      <Skeleton />
      <Skeleton />
    </div>
  </div>
}

export default CommentList;