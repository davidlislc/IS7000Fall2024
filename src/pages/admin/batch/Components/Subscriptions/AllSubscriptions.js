import React, { useEffect, useState } from "react";
import ResponsiveTable from "../Table/ResponsiveTable";
import { urls } from "../../Utils/Config";
import { FiEdit } from "react-icons/fi";
import { MdDelete, MdRemoveRedEye } from "react-icons/md";
import Modal from "react-bootstrap/Modal";
import ViewSubscription from "./ViewSubscription";
import AddSubscription from "./AddSubscription";
import ConfirmDelete from "./ConfirmDelete";
import { getList } from "../../Utils/API";

const AllServices = () => {
  const [values, setValues] = useState([]);
  const [updatingData, setUpdatingData] = useState({});
  const [update, setUpdate] = useState(Date.now());
  const [showModel, setShowModel] = useState({ viewSubscription: false });
  const changeShowModel = (u) => setShowModel((p) => ({ ...p, ...u }));

  const openModel = (r, m) => {
    setUpdatingData(r || {});
    changeShowModel(m);
  };

  const getValues = async () => setValues(await getList(urls?.subscriptions));
  useEffect(() => {
    getValues();
  }, [update]);
  const columns = [
    { name: "Id", key: "id", type: "Number" },
    { name: "Name", key: "name" },
    { name: "Subscription date", key: "subdate", type: "Date" },
    { name: "Status", key: "status", sortable: false },
    {
      name: "Action",
      sortable: false,
      selector: (r) => (
        <div className="flex gap-2">
          <FiEdit className="pointer" title="Edit" size={18} onClick={() => openModel(r, { addSubscription: true })} />
          <MdRemoveRedEye
            className="pointer"
            title="View"
            size={18}
            color="green"
            onClick={() => openModel(r, { viewSubscription: true })}
          />
          <MdDelete
            className="pointer"
            title="Delete"
            size={18}
            color="red"
            onClick={() => openModel(r, { deleteSubscription: true })}
            // onClick={() => dilogueBox(`Are you sure want to delete Record ?`, () => deleteFunction(r))}
          />
        </div>
      ),
    },
  ];
  return (
    <div>
      <Modal
        size={"lg"}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={showModel?.viewSubscription}
        onHide={() => openModel({}, { viewSubscription: false })}
      >
        <ViewSubscription updatingData={updatingData} close={() => openModel({}, { viewSubscription: false })} />
      </Modal>
      <Modal
        size={"lg"}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={showModel?.addSubscription}
        onHide={() => openModel({}, { addSubscription: false })}
      >
        <AddSubscription
          updatingData={updatingData}
          close={() => openModel({}, { addSubscription: false })}
          closeAndUpdate={() => {
            openModel({}, { addSubscription: false });
            setUpdate(Date.now());
          }}
        />
      </Modal>
      <Modal
        size={"lg"}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={showModel?.deleteSubscription}
        onHide={() => openModel({}, { deleteSubscription: false })}
      >
        <ConfirmDelete
          updatingData={updatingData}
          close={() => openModel({}, { deleteSubscription: false })}
          closeAndUpdate={() => {
            openModel({}, { deleteSubscription: false });
            setUpdate(Date.now());
          }}
        />
      </Modal>
      <div className="flex justify-between p-3 ">
        <h1 className="font-bold text-xl text-white">Subscriptions</h1>
        <div className="addButton">
          <span className="addtext" onClick={() => openModel({}, { addSubscription: true })}>
            + Create a new Subscription
          </span>
        </div>
      </div>
      <ResponsiveTable dataTable={values} columns={columns} filyterKeys={["name", "status"]} />
    </div>
  );
};

export default AllServices;
