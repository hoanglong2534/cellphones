import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import {
  getproductById,
  removeProductById,
  saveProduct,
} from "../../../../actions/ProductAction";
import { useHistory, useParams } from "react-router-dom";
import { getAllSelectList } from "../../../../actions/SelectListAction";
import axios from 'axios'

function AdminUpdate(props) {
  const { register, handleSubmit } = useForm();
  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const [image, setImage] = useState("");
  const detailProduct = useSelector((state) => state.getProductById.product);
  const SelectList = useSelector((state) => state.selectList.List);
  const [activeTypeProduct, setActiveTypeproduct] = useState(undefined);
  const { List } = useSelector((state) => state.allTypeProduct);

  useEffect(() => {
    dispatch(getproductById(id));

    return () => {
      dispatch(removeProductById());
    };
  }, [dispatch, id]);

  useEffect(() => {
    dispatch(getAllSelectList());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllSelectList());
  }, [dispatch]);

  const handleFileImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const [modelFile, setModelFile] = useState(null)
  const handleModelFileChange = (e) => {
    setModelFile(e.target.files[0])
  }

  const handleUploadModel = async () => {
    if (!modelFile) return alert('Please choose a model file (.gltf or .glb)')
    try {
      const form = new FormData()
      form.append('model', modelFile)
      await axios.post(`/products/upload-model/${id}`, form, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      alert('Model uploaded')
      // refresh product detail
      dispatch(getproductById(id))
      setModelFile(null)
    } catch (err) {
      console.error(err)
      alert(err.response && err.response.data && err.response.data.message ? err.response.data.message : 'Upload failed')
    }
  }

  const onSubmit = async (data) => {
    let formData = new FormData();

    formData.append("name", data.name);
    formData.append("price", data.price);
    formData.append("amount", data.amount);
    formData.append("salePrice", data.salePrice);
    formData.append(
      "type",
      activeTypeProduct ? activeTypeProduct : detailProduct.type
    );
    formData.append("image", image);
    formData.append("_id", id);

    formData.append("os", data.os);
    formData.append("ram", data.ram);
    formData.append("battery", data.battery);
    formData.append("rom", data.rom);
    formData.append("camera", data.camera);
    formData.append("special", data.special);
    formData.append("design", data.design);
    formData.append("screen", data.screen);

    await dispatch(saveProduct(formData));
    history.push("/admin/product");
  };

  const MenuFirmProduct = (item) => (
    <div
      className={
        activeTypeProduct
          ? activeTypeProduct === item.name
            ? `filter-menu-firm-item active`
            : "filter-menu-firm-item"
          : detailProduct.type === item.name
          ? `filter-menu-firm-item active`
          : "filter-menu-firm-item"
      }
      onClick={() => HandleFilterProductByType(item.name)}
    >
      <img src={item.img} alt={item.name || 'type'}></img>
    </div>
  );

  const HandleFilterProductByType = (name) => {
    setActiveTypeproduct(name);
  };

  return (
    <div className="admin-create">
      <span>Update Product</span>
      {detailProduct ? (
        <form
          className="admin-create-product"
          onSubmit={handleSubmit(onSubmit)}
          encType="multipart/form-data"
        >
          <input
            {...register("name")}
            placeholder="Name"
            defaultValue={detailProduct.name}
          ></input>
          <input
            {...register("amount")}
            placeholder="Amount"
            type="number"
            defaultValue={detailProduct.amount}
          ></input>
          <input
            {...register("price")}
            placeholder="Price"
            type="number"
            defaultValue={detailProduct.price}
          ></input>
          <input
            {...register("salePrice")}
            placeholder="SalePrice"
            type="number"
            defaultValue={detailProduct.salePrice}
          ></input>

          <div className="filter-menu-firm">
          {
            List ? (List.map((item) => MenuFirmProduct(item))) : ''
          }
          </div>

          {SelectList && SelectList.length > 0
            ? SelectList.map((item) => (
                <div className="select-type">
                  <select
                    {...register(`${item.property}`)}
                    defaultValue={detailProduct[`${item.property}`]}
                  >
                    {item.options.map((x) => (
                      <option value={x}>{x}</option>
                    ))}
                  </select>
                </div>
              ))
            : ""}

          <input
            type="file"
            {...register("image")}
            onChange={handleFileImageChange}
          ></input>
          <div style={{marginTop: '12px'}}>
            <label>3D Model (.gltf / .glb)</label>
            <input type="file" accept=".gltf,.glb" onChange={handleModelFileChange}></input>
            <button type="button" onClick={handleUploadModel}>Upload Model</button>
            {detailProduct && detailProduct.modelUrl ? (
              <div>
                Current model: <a href={detailProduct.modelUrl} target="_blank" rel="noreferrer">{detailProduct.modelUrl}</a>
              </div>
            ) : null}
          </div>
          <button type="submit">Update Product</button>
        </form>
      ) : (
        ""
      )}
    </div>
  );
}

export default AdminUpdate;
