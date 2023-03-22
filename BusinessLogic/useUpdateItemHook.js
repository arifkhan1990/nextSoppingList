import React, { useState, useEffect } from "react";
import Msg from "../constaint/text.json";
import {
  useGetItemQuery,
  useUpdateItemMutation,
} from "../redux/slice/itemSlice";

import toast, { Toaster } from "react-hot-toast";
import { useRouter } from 'next/router';

const useUpdateItemHook = ({itemId}) => {
  const { data } = useGetItemQuery(itemId);
  const [previousData, setPreviousData] = useState(data?.item || {});
  const [formData, setFormData] = useState({});
  const [imgUrl, setImgUrl] = useState("");


  const [updateItem, isSuccess, isError, isLoading, error] =
  useUpdateItemMutation();

    const router = useRouter()

    const imageUpload = async (event) => {
      const imgFrom = new FormData();
      imgFrom.append("file", event.target.files[0]);
      imgFrom.append("upload_preset", "shoppingCard");
  
      const imgData = await fetch(Msg.cloudinary_url,
        {
          method: "POST",
          body: imgFrom,
        }
      ).then((response) => response.json());
      setImgUrl(imgData.url);
    };
  
    useEffect(() => {
      setFormData({
        ...formData,
        ["item_image"]: imgUrl,
      });
    }, [imgUrl]);
  
    const handleChange = (event) => {
      setFormData({
        ...formData,
        [event.target.id]: event.target.value,
      });
    };
  
    useEffect(() => {
      setPreviousData({});
    }, [itemId]);
  
  
    useEffect(() => {
      setPreviousData(formData);
    }, [formData]);
  
  
    useEffect(() => {
      setPreviousData(data?.item);
    }, [data?.item]);
    
    const handleOnSubmit = async (e) => {
      e.preventDefault();
  
      if (formData == null) return toast.error(Msg.emptyFormData);
  
      try {
        if (itemId) {
          if(imgUrl === '') formData['item_image'] = data?.item?.item_image;
          await updateItem({ formData, itemId }); 
        } else {
          toast.error(Msg.updateItem.idRequier);
        }
  
        if (isError) {
          toast.error(error.message);
        }
        if (isSuccess) {
          toast.success(Msg.updateItem.success);
          router.push("/");
        }
      } catch (err) {
        toast.error(Msg.updateItem.error,err);
      }
    };

    
    return {
      handleOnSubmit,
      handleChange,
      imageUpload,
      previousData,
      Toaster,
      isLoading
    };
  };

export default useUpdateItemHook