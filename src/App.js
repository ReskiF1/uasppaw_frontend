import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Formtable from "./components/Formtable";

axios.defaults.baseURL = "http://localhost:8080/";
const url = "https://uasppawbackend.adaptable.app/";

function App() {
  const [addSection, setAddSection] = useState(false);
  const [editSection, setEditSection] = useState(false);
  const [formData, setFormData] = useState({
    nim: "",
    name: "",
    gender: "",
    tgl: "",
    religi: "",
    mobile: "",
    email: "",
  });
  const [formDataEdit, setFormDataEdit] = useState({
    nim: "",
    name: "",
    gender: "",
    tgl: "",
    religi: "",
    mobile: "",
    email: "",
    _id: "",
  });
  const [dataList, setDataList] = useState([]);

  const handleOnChange = (e) => {
    const { value, name } = e.target;
    setFormData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await axios.post(url + "/create", formData);
    console.log(data);
    if (data.data.success) {
      setAddSection(false);
      alert(data.data.message);
      getFetchData();
      setFormData({
        nim: "",
        name: "",
        gender: "",
        tgl: "",
        religi: "",
        mobile: "",
        email: "",
      });
    }
  };

  const getFetchData = async () => {
    const data = await axios.get(url + "/");
    console.log(data);
    if (data.data.success) {
      setDataList(data.data.data);
    }
  };
  useEffect(() => {
    getFetchData();
  }, []);

  const handleDelete = async (id) => {
    const data = await axios.delete(url + "/delete/" + id);

    if (data.data.success) {
      getFetchData();
      alert(data.data.message);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const data = await axios.put(url + "/update", formDataEdit);
    if (data.data.success) {
      getFetchData();
      alert(data.data.message);
      setEditSection(false);
    }
  };
  const handleEditOnChange = async (e) => {
    const { value, name } = e.target;
    setFormDataEdit((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };
  const handleEdit = (el) => {
    setFormDataEdit(el);
    setEditSection(true);
  };
  return (
    <>
      <div className="container">
        <button className="btn btn-add" onClick={() => setAddSection(true)}>
          Add
        </button>

        {addSection && (
          <Formtable
            handleSubmit={handleSubmit}
            handleOnChange={handleOnChange}
            handleclose={() => setAddSection(false)}
            rest={formData}
          />
        )}
        {editSection && (
          <Formtable
            handleSubmit={handleUpdate}
            handleOnChange={handleEditOnChange}
            handleclose={() => setEditSection(false)}
            rest={formDataEdit}
          />
        )}

        <div className="tableContainer">
          <table>
            <thead>
              <tr>
                <th>NIM</th>
                <th>Nama</th>
                <th>Jenis Kelamin</th>
                <th>Tanggal Lahir</th>
                <th>Agama</th>
                <th>No Telp</th>
                <th>Email</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {dataList[0] ? (
                dataList.map((el) => {
                  console.log(el);
                  return (
                    <tr>
                      <td>{el.nim}</td>
                      <td>{el.name}</td>
                      <td>{el.gender}</td>
                      <td>{el.tgl}</td>
                      <td>{el.religi}</td>
                      <td>{el.mobile}</td>
                      <td>{el.email}</td>
                      <td>
                        <button
                          className="btn btn-edit"
                          onClick={() => handleEdit(el)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-delete"
                          onClick={() => handleDelete(el._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <p style={{ textAlign: "center" }}>No data</p>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default App;
