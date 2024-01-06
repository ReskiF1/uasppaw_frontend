import React, { useState } from "react";
import "../App.css";
import { MdClose } from "react-icons/md/index.esm.js";

const Formtable = ({ handleSubmit, handleOnChange, handleclose, rest }) => {
  const [isNIMUnique, setIsNIMUnique] = useState(true);

  const isNIMValid = (nim) => {
    const nimRegex = /^[1-3]\d{9}$/;
    return nimRegex.test(nim);
  };

  const checkNIMUnique = async (nim) => {
    try {
      const response = await fetch(process.env.MONGODB_URI, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nim }),
      });
      const data = await response.json();

      // Assume the API returns an object with a 'unique' property
      setIsNIMUnique(data.unique);
    } catch (error) {
      console.error("Error checking NIM uniqueness:", error);
      setIsNIMUnique(false); // Assume non-unique if there's an error
      return false;
    }
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();

    const { nim } = rest;

    if (!isNIMValid(nim)) {
      alert("NIM must be a 10-digit number starting with 1, 2, or 3.");
      return;
    }

    await checkNIMUnique(nim);

    if (!isNIMUnique) {
      alert("NIM must be unique. Please enter a different NIM.");
      return;
    }

    // Continue with the original handleSubmit logic
    handleSubmit(e);
  };

  return (
    <div className="addContainer">
      <form onSubmit={handleSubmitForm}>
        <div className="close-btn" onClick={handleclose}>
          <MdClose />
        </div>

        <label htmlFor="nim">NIM : </label>
        <input
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          id="nim"
          name="nim"
          onChange={handleOnChange}
          value={rest.nim}
          required
        />

        <label htmlFor="name">Nama : </label>
        <input
          type="text"
          id="name"
          name="name"
          onChange={handleOnChange}
          value={rest.name}
          required
        />

        <label htmlFor="gender">Jenis Kelamin : </label>
        <select
          id="gender"
          name="gender"
          onChange={handleOnChange}
          value={rest.gender}
          required
        >
          <option value="" disabled>
            Pilih Jenis Kelamin
          </option>
          <option value="Laki-laki">Laki-laki</option>
          <option value="Perempuan">Perempuan</option>
        </select>

        <label htmlFor="tgl">Tanggal Lahir : </label>
        <input
          type="date"
          id="tgl"
          name="tgl"
          onChange={handleOnChange}
          value={rest.tgl}
          required
        />

        <label htmlFor="religi">Agama : </label>
        <select
          id="religi"
          name="religi"
          onChange={handleOnChange}
          value={rest.religi}
          required
        >
          <option value="" disabled>
            Pilih Agama
          </option>
          <option value="Islam">Islam</option>
          <option value="Protestan">Protestan</option>
          <option value="Katolik">Katolik</option>
          <option value="Hindu">Hindu</option>
          <option value="Buddha">Buddha</option>
          <option value="Konghucu">Konghucu</option>
        </select>

        <label htmlFor="mobile">Mobile : </label>
        <input
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          id="mobile"
          name="mobile"
          onChange={handleOnChange}
          value={rest.mobile}
          required
        />

        <label htmlFor="email">Email : </label>
        <input
          type="email"
          id="email"
          name="email"
          onChange={handleOnChange}
          value={rest.email}
          required
        />

        <button className="btn">Submit</button>
      </form>
    </div>
  );
};

export default Formtable;
