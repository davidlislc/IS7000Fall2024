import { useState, useEffect } from "react";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { RxTrackPrevious, RxTrackNext } from "react-icons/rx";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { VscArrowSmallDown, VscArrowSmallUp } from "react-icons/vsc";
import { FaSearch } from "react-icons/fa";

const ResponsiveTable = ({ columns, dataTable, filyterKeys }) => {
  const [columns1, setColumns1] = useState([]);
  const [filterValues, setFilterValues] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsperpage] = useState(100);
  const [currentPosts, setCurrentposts] = useState([]);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;

  const filterFunction = (fil) => {
    let f = fil?.toLowerCase()?.split(" ")?.join("");
    setFilterValues(
      dataTable.filter((e) =>
        filyterKeys.some((a) =>
          (typeof e[a] == "string" ? e[a]?.toLowerCase() : e[a]?.toString())?.split(" ")?.join("")?.includes(f)
        )
      )
    );
    setCurrentPage(1);
  };

  const sorting = (item) => {
    // console.log(item,item?.sortable)
    if (item?.sortable != false) {
      console.log(item);
      let key = item?.key;
      let d = [...dataTable];
      item?.sorted == true
        ? d.sort((a, b) =>
            item?.type == "Number"
              ? b?.[key] - a?.[key]
              : item?.type == "Date"
              ? new Date(b?.[key]) - new Date(a?.[key])
              : b?.[key]?.localeCompare(a?.[key])
          )
        : d.sort((a, b) =>
            item?.type == "Number"
              ? a?.[key] - b?.[key]
              : item?.type == "Date"
              ? new Date(a?.[key]) - new Date(b?.[key])
              : a?.[key]?.localeCompare(b?.[key])
          );
      setFilterValues(d);
      setCurrentPage(1);
      let c = columns1?.map((e) => ({ ...e, sorted: item == e ? !e?.sorted : false }));
      setColumns1(c);
    }
  };

  var last = Math.ceil(filterValues?.length / postsPerPage);
  const goFirst = () => setCurrentPage(1);
  const goLast = () => setCurrentPage(last);
  const goNext = () => setCurrentPage(currentPage < last ? currentPage + 1 : currentPage);
  const goPrev = () => setCurrentPage(currentPage > 1 ? currentPage - 1 : currentPage);

  const changePostPerPage = (e) => {
    setPostsperpage(parseInt(e.target.value));
    setCurrentPage(1);
  };

  const setb = () => {
    last = Math.ceil(filterValues?.length / postsPerPage);
    setCurrentposts(filterValues?.slice(indexOfFirstPost, indexOfLastPost));
  };

  useEffect(() => {
    setb();
  }, [currentPage, postsPerPage, dataTable, filterValues]);

  useEffect(() => {
    setFilterValues(dataTable);
  }, [dataTable]);

  useEffect(() => {
    setColumns1(columns?.map((e) => ({ ...e, sorted: false })));
  }, [columns]);

  return (
    <div className="bg-white h-full border p-3 mx-2 rounded-md">
      <div className=" w-full mb-2 p-2">
        <div className="flex items-center border-b-2 border-gray-300">
          <FaSearch className="text-gray-400 mr-2" />
          <input
            type="search"
            onChange={(e) => filterFunction(e.target.value)}
            className="flex-grow py-1 px-2 border-none outline-none"
            placeholder="Search..."
          />
        </div>
      </div>
      <div className="overflow-y-auto " style={{ height: "53vh" }}>
        {currentPosts?.length > 0 ? (
          <table className="min-w-full bg-white">
            <thead className="bg-gray-100">
              <tr>
                {columns1 &&
                  columns1.map((item, index) => (
                    <th className="cursor-pointer py-2 px-4 text-left" key={index} onClick={() => sorting(item)}>
                      {item?.name}
                      {item?.sortable !== false && (
                        <>
                          {item?.sorted !== false ? (
                            <VscArrowSmallDown className="inline ml-1" />
                          ) : (
                            <VscArrowSmallUp className="inline ml-1" />
                          )}
                        </>
                      )}
                    </th>
                  ))}
              </tr>
            </thead>
            <tbody>
              {currentPosts.map((e, i) => (
                <tr key={i} className={`border-t ${i % 2 == 0 ? "bg-white" : "bg-gray-100"}`}>
                  {columns1?.map((c, j) => (
                    <td className="py-2 px-4" key={j}>
                      {c?.selector?.(e) || e?.[c?.key]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="text-center p-2">No Data Found</div>
        )}
      </div>
      <div className="flex items-center justify-center gap-2 py-2 mt-2 border-t ">
        <div>
          {dataTable?.length > 0 ? (currentPage - 1) * postsPerPage + 1 : 0} -
          {dataTable?.length <= currentPage * postsPerPage ? dataTable?.length : currentPage * postsPerPage} of
          {dataTable?.length}
        </div>
        <div className="flex items-center space-x-2">
          <RxTrackPrevious size="1.3rem" className="cursor-pointer" title="First page" onClick={goFirst} />
          <GrFormPrevious size="1.5rem" className="cursor-pointer" title="Previous page" onClick={goPrev} />
          <select
            className="form-select px-2 py-1 border border-gray-300 rounded"
            value={postsPerPage}
            onChange={changePostPerPage}
          >
            {[10, 20, 50, 100]?.map((e, i) => (
              <option key={i} className="bg-white">
                {e}
              </option>
            ))}
          </select>
          <span>{currentPage}</span>
          <GrFormNext size="1.5rem" className="cursor-pointer" title="Next page" onClick={goNext} />
          <RxTrackNext size="1.3rem" className="cursor-pointer" title="Last page" onClick={goLast} />
        </div>
      </div>
    </div>
  );
};

export default ResponsiveTable;
