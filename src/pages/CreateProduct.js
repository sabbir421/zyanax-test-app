import React, { useState } from "react";
import { TextField, Button, Grid, Typography, Switch } from "@mui/material";
import { useDispatch } from "react-redux";
import { createProduct } from "../state/product/productSlice";
import { useNavigate } from "react-router-dom";

const CreateProduct = () => {
  const [isActive, setIsActive] = useState("INACTIVE");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    productName: "",
    price: "",
    offer: "",
    status: "",
    shippingCharge: "",
    color: "",
    size: "",
    image: null,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleImageChange = async (event) => {
    const imageFile = event.target.files[0];

    // Create a FileReader to read the image file
    const reader = new FileReader();

    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        // Calculate the aspect ratio
        let width = img.width;
        let height = img.height;
        let maxWidth = 500;
        let maxHeight = 500;
        if (width > height) {
          if (width > maxWidth) {
            height *= maxWidth / width;
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width *= maxHeight / height;
            height = maxHeight;
          }
        }

        // Resize the canvas
        canvas.width = width;
        canvas.height = height;

        // Draw the image onto the canvas with the desired dimensions
        ctx.drawImage(img, 0, 0, width, height);

        // Convert the canvas content to a Blob object representing the resized image
        canvas.toBlob((blob) => {
          setFormData((prevState) => ({
            ...prevState,
            image: blob,
          }));
        }, "image/jpeg");
      };

      img.src = e.target.result;
    };

    reader.readAsDataURL(imageFile);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append("productName", formData.productName);
    formDataToSend.append("price", formData.price);
    formDataToSend.append("offer", formData.offer);
    formDataToSend.append("status", isActive);
    formDataToSend.append("shippingCharge", formData.shippingCharge);
    formDataToSend.append("color", formData.color);
    formDataToSend.append("size", formData.size);
    formDataToSend.append("image", formData.image);

    try {
      const response = await fetch("http://localhost:8081/product/add", {
        method: "POST",
        body: formDataToSend,
      });
      const data = await response.json();
      console.log(data);
      setFormData({
        productName: "",
        price: "",
        offer: "",
        status: "",
        shippingCharge: "",
        color: "",
        size: "",
        image: null,
      });
      navigate("/admin/product");
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const handleSwitch = () => {
    setIsActive("ACTIVE");
  };
  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2} style={{ width: "30%", marginLeft: "35%" }}>
        <Grid item xs={12}>
          <Typography variant="h6">Product Upload</Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Product Name"
            name="productName"
            value={formData.productName}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Price"
            name="price"
            value={formData.price}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Offer"
            name="offer"
            value={formData.offer}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Shipping Charge"
            name="shippingCharge"
            value={formData.shippingCharge}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Color"
            name="color"
            value={formData.color}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Size"
            name="size"
            value={formData.size}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <input
            accept="image/*"
            id="image-upload"
            type="file"
            onChange={handleImageChange}
          />
        </Grid>
        <Grid item xs={12}>
          <label>Status</label>
          <Switch onChange={handleSwitch} />
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default CreateProduct;
