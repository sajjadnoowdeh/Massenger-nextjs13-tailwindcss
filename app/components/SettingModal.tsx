"use client";
import React from "react";
import Modal from "./Modal";
import Input from "./inputs/Input";
import { FieldValues, useForm } from "react-hook-form";
import { User } from "@prisma/client";
import Image from "next/image";
import { CldUploadButton } from "next-cloudinary";
import { useRouter } from "next/navigation";
import Button from "./Button";
import axios from "axios";
import toast from "react-hot-toast";

interface ISettingModal {
  isOpen?: boolean;
  onClose: () => void;
  currentUser: User;
}
const SettingModal: React.FC<ISettingModal> = ({
  isOpen,
  onClose,
  currentUser,
}) => {
  const [loading, setIsLoading] = React.useState(false);
  const router = useRouter();
  const {
    register,
    watch,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: currentUser?.name,
      image: currentUser?.image,
    },
  });

  const image = watch("image");

  const handleUpload = (result: any) => {
    setValue("image", result?.info?.secure_url);
  };

  const onSubmitUpload = (data: FieldValues) => {
    console.log(data);
    axios
      .post("/api/setting", {
        ...data,
      })
      .then(() => {
        router.refresh();
        onClose()
      })
      .catch((error) => {
        console.log("ERROR SETTING");
        toast.error('error wrong setting')
      });
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form action="" onSubmit={handleSubmit(onSubmitUpload)}>
        <div className="space-y-4">
          <div className="mb-4">
            <h2>Edit Profile</h2>
            <p className="text-sm">Edit your profile information</p>
          </div>

          <div>
            <Input
              id="name"
              lable="Name"
              disabled={loading}
              errors={errors}
              register={register}
              type="text"
            />
          </div>
          <div>
            <h2 className="mb-5">Photo</h2>
            <div className="flex align-items-center gap-4">
              <Image
                width={50}
                height={50}
                src={
                  image ||
                  currentUser?.image ||
                  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMwAAADACAMAAAB/Pny7AAAAY1BMVEX///8AAABJSUnR0dEODg6enp6kpKQRERF0dHRwcHAyMjK8vLzw8PDp6ens7OxZWVnc3NwkJCQdHR2NjY04ODj29vaqqqoXFxe1tbXLy8tQUFDj4+OBgYGVlZVnZ2crKytAQEBodD3rAAAE6UlEQVR4nO2di5aqMAxFrfgolJcgiIro/3/lBee6dBxGRXOSDqv7B3Qv2rQpaZhMoKT1Rt2yqrC/B6OIqpO6ZyH9r94i8vLVDxWl6lD6jw2m8Mqkx6RlMy+k/9wwQpOv+1W6WZOn0v9vAPtS942vK8n8r+h4eZI9VOnY6bln/2jbNj/jV//UOe10GUn/3UdU08fj644sWOdb6f/cT1H9PukfMPPt8ylM8I7KF3Vq0wQqti9Old9ottbopPVnKh2WrD6FeWuy3BNUFjyccD6jcGlDwUE8VEf5ksaltan3wi410XM522hRmyKnU+mQTBCKBa2LUoIJwpbaRSmx/UBMEpO/c5QKaQd6l3b1lHGJEC5KyTwagk1MH7WES4FxUTOJgFaBZJTEOaGPktECMh9kY48J+F3S54cwb5LxpzZm8/xvvSlj2GVKsq3/PcuSXYYqJ/vJ7OBknIyTcTJOxjaZuZNxMk7GyTiZt1jAUgD3ZD5jVE/GyTiZvy3DXy2Ik1k6GSfjZJyMk3EyTsbJcHAY04lmg3JRquF28QBFQBdOzG9oS9iL846A9a0mpJ7pFsZpk/5y04eOhG+kpTu0zM7jkxnTk4lgRUAXfMYSujEFgEmJluGMzeaIdTly1gJ5U6zMlLO8OQZHgIazhLYAVc5eqFmLTudYGd4koBp0iXEoK97yOWwEOPFtZjpi6IYmYS6hh4Yz7lQTGs64rwOUwAiQcZfPIs8AAu7rTSEwnE1jZpkJMJwl3C7AQ0CBm1qjutgwgR1q7PhdcNkm/72GNp6hZESuBIPimcQog92gk+mzBRpnQhfPMTIyLhONcJG42NgBCc4SgbkjRchItWyBRACpxhMFYKVJxPpOACaN1JRpJw15GjCT63IUkxcDNOxJ5hXycSY3yujf1E5Fe2kRbzYlHwz1e+edcJOzkvAogP3w756Q8JxWi/elTT9sB3iFu5ipD0N06rzi7zbRA9HbDV/a48yepDXIRriH3gWSgJZJW/yHZNJYIlPQPBkL2mi2RDRzRryL5hmPpFx7aUd3YEOSos3s+GJASSMjvTH7gqgskL9ovg+ig02po8zvEKU0/K9l+yB6iT6V9jgzJpmQKKE5iadmLSlR4cnagtxs4hHdPgl4K+b6WRAdaWQWfGenIDuibcT3zXtNditwKdvivN2XkXbT3Ijuz8hLAQS3znuyM7MLJ7mRBqjREHs0o3qnuad3UUpqnI2qqIF8+nesZVxihItSMq9oQXWNMuMMMsrapUbCZUw1miHxp2eu5Nw2UQVsCBBUnOfOUQVsOtHRsOmEFfyetlJ+xTLYKg27BXBLpvF7TqPB15qvHDX2/XPqQxuB3BP4uOOn6Mn3WAGsNCYSUH/T7FVy+gwnBN9mfsScNrDFRk6lw9BtpSMD7mXwnKmhmTuxAS/3r9EQPJ3CaNhXc4ax0ebDUMC4Rj7ns1V0y7tGPid4+8PIqbZMpSPQ72wKwpplPzmcbPAXRHF5JAWDctEYedufglX5apyOP/nUNxfBS8tOZODNy2hInm4KQsOQElPhm0dzp13uLQ1h/WQPNgVbm5b71zjq/lU09YE9PnCse1LryMbl/jWC+9SaqsxChu/FHTRllnLcFniiG8nh8a9LqAfvWIrmpiMqul8hnqmTsRQnYytOxlacjK04GVtxMrbiZGxlhDL/APaJc1uK0ZPQAAAAAElFTkSuQmCC"
                }
                alt="profile"
                className="rounded-full"
              />
              <CldUploadButton
                onUpload={handleUpload}
                options={{ maxFiles: 1 }}
                uploadPreset="druolvfk"
              >
                Change
              </CldUploadButton>
            </div>
          </div>

          <div className="flex justify-end">
            <Button secoundry onClick={onClose} disabled={loading}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              Save
            </Button>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default SettingModal;
