const SkeletonItem = (props) => {
  return <div className={"col-12 mb-4 " + (props.type == 1 ? "col-sm-12" : "col-sm-3 col-md-3")}>
    <div className="ratio ratio-4x3 mb-3 rounded overflow-hidden">
      <div className="position-absolute top-0 bottom-0 start-0 end-0 skeleton"></div>
    </div>
    <div className="pb-3 skeleton mt-2"></div>
    <div className="pb-3 skeleton mt-2"></div>
    <div className="pb-3 skeleton mt-2"></div>
  </div>
}

export default SkeletonItem;