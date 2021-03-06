import "./AddCategory.css";
import Button from "@mui/material/Button";
import {TextField, Input} from "@mui/material";
import React, {useState} from "react";
import {addNewCategory} from "../../Store/ListCategoryStore";
import axios from "axios";
import {CircleLoader, PropagateLoader} from "react-spinners";

function AddCategory({setAdding, setNeedLoading, needLoading}) {
  const [isLoading, setIsLoading] = useState(false);
  const [category, setCategory] = useState({
    name: "",
    cost: "",
    image: "",
    description: "",
  });
  const [file, setFile] = useState({
    file: null,
  });
  const handleClick = async () => {
    setIsLoading(true);
    let date = Date.now();
    const formData = new FormData();
    formData.append("file", file);
    axios
      .post(
        "https://api.bandeck.com/v1/user/storage/upload?access_token=w4fCq2xrZsKYwpLCm2zCmMKUbMKWaW3CmmjDhmhuwpxuwp1waWrDhcKUwpfCmcKdwpQ=&name=" +
          date,
        formData,
        {
          headers: {"Content-Type": "multipart/form-data"},
        }
      )
      .then((response) => {
        addNewCategory({
          name: category.name,
          cost: category.cost,
          image: "https://cdn.bandeck.com/" + response?.data.data.id,
          description: category.description,
        }).then((result) => {
          if (result.status === "success") {
            alert("Adding successful");
            setAdding(false);
            setNeedLoading(needLoading + 1);
          } else {
            alert(result?.msg);
          }
          setIsLoading(false);
        });
      });
  };
  const handleChange = (event) => {
    const {value} = event.target;
    setCategory({...category, [event.target.name]: value});
  };
  const handleChangeFile = (event) => {
    const file = event.target.files[0];
    console.log(file);
    setFile(file);
    setCategory({...category});
  };
  return (
    <div className="Tung_VH_AddCategory">
      <h6 className="Tung_VH_TitleOfAddCateScr">THÊM XE</h6>

      <div className="Tung_VH_AddInforOfCate">
        <TextField
          label={"Tên loại xe"}
          sx={{
            width: "20%",
            marginLeft: "3%",
            borderRadius: "30px",
          }}
          name="name"
          fullWidth
          value={category.name}
          margin="dense"
          variant="outlined"
          onChange={handleChange}
        />
      </div>
      <div className="Tung_VH_AddInforOfCate">
        <TextField
          sx={{
            width: "20%",
            marginLeft: "3%",
          }}
          label="Giá thuê"
          name="cost"
          fullWidth
          value={category.cost}
          margin="dense"
          variant="outlined"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          onChange={handleChange}
        />
      </div>
      <div className="Tung_VH_AddInforOfCate">
        <span
          style={{
            display: "flex",
            width: "10%",
            marginLeft: "3%",
          }}
        >
          Ảnh mô tả
        </span>
        <label htmlFor="contained-button-file" style={{marginLeft: "3%"}}>
          {/* <Input accept="image/png, image/jpeg" id="contained-button-file" multiple type="file" onChange={handleChangeFile} /> */}
          <input
            type="file"
            id="avatar"
            name="avatar"
            accept="image/png, image/jpeg"
            onChange={(e) => handleChangeFile(e)}
          ></input>
        </label>
      </div>
      <div
        style={{
          display: "flex",
          fontFamily: "Inter",
          flexDirection: "row",
          height: "20%",
          width: "90%",
          fontWeight: "600",
          marginTop: "4%",
          marginLeft: "3%",
        }}
      >
        <TextField
          sx={{
            width: "80%",
            marginTop: "-1%",
            marginLeft: "3%",
          }}
          label="Mô tả chi tiết sản phẩm "
          name="description"
          fullWidth
          value={category.description}
          margin="dense"
          variant="outlined"
          onChange={handleChange}
          multiline
          rows={4}
        />
      </div>
      <div style={{display: "flex",flexDirection:"row", justifyContent: "space-around", alignItems: 'center'}}>
        <button
          id="Tung_VH_AddCateButton"
          style={{
            backgroundColor: "#7ac70c",
            fontFamily: "'Roboto', sans-serif",
            boxShadow: "0px 4px 4px #EFEFEF",
            border: "1px solid #7ac70c",
            color: "white",
            width: "100px",
            height: "40px",
            cursor: "pointer",
            textAlign: "center",
            paddingTop: "10px",
            paddingBottom: "20px",
            justifyContent:"center",
            borderRadius: "5px",
            fontSize:"15px",
            marginBottom: "70px"
          }}
          disabled={isLoading}
          variant="contained"
          onClick={() => handleClick()}
        >
          {" "}
          {isLoading ? (
            <CircleLoader color="white" size={10} />
          ) : (
            "ADD"
          )}{" "}
        </button>
        <Button
          id="Tung_VH_XButton"
          sx={{
            backgroundColor: "red",
            width: "100px",
            height: "40px",
          }}
          variant="contained"
          onClick={() => {
            setAdding(false);
          }}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
}
export default AddCategory;
