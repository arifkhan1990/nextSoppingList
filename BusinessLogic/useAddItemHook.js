import { useState, useEffect } from "react";
import Msg from "../constaint/text.json";
import toast, { Toaster } from "react-hot-toast";
import { useAddItemMutation } from "../redux/slice/itemSlice";
import { useRouter } from 'next/router';
import { useSession } from "next-auth/react";

const useAddItemHook = () => {
  const router = useRouter()
  const [formData, setFormData] = useState({});
  const [imgUrl, setImgUrl] = useState("");
  
  const { data: session } = useSession();
  const [addItem, isSuccess, isError, error, isLoading] = useAddItemMutation();

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
      imgUrl ? 
      setFormData({
        ...formData,
        ["item_image"]: imgUrl,
      }) : setFormData({
        ...formData
      })
    }, [imgUrl]);
  
    const handleChange = (event) => {
      setFormData({
        ...formData,
        [event.target.id]: event.target.value,
      });
    };
  
    const handleOnSubmit = async (e) => {
      e.preventDefault();

      if (Object.keys(formData).length == 0)
        return toast.error(Msg.emptyFormData);
      
      if (formData['item_name'] == undefined) {
        return toast.error(Msg.addItem.ItemNameRequired);
      }
  
      try {
        formData['owner'] = session?.user?.user?.email || session?.user?.email;
        let newItem = await addItem(formData);

        if (isError === true) {
          toast.error(error.message);
        }
  
        if (newItem?.data?.code === 200) {
          toast.success(Msg.addItem.success);
          router.push("/");
        }
      } catch (err) {
        toast.error(Msg.addItem.error, err);
      }
    };

    return {
      handleOnSubmit,
      handleChange,
      imageUpload,
      Toaster,
      isLoading
    };
  };

export default useAddItemHook