import React from "react";
import "../App.css";
import { MdClose } from "react-icons/md";

const Formtable = ({ handleSubmit, handleOnChange, handleclose, rest }) => {
  return (
    <div className="addContainer">
      <form onSubmit={handleSubmit}>
        <div className="close-btn" onClick={handleclose}>
          <MdClose />
        </div>

        <label htmlFor="name">NIM : </label>
        <input
          type="text"
          id="nim"
          name="nim"
          onChange={handleOnChange}
          value={rest.nim}
        />

        <label htmlFor="name">Nama : </label>
        <input
          type="text"
          id="name"
          name="name"
          onChange={handleOnChange}
          value={rest.name}
        />

        <label htmlFor="gender">Jenis Kelamin : </label>
        <select
          id="gender"
          name="gender"
          onChange={handleOnChange}
          value={rest.gender}
        >
          <option value="laki-laki">Laki-laki</option>
          <option value="perempuan">Perempuan</option>
        </select>

        <label htmlFor="tgl">Tanggal Lahir : </label>
        <input
          type="date"
          id="tgl"
          name="tgl"
          onChange={handleOnChange}
          value={rest.tgl}
        />

        <label htmlFor="religi">Agama : </label>
        <select
          id="religi"
          name="religi"
          onChange={handleOnChange}
          value={rest.religi}
        >
          <option value="islam">Islam</option>
          <option value="protestan">Protestan</option>
          <option value="katolik">Katolik</option>
          <option value="hindu">Hindu</option>
          <option value="buddha">Buddha</option>
          <option value="konghucu">Konghucu</option>
        </select>

        <label htmlFor="mobile">Mobile : </label>
        <input
          type="number"
          id="mobile"
          name="mobile"
          onChange={handleOnChange}
          value={rest.mobile}
        />

        <label htmlFor="email">Email : </label>
        <input
          type="email"
          id="email"
          name="email"
          onChange={handleOnChange}
          value={rest.email}
        />

        <button className="btn">Submit</button>
      </form>
    </div>
  );
};

export default Formtable;
