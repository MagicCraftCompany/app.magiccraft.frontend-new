import React from "react";
import { Id, toast, ToastOptions, TypeOptions } from "react-toastify";
import { IoMdClose } from "react-icons/io";
import { ImCheckmark } from "react-icons/im";
import { BsInfo } from "react-icons/bs";

export function SnackSimple({
  title,
  subtitle,
  icon,
}: {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  icon?: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-2">
      {icon ? <div style={{ display: "flex" }}>{icon}</div> : null}
      <div className="flex flex-col items-start gap-2">
        <span className="text-left text-lg font-semibold text-slate-100">
          {title}
        </span>
        {subtitle ? (
          <div className="text-md text-left text-slate-100">{subtitle}</div>
        ) : null}
      </div>
    </div>
  );
}

export function throwAxiosErrorSnack(
  error: any,
  subtitle?: React.ReactNode,
  options?: ToastOptions | undefined
) {
  return throwSnack(
    `error`,
    error.response.data.error.message || error.response.data.error.toString(),
    subtitle,
    options
  );
}

export function closeSnacks(snacksToClose?: Id[]) {
  if (!snacksToClose) {
  } else if (snacksToClose.length === 0) {
    toast.dismiss();
  } else {
    snacksToClose.forEach((item) => {
      toast.dismiss(item);
    });
  }
}

export function throwSnack(
  type: TypeOptions,
  message: React.ReactNode,
  subtitle?: React.ReactNode,
  options?: ToastOptions | undefined,
  snacksToClose?: Id[]
) {
  closeSnacks(snacksToClose);

  function getIcon() {
    return type === "error" ? (
      <IoMdClose color="#fff" size={24} />
    ) : type === "success" ? (
      <ImCheckmark color="#fff" size={"20px"} />
    ) : type === "info" ? (
      <BsInfo color="#fff" size={24} />
    ) : null;
  }

  const mess = (
    <SnackSimple title={message} subtitle={subtitle} icon={getIcon()} />
  );

  return toast(mess, { type, ...options });
}
